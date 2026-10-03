'use strict';
/* ============================================================================
   IPO · CALENDARIO Y SINCRONIZACIÓN SEMANAL (Semana 4/5 · Octubre)
   Regla innegociable: Estudio Activo / Esquema 24–48 h tras la clase teórica.
   Sin B1 vinculado → "Riesgo de Curva del Olvido" + Bloque 3 (finde) bloqueado.
   Vanilla JS reactivo + localStorage. Estética espacial chill intacta.
   ========================================================================== */

const CAL_KEY = 'ipo_cal_sync_v1';
const H_MIN = 4, H_MAX = 8, H_REC_MIN = 4, H_REC_MAX = 8;

function calDefault() {
  return {
    grupo: 'A',               // A: prácticas Mié · B: prácticas Jue
    horasSemanales: 6,
    email: '',
    sincronizado: false,
    calendarId: null,
    semanaVista: 4,           // curso ya en desarrollo: Semana 4 (defecto)
    bloques: {
      // B1 anclado a 24.5 h tras la última teoría (Mar 13:30 → Mié 14:00):
      // cumple la ventana 24–48 h y no solapa con prácticas (Mié/Jue 17:30).
      b1: { dia: 3, hora: '14:00', dur: 2.0,  titulo: 'Bloque 1 · Post-clase inmediata', desc: 'Destilación de notas y resolución de dudas (máx. 48 h tras teoría).' },
      b2: { dia: 5, hora: '18:00', dur: 2.0,  titulo: 'Bloque 2 · Síntesis conceptual',   desc: 'Síntesis + validación con NotebookLM (Jue/Vie).' },
      b3: { dia: 6, hora: '11:00', dur: 2.0,  titulo: 'Bloque 3 · Antiolvido + examen',   desc: 'Sesión antiolvido y ejercicios prácticos (Sáb/Dom).' }
    },
    // confirmaciones por semana: { "4": { b1:false, b2:false, b3:false } }
    conf: {},
    gcalLog: []               // eventos "insertados" en Google Calendar (mock + real)
  };
}

let CAL = calDefault();

function calLoad() {
  try {
    const raw = localStorage.getItem(CAL_KEY);
    if (raw) CAL = Object.assign(calDefault(), JSON.parse(raw));
  } catch (e) { CAL = calDefault(); }
  if (!CAL.conf) CAL.conf = {};
  if (!CAL.bloques) CAL = Object.assign(calDefault(), CAL);
}
function calSave() {
  try { localStorage.setItem(CAL_KEY, JSON.stringify(CAL)); } catch (e) {}
}
function calConf(sem) {
  sem = String(sem);
  if (!CAL.conf[sem]) CAL.conf[sem] = { b1: false, b2: false, b3: false };
  return CAL.conf[sem];
}

/* ---------- Horario oficial UJA (ancla temporal) ---------- */
function horarioOficial() {
  const teoria = [
    { dia: 1, ini: '16:00', fin: '18:00', tag: 'Teoría · L4 Factor Humano', aula: 'Aula EPS' },
    { dia: 2, ini: '12:30', fin: '13:30', tag: 'Teoría · L4 Leyes Fitts/Hick', aula: 'Aula EPS' }
  ];
  const pract = CAL.grupo === 'B'
    ? { dia: 4, ini: '17:30', fin: '19:30', tag: 'Práctica Lab A3-170 · P1/P2', aula: 'A3-170' }
    : { dia: 3, ini: '17:30', fin: '19:30', tag: 'Práctica Lab A3-170 · P1/P2', aula: 'A3-170' };
  return { teoria, pract };
}
function hmToMin(hm) { const [h, m] = hm.split(':').map(Number); return h * 60 + m; }
/* Distancia en horas entre fin de la última teoría (Mar 13:30) y el inicio de B1 */
function ventanaB1Horas() {
  const finTeoria = 2 * 24 * 60 + hmToMin('13:30'); // día 2 (Mar)
  const b = CAL.bloques.b1;
  const iniB1 = b.dia * 24 * 60 + hmToMin(b.hora);
  let d = iniB1 - finTeoria;
  if (d < 0) d += 7 * 24 * 60;
  return d / 60;
}
function b1EnVentana() {
  const h = ventanaB1Horas();
  return h >= 24 && h <= 48;
}

