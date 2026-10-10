'use strict';
/* Shared progress: stable question identities across topic and global banks. */
window.IPOStudy = (() => {
  const KEY = 'ipo_tests_v1';
  let storageOK = true;
  let data;
  try {
    data = JSON.parse((window.IPOStorage || localStorage).getItem(KEY) || 'null');
  } catch (_) { storageOK = false; }
  if (!data || data.version !== 1 || !data.answers || !data.sessions || !data.weeks) {
    data = { version: 1, answers: {}, sessions: {}, weeks: {} };
  }
  data.history ||= [];
  const identity = q => JSON.stringify([String(q.tema), q.enunciado]);
  const week = (d = new Date()) => {
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
    return fechaISO(monday);
  };
  const save = () => {
    try { (window.IPOStorage || localStorage).setItem(KEY, JSON.stringify(data)); storageOK = true; }
    catch (_) { storageOK = false; }
  };
  const eligible = (pool, failed = false) => pool.filter(q => {
    const result = data.answers[identity(q)];
    return failed ? result?.correct === false : !result || !result.correct;
  });
  const shuffle = list => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  function session(key, pool, failed = false, fresh = false) {
    if (!fresh && data.sessions[key]) {
      const existing = data.sessions[key];
      // Another topic/global test may have mastered a queued question since it was saved.
      if (!existing.completed) {
        for (let i = existing.ids.length - 1; i >= existing.responses.length; i--) {
          if (data.answers[existing.ids[i]]?.correct) {
            existing.ids.splice(i, 1);
            existing.orders.splice(i, 1);
          }
        }
        if (existing.responses.length && existing.responses.length === existing.ids.length) existing.completed = true;
        existing.index = Math.min(existing.index, Math.max(0, existing.ids.length - 1));
        save();
      }
      return existing;
    }
    const questions = shuffle(eligible(pool, failed)).slice(0, 40);
    const s = { week: week(), ids: questions.map(identity), index: 0,
      orders: questions.map(q => shuffle(q.opciones.map((_, i) => i))), responses: [], completed: false };
    data.sessions[key] = s;
    save();
    return s;
  }
  function answer(s, q, option) {
    if (s.completed || s.responses[s.index] !== undefined || !q.opciones[option]) return;
    s.responses[s.index] = option;
    const correct = Boolean(q.opciones[option].correcta);
    data.answers[identity(q)] = { correct, at: Date.now(), tema: String(q.tema) };
    const weekly = data.weeks[week()] ||= {};
    const record = weekly[q.tema] ||= { answered: 0, correct: 0, tests: 0 };
    record.answered++;
    if (correct) record.correct++;
    if (s.responses.length === s.ids.length && s.responses.every(x => Number.isInteger(x))) {
      s.completed = true;
      [...new Set(s.ids.map(id => JSON.parse(id)[0]))].forEach(t => {
        if (weekly[t]) weekly[t].tests++;
      });
      data.history ||= [];
      if (!s.savedToHistory) {
        s.savedToHistory = true;
        const correctCount = s.ids.filter(id => data.answers[id]?.correct).length;
        data.history.unshift({
          id: 'test_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
          fecha: fechaISO(new Date()),
          timestamp: Date.now(),
          week: week(),
          total: s.ids.length,
          aciertos: correctCount,
          fallos: s.ids.length - correctCount,
          nota: Number(((correctCount / (s.ids.length || 1)) * 10).toFixed(1)),
          completado: true,
          ids: [...s.ids],
          responses: [...s.responses]
        });
      }
      // Finish due reminders only for themes actually covered by this test.
      try {
        const reminders = JSON.parse((window.IPOStorage || localStorage).getItem('ipo_recordatorios_v1') || 'null');
        if (reminders && Array.isArray(reminders.repasos)) {
          const themes = new Set(s.ids.map(id => JSON.parse(id)[0]));
          reminders.repasos.forEach(r => {
            if (themes.has(String(r.tema)) && r.fecha <= fechaISO(new Date())) r.hecho = true;
          });
          (window.IPOStorage || localStorage).setItem('ipo_recordatorios_v1', JSON.stringify(reminders));
        }
      } catch (_) { /* Keep quiz usable without reminder storage. */ }
    }
    save();
    window.dispatchEvent(new Event('ipo-progress'));
  }
  function saveCurrentTest(s) {
    if (!s) return null;
    data.history ||= [];
    const correctCount = s.responses.filter((r, i) => {
      const id = s.ids[i];
      return data.answers[id]?.correct;
    }).length;
    const item = {
      id: 'test_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      fecha: fechaISO(new Date()),
      timestamp: Date.now(),
      week: week(),
      total: s.ids.length,
      contestadas: s.responses.length,
      aciertos: correctCount,
      fallos: s.responses.length - correctCount,
      nota: Number(((correctCount / (s.responses.length || 1)) * 10).toFixed(1)),
      completado: Boolean(s.completed),
      ids: [...s.ids],
      responses: [...s.responses]
    };
    data.history.unshift(item);
    save();
    window.dispatchEvent(new Event('ipo-progress'));
    return item;
  }
  return { data, identity, week, eligible, session, answer, save, saveCurrentTest, get storageOK() { return storageOK; } };
})();
