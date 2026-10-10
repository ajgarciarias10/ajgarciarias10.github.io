'use strict';
(() => {
  const panel = document.createElement('section');
  panel.className = 'card weekly-reviews';
  panel.setAttribute('aria-label', 'Repaso semanal por tema');
  const bank = BANCO_GLOBAL;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render() {
    const thisWeek = IPOStudy.week();
    const records = IPOStudy.data.weeks[thisWeek] || {};
    let due = [];
    try { due = JSON.parse((window.IPOStorage || localStorage).getItem('ipo_recordatorios_v1') || '{}').repasos || []; } catch (_) {}
    const themes = Object.keys(TEMAS_CURSO).filter(t => Number(t) <= temaProfesor());
    panel.innerHTML = `<h2>Tu repaso semanal</h2><p class="muted">Semana del ${escape(thisWeek)} · Un test por tema visto en clase. Cada respuesta y sesión se guardan; el panel de cuenta indica si están sincronizadas con tu Drive.</p>` +
      '<div class="weekly-review-grid">' + themes.map(t => {
        const pool = bank.filter(q => String(q.tema) === t);
        const available = IPOStudy.eligible(pool).length;
        const failed = IPOStudy.eligible(pool, true).length;
        const stats = records[t] || { answered: 0, correct: 0, tests: 0 };
        const sessions = Object.entries(IPOStudy.data.sessions).filter(([key, s]) => !s.completed && s.ids.length && s.ids.every(id => JSON.parse(id)[0] === t));
        const activeEntry = sessions[0];
        const active = activeEntry?.[1];
        const activeFilter = activeEntry ? JSON.parse(activeEntry[0]) : null;
        const base = activeFilter?.[0] === 'global' ? `generador.html?tema=${activeFilter[1]}` : TEMAS_CURSO[t].pagina || `generador.html?tema=${t}`;
        const params = new URLSearchParams(base.split('?')[1] || '');
        if (activeFilter && activeFilter[2] !== 'all') params.set('apartado', activeFilter[2]);
        if (activeFilter?.[3]) params.set('fallos', '1');
        const href = base.split('?')[0] + (params.size ? `?${params}` : '');
        const pending = due.some(r => !r.hecho && String(r.tema) === t && r.fecha <= fechaISO(new Date()));
        const state = !pool.length ? 'Sin banco de preguntas' : active ? `En curso: ${active.responses.length}/${active.ids.length}`
          : pending ? 'Repaso programado pendiente' : stats.tests ? 'Repaso semanal completado'
          : available ? 'Repaso semanal pendiente' : 'Todas las preguntas acertadas';
        return `<article><h3>Tema ${t} · ${escape(TEMAS_CURSO[t].titulo)}</h3><p>${state}</p>
          <p class="muted">Esta semana: ${stats.answered} respuestas · ${stats.correct} aciertos · ${stats.tests} tests terminados.<br>${available} preguntas disponibles · ${failed} errores pendientes.</p>
          ${pool.length && (available || active) ? `<a class="button" href="${href}">${active ? 'Continuar test' : 'Hacer test de 40 preguntas'}</a>` : !pool.length ? '<a href="guia-estudio.html">Repasar con la guía</a>' : ''}</article>`;
      }).join('') + '</div>';
    const weeks = Object.entries(IPOStudy.data.weeks).sort(([a], [b]) => b.localeCompare(a));
    if (weeks.length) {
      panel.innerHTML += '<details><summary>Progresión por semana</summary><div class="weekly-table"><table><thead><tr><th>Semana</th><th>Tema</th><th>Respuestas</th><th>Aciertos</th><th>Tests</th></tr></thead><tbody>' +
        weeks.flatMap(([w, themes]) => Object.entries(themes).map(([t, s]) => `<tr><td>${escape(w)}</td><td>${escape(t)}</td><td>${s.answered}</td><td>${s.correct}</td><td>${s.tests}</td></tr>`)).join('') + '</tbody></table></div></details>';
    }
    const history = IPOStudy.data.history || [];
    if (history.length) {
      panel.innerHTML += '<details style="margin-top:10px;"><summary>Historial de tests realizados (' + history.length + ')</summary><div class="weekly-table"><table><thead><tr><th>Fecha</th><th>Aciertos / Total</th><th>Nota</th><th>Estado</th></tr></thead><tbody>' +
        history.slice(0, 20).map(h => `<tr><td>${escape(h.fecha || '')}</td><td>${h.aciertos || 0}/${h.total || 0} (${Math.round(((h.aciertos || 0) / (h.total || 1)) * 100)}%)</td><td>${h.nota !== undefined ? h.nota + '/10' : '-'}</td><td>${h.completado ? 'Completado' : 'Guardado'}</td></tr>`).join('') +
        '</tbody></table></div></details>';
    }
  }
  document.querySelector('main > header').after(panel);
  render();
  window.addEventListener('pageshow', render);
  window.addEventListener('ipo-progress', render);
})();