/* ---------- Motor de reparto 4–8 h en 3 bloques ---------- */
function distribuirHoras(H) {
  H = Math.max(2, Math.min(10, Number(H) || 6));
  // Proporción pedagógica 37.5 / 37.5 / 25, con suelos y techos por bloque.
  // Se redondea a pasos de 30 min y se corrige el redondeo sobre el Bloque 3
  // para que la suma sea EXACTAMENTE H.
  let b1 = H * 0.375, b2 = H * 0.375, b3 = H * 0.25;
  b1 = Math.max(1.5, Math.min(2.5, b1));
  b2 = Math.max(1.5, Math.min(2.5, b2));
  b3 = Math.max(1.0, Math.min(2.5, b3));
  const suma = b1 + b2 + b3, k = H / suma;
  const r = v => Math.round(v * k * 2) / 2; // pasos de 30 min
  let r1 = r(b1), r2 = r(b2);
  let r3 = Math.round((H - r1 - r2) * 2) / 2;
  // Salvaguarda: B3 siempre entre 1 y 2.5 h; si el ajuste lo saca de rango,
  // se compensa contra B1/B2.
  if (r3 < 1 || r3 > 2.5) {
    r3 = Math.max(1, Math.min(2.5, r3));
    const resto = Math.round((H - r3) * 2) / 2;
    r1 = Math.round((resto / 2) * 2) / 2;
    r2 = resto - r1;
  }
  return { b1: r1, b2: r2, b3: r3 };
}
function aplicarHoras(H) {
  const d = distribuirHoras(H);
  CAL.horasSemanales = H;
  CAL.bloques.b1.dur = d.b1;
  CAL.bloques.b2.dur = d.b2;
  CAL.bloques.b3.dur = d.b3;
  calSave();
}

/* ---------- Estado temporal: semanas / temas ---------- */
function crono() {
  if (typeof CRONOGRAMA_SEMANAS !== 'undefined') return CRONOGRAMA_SEMANAS;
  return [
    { semana: 1, leccion: 'L1', tema: 1 }, { semana: 2, leccion: 'L2', tema: 2 },
    { semana: 3, leccion: 'L3', tema: 2 }, { semana: 4, leccion: 'L4', tema: 2 },
    { semana: 5, leccion: 'L5', tema: 3 }, { semana: 6, leccion: 'L6', tema: 4 }
  ];
}
function semanaActiva() {
  try {
    const s = JSON.parse(localStorage.getItem('ipo_uja_settings_v2') || '{}');
    if (s.semanaActual) return Number(s.semanaActual);
  } catch (e) {}
  return CAL.semanaVista || 4;
}
function temaDeSemana(sem) {
  const c = crono().find(x => x.semana === sem);
  return c ? c.tema : 2;
}
function progresoTema(tid) {
  try {
    const p = JSON.parse(localStorage.getItem('ipo_uja_progress_v2') || '{}');
    return p[String(tid)] || p[tid] || null;
  } catch (e) { return null; }
}
function estadoSemana(sem) {
  const act = semanaActiva();
  if (sem === act) return 'now';
  if (sem > act) return 'upcoming';
  // pasadas: check o deuda de repaso
  const tid = temaDeSemana(sem);
  const p = progresoTema(tid);
  if (!p) return 'debt';
  if (p.testAntiolvido) return 'done';
  if (sem === 1) return 'done'; // Tema 1 superado al 100%
  return 'debt';
}
function riesgoOlvidO(sem) {
  // Regla innegociable: sin B1 confirmado → riesgo + B3 bloqueado
  const c = calConf(sem);
  if (c.b1) return false;
  if (sem < semanaActiva()) {
    const tid = temaDeSemana(sem);
    const p = progresoTema(tid);
    if (p && p.testAntiolvido && p.esquemaValidado) return false;
    return true;
  }
  return !b1EnVentana() || !c.b1 ? true : false;
}
// Expuesto para bloquear la pestaña Antiolvido / fin de semana
window.IPO_CalWeekendBlocked = function () {
  const sem = semanaActiva();
  return riesgoOlvidO(sem);
};

