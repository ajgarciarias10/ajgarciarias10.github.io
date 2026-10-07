const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function load(store = new Map(), blocked = false) {
  const ctx = vm.createContext({ Date, Math, JSON, Event, window: { dispatchEvent() {} },
    localStorage: { getItem: k => store.get(k) || null, setItem: (k, v) => { if (blocked) throw Error(); store.set(k, v); } } });
  for (const file of ['curso.js', 'plan-estudio.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), ctx);
  return ctx.window.IPOPlan;
}
test('two sessions per class, theoretical review before topic test, stable identities', () => {
  const plan = load();
  const sessions = plan.generate();
  assert.equal(sessions.length, 44);
  const first = sessions.filter(s => s.origen === '2026-09-09');
  assert.equal(first[0].tipo, 'teoria');
  assert.equal(first[1].tipo, 'test');
  assert.ok(first.every(s => s.fecha > s.origen));
  assert.deepEqual(sessions.map(s => s.id), plan.generate().map(s => s.id));
});
test('travel redistributes without overlaps and preserves completed work', () => {
  const plan = load();
  const s = plan.generate()[0];
  plan.state.cambios[s.id] = { hecha: true, fecha: s.fecha };
  plan.state.viajes = [{ desde: '2026-09-10', hasta: '2026-09-20' }];
  const sessions = plan.generate();
  assert.equal(sessions.find(x => x.id === s.id).fecha, s.fecha);
  const pending = sessions.filter(x => !x.hecha);
  assert.ok(pending.every(x => x.fecha < '2026-09-10' || x.fecha > '2026-09-20'));
  assert.equal(new Set(pending.map(x => x.fecha + x.hora)).size, pending.length);
});
test('exam study continues in January, mixes tests, ends before exam, persists edits', () => {
  const store = new Map(); const plan = load(store);
  Object.assign(plan.state, { cantidad: 0, inicioExamen: '2027-01-01', examen: '2027-01-20', diasExamen: [1, 3, 5] });
  const sessions = plan.generate();
  assert.ok(sessions.length > 3);
  assert.ok(sessions.every(s => s.fecha >= '2027-01-01' && s.fecha < '2027-01-20'));
  assert.ok(sessions.some(s => s.tipo === 'simulacro' && s.tema === 'all'));
  plan.state.cambios[sessions[0].id] = { fecha: '2027-01-02', hora: '10:00' };
  plan.save();
  assert.equal(load(store).generate().find(s => s.id === sessions[0].id).fecha, '2027-01-02');
});
test('no space before exam is reported and weekly study blocks are respected', () => {
  const plan = load();
  plan.state.viajes = [{ desde: '2026-09-07', hasta: '2027-01-19' }];
  plan.state.examen = '2027-01-20';
  assert.ok(plan.generate().every(s => s.pendiente));
  plan.state.viajes = [];
  const sessions = plan.generate({ bloques: [{ dia: 4, hora: '18:00', dur: 1 }] });
  assert.ok(sessions.every(s => new Date(s.fecha + 'T12:00:00').getDay() !== 4));
});
test('storage failure remains visible without stopping planning', () => {
  const plan = load(new Map(), true); plan.save();
  assert.equal(plan.storageOK, false); assert.ok(plan.generate().length);
});
