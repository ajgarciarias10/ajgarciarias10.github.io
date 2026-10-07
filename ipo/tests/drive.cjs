const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'cuenta-drive.js'), 'utf8');
function mockDrive() {
  const files = [], calls = []; let count = 0, forkOnUpload = false;
  const request = async (url, opts) => {
    calls.push({ url, opts }); const u = new URL(url); let data;
    if (opts.method === 'POST') {
      const parts = opts.body.split('\r\n\r\n');
      const metadata = JSON.parse(parts[1].split('\r\n--')[0]);
      const payload = JSON.parse(parts[2].split('\r\n--')[0]);
      assert.deepEqual(metadata.parents, ['appDataFolder']);
      const parent = metadata.description;
      const file = { id: 'f' + ++count, createdTime: String(count).padStart(4, '0'), description: parent, payload }; files.push(file);
      if (forkOnUpload) { forkOnUpload = false; files.push({ ...file, id: 'f' + ++count, createdTime: String(count).padStart(4, '0') }); }
      data = { id: file.id };
    } else if (u.searchParams.get('alt') === 'media') {
      data = files.find(f => f.id === u.pathname.split('/').pop()).payload;
    } else {
      assert.equal(u.searchParams.get('spaces'), 'appDataFolder');
      assert.ok(u.searchParams.get('q').includes('ipo-study-v1'));
      data = { files: files.map(({ payload, ...meta }) => meta) };
    }
    assert.equal(opts.headers.Authorization, 'Bearer student-token');
    assert.ok(!url.includes('student-token'));
    return { ok: true, json: async () => data };
  };
  const ctx = vm.createContext({ window: {}, URLSearchParams, AbortSignal, crypto: require('node:crypto').webcrypto, Date, fetch: request }); vm.runInContext(source, ctx);
  return { api: ctx.window.crearDriveIPO({ token: () => 'student-token', request }), files, calls,
    fork() { forkOnUpload = true; } };
}
test('only private appDataFolder is used, versions restore progress without tokens', async () => {
  const { api, files } = mockDrive(); const empty = await api.read(); assert.equal(empty.revision, '');
  const a = await api.write('', { ipo_tests_v1: 'answers' }); assert.equal(a.revision, 'f1');
  const b = await api.write(a.revision, { ipo_tests_v1: 'new answers' }); assert.equal(b.revision, 'f2');
  const restored = await api.read(); assert.equal(restored.values.ipo_tests_v1, 'new answers'); assert.equal(restored.conflict, false);
  assert.equal(files.length, 2); assert.ok(!JSON.stringify(files).includes('student-token'));
});
test('stale device cannot replace another device’s newer progress', async () => {
  const { api, files } = mockDrive(); await api.write('', { ipo_tests_v1: 'first' });
  await assert.rejects(api.write('', { ipo_tests_v1: 'stale' }), error => error.conflict);
  assert.equal(files.length, 1); assert.equal((await api.read()).values.ipo_tests_v1, 'first');
});
test('racing creates preserve both branches; explicit recovery joins them', async () => {
  const drive = mockDrive(); drive.fork();
  await assert.rejects(drive.api.write('', { ipo_tests_v1: 'answers' }), error => error.conflict);
  const read = await drive.api.read(); assert.equal(read.conflict, true); assert.equal(drive.files.length, 2);
  await drive.api.write(read.revision, { ipo_tests_v1: 'chosen' });
  assert.equal((await drive.api.read()).conflict, false); assert.equal(drive.files.length, 3);
});
test('expired authorization rejects, so no false confirmation is shown', async () => {
  const ctx = vm.createContext({ window: {}, URLSearchParams, AbortSignal, fetch() {} }); vm.runInContext(source, ctx);
  const api = ctx.window.crearDriveIPO({ token: () => 'expired', request: async () => ({ ok: false, status: 401 }) });
  await assert.rejects(api.read(), e => e.status === 401);
});
test('page bootstrap waits for account restoration before loading study scripts in order', async () => {
  let resolveReady; const seen = [], placeholders = ['curso.js', 'progreso.js'].map(file => ({ dataset: { ipoScript: file }, after(script) { seen.push(script.src); script.onload(); } }));
  const ready = new Promise(resolve => { resolveReady = resolve; });
  const ctx = vm.createContext({ window: { IPOAccountReady: ready, IPOAccount: { conflict: false } },
    document: { querySelectorAll: () => placeholders, createElement: () => ({}), querySelector: () => ({ after() {} }) } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'cuenta-arranque.js'), 'utf8'), ctx);
  assert.equal(seen.length, 0); resolveReady(); await new Promise(resolve => setImmediate(resolve)); assert.deepEqual(seen, ['curso.js', 'progreso.js']);
});
