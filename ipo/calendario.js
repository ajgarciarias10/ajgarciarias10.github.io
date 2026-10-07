'use strict';
/* ============================================================================
   IPO · Calendario semanal
   Clases oficiales (curso.js · IPO2627.pdf p. 15) según tu grupo de teoría y
   subgrupo de prácticas, tus bloques de estudio y exportación .ics del curso.
   ========================================================================== */

const $ = id => document.getElementById(id);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CAL_KEY = 'ipo_calendario_v2';
const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DIAS_LARGOS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const H_INI = 8, H_FIN = 21, FILA = 44;

/* Horario oficial EPS Jaén 2026–27 */
const TEORIA = {
  A: { profe: 'Manuel García Vega', mie: ['11:30', '12:30'], jue: ['10:30', '11:30'] },
  B: { profe: 'Salud Mª Jiménez Zafra', mie: ['16:30', '17:30'], jue: ['15:30', '16:30'] }
};
const PRACTICAS = { 1: ['08:30', '10:30'], 2: ['10:30', '12:30'], 3: ['12:30', '14:30'], 4: ['15:30', '17:30'] };

const BLOQUES_INICIALES = [
  { dia: 5, hora: '18:00', dur: 1.5, titulo: 'Repaso tras la clase' },
  { dia: 6, hora: '11:00', dur: 1.5, titulo: 'Practicar con el generador' },
  { dia: 7, hora: '11:00', dur: 1, titulo: 'Demostrar competencias' }
];

/* ---------- Estado ---------- */

function cargar() {
  let e = {};
  try { e = JSON.parse((window.IPOStorage || localStorage).getItem(CAL_KEY) || '{}'); } catch (err) { e = {}; }
  if (!e.grupo) {
    // Hereda grupo y subgrupo del calendario anterior si existían
    try {
      const viejo = JSON.parse((window.IPOStorage || localStorage).getItem('ipo_cal_sync_v1') || '{}');
      if (viejo.grupo) e.grupo = viejo.grupo;
      if (viejo.sub) e.sub = viejo.sub;
    } catch (err) { /* nada */ }
  }
  return {
    grupo: e.grupo === 'B' ? 'B' : 'A',
    sub: [1, 2, 3, 4].includes(Number(e.sub)) ? Number(e.sub) : (e.grupo === 'B' ? 3 : 1),
    bloques: Array.isArray(e.bloques) ? e.bloques : BLOQUES_INICIALES.map(b => ({ ...b }))
  };
}

let EST = cargar();
function maxSemana() {
  const fin = IPOPlan.state.examen || '2027-01-31';
  return Math.max(15, Math.ceil((desdeISO(fin) - CURSO_INICIO + DIA_MS) / (7 * DIA_MS)));
}
function semanaActual() {
  return Math.max(1, Math.min(maxSemana(), Math.floor((hoySinHora() - CURSO_INICIO) / (7 * DIA_MS)) + 1));
}
let semana = semanaActual();
function bloquesSemana(sem) {
  return EST.bloques.map((b, i) => ({ b, i })).filter(({ b }) => {
    const iso = fechaISO(diaDeSemana(sem, b.dia));
    return (!IPOPlan.state.examen || iso < IPOPlan.state.examen) && !IPOPlan.state.viajes.some(v => iso >= v.desde && iso <= v.hasta);
  });
}

function guardar() {
  try { (window.IPOStorage || localStorage).setItem(CAL_KEY, JSON.stringify(EST)); } catch (err) { /* sin almacenamiento */ }
}

/* ---------- Utilidades de fecha ---------- */

const diaDeSemana = (sem, dia) => new Date(lunesDeSemana(sem).getTime() + (dia - 1) * DIA_MS);
const aMin = hm => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
const horas = (a, b) => (aMin(b) - aMin(a)) / 60;
const sumarHoras = (hm, h) => { const t = aMin(hm) + Math.round(h * 60); return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };
const fmtDur = h => (h < 1 ? `${Math.round(h * 60)} min` : h % 1 ? `${Math.floor(h)} h ${Math.round((h % 1) * 60)} min` : `${h} h`);
const FECHA_DM = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' });

