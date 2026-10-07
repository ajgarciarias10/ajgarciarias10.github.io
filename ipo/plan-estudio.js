'use strict';
/* Planificador determinista: las clases, los viajes y las ediciones producen
   los mismos identificadores, para conservar las sesiones completadas. */
window.IPOPlan = (() => {
  const key = 'ipo_plan_estudio_v1';
  const defaults = { cantidad: 2, separacion: 2, hora: '18:00', minutos: 45,
    examen: '', inicioExamen: '', diasExamen: [1, 3, 5], viajes: [], extras: [], cambios: {} };
  let state;
  try { state = JSON.parse((window.IPOStorage || localStorage).getItem(key) || 'null'); } catch (_) {}
  state = Object.assign({}, defaults, state || {});
  let storageOK = true;
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && fechaISO(desdeISO(value)) === value;
  const add = (iso, days) => { const d = desdeISO(iso); d.setDate(d.getDate() + days); return fechaISO(d); };
  const blocked = iso => state.viajes.some(v => iso >= v.desde && iso <= v.hasta);
  const save = () => {
    try { (window.IPOStorage || localStorage).setItem(key, JSON.stringify(state)); storageOK = true; }
    catch (_) { storageOK = false; }
    window.dispatchEvent(new Event('ipo-plan'));
  };
  function generate(context = {}) {
    const result = [];
    const occupied = [];
    const clock = hora => Number(hora.slice(0, 2)) * 60 + Number(hora.slice(3));
    const blockedByWeekly = (date, start, minutes) => (context.bloques || []).some(b =>
      b.dia === (desdeISO(date).getDay() || 7) && start < clock(b.hora) + b.dur * 60 && start + minutes > clock(b.hora));
    const end = state.examen || '2027-07-31';
    const push = original => {
      const change = state.cambios[original.id] || {};
      if (change.eliminada) return;
      const s = Object.assign({}, original, change);
      if (s.hecha) { result.push(s); return; }
      // Reubicar en el siguiente hueco libre, respetando clases y sesiones.
      let date = s.fecha;
      for (let attempts = 0; attempts < 366 && date < end; attempts++, date = add(date, 1)) {
        const start = Number(s.hora.slice(0, 2)) * 60 + Number(s.hora.slice(3));
        const overlaps = occupied.some(o => o.fecha === date && start < o.fin && start + s.minutos > o.ini);
        const day = desdeISO(date).getDay();
        const group = original.grupo || 'A';
        const timetable = { A: { 3: 690, 4: 630 }, B: { 3: 990, 4: 930 } };
        const classStart = timetable[group][day];
        const classConflict = SESIONES_TEORIA.some(c => c.fecha === date) && classStart !== undefined && start < classStart + 60 && start + s.minutos > classStart;
        const practical = SESIONES_PRACTICAS.some(c => c.fecha === date);
        const practiceStart = { 1: 510, 2: 630, 3: 750, 4: 930 }[original.sub || 1];
        if (blocked(date) || overlaps || blockedByWeekly(date, start, s.minutos) || classConflict || (practical && start < practiceStart + 120 && start + s.minutos > practiceStart)) continue;
        occupied.push({ fecha: date, ini: start, fin: start + s.minutos });
        result.push(Object.assign(s, { fecha: date, reubicada: date !== s.fecha }));
        return;
      }
      result.push(Object.assign(s, { pendiente: true }));
    };
    // Las citas puntuales tienen prioridad sobre las sugeridas.
    state.extras.forEach(s => push(Object.assign({}, context, s)));
    SESIONES_TEORIA.filter(c => c.tema && c.fecha < end).forEach(c => {
      for (let i = 0; i < state.cantidad; i++) push(Object.assign({}, context, {
        id: `clase-${c.fecha}-${i}`, fecha: add(c.fecha, 1 + i * state.separacion), hora: state.hora,
        minutos: state.minutos, tema: c.tema, tipo: i === 0 ? 'teoria' : 'test',
        titulo: i === 0 ? `Comprender · ${c.contenido}` : `Recuperar conceptos y practicar · ${c.leccion}`,
        origen: c.fecha
      }));
    });
    if (validDate(state.inicioExamen) && validDate(state.examen)) {
      let index = 0;
      for (let date = state.inicioExamen; date < state.examen; date = add(date, 1)) {
        if (!state.diasExamen.includes(desdeISO(date).getDay() || 7) || blocked(date)) continue;
        const tema = index % 10 + 1;
        push(Object.assign({}, context, { id: `examen-${date}`, fecha: date, hora: state.hora,
          minutos: state.minutos, tema: index % 3 === 2 ? 'all' : tema, tipo: index % 3 === 2 ? 'simulacro' : 'test',
          titulo: index % 3 === 2 ? 'Simulacro mixto y revisión de errores' : `Consolidar tema ${tema} · ${TEMAS_CURSO[tema].titulo}` }));
        index++;
      }
    }
    return result.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora) || a.id.localeCompare(b.id));
  }
  return { state, save, generate, validDate, add, get storageOK() { return storageOK; } };
})();
