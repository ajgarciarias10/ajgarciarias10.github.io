const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');

test('completed tests and manual saves are recorded in persistent history', () => {
  const store = new Map();
  const context = vm.createContext({
    Date, Math, JSON, Set, Event,
    localStorage: {
      getItem: k => store.get(k) || null,
      setItem: (k, v) => store.set(k, v)
    },
    window: { dispatchEvent() {} }
  });
  context.window.localStorage = context.localStorage;

  for (const file of ['curso.js', 'progreso.js', 'preguntas-globales.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }

  const app = context.window.IPOStudy;
  const pool = vm.runInContext('BANCO_GLOBAL', context);

  // Take a 2-question test
  const s = app.session('test_history', pool.slice(0, 2));
  assert.equal(app.data.history.length, 0);

  // Answer question 1
  const q1 = pool.find(q => app.identity(q) === s.ids[0]);
  app.answer(s, q1, q1.opciones.findIndex(o => o.correcta));
  assert.equal(s.completed, false);

  // Manual save during test
  const manual = app.saveCurrentTest(s);
  assert.equal(manual.contestadas, 1);
  assert.equal(manual.aciertos, 1);
  assert.equal(app.data.history.length, 1);

  // Complete the test
  s.index = 1;
  const q2 = pool.find(q => app.identity(q) === s.ids[1]);
  app.answer(s, q2, q2.opciones.findIndex(o => !o.correcta));
  assert.equal(s.completed, true);

  // Test is recorded in history and saved in storage
  assert.ok(app.data.history.length >= 2);
  const completedRecord = app.data.history.find(h => h.completado);
  assert.ok(completedRecord);
  assert.equal(completedRecord.total, 2);
  assert.equal(completedRecord.aciertos, 1);
  assert.equal(completedRecord.fallos, 1);
  assert.equal(completedRecord.nota, 5);

  // Restoring from storage keeps performed tests history
  const restoredData = JSON.parse(store.get('ipo_tests_v1'));
  assert.ok(Array.isArray(restoredData.history));
  assert.ok(restoredData.history.length > 0);
});

test('IPO_CUENTA_CONFIG allows dynamic client ID and permitted personal/institutional domains', () => {
  const store = new Map();
  const context = vm.createContext({
    localStorage: {
      getItem: k => store.get(k) || null,
      setItem: (k, v) => store.set(k, v),
      removeItem: k => store.delete(k)
    },
    window: {}
  });
  context.window.localStorage = context.localStorage;

  vm.runInContext(fs.readFileSync(path.join(root, 'cuenta-config.js'), 'utf8'), context);
  const cfg = context.window.IPO_CUENTA_CONFIG;

  assert.equal(cfg.googleClientId, '');
  cfg.googleClientId = 'test-client-id.apps.googleusercontent.com';
  assert.equal(cfg.googleClientId, 'test-client-id.apps.googleusercontent.com');
  assert.equal(store.get('ipo_google_client_id'), 'test-client-id.apps.googleusercontent.com');

  assert.ok(cfg.allowedDomains.includes('red.ujaen.es'));
  assert.ok(cfg.allowedDomains.includes('ujaen.es'));
  assert.ok(cfg.allowedDomains.includes('gmail.com'));
});
