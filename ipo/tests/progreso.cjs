const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
function load(store = new Map(), blocked = false) {
  const context = vm.createContext({ Date, Math, JSON, Set, Event,
    localStorage: { getItem: k => { if (blocked) throw Error(); return store.get(k) || null; },
      setItem: (k, v) => { if (blocked) throw Error(); store.set(k, v); } },
    window: { dispatchEvent() {} } });
  for (const file of ['curso.js', 'progreso.js', 'preguntas-globales.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  return { app: context.window.IPOStudy, pool: vm.runInContext('BANCO_GLOBAL', context), context, store };
}
test('40 unique questions, answer persistence, option order and cursor restored', () => {
  const { app, pool, store } = load();
  const s = app.session('global', pool);
  assert.equal(s.ids.length, 40);
  assert.equal(new Set(s.ids).size, 40);
  const q = pool.find(q => app.identity(q) === s.ids[0]);
  app.answer(s, q, 0);
  app.answer(s, q, 0);
  assert.equal(s.responses.length, 1);
  s.index = 1; app.save();
  const restored = load(store).app.session('global', pool);
  assert.equal(restored.index, 1);
  assert.equal(JSON.stringify(restored.orders), JSON.stringify(s.orders));
  assert.equal(restored.responses[0], 0);
});
test('correct questions excluded across banks and tests; errors return until corrected', () => {
  const { app, pool } = load();
  const q = pool[0], q2 = pool[1];
  const s = app.session('topic', [q, q2]);
  const first = pool.find(q => app.identity(q) === s.ids[0]);
  app.answer(s, first, first.opciones.findIndex(o => !o.correcta));
  assert.equal(app.eligible([first], true).length, 1);
  const retry = app.session('retry', [first], true);
  app.answer(retry, first, first.opciones.findIndex(o => o.correcta));
  assert.equal(app.eligible([first]).length, 0);
  assert.equal(app.eligible([first], true).length, 0);
  assert.ok(!app.session('new', pool).ids.includes(app.identity(first)));
});
test('completion requires every answer; records weekly totals and due reminders', () => {
  const { app, pool, store } = load();
  const q = pool[0];
  store.set('ipo_recordatorios_v1', JSON.stringify({ repasos: [
    { tema: q.tema, fecha: '2000-01-01', hecho: false },
    { tema: '9', fecha: '2000-01-01', hecho: false },
    { tema: q.tema, fecha: '2099-01-01', hecho: false }
  ] }));
  const s = app.session('single', [q]);
  assert.equal(s.completed, false);
  app.answer(s, q, 0);
  assert.equal(s.completed, true);
  const stats = app.data.weeks[app.week()][q.tema];
  assert.equal(stats.answered, 1); assert.equal(stats.tests, 1);
  const reminders = JSON.parse(store.get('ipo_recordatorios_v1')).repasos;
  assert.deepEqual(reminders.map(r => r.hecho), [true, false, false]);
});
test('queued questions mastered in another session are not repeated', () => {
  const { app, pool } = load();
  const saved = app.session('saved', pool.slice(0, 3));
  const q = pool.find(q => app.identity(q) === saved.ids[0]);
  app.answer(app.session('elsewhere', [q]), q, 0);
  assert.ok(!app.session('saved', pool.slice(0, 3)).ids.includes(app.identity(q)));
});
test('small or exhausted banks do not pad tests; unavailable storage remains usable', () => {
  const { app, pool } = load(new Map(), true);
  const s = app.session('small', [pool[0]]);
  assert.equal(s.ids.length, 1); assert.equal(app.storageOK, false);
  app.answer(s, pool[0], 0);
  assert.equal(app.session('empty', [pool[0]]).ids.length, 0);
});
test('topic and global question identities match for all existing banks', () => {
  const { app, pool } = load();
  for (const [file, tema] of [['preguntas.js', '1'], ['preguntas-tema-2.js', '2'], ['preguntas-tema-3.js', '3'], ['preguntas-tema-4.js', '4'], ['preguntas-clevertracker.js', 'clevertracker']]) {
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
    const local = vm.runInContext('BANCO', context);
    local.forEach(q => assert.ok(pool.some(g => app.identity(g) === app.identity({ ...q, tema })), `${file}: ${q.id}`));
  }
});
test('all six quiz pages render, reject skipping, finish and resume with saved answers', () => {
  for (const page of ['tema-1.html','tema-2.html','tema-3.html','tema-4.html','test-clevertracker.html','generador.html']) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const elements = new Map();
    const element = () => ({ classList: { add() {}, remove() {}, toggle() {} }, focus() {}, before() {},
      after() {}, setAttribute() {}, textContent: '', innerHTML: '', hidden: false, parentElement: { classList: { add() {}, remove() {} } } });
    [...html.matchAll(/id="([^"]+)"/g)].forEach(m => elements.set(m[1], element()));
    ['test-progress','test-save','test-status'].forEach(id => elements.set(id, element()));
    const document = { documentElement: { dataset: { tema: html.match(/data-tema="([^"]+)"/)?.[1] } },
      getElementById: id => elements.get(id) || null, querySelector: () => element(),
      querySelectorAll: () => [], createElement: element, activeElement: { tagName: 'BODY' } };
    const store = new Map();
    const context = vm.createContext({ document, location: { search: '' }, URLSearchParams, Date, Math, JSON, Set, Event,
      localStorage: { getItem: k => store.get(k) || null, setItem: (k, v) => store.set(k, v) } });
    context.window = context; context.addEventListener = () => {}; context.dispatchEvent = () => {};
    const scripts = [...html.matchAll(/<script (?:src|type="text\/plain" data-ipo-script)="([^"]+)"/g)].map(m => m[1]).filter(f => f !== 'nav.js' && f !== 'repasos-semanales.js' && !f.startsWith('cuenta-') && f !== 'cuenta.js');
    scripts.forEach(file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context));
    if (!scripts.includes('preguntas-globales.js')) vm.runInContext(fs.readFileSync(path.join(root, 'preguntas-globales.js'), 'utf8'), context);
    vm.runInContext(fs.readFileSync(path.join(root, 'repasos-semanales.js'), 'utf8'), context);
    const initial = vm.runInContext('session.ids[0]', context);
    vm.runInContext('nextRandomQuestion()', context);
    assert.equal(vm.runInContext('session.ids[session.index]', context), initial, page);
    const length = vm.runInContext('session.ids.length', context);
    for (let i = 0; i < length; i++) {
      vm.runInContext('handleAnswer(currentQuestion.opciones.findIndex(o => o.correcta))', context);
      if (i < length - 1) vm.runInContext('nextRandomQuestion()', context);
    }
    assert.equal(vm.runInContext('session.completed', context), true, page);
    vm.runInContext('openSession()', context);
    assert.equal(vm.runInContext('countCorrect', context), length, page);
    vm.runInContext('openSession(true)', context);
    const ids = vm.runInContext('session.ids', context);
    assert.ok(!ids.includes(initial), page);
  }
});
