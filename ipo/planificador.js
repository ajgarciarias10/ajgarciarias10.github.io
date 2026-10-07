'use strict';
(() => {
  const plan = IPOPlan.state;
  const value = (id, v) => { $(id).value = v; };
  value('plan-cantidad', plan.cantidad); value('plan-separacion', plan.separacion);
  value('plan-hora', plan.hora); value('plan-minutos', plan.minutos);
  value('plan-inicio', plan.inicioExamen); value('plan-examen', plan.examen);
  document.querySelectorAll('[name="plan-dia"]').forEach(el => { el.checked = plan.diasExamen.includes(Number(el.value)); });
  $('extra-tema').innerHTML = Object.entries(TEMAS_CURSO).map(([t, info]) => `<option value="${t}">${t} · ${esc(info.titulo)}</option>`).join('');
  function update(message) {
    IPOPlan.save(); render();
    $('plan-aviso').textContent = IPOPlan.storageOK ? message : 'No se ha podido guardar el plan en este navegador. Los cambios solo estarán disponibles mientras esta página siga abierta.';
  }
  $('plan-ajustes').onsubmit = e => {
    e.preventDefault();
    const inicio = $('plan-inicio').value, examen = $('plan-examen').value;
    const dias = [...document.querySelectorAll('[name="plan-dia"]:checked')].map(el => Number(el.value));
    if ((inicio || examen) && (!inicio || !examen || inicio >= examen || !dias.length)) {
      $('plan-aviso').textContent = 'Para planificar exámenes, indica ambas fechas, un inicio anterior al examen y al menos un día de estudio.'; return;
    }
    Object.assign(plan, { cantidad: Number($('plan-cantidad').value), separacion: Number($('plan-separacion').value),
      hora: $('plan-hora').value, minutos: Number($('plan-minutos').value), inicioExamen: inicio, examen, diasExamen: dias });
    update('Plan actualizado. Las sesiones completadas y tus cambios individuales se conservan.');
  };
  $('plan-viaje').onsubmit = e => {
    e.preventDefault();
    const desde = $('viaje-desde').value, hasta = $('viaje-hasta').value;
    if (desde > hasta) { $('plan-aviso').textContent = 'El fin del viaje debe ser igual o posterior al inicio.'; return; }
    plan.viajes.push({ desde, hasta }); update('Disponibilidad actualizada y sesiones redistribuidas.');
  };
  $('plan-extra').onsubmit = e => {
    e.preventDefault();
    const fecha = $('extra-fecha').value;
    if (plan.examen && fecha >= plan.examen) { $('plan-aviso').textContent = 'La sesión debe ser anterior al examen.'; return; }
    plan.extras.push({ id: `extra-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, fecha,
      hora: $('extra-hora').value, minutos: plan.minutos, tipo: $('extra-tipo').value,
      tema: $('extra-tipo').value === 'simulacro' ? 'all' : Number($('extra-tema').value), titulo: 'Sesión personalizada' });
    semana = Math.max(1, Math.floor((desdeISO(fecha) - CURSO_INICIO) / (7 * DIA_MS)) + 1);
    update('Sesión añadida. Puedes ajustar su fecha en la línea temporal.');
  };
  window.renderPlan = () => {
    const sessions = IPOPlan.generate({ grupo: EST.grupo, sub: EST.sub, bloques: EST.bloques });
    const start = fechaISO(lunesDeSemana(semana)), end = fechaISO(diaDeSemana(semana, 7));
    const weekly = sessions.filter(s => s.fecha >= start && s.fecha <= end);
    const missing = sessions.filter(s => s.pendiente && !s.hecha).length;
    $('plan-resumen').textContent = `${weekly.filter(s => !s.pendiente).length} sesiones esta semana · ${weekly.filter(s => s.hecha).length} completadas. ${missing ? `${missing} sesiones sin hueco antes del examen: mueve sesiones, acorta los viajes o revisa el plan.` : ''}`;
    $('plan-viajes').innerHTML = plan.viajes.map((v, i) => `<li>${esc(v.desde)} → ${esc(v.hasta)} <button type="button" class="ghost small" data-viaje="${i}">Quitar</button></li>`).join('');
    $('plan-viajes').querySelectorAll('[data-viaje]').forEach(b => { b.onclick = () => { plan.viajes.splice(Number(b.dataset.viaje), 1); update('Días liberados y sesiones redistribuidas.'); }; });
    const entries = eventosSemana(semana).filter(e => e.tipo !== 'libre').map(e => ({ fecha: e.iso, hora: e.ini, clase: e }))
      .concat(weekly).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
    $('plan-timeline').innerHTML = entries.length ? entries.map(s => {
      if (s.clase) return `<li class="plan-entry clase"><time>${esc(s.fecha)} · ${s.hora}</time><strong>${esc(s.clase.titulo)}</strong><span class="muted">${esc(s.clase.detalle)}</span></li>`;
      const info = TEMAS_CURSO[s.tema];
      const pool = typeof BANCO_GLOBAL !== 'undefined' ? BANCO_GLOBAL.filter(q => s.tema === 'all' || String(q.tema) === String(s.tema)) : [];
      const available = window.IPOStudy ? IPOStudy.eligible(pool).length : pool.length;
      const test = s.tipo !== 'teoria' && pool.length;
      const href = test ? `generador.html?tema=${s.tema}` : 'guia-estudio.html';
      const label = s.tipo === 'teoria' ? 'Recordar sin apuntes, contrastar con la teoría y explicar un ejemplo.' : pool.length ? `Test de hasta ${Math.min(40, available)} preguntas disponibles y revisión de errores.` : 'Sin banco de este tema: repasa la guía y explica los conceptos con ejemplos.';
      return `<li class="plan-entry ${s.hecha ? 'done' : ''}" data-session="${esc(s.id)}">
        <time>${esc(s.fecha)} · ${s.hora} · ${s.minutos} min</time>
        <strong>${esc(s.titulo)} · ${info ? `Tema ${s.tema}` : 'Todos los temas'}</strong>
        <span>${esc(label)}</span>${s.origen ? `<small class="muted">Clase del ${s.origen}</small>` : ''}
        ${s.reubicada ? '<span class="badge">Reubicada por disponibilidad</span>' : ''}${s.pendiente ? '<span class="badge">Sin hueco antes del examen</span>' : ''}
        <div class="actions"><a class="button secondary small" href="${href}">${test ? 'Abrir test' : 'Abrir guía'}</a>
        <button type="button" class="ghost small" data-done>${s.hecha ? 'Marcar pendiente' : 'Marcar completada'}</button><button type="button" class="ghost small" data-delete>Quitar sesión</button></div>
        <form class="plan-move"><label>Mover a <input type="date" name="fecha" value="${s.fecha}" min="${s.origen ? IPOPlan.add(s.origen, 1) : '2026-09-07'}" max="${plan.examen ? IPOPlan.add(plan.examen, -1) : '2027-07-30'}" required></label><label>Hora <input type="time" name="hora" value="${s.hora}" min="08:00" max="20:00" required></label><button type="submit" class="secondary small">Mover</button></form>
      </li>`;
    }).join('') : '<li class="muted">No hay sesiones esta semana. Añade una sesión puntual o ajusta tu plan.</li>';
    $('plan-timeline').querySelectorAll('[data-session]').forEach(el => {
      const s = sessions.find(s => s.id === el.dataset.session);
      const edit = patch => { plan.cambios[s.id] = Object.assign({}, plan.cambios[s.id], patch); update('Sesión actualizada.'); };
      el.querySelector('[data-done]').onclick = () => edit({ hecha: !s.hecha, fecha: s.fecha, hora: s.hora });
      el.querySelector('[data-delete]').onclick = () => edit({ eliminada: true });
      el.querySelector('form').onsubmit = e => { e.preventDefault(); edit({ fecha: e.target.elements.fecha.value, hora: e.target.elements.hora.value }); };
    });
  };
  render();
  window.addEventListener('ipo-progress', () => renderPlan());
})();