/* Eventos oficiales de una semana para el grupo elegido. */
function eventosSemana(sem) {
  const ev = [];
  for (let dia = 1; dia <= 7; dia++) {
    const iso = fechaISO(diaDeSemana(sem, dia));
    const libre = DIAS_SIN_CLASE[iso];
    const teoria = SESIONES_TEORIA.find(c => c.fecha === iso);
    if (teoria) {
      const [ini, fin] = dia === 3 ? TEORIA[EST.grupo].mie : TEORIA[EST.grupo].jue;
      ev.push({
        tipo: 'teoria', dia, ini, fin, iso,
        titulo: teoria.tema ? `Tema ${teoria.tema} · ${teoria.leccion}` : teoria.contenido,
        detalle: teoria.tema ? teoria.contenido : 'Teoría',
        lugar: 'A4-36', tema: teoria.tema
      });
    }
    const pract = SESIONES_PRACTICAS.find(c => c.fecha === iso);
    if (pract) {
      const [ini, fin] = PRACTICAS[EST.sub];
      const [nombre, ...resto] = pract.contenido.split(' · ');
      ev.push({ tipo: 'practica', dia, ini, fin, iso, titulo: nombre, detalle: resto.join(' · ') || 'Laboratorio', lugar: `A3-170 · G${EST.sub}` });
    }
    if (libre) ev.push({ tipo: 'libre', dia, iso, titulo: libre });
  }
  return ev;
}

/* El primer repaso conviene entre 24 y 48 h después de la última clase de teoría de la semana. */
function enVentana(bloque, sem) {
  const clases = eventosSemana(sem).filter(e => e.tipo === 'teoria');
  if (!clases.length) return false;
  const ult = clases[clases.length - 1];
  const dif = ((bloque.dia - 1) * 24 + aMin(bloque.hora) / 60) - ((ult.dia - 1) * 24 + aMin(ult.fin) / 60);
  return dif >= 24 && dif <= 48;
}

/* ---------- Render ---------- */