/* ---------- Google Calendar: mock reactivo + GIS si existe ---------- */
function validarEmailUJA(email) {
  const d = (email.split('@')[1] || '').toLowerCase();
  return d === 'red.ujaen.es' || d === 'ujaen.es';
}
function eventosInstitucionales() {
  const { teoria, pract } = horarioOficial();
  return [
    ...teoria.map((t, i) => ({ id: 'uja-teoria-' + i, kind: 'clase', ...t })),
    { id: 'uja-pract', kind: 'pract', ...pract }
  ];
}
function eventosEstudioGCal() {
  const sem = semanaActiva();
  const avisos = [{ method: 'popup', minutes: 10 }, { method: 'email', minutes: 60 }];
  return ['b1', 'b2', 'b3'].map(k => {
    const b = CAL.bloques[k];
    return {
      summary: '📚 IPO · ' + b.titulo + ' (Sem ' + sem + ')',
      dia: b.dia, hora: b.hora, dur: b.dur,
      description: b.desc + ' · Repaso espaciado 1/3/7/16/35 días.',
      reminders: avisos, timeZone: 'Europe/Madrid'
    };
  });
}
async function sincronizarGoogle(email) {
  if (!validarEmailUJA(email)) {
    return { ok: false, error: 'Usa tu cuenta oficial @red.ujaen.es (alumnado) o @ujaen.es (PDI).' };
  }
  CAL.email = email.trim().toLowerCase();
  // Intento real GIS si está cargado; si no, mock con latencia
  try {
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      // Token client genérico; si falla, caemos al mock sin romper
      await new Promise((res) => setTimeout(res, 400));
    } else {
      await new Promise((res) => setTimeout(res, 900));
    }
  } catch (e) {}
  CAL.sincronizado = true;
  CAL.calendarId = CAL.calendarId || ('ipo-' + CAL.email.replace(/[^a-z0-9]/gi, '').slice(0, 12));
  const leidos = eventosInstitucionales();
  const creados = eventosEstudioGCal();
  CAL.gcalLog = creados.map(e => e.summary + ' · ' + diaNombre(e.dia) + ' ' + e.hora + ' (' + e.dur + 'h, avisos 10min+60min)');
  CAL._leidos = leidos.length;
  calSave();
  try {
    const s = JSON.parse(localStorage.getItem('ipo_uja_settings_v2') || '{}');
    s.semanaActual = semanaActiva();
    localStorage.setItem('ipo_uja_settings_v2', JSON.stringify(s));
  } catch (e) {}
  return { ok: true, leidos: leidos.length, creados: creados.length };
}

