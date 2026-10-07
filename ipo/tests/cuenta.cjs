const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'cuenta-datos.js'), 'utf8');
const identity = id => ({ sub: id, email: id + '@red.ujaen.es', email_verified: true });
function memory() { const map = new Map(); return { map, getItem: k => map.get(k) ?? null, setItem: (k, v) => map.set(k, v), removeItem: k => map.delete(k) }; }
function server() {
  let remote = { revision: '', values: {}, conflict: false }, count = 0, fail = false;
  return { async read() { if (fail) throw Error('offline'); return structuredClone(remote); },
    async write(revision, values) { if (fail) throw Error('offline'); if (revision !== remote.revision) throw Object.assign(Error('conflict'), { conflict: true }); remote = { revision: String(++count), values: { ...values }, conflict: false }; return { revision: remote.revision }; },
    set fail(value) { fail = value; }, get remote() { return remote; } };
}
function account(api, storage = memory()) {
  const context = vm.createContext({ window: {}, setTimeout, clearTimeout }); vm.runInContext(source, context);
  return context.window.crearCuentaIPO({ api, storage, domains: ['red.ujaen.es'], schedule: () => 1, cancel() {} });
}
test('guest progress stays local and does not contact Drive', async () => {
  const storage = memory(), api = { read() { throw Error('must not read'); }, write() { throw Error('must not write'); } };
  const app = account(api, storage); await app.start(); app.storage.setItem('ipo_tests_v1', 'guest');
  assert.equal(storage.getItem('ipo_tests_v1'), 'guest'); await app.flush();
});
test('reject unverified emails and domains that imitate the institutional domain', async () => {
  for (const email of ['a@gmail.com', 'a@red.ujaen.es.example.com', 'a@evilred.ujaen.es']) {
    await assert.rejects(account(server()).start({ ...identity('a'), email }));
  }
  await assert.rejects(account(server()).start({ ...identity('a'), email_verified: false }));
});
test('restore from another device before exposing personal storage', async () => {
  const api = server(), a = account(api); assert.throws(() => a.storage.getItem('ipo_tests_v1'));
  await a.start(identity('a')); a.storage.setItem('ipo_tests_v1', 'answers'); await a.flush();
  const b = account(api); await b.start(identity('a')); assert.equal(b.storage.getItem('ipo_tests_v1'), 'answers');
});
test('separate accounts and guest on a shared browser; logout removes the personal copy', async () => {
  const storage = memory(); storage.setItem('ipo_tests_v1', 'guest');
  const a = account(server(), storage); await a.start(identity('a'));
  assert.equal(a.storage.getItem('ipo_tests_v1'), null); a.storage.setItem('ipo_tests_v1', 'alice'); await a.flush();
  const b = account(server(), storage); await b.start(identity('b')); assert.equal(b.storage.getItem('ipo_tests_v1'), null);
  await a.logout(); assert.equal(storage.getItem('ipo_cuenta_datos_v1:a'), null); assert.equal(storage.getItem('ipo_tests_v1'), 'guest');
});
test('offline edits survive reload, retry synchronizes, and logout waits for save', async () => {
  const api = server(), storage = memory(), a = account(api, storage); await a.start(identity('a'));
  api.fail = true; a.storage.setItem('ipo_plan_estudio_v1', 'plan'); await a.flush(); assert.equal(a.dirty, true);
  await assert.rejects(a.logout());
  const restored = account(api, storage); await restored.start(identity('a')); assert.equal(restored.storage.getItem('ipo_plan_estudio_v1'), 'plan');
  api.fail = false; await restored.flush(); assert.equal(restored.dirty, false); assert.equal(api.remote.values.ipo_plan_estudio_v1, 'plan');
});
test('simultaneous devices preserve local conflict and do not overwrite the remote', async () => {
  const api = server(), a = account(api), b = account(api); await a.start(identity('a')); await b.start(identity('a'));
  a.storage.setItem('ipo_tests_v1', 'alice'); b.storage.setItem('ipo_tests_v1', 'bob'); await a.flush(); await b.flush();
  assert.equal(b.conflict, true); assert.equal(b.snapshot().values.ipo_tests_v1, 'bob'); assert.equal(api.remote.values.ipo_tests_v1, 'alice');
  assert.throws(() => b.storage.setItem('ipo_tests_v1', 'other'));
  await b.restoreCloud(); assert.equal(b.storage.getItem('ipo_tests_v1'), 'alice');
});
test('explicit migration preserves guest and refuses to replace an existing account', async () => {
  const storage = memory(); storage.setItem('ipo_tests_v1', 'guest'); const api = server(), a = account(api, storage);
  await a.start(identity('a')); assert.equal(a.storage.getItem('ipo_tests_v1'), null); await a.importGuest();
  assert.equal(api.remote.values.ipo_tests_v1, 'guest'); assert.equal(storage.getItem('ipo_tests_v1'), 'guest'); await assert.rejects(a.importGuest());
});
test('new edits during a save remain dirty until the next save', async () => {
  const api = server(); let release; const realWrite = api.write;
  api.write = async (...args) => { await new Promise(resolve => { release = resolve; }); return realWrite(...args); };
  const a = account(api); await a.start(identity('a')); a.storage.setItem('ipo_tests_v1', 'first');
  const pending = a.flush(); a.storage.setItem('ipo_tests_v1', 'second'); release(); await pending;
  assert.equal(a.dirty, true); assert.equal(api.remote.values.ipo_tests_v1, 'first');
  api.write = realWrite; await a.flush(); assert.equal(api.remote.values.ipo_tests_v1, 'second'); assert.equal(a.dirty, false);
});