function renderCabecera() {
  const lunes = lunesDeSemana(semana);
  const domingo = new Date(lunes.getTime() + 6 * DIA_MS);
  const actual = semana === semanaActual();
  $('cal-semana').innerHTML = `Semana ${semana}<span>${esc(FECHA_DM.format(lunes))} – ${esc(FECHA_DM.format(domingo))}${actual ? ' · esta semana' : ''}</span>`;
  $('cal-prev').disabled = semana <= 1;
  $('cal-next').disabled = semana >= maxSemana();
  $('cal-hoy').hidden = actual;

  document.querySelectorAll('[data-grupo]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.grupo === EST.grupo)));
  document.querySelectorAll('[data-sub]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.sub) === EST.sub)));
  const t = TEORIA[EST.grupo];
  $('cal-grupo-info').textContent = `Teoría con ${t.profe}: miércoles ${t.mie.join('–')} y jueves ${t.jue.join('–')} (A4-36). Prácticas G${EST.sub}: martes ${PRACTICAS[EST.sub].join('–')} (A3-170).`;
}

function renderResumen() {
  const ev = eventosSemana(semana);
  const hoy = fechaISO(new Date());
  const items = ev.slice().sort((a, b) => a.dia - b.dia || (a.ini ? aMin(a.ini) : 0) - (b.ini ? aMin(b.ini) : 0));

  $('cal-clases').innerHTML = items.length ? items.map(e => {
    const dia = `${DIAS_CORTOS[e.dia - 1]} ${diaDeSemana(semana, e.dia).getDate()}`;
    if (e.tipo === 'libre') {
      return `<li class="agenda-item is-free"><span class="agenda-when"><strong>${dia}</strong>Festivo</span><span class="agenda-dot libre"></span><span class="agenda-what"><strong>Sin clase</strong>${esc(e.titulo)}</span></li>`;
    }
    return `<li class="agenda-item ${e.iso < hoy ? 'is-past' : ''} ${e.iso === hoy ? 'is-today' : ''}">
      <span class="agenda-when"><strong>${dia}</strong>${e.ini}–${e.fin}</span>
      <span class="agenda-dot ${e.tipo}"></span>
      <span class="agenda-what"><strong>${esc(e.titulo)}</strong>${esc(e.detalle)} · ${esc(e.lugar)}</span>
    </li>`;
  }).join('') : '<li class="muted">No hay clases esta semana.</li>';

  // Qué estudiar: temas que se dan esta semana
  const temas = [...new Set(ev.filter(e => e.tema).map(e => e.tema))];
  const comp = leerCompetencias();
  $('cal-estudiar').innerHTML = temas.length
    ? temas.map(t => {
      const info = TEMAS_CURSO[t];
      const hechas = Object.keys(comp[t] || {}).length;
      return `<li class="study-item">
        <div><strong>Tema ${t} · ${esc(info.titulo)}</strong><span>pp. ${info.paginas} · estudiado antes del ${esc(FECHA_CORTA.format(objetivoDeTema(t)))}</span></div>
        ${info.pagina ? `<span class="badge ${hechas >= 5 ? 'ok' : ''}">${hechas}/5 competencias</span>` : '<span class="badge">Sin banco aún</span>'}
      </li>`;
    }).join('') +
      `<li class="study-actions"><a class="button" href="ponte-al-dia.html">Demostrar competencias</a>${temas.filter(t => TEMAS_CURSO[t].pagina).map(t => `<a class="button secondary" href="${TEMAS_CURSO[t].pagina}">Practicar Tema ${t}</a>`).join('')}</li>`
    : '<li class="muted">Esta semana no hay teoría nueva: aprovecha para repasar en <a href="ponte-al-dia.html">Ponte al día</a>.</li>';
}

function renderRejilla() {
  const ev = eventosSemana(semana);
  const hoy = fechaISO(new Date());
  const top = hm => (aMin(hm) / 60 - H_INI) * FILA;
  const alto = h => Math.max(30, h * FILA - 4);

  let html = '<div class="wk-corner"></div>';
  for (let d = 1; d <= 7; d++) {
    const f = diaDeSemana(semana, d);
    const libre = ev.find(e => e.tipo === 'libre' && e.dia === d);
    html += `<div class="wk-day ${fechaISO(f) === hoy ? 'is-today' : ''}"><span>${DIAS_CORTOS[d - 1]}</span><strong>${f.getDate()}</strong>${libre ? `<em>${esc(libre.titulo)}</em>` : ''}</div>`;
  }
  html += '<div class="wk-hours">' + Array.from({ length: H_FIN - H_INI }, (_, i) => `<span>${H_INI + i}:00</span>`).join('') + '</div>';
  for (let d = 1; d <= 7; d++) {
    const f = diaDeSemana(semana, d);
    const oficiales = ev.filter(e => e.dia === d && e.tipo !== 'libre').map(e =>
      `<div class="wk-ev ${e.tipo}" style="top:${top(e.ini)}px;height:${alto(horas(e.ini, e.fin))}px" title="${esc(e.titulo + ' · ' + e.detalle)}">
        <strong>${esc(e.titulo)}</strong><span>${e.ini}–${e.fin} · ${esc(e.lugar)}</span></div>`).join('');
    const bloques = bloquesSemana(semana).filter(x => x.b.dia === d).map(({ b, i }) =>
      `<button type="button" class="wk-ev estudio" style="top:${top(b.hora)}px;height:${alto(b.dur)}px" data-bloque="${i}" title="Editar bloque">
        <strong>${esc(b.titulo)}</strong><span>${b.hora}–${sumarHoras(b.hora, b.dur)}</span></button>`).join('');
    const planificados = IPOPlan.generate({ grupo: EST.grupo, sub: EST.sub, bloques: EST.bloques }).filter(s => s.fecha === fechaISO(f) && !s.pendiente).map(s =>
      `<div class="wk-ev estudio" style="top:${top(s.hora)}px;height:${alto(s.minutos / 60)}px" title="${esc(s.titulo)}"><strong>${esc(s.titulo)}</strong><span>${s.hora} · ${s.minutos} min</span></div>`).join('');
    const libre = ev.some(e => e.tipo === 'libre' && e.dia === d);
    html += `<div class="wk-col ${fechaISO(f) === hoy ? 'is-today' : ''} ${libre ? 'is-free' : ''}">${oficiales}${bloques}${planificados}</div>`;
  }
  const grid = $('cal-grid');
  grid.innerHTML = html;
  grid.style.setProperty('--wk-alto', `${(H_FIN - H_INI) * FILA}px`);
  grid.style.setProperty('--wk-fila', `${FILA}px`);

  grid.querySelectorAll('[data-bloque]').forEach(el => {
    el.onclick = () => {
      const fila = document.querySelector(`[data-fila="${el.dataset.bloque}"]`);
      if (!fila) return;
      fila.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fila.querySelector('input').focus({ preventScroll: true });
    };
  });
}

function renderBloques() {
  const opcionesDia = sel => DIAS_LARGOS.map((n, i) => `<option value="${i + 1}" ${sel === i + 1 ? 'selected' : ''}>${n}</option>`).join('');
  const opcionesDur = sel => [0.5, 1, 1.5, 2, 2.5, 3].map(h => `<option value="${h}" ${sel === h ? 'selected' : ''}>${fmtDur(h)}</option>`).join('');

  $('cal-bloques').innerHTML = EST.bloques.length ? EST.bloques.map((b, i) => `
    <li class="block-row" data-fila="${i}">
      <input type="text" value="${esc(b.titulo)}" data-campo="titulo" aria-label="Nombre del bloque">
      <select data-campo="dia" aria-label="Día">${opcionesDia(b.dia)}</select>
      <input type="time" value="${b.hora}" data-campo="hora" aria-label="Hora de inicio">
      <select data-campo="dur" aria-label="Duración">${opcionesDur(b.dur)}</select>
      <span class="block-flag">${enVentana(b, semana) ? '<span class="badge ok" title="Entre 24 y 48 h después de la última clase de teoría de la semana">24–48 h tras clase</span>' : ''}</span>
      <button type="button" class="icon-btn" data-quitar="${i}" aria-label="Quitar este bloque">×</button>
    </li>`).join('') : '<li class="muted">No tienes bloques de estudio. Añade uno.</li>';

  const total = EST.bloques.reduce((s, b) => s + b.dur, 0);
  $('cal-total').textContent = `${fmtDur(total)} de estudio a la semana`;

  $('cal-bloques').querySelectorAll('[data-campo]').forEach(inp => {
    inp.onchange = () => {
      const b = EST.bloques[Number(inp.closest('[data-fila]').dataset.fila)];
      const c = inp.dataset.campo;
      if (c === 'titulo') b.titulo = inp.value.trim() || 'Estudio';
      if (c === 'dia') b.dia = Number(inp.value);
      if (c === 'hora') b.hora = inp.value || '18:00';
      if (c === 'dur') b.dur = Number(inp.value);
      guardar();
      renderRejilla();
      renderBloques();
      if (window.renderPlan) window.renderPlan();
    };
  });
  $('cal-bloques').querySelectorAll('[data-quitar]').forEach(btn => {
    btn.onclick = () => {
      EST.bloques.splice(Number(btn.dataset.quitar), 1);
      guardar();
      renderRejilla();
      renderBloques();
      if (window.renderPlan) window.renderPlan();
    };
  });
}

function render() {
  semana = Math.min(semana, maxSemana());
  renderCabecera();
  renderResumen();
  renderRejilla();
  renderBloques();
  if (window.renderPlan) window.renderPlan();
}

/* ---------- Exportar .ics del curso completo ---------- */

function descargarICS() {
  const local = (iso, hm) => iso.replace(/-/g, '') + 'T' + hm.replace(':', '') + '00';
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const limpiar = t => String(t).replace(/[\\,;]/g, m => '\\' + m).replace(/\n/g, '\\n');
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IPO Study Lab//Calendario 2026-27//ES', 'CALSCALE:GREGORIAN',
    'X-WR-CALNAME:IPO 2026–27', 'X-WR-TIMEZONE:Europe/Madrid',
    'BEGIN:VTIMEZONE', 'TZID:Europe/Madrid',
    'BEGIN:DAYLIGHT', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0200', 'TZNAME:CEST', 'DTSTART:19700329T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
    'BEGIN:STANDARD', 'TZOFFSETFROM:+0200', 'TZOFFSETTO:+0100', 'TZNAME:CET', 'DTSTART:19701025T030000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD',
    'END:VTIMEZONE'];
  let n = 0;
  const evento = (iso, ini, fin, titulo, desc, lugar, rrule) => {
    L.push('BEGIN:VEVENT', `UID:ipo-${iso}-${ini.replace(':', '')}-${n++}@ipo-study-lab`, `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Europe/Madrid:${local(iso, ini)}`, `DTEND;TZID=Europe/Madrid:${local(iso, fin)}`,
      `SUMMARY:${limpiar(titulo)}`, `DESCRIPTION:${limpiar(desc)}`);
    if (lugar) L.push(`LOCATION:${limpiar(lugar)}`);
    if (rrule) L.push(rrule);
    L.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${limpiar(titulo)}`, 'TRIGGER:-PT15M', 'END:VALARM', 'END:VEVENT');
  };

  for (let s = 1; s <= 15; s++) {
    eventosSemana(s).filter(e => e.tipo !== 'libre').forEach(e => evento(e.iso, e.ini, e.fin, `IPO · ${e.titulo}: ${e.detalle}`, `${e.titulo} · ${e.detalle}`, `EPS Jaén · ${e.lugar}`));
  }
  // Exportar ocurrencias concretas: conservan viajes, movimientos y examen.
  for (let sem = 1; sem <= maxSemana(); sem++) {
    bloquesSemana(sem).forEach(({ b }) => {
      evento(fechaISO(diaDeSemana(sem, b.dia)), b.hora, sumarHoras(b.hora, b.dur), `Estudio IPO · ${b.titulo}`, 'Bloque semanal de estudio', '');
    });
  }
  IPOPlan.generate({ grupo: EST.grupo, sub: EST.sub, bloques: EST.bloques }).filter(s => !s.pendiente).forEach(s => {
    evento(s.fecha, s.hora, sumarHoras(s.hora, s.minutos / 60), `IPO · ${s.titulo}`, `Actividad: ${s.tipo} · Tema: ${s.tema}${s.hecha ? ' · Completada' : ''}`, '');
  });
  L.push('END:VCALENDAR');

  const blob = new Blob([L.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `IPO-2026-27-teoria-${EST.grupo}-practicas-G${EST.sub}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

/* ---------- Controles ---------- */

$('cal-prev').onclick = () => { semana = Math.max(1, semana - 1); render(); };
$('cal-next').onclick = () => { semana = Math.min(maxSemana(), semana + 1); render(); };
$('cal-hoy').onclick = () => { semana = semanaActual(); render(); };
document.querySelectorAll('[data-grupo]').forEach(b => { b.onclick = () => { EST.grupo = b.dataset.grupo; guardar(); render(); }; });
document.querySelectorAll('[data-sub]').forEach(b => { b.onclick = () => { EST.sub = Number(b.dataset.sub); guardar(); render(); }; });
$('cal-add').onclick = () => { EST.bloques.push({ dia: 6, hora: '17:00', dur: 1, titulo: 'Estudio' }); guardar(); render(); };
$('cal-reset').onclick = () => { EST.bloques = BLOQUES_INICIALES.map(b => ({ ...b })); guardar(); render(); };
$('cal-ics').onclick = descargarICS;
document.addEventListener('keydown', e => {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key === 'ArrowLeft' && semana > 1) { semana--; render(); }
  if (e.key === 'ArrowRight' && semana < maxSemana()) { semana++; render(); }
});

render();