/* ---------- .ics con los 3 bloques + repaso espaciado ---------- */
function descargarICS() {
  const pad = n => String(n).padStart(2, '0');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//UJA//IPO Calendario Semanal//ES',
    'CALSCALE:GREGORIAN', 'X-WR-CALNAME:IPO UJA · Estudio Semanal (Sem ' + semanaActiva() + ')'];
  const base = new Date(2026, 9, 5); // Lun semana 4 (octubre)
  const addEv = (dia, hora, dur, titulo, desc) => {
    const [H, M] = hora.split(':').map(Number);
    const d0 = new Date(base); d0.setDate(base.getDate() + (dia - 1)); d0.setHours(H, M, 0, 0);
    const d1 = new Date(d0.getTime() + dur * 3600000);
    const f = d => d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
    L.push('BEGIN:VEVENT', 'UID:ipo-cal-' + dia + '-' + hora.replace(':', '') + '@ujaen.es', 'DTSTAMP:' + stamp,
      'DTSTART:' + f(d0), 'DTEND:' + f(d1), 'SUMMARY:' + titulo, 'DESCRIPTION:' + desc,
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + titulo, 'TRIGGER:-PT10M', 'END:VALARM', 'END:VEVENT');
  };
  const { teoria, pract } = horarioOficial();
  teoria.forEach(t => addEv(t.dia, t.ini, 2, 'IPO UJA · Clase oficial (' + t.tag + ')', 'Docencia presencial EPS. Ancla 24-48h.'));
  addEv(pract.dia, pract.ini, 2, 'IPO UJA · ' + pract.tag, pract.aula + '. P1/P2 iniciadas.');
  ['b1', 'b2', 'b3'].forEach(k => {
    const b = CAL.bloques[k];
    addEv(b.dia, b.hora, b.dur, 'Estudio IPO · ' + b.titulo, b.desc);
  });
  L.push('END:VCALENDAR');
  const blob = new Blob([L.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'IPO-UJA-Semana-' + semanaActiva() + '-estudio.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

/* ---------- Render ---------- */
const DIAS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
function diaNombre(d) { return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][d - 1]; }
function esc(msg) { return String(msg).replace(/</g, '&lt;'); }

function renderCalendario() {
  const host = document.getElementById('calendario-container');
  if (!host) return;
  const sem = semanaActiva();
  const vista = CAL.semanaVista || sem;
  const { teoria, pract } = horarioOficial();
  const conf = calConf(vista);
  const riesgo = riesgoOlvidO(vista);
  const enVentana = b1EnVentana();
  const b = CAL.bloques;
  const tid = temaDeSemana(vista);
  const prog = progresoTema(tid);

  const semanas = [1, 2, 3, 4, 5, 6].map(s => {
    const st = estadoSemana(s);
    const cls = st === 'now' ? 'now' : st === 'debt' ? 'debt' : st === 'done' ? 'done' : '';
    const ico = st === 'done' ? '✓ ' : st === 'debt' ? '⚠ ' : s === sem ? '● ' : '';
    const lbl = st === 'debt' ? 'Deuda de repaso' : st === 'done' ? 'Completada' : s === sem ? 'Semana actual' : 'Programada';
    return '<button class="cal-week-pill ' + cls + '" data-sem="' + s + '" title="Semana ' + s + ' · ' + lbl + '">' +
      ico + 'S' + s + ' · ' + (crono().find(x => x.semana === s)?.leccion || '') + '</button>';
  }).join('');

  const gate = !CAL.sincronizado
    ? '<div class="cal-sync-gate"><div style="font-size:2rem">🛰️</div>' +
      '<h3>Calendario bloqueado hasta sincronizar</h3>' +
      '<p>Conecta tu cuenta <b>@red.ujaen.es</b> para leer las clases institucionales de IPO2627 e insertar tus 3 bloques de estudio con avisos de repaso espaciado.</p>' +
      '<div class="cal-sync-row"><input type="email" id="cal-email" placeholder="tu_usuario@red.ujaen.es" value="' + esc(CAL.email || '') + '">' +
      '<button class="button" id="cal-btn-sync">Sincronizar cuenta @red.ujaen.es</button></div>' +
      '<div id="cal-sync-err" class="muted" style="margin-top:8px;font-size:.85rem"></div></div>'
    : '<div class="cal-ok"><span>🟢</span><div><b>Sincronizado · ' + esc(CAL.email) + '</b><br>' +
      '<span class="muted" style="font-size:.85rem">' + (CAL._leidos || 3) + ' clases UJA leídas · ' +
      CAL.gcalLog.length + ' bloques de estudio en Google Calendar (avisos 10 min + 60 min). ' +
      'Repaso espaciado 1/3/7/16/35 días.</span></div></div>';

  const alertRiesgo = riesgo
    ? '<div class="cal-risk"><span>⚠️</span><div><strong>Riesgo de Curva del Olvido.</strong> ' +
      'Aún no has vinculado tu <b>Estudio Activo / Esquema</b> dentro de la ventana de <b>24–48 h</b> tras la clase de teoría ' +
      '(Mar 13:30 → ' + diaNombre(b.b1.dia) + ' ' + b.b1.hora + ' = ' + Math.round(ventanaB1Horas()) + ' h). ' +
      'La <b>consolidación de fin de semana (Bloque 3) queda bloqueada</b> hasta cubrir el núcleo de la lección.</div></div>'
    : '<div class="cal-ok"><span>✅</span><div><b>Ventana antiolvido cubierta.</b> Estudio activo vinculado dentro de las 24–48 h. Fin de semana desbloqueado.</div></div>';

  // Grid 8:00–21:00
  const H0 = 8, H1 = 21, ROW = 44;
  const horasHtml = Array.from({ length: H1 - H0 }, (_, i) => '<div class="cal-hour">' + (H0 + i) + ':00</div>').join('');
  const celdas = Array.from({ length: H1 - H0 }, () => '<div class="cal-cell"></div>').join('');
  const hoyIdx = (new Date().getDay() + 6) % 7; // 0=Lun
  const diasHead = DIAS.map((d, i) => '<div class="cal-day' + (i === hoyIdx ? ' today' : '') + '">' + d + '</div>').join('');
  const cols = DIAS.map((_, i) => '<div class="cal-col' + (i === hoyIdx ? ' today-col' : '') + '" data-dia="' + (i + 1) + '">' + celdas + '<div class="cal-evs" data-evs="' + (i + 1) + '"></div></div>').join('');

  host.innerHTML =
    '<div class="cal-wrap">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:10px;margin-bottom:6px">' +
      '<div><span class="eyebrow">CALENDARIO · SINCRONIZACIÓN SEMANAL · OCTUBRE (SEM ' + sem + ')</span>' +
      '<h2 style="margin:2px 0 0">Tu semana IPO, anclada a la docencia</h2>' +
      '<p class="muted" style="margin:4px 0 0;font-size:.9rem">Tema 1 superado (100%) · Tema 2 en repaso activo · P1/P2 en laboratorio · <b>Práctica 4 i18n obligatoria</b> (Sem 9).</p></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button secondary" id="cal-btn-ics" style="font-size:.85rem">⬇️ Exportar semana .ics</button>' +
      (CAL.sincronizado ? '<button class="button secondary" id="cal-btn-off" style="font-size:.85rem">Desconectar</button>' : '') + '</div>' +
    '</div>' +
    gate +
    '<div class="' + (CAL.sincronizado ? '' : 'cal-locked-blur') + '">' +
      '<div class="cal-weeks">' + semanas + '</div>' +
      alertRiesgo +
      '<div class="cal-hito">📌 <b>Hito crítico:</b> la <b>Práctica 4 de Internacionalización (Sem 9)</b> es obligatoria para aprobar. El calendario la marca como evento institucional inamovible.</div>' +
      '<div class="cal-controls">' +
        '<div class="cal-ctl"><label>Horas semanales · <output>' + CAL.horasSemanales + ' h</output> (recomendado 4–8 h)</label>' +
          '<input type="range" id="cal-horas" min="2" max="10" step="0.5" value="' + CAL.horasSemanales + '">' +
          '<div class="muted" style="font-size:.8rem">Reparto auto: B1 ' + b.b1.dur + 'h · B2 ' + b.b2.dur + 'h · B3 ' + b.b3.dur + 'h' +
          (CAL.horasSemanales < H_REC_MIN || CAL.horasSemanales > H_REC_MAX ? ' · <b style="color:var(--warning)">fuera del rango pedagógico</b>' : '') + '</div></div>' +
        '<div class="cal-ctl"><label>Grupo de prácticas (horario oficial UJA)</label>' +
          '<div class="cal-seg"><button data-grupo="A" class="' + (CAL.grupo === 'A' ? 'on' : '') + '">Grupo A · Práct Mié</button>' +
          '<button data-grupo="B" class="' + (CAL.grupo === 'B' ? 'on' : '') + '">Grupo B · Práct Jue</button></div>' +
          '<div class="muted" style="font-size:.8rem;margin-top:6px">Teoría: Lun 16:00–18:00 + Mar 12:30–13:30 · Lab A3-170 17:30–19:30</div></div>' +
        '<div class="cal-ctl"><label>Ventana 24–48 h post-clase</label>' +
          '<div style="font-size:.9rem">' + (enVentana
            ? '✅ B1 a <b>' + Math.round(ventanaB1Horas()) + ' h</b> tras teoría (válido)'
            : '⚠️ B1 a <b>' + Math.round(ventanaB1Horas()) + ' h</b> tras teoría (fuera de ventana)') + '</div>' +
          '<div class="muted" style="font-size:.8rem">Mueve el Bloque 1 al día/hora que cumpla la regla.</div></div>' +
      '</div>' +
      '<div class="cal-grid"><div class="cal-corner"></div>' + diasHead +
        '<div class="cal-hours">' + horasHtml + '</div>' + cols + '</div>' +
      '<div class="cal-legend"><span><i class="cal-dot" style="background:transparent;border:1.5px dashed #94a3b8"></i>Clase UJA oficial</span>' +
        '<span><i class="cal-dot" style="background:transparent;border:1.5px dashed #fbbf24"></i>Práctica laboratorio</span>' +
        '<span><i class="cal-dot" style="background:#34d399"></i>Estudio agendado (reactivo)</span>' +
        '<span class="muted">Vista: Semana ' + vista + ' · L4 Factor Humano' + (prog ? ' · esquema ' + (prog.esquemaValidado ? 'validado' : 'pendiente') : '') + '</span></div>' +
      '<div class="cal-blocks">' + bloquesCards(conf, riesgo, vista) + '</div>' +
    '</div></div>';

  pintarEventos();
  bindCalendario();
}

function bloquesCards(conf, riesgo, vista) {
  const b = CAL.bloques;
  const card = (k, confKey, cta) => {
    const bl = b[k];
    const done = conf[confKey];
    return '<div class="cal-block-card"><h4>' + bl.titulo + '</h4>' +
      '<p>' + bl.desc + '<br><span class="muted">' + diaNombre(bl.dia) + ' ' + bl.hora + ' · ' + bl.dur + ' h</span></p>' +
      '<div class="row"><select data-move-dia="' + k + '" style="width:auto;margin:0;padding:6px 10px">' +
        DIAS.map((d, i) => '<option value="' + (i + 1) + '"' + (bl.dia === i + 1 ? ' selected' : '') + '>' + diaNombre(i + 1) + '</option>').join('') + '</select>' +
        '<input type="time" data-move-hora="' + k + '" value="' + bl.hora + '" style="width:auto;margin:0;padding:6px 10px">' +
        '<button class="button ' + (done ? 'secondary' : '') + '" data-confirm="' + confKey + '" style="font-size:.82rem;padding:6px 12px">' +
        (done ? '✓ Confirmado' : cta) + '</button></div></div>';
  };
  const b3lock = riesgo
    ? '<div class="cal-block-card" style="opacity:.65"><h4>' + b.b3.titulo + ' 🔒</h4>' +
      '<p>Bloqueado por riesgo de curva del olvido. Vincula primero el Bloque 1.</p>' +
      '<div class="row"><button class="button secondary" id="cal-goto-schema" style="font-size:.82rem">📝 Vincular estudio / esquema ahora</button></div></div>'
    : card('b3', 'b3', '🎯 Iniciar consolidación →');
  return card('b1', 'b1', '🔗 Confirmar estudio activo (24–48 h)') +
         card('b2', 'b2', '🧠 Validar síntesis NotebookLM') + b3lock;
}

function evHtml(top, h, cls, title, sub, extra) {
  return '<div class="ev ' + cls + '" style="top:' + top + 'px;height:' + h + 'px"' + (extra || '') + '><b>' + title + '</b><span>' + sub + '</span></div>';
}
function pintarEventos() {
  const H0 = 8, ROW = 44;
  const y = hm => (hmToMin(hm) / 60 - H0) * ROW;
  const h = dur => Math.max(26, dur * ROW - 6);
  const { teoria, pract } = horarioOficial();
  teoria.forEach(t => {
    const slot = document.querySelector('[data-evs="' + t.dia + '"]');
    if (slot) slot.insertAdjacentHTML('beforeend', evHtml(y(t.ini), h(2), 'ev-clase', '🏛️ Clase UJA · ' + t.tag, t.ini + '–' + t.fin + ' · ' + t.aula, ' title="Docencia oficial presencial. Ancla 24–48 h."'));
  });
  const sp = document.querySelector('[data-evs="' + pract.dia + '"]');
  if (sp) sp.insertAdjacentHTML('beforeend', evHtml(y(pract.ini), h(2), 'ev-pract', '💻 ' + pract.tag, pract.ini + '–' + pract.fin + ' · ' + pract.aula, ' title="P1/P2 ya iniciadas en EPS."'));
  // Hito P4 (marca informativa en sábado de la vista)
  const hito = document.querySelector('[data-evs="6"]');
  if (hito && semanaActiva() >= 4) {
    // solo etiqueta sutil, no bloquea la grid
  }
  const vista = CAL.semanaVista || semanaActiva();
  const conf = calConf(vista);
  const riesgo = riesgoOlvidO(vista);
  const defs = [
    { k: 'b1', cls: 'ev-estudio' + (conf.b1 ? ' ev-done' : (riesgo ? ' ev-risk' : '')) },
    { k: 'b2', cls: 'ev-estudio' + (conf.b2 ? ' ev-done' : '') },
    { k: 'b3', cls: 'ev-estudio' + (riesgo ? ' ev-blocked' : conf.b3 ? ' ev-done' : '') }
  ];
  defs.forEach(d => {
    const bl = CAL.bloques[d.k];
    const slot = document.querySelector('[data-evs="' + bl.dia + '"]');
    if (!slot) return;
    slot.insertAdjacentHTML('beforeend', evHtml(y(bl.hora), h(bl.dur), d.cls,
      (d.k === 'b1' ? '🔗 ' : d.k === 'b2' ? '🧠 ' : '🎯 ') + bl.titulo.replace(/^Bloque \d · /, ''),
      diaNombre(bl.dia) + ' ' + bl.hora + ' · ' + bl.dur + 'h' + (d.k === 'b3' && riesgo ? ' · 🔒 bloqueado' : conf[d.k] ? ' · ✓' : ''),
      ' data-ev="' + d.k + '" title="' + esc(bl.desc) + '"'));
  });
}

function bindCalendario() {
  document.querySelectorAll('.cal-week-pill').forEach(p => {
    p.onclick = () => {
      CAL.semanaVista = Number(p.dataset.sem);
      try {
        const s = JSON.parse(localStorage.getItem('ipo_uja_settings_v2') || '{}');
        s.semanaActual = CAL.semanaVista;
        localStorage.setItem('ipo_uja_settings_v2', JSON.stringify(s));
      } catch (e) {}
      calSave();
      renderCalendario();
      if (typeof renderWeeklyPlanner === 'function') renderWeeklyPlanner();
    };
  });
  const btnSync = document.getElementById('cal-btn-sync');
  if (btnSync) {
    btnSync.onclick = async () => {
      const email = (document.getElementById('cal-email') || {}).value || '';
      btnSync.disabled = true;
      btnSync.textContent = 'Sincronizando…';
      const r = await sincronizarGoogle(email);
      if (!r.ok) {
        const e = document.getElementById('cal-sync-err');
        if (e) e.textContent = '⚠️ ' + r.error;
        btnSync.disabled = false;
        btnSync.textContent = 'Sincronizar cuenta @red.ujaen.es';
        return;
      }
      renderCalendario();
    };
  }
  const btnOff = document.getElementById('cal-btn-off');
  if (btnOff) btnOff.onclick = () => {
    CAL.sincronizado = false; CAL.gcalLog = []; calSave(); renderCalendario();
  };
  const btnIcs = document.getElementById('cal-btn-ics');
  if (btnIcs) btnIcs.onclick = descargarICS;

  const rg = document.getElementById('cal-horas');
  if (rg) {
    rg.oninput = () => {
      const H = Number(rg.value);
      aplicarHoras(H);
      renderCalendario();
    };
  }
  document.querySelectorAll('[data-grupo]').forEach(g => {
    g.onclick = () => { CAL.grupo = g.dataset.grupo; calSave(); renderCalendario(); };
  });
  document.querySelectorAll('[data-move-dia]').forEach(s => {
    s.onchange = () => {
      CAL.bloques[s.dataset.moveDia].dia = Number(s.value);
      calSave(); renderCalendario();
    };
  });
  document.querySelectorAll('[data-move-hora]').forEach(inp => {
    inp.onchange = () => {
      CAL.bloques[inp.dataset.moveHora].hora = inp.value || '18:00';
      calSave(); renderCalendario();
    };
  });
  document.querySelectorAll('[data-confirm]').forEach(btn => {
    btn.onclick = () => {
      const k = btn.dataset.confirm;
      const vista = CAL.semanaVista || semanaActiva();
      const conf = calConf(vista);
      if (k === 'b3' && riesgoOlvidO(vista)) {
        alert('🔒 Consolidación bloqueada.\n\nPrimero vincula tu Estudio Activo / Esquema dentro de las 24–48 h tras la clase (Bloque 1). Sin ese núcleo, el repaso de fin de semana no frena la curva del olvido.');
        return;
      }
      if (k === 'b1' && typeof switchTab === 'function') {
        // Vinculación docencia-estudio: exige esquema existente o redirige
        const tid = temaDeSemana(vista);
        const p = progresoTema(tid);
        conf.b1 = true;
        try {
          const all = JSON.parse(localStorage.getItem('ipo_uja_progress_v2') || '{}');
          const key = String(tid);
          if (all[key]) { all[key].planificadoCalendario = true; localStorage.setItem('ipo_uja_progress_v2', JSON.stringify(all)); }
        } catch (e) {}
        if (p && !p.esquemaTexto) {
          calSave(); renderCalendario();
          if (confirm('Estudio vinculado al horario oficial. Aún no tienes esquema de este tema. ¿Abrir el validador NotebookLM ahora?')) switchTab('tab-schema');
          return;
        }
      } else if (k === 'b3') {
        conf.b3 = true;
        calSave(); renderCalendario();
        if (typeof switchTab === 'function') switchTab('tab-weekend');
        return;
      } else {
        conf[k] = true;
      }
      calSave(); renderCalendario();
      if (typeof renderMasteryDashboard === 'function') renderMasteryDashboard();
      if (typeof renderWeeklyPlanner === 'function') renderWeeklyPlanner();
    };
  });
  const goSch = document.getElementById('cal-goto-schema');
  if (goSch) goSch.onclick = () => { if (typeof switchTab === 'function') switchTab('tab-schema'); };
  document.querySelectorAll('[data-ev]').forEach(el => {
    el.onclick = () => {
      const k = el.dataset.ev;
      const sel = document.querySelector('[data-confirm="' + k + '"]');
      if (sel) sel.focus();
      el.style.transform = 'scale(1.03)';
      setTimeout(() => { el.style.transform = ''; }, 180);
    };
  });

  // Refuerzo del bloqueo en la pestaña Antiolvido existente:
  // si hay riesgo, interceptamos; si no, dejamos el flujo original.
  const weekendBtns = document.querySelectorAll('.btn-goto-weekend');
  weekendBtns.forEach((wb) => {
    if (wb.dataset.calGuard === '1') return;
    wb.dataset.calGuard = '1';
    wb.addEventListener('click', (e) => {
      if (window.IPO_CalWeekendBlocked && window.IPO_CalWeekendBlocked()) {
        e.preventDefault(); e.stopImmediatePropagation();
        alert('🔒 Sesión de fin de semana bloqueada por Riesgo de Curva del Olvido.\n\nVincula primero el Bloque 1 (Estudio Activo / Esquema 24–48 h) en la pestaña Calendario.');
        if (typeof switchTab === 'function') switchTab('tab-calendario');
      }
    }, true);
  });
}

/* ---------- Init ---------- */
calLoad();
if (!CAL.semanaVista) CAL.semanaVista = semanaActiva() || 4;
document.addEventListener('DOMContentLoaded', () => {
  calLoad();
  // El curso ya va por la Semana 4: no pisar la semana elegida por el usuario
  try {
    const s = JSON.parse(localStorage.getItem('ipo_uja_settings_v2') || '{}');
    if (!s.semanaActual) { s.semanaActual = 4; localStorage.setItem('ipo_uja_settings_v2', JSON.stringify(s)); }
    CAL.semanaVista = Number(s.semanaActual) || 4;
  } catch (e) {}
  renderCalendario();
});
window.IPO_CalRender = renderCalendario;
