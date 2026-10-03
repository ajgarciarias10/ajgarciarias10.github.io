'use strict';

// ============================================================================
// IPO Study Lab — Recordatorios de estudio y Google Calendar API
// Adapta un plan abstracto (sesiones de estudio + repasos espaciados) a:
//   1. Google Calendar API (Google Identity Services GIS token client)
//   2. Archivo estándar .ics (universal: Google, Outlook UJA, Apple)
//   3. Notification API (alertas nativas del navegador)
// ============================================================================

const RECORDATORIOS_CONFIG = {
  // Client ID OAuth para Aplicación Web en Google Cloud Console
  CLIENT_ID: '418388147690-uja-ipo-study.apps.googleusercontent.com', // configurable o personal
  MODO: 'app', // 'app' (calendario propio) o 'primary'
  ZONA: 'Europe/Madrid',
  DOMINIO: 'red.ujaen.es',
  INTERVALOS_REPASO: [1, 3, 7, 16, 35], // días tras la primera sesión de un tema
  MINUTOS_REPASO: 20,
  AVISOS: [{ method: 'popup', minutes: 10 }, { method: 'email', minutes: 60 }]
};

const SCOPES_GOOGLE = {
  app: 'https://www.googleapis.com/auth/calendar.app.created',
  primary: 'https://www.googleapis.com/auth/calendar.events'
};
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const RECORDATORIOS_KEY = 'ipo_recordatorios_v1';
const DIAS_RRULE = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
const URL_GENERADOR = location.protocol.startsWith('http')
  ? new URL('generador.html', location.href).href
  : 'generador.html';

let estadoRec = {
  email: '',
  conectado: false,
  calendarId: null,
  ultimoAviso: null,
  ajustes: { dias: [1, 2, 3, 4, 5], hora: '18:00', minutos: 30, examen: '2027-01-20' },
  repasos: []
};

function cargarRecordatorios() {
  try {
    const raw = localStorage.getItem(RECORDATORIOS_KEY);
    if (raw) estadoRec = Object.assign(estadoRec, JSON.parse(raw));
  } catch (e) {}
}

function guardarRecordatorios() {
  try {
    localStorage.setItem(RECORDATORIOS_KEY, JSON.stringify(estadoRec));
  } catch (e) {}
}

const pad2 = n => String(n).padStart(2, '0');

function hoyLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function sumarDias(fecha, n) {
  const d = new Date(fecha + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function sumarMinutos(fechaHora, minutos) {
  const d = new Date(fechaHora + ':00Z');
  d.setUTCMinutes(d.getUTCMinutes() + minutos);
  return d.toISOString().slice(0, 16);
}

const diaSemana = fecha => new Date(fecha + 'T12:00:00Z').getUTCDay();

// Construcción del plan abstracto
function construirBloqueSemanal(aj) {
  if (!aj.dias.length) return null;
  let inicio = hoyLocal();
  while (!aj.dias.includes(diaSemana(inicio))) inicio = sumarDias(inicio, 1);
  const hasta = sumarDias(aj.examen, -1).replace(/-/g, '') + 'T225959Z';
  return {
    clave: 'bloque-semanal',
    titulo: '📚 IPO · Sesión de estudio UJA',
    descripcion: 'Recuperación activa: 5 min recuerdo libre sin apuntes → test generador aleatorio → repaso de errores.\n' + URL_GENERADOR,
    fecha: inicio,
    hora: aj.hora,
    minutos: aj.minutos,
    rrule: `FREQ=WEEKLY;BYDAY=${aj.dias.map(d => DIAS_RRULE[d]).join(',')};UNTIL=${hasta}`
  };
}

function construirExamen(aj) {
  return {
    clave: 'examen-final',
    titulo: '★ Examen final de IPO (UJA)',
    descripcion: 'Examen teórico oficial de Interacción Persona-Ordenador (60% nota final, mínimo 5.0).',
    fecha: aj.examen,
    hora: '09:00',
    minutos: 180
  };
}

function construirRepasos(tema, titulo, desde) {
  return RECORDATORIOS_CONFIG.INTERVALOS_REPASO
    .map((dias, i) => ({
      clave: `repaso-t${tema}-${desde}-${i + 1}`,
      tema,
      titulo,
      fecha: sumarDias(desde, dias),
      hecho: false
    }))
    .filter(r => r.fecha < estadoRec.ajustes.examen);
}

function repasoAEvento(r, indice) {
  return {
    clave: r.clave,
    titulo: `🔁 IPO · Repaso ${indice} — Tema ${r.tema}`,
    descripcion: `${r.titulo}\nCierra apuntes (3 min recuerdo). Luego 10 preguntas aleatorias en IPO Study Lab con «Priorizar fallos».\n${URL_GENERADOR}`,
    fecha: r.fecha,
    hora: estadoRec.ajustes.hora,
    minutos: RECORDATORIOS_CONFIG.MINUTOS_REPASO
  };
}

function planCompleto() {
  const aj = estadoRec.ajustes;
  const repasosFuturos = estadoRec.repasos
    .filter(r => r.fecha >= hoyLocal() && !r.hecho)
    .map(r => repasoAEvento(r, Number(r.clave.split('-').pop())));
  return [construirBloqueSemanal(aj), construirExamen(aj), ...repasosFuturos].filter(Boolean);
}

// Adaptador Google Calendar
let clienteToken = null;
let tokenAcceso = null;
let tokenCaduca = 0;
let peticionToken = null;

function googleDisponible() {
  return Boolean(RECORDATORIOS_CONFIG.CLIENT_ID) && location.protocol !== 'file:' && Boolean(window.google?.accounts?.oauth2);
}

function initGoogleRecordatorios() {
  if (!googleDisponible()) return renderRecordatorios();
  try {
    clienteToken = google.accounts.oauth2.initTokenClient({
      client_id: RECORDATORIOS_CONFIG.CLIENT_ID,
      scope: SCOPES_GOOGLE[RECORDATORIOS_CONFIG.MODO],
      hosted_domain: RECORDATORIOS_CONFIG.DOMINIO,
      callback: resp => {
        const p = peticionToken;
        peticionToken = null;
        if (!p) return;
        if (resp.error) return p.reject(new Error(resp.error));
        tokenAcceso = resp.access_token;
        tokenCaduca = Date.now() + (Number(resp.expires_in) - 60) * 1000;
        p.resolve(tokenAcceso);
      },
      error_callback: err => {
        const p = peticionToken;
        peticionToken = null;
        if (p) p.reject(new Error(err.type));
      }
    });
  } catch (e) {}
  renderRecordatorios();
}

function asegurarToken() {
  if (tokenAcceso && Date.now() < tokenCaduca) return Promise.resolve(tokenAcceso);
  if (!clienteToken) return Promise.reject(new Error('google_no_configurado'));
  return new Promise((resolve, reject) => {
    peticionToken = { resolve, reject };
    clienteToken.requestAccessToken({
      prompt: estadoRec.conectado ? '' : 'select_account',
      hint: estadoRec.email || undefined
    });
  });
}

async function apiCalendar(ruta, { method = 'GET', body } = {}) {
  const r = await fetch(CALENDAR_API + ruta, {
    method,
    headers: { Authorization: 'Bearer ' + tokenAcceso, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (r.status === 401) tokenAcceso = null;
  if (!r.ok) {
    const e = new Error('http-' + r.status);
    e.status = r.status;
    throw e;
  }
  return r.status === 204 ? null : r.json();
}

async function asegurarCalendario() {
  if (RECORDATORIOS_CONFIG.MODO === 'primary') return 'primary';
  if (estadoRec.calendarId) {
    try {
      await apiCalendar('/calendars/' + encodeURIComponent(estadoRec.calendarId));
      return estadoRec.calendarId;
    } catch (e) {
      if (e.status !== 404 && e.status !== 403) throw e;
    }
  }
  const cal = await apiCalendar('/calendars', {
    method: 'POST',
    body: { summary: 'IPO Study Lab (UJA)', description: 'Recordatorios de estudio de Interacción Persona-Ordenador (UJA).', timeZone: RECORDATORIOS_CONFIG.ZONA }
  });
  estadoRec.calendarId = cal.id;
  guardarRecordatorios();
  return cal.id;
}

async function idEvento(calendarId, clave) {
  const datos = new TextEncoder().encode(calendarId + '|' + clave);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return 'ipo' + Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('').slice(0, 40);
}

function aEventoGoogle(ev, id) {
  const inicio = `${ev.fecha}T${ev.hora}`;
  const cuerpo = {
    id,
    status: 'confirmed',
    summary: ev.titulo,
    description: ev.descripcion,
    start: { dateTime: inicio + ':00', timeZone: RECORDATORIOS_CONFIG.ZONA },
    end: { dateTime: sumarMinutos(inicio, ev.minutos) + ':00', timeZone: RECORDATORIOS_CONFIG.ZONA },
    reminders: { useDefault: false, overrides: RECORDATORIOS_CONFIG.AVISOS },
    extendedProperties: { private: { origen: 'ipo-study-lab', clave: ev.clave } }
  };
  if (ev.rrule) cuerpo.recurrence = ['RRULE:' + ev.rrule];
  return cuerpo;
}

async function guardarEventoGoogle(calendarId, ev) {
  const cuerpo = aEventoGoogle(ev, await idEvento(calendarId, ev.clave));
  const base = '/calendars/' + encodeURIComponent(calendarId) + '/events';
  try {
    return await apiCalendar(base, { method: 'POST', body: cuerpo });
  } catch (e) {
    if (e.status !== 409) throw e;
    return apiCalendar(base + '/' + cuerpo.id, { method: 'PUT', body: cuerpo });
  }
}

async function sincronizarConGoogle(eventos) {
  const calendarId = await asegurarCalendario();
  for (const ev of eventos) await guardarEventoGoogle(calendarId, ev);
  return eventos.length;
}

function desconectarGoogle() {
  if (tokenAcceso && window.google?.accounts?.oauth2) google.accounts.oauth2.revoke(tokenAcceso, () => {});
  tokenAcceso = null;
  estadoRec.conectado = false;
  guardarRecordatorios();
}

// Adaptador .ICS
function escaparICS(texto) {
  return texto.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function plegarICS(linea) {
  const trozos = [];
  for (let i = 0; i < linea.length; i += 60) trozos.push((i ? ' ' : '') + linea.slice(i, i + 60));
  return trozos.join('\r\n');
}

function generarICSRecordatorios(eventos) {
  const sello = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const local = fh => fh.replace(/[-:]/g, '') + '00';
  const tz = ';TZID=' + RECORDATORIOS_CONFIG.ZONA;
  const lineas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IPO Study Lab//Recordatorios//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:IPO Study Lab (UJA)'];
  eventos.forEach(ev => {
    const inicio = `${ev.fecha}T${ev.hora}`;
    lineas.push(
      'BEGIN:VEVENT',
      `UID:${ev.clave}@ipo-study-lab`,
      'DTSTAMP:' + sello,
      `DTSTART${tz}:${local(inicio)}`,
      `DTEND${tz}:${local(sumarMinutos(inicio, ev.minutos))}`,
      'SUMMARY:' + escaparICS(ev.titulo),
      'DESCRIPTION:' + escaparICS(ev.descripcion)
    );
    if (ev.rrule) lineas.push('RRULE:' + ev.rrule);
    RECORDATORIOS_CONFIG.AVISOS.filter(a => a.method === 'popup').forEach(a => {
      lineas.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + escaparICS(ev.titulo), `TRIGGER:-PT${a.minutes}M`, 'END:VALARM');
    });
    lineas.push('END:VEVENT');
  });
  lineas.push('END:VCALENDAR');
  return lineas.map(plegarICS).join('\r\n');
}

function descargarICSRecordatorios() {
  const blob = new Blob([generarICSRecordatorios(planCompleto())], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'IPO-UJA-Recordatorios-Estudio.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Adaptador Notification API (Web Push en navegador)
const repasosPendientes = () => estadoRec.repasos.filter(r => !r.hecho && r.fecha <= hoyLocal());

function avisarRepasosPendientes() {
  const pend = repasosPendientes();
  if (!pend.length || !('Notification' in window) || Notification.permission !== 'granted') return;
  if (estadoRec.ultimoAviso === hoyLocal()) return;
  const temas = [...new Set(pend.map(r => r.tema))].sort((a, b) => a - b).join(', ');
  new Notification('IPO Study Lab · Recordatorio de estudio', {
    body: `Tienes ${pend.length} repaso(s) espaciado(s) pendiente(s) hoy: Tema ${temas}.`,
    icon: 'https://ui-avatars.com/api/?name=IPO&background=006957&color=fff&rounded=true'
  });
  estadoRec.ultimoAviso = hoyLocal();
  guardarRecordatorios();
}

// Interfaz y binding
const $rec = id => document.getElementById(id);

function mensajeRec(texto, tipo = 'info') {
  const el = $rec('rec-estado');
  if (!el) return;
  el.textContent = texto;
  el.className = 'rec-estado ' + tipo;
  el.hidden = false;
}

function explicarError(e) {
  const m = e.message;
  if (m === 'popup_closed' || m === 'access_denied') return 'Has cerrado la ventana de Google sin conceder permiso. Puedes descargar el archivo .ics para añadirlo a tu Google Calendar directamente.';
  if (m === 'popup_failed_to_open') return 'El navegador bloqueó la ventana emergente de Google. Permite popups para esta web y vuelve a pulsar.';
  if (m === 'google_no_configurado') return 'Se ha descargado tu archivo .ics listo para importar en Google Calendar, Apple Calendar o Outlook.';
  return 'Descargado archivo .ics de recordatorios para tu calendario.';
}

function leerAjustesFormulario() {
  if (!$rec('rec-email')) return;
  estadoRec.email = $rec('rec-email').value.trim().toLowerCase();
  estadoRec.ajustes = {
    dias: [...document.querySelectorAll('input[name="rec-dia"]:checked')].map(c => Number(c.value)),
    hora: $rec('rec-hora').value || '18:00',
    minutos: Math.min(90, Math.max(15, Number($rec('rec-minutos').value) || 30)),
    examen: $rec('rec-examen').value || estadoRec.ajustes.examen
  };
  guardarRecordatorios();
}

function renderRecordatorios() {
  if (!$rec('rec-email')) return;
  const aj = estadoRec.ajustes;
  $rec('rec-email').value = estadoRec.email;
  $rec('rec-hora').value = aj.hora;
  $rec('rec-minutos').value = aj.minutos;
  $rec('rec-examen').value = aj.examen;
  document.querySelectorAll('input[name="rec-dia"]').forEach(c => { c.checked = aj.dias.includes(Number(c.value)); });

  const lista = $rec('rec-pendientes');
  if (lista) {
    lista.replaceChildren();
    const proximos = estadoRec.repasos.filter(r => !r.hecho).sort((a, b) => a.fecha.localeCompare(b.fecha)).slice(0, 6);
    proximos.forEach(r => {
      const li = document.createElement('li');
      li.textContent = `${r.fecha <= hoyLocal() ? '🔴 Hoy' : r.fecha} · Tema ${r.tema} — ${r.titulo}`;
      lista.append(li);
    });
    if ($rec('rec-pendientes-vacio')) $rec('rec-pendientes-vacio').hidden = proximos.length > 0;
    if ($rec('rec-hechos')) $rec('rec-hechos').hidden = repasosPendientes().length === 0;
  }
}

function bindRecordatorios() {
  const form = $rec('rec-ajustes');
  if (form) form.addEventListener('change', () => { leerAjustesFormulario(); renderRecordatorios(); });

  const btnGoogle = $rec('rec-google');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', async () => {
      leerAjustesFormulario();
      try {
        if (googleDisponible()) {
          const token = asegurarToken();
          mensajeRec('Conectando con Google Calendar…');
          await token;
          const n = await sincronizarConGoogle(planCompleto());
          estadoRec.conectado = true;
          guardarRecordatorios();
          mensajeRec(`✅ ¡Sincronizado! Se han creado ${n} eventos con avisos 10 min antes en tu Google Calendar UJA.`, 'ok');
        } else {
          descargarICSRecordatorios();
          mensajeRec('📅 Se ha descargado el archivo .ics de recordatorios para importar directamente en Google Calendar o tu móvil.', 'ok');
        }
      } catch (e) {
        descargarICSRecordatorios();
        mensajeRec(explicarError(e), 'ok');
      }
      renderRecordatorios();
    });
  }

  const btnRepasar = $rec('rec-repasar');
  if (btnRepasar) {
    btnRepasar.addEventListener('click', () => {
      const sel = $rec('rec-tema');
      const tema = Number(sel.value);
      const titulo = sel.options[sel.selectedIndex].text.replace(/^Tema \d+ · /, '');
      const nuevos = construirRepasos(tema, titulo, hoyLocal());
      estadoRec.repasos = estadoRec.repasos.filter(r => !nuevos.some(n => n.clave === r.clave)).concat(nuevos);
      guardarRecordatorios();
      renderRecordatorios();
      mensajeRec(`✅ Se han programado 5 repasos espaciados para el Tema ${tema} (en 1, 3, 7, 16 y 35 días). Pulsa sincronizar o descarga el .ics para recibir las alarmas.`, 'ok');
    });
  }

  const btnHechos = $rec('rec-hechos');
  if (btnHechos) {
    btnHechos.addEventListener('click', () => {
      repasosPendientes().forEach(r => { r.hecho = true; });
      guardarRecordatorios();
      renderRecordatorios();
      mensajeRec('✓ Repasos de hoy marcados como completados.', 'ok');
    });
  }

  const btnICS = $rec('rec-ics');
  if (btnICS) {
    btnICS.addEventListener('click', () => {
      leerAjustesFormulario();
      descargarICSRecordatorios();
      mensajeRec('Archivo .ics descargado con alarmas de aviso.', 'ok');
    });
  }

  const btnNotif = $rec('rec-notif');
  if (btnNotif) {
    btnNotif.addEventListener('click', async () => {
      if ('Notification' in window) {
        const permiso = await Notification.requestPermission();
        mensajeRec(permiso === 'granted' ? '🔔 Alertas activadas en este navegador.' : 'Avisos no concedidos.', permiso === 'granted' ? 'ok' : 'info');
        avisarRepasosPendientes();
      }
    });
  }
}

// Inicialización automática
cargarRecordatorios();
document.addEventListener('DOMContentLoaded', () => {
  bindRecordatorios();
  renderRecordatorios();
  avisarRepasosPendientes();
});
