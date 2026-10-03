'use strict';

// ============================================================================
// IPO Study Lab — Prototipo de Plataforma UJA (Auth, SRS, Mastery, Planner)
// ============================================================================

const UJA_STORAGE_KEY = 'ipo_uja_profile_v1';
const PROGRESS_STORAGE_KEY = 'ipo_uja_progress_v1';
const SETTINGS_STORAGE_KEY = 'ipo_uja_settings_v1';

// Estructura docente oficial extraída de IPO2627.pdf (Universidad de Jaén)
const TEMAS_UJA = [
  { id: 1, num: 'I', titulo: 'Introducción a la IPO', paginas: '16–48', lecciones: [1], preguntasEstimadas: 60, color: '#006957' },
  { id: 2, num: 'II', titulo: 'El factor humano', paginas: '49–115', lecciones: [2, 3, 4], preguntasEstimadas: 80, color: '#0284c7' },
  { id: 3, num: 'III', titulo: 'Metáforas de interacción', paginas: '116–166', lecciones: [5], preguntasEstimadas: 60, color: '#7c3aed' },
  { id: 4, num: 'IV', titulo: 'Ingeniería de la interfaz', paginas: '167–215', lecciones: [6, 7], preguntasEstimadas: 70, color: '#d97706' },
  { id: 5, num: 'V', titulo: 'Internacionalización', paginas: '216–255', lecciones: [8, 9], preguntasEstimadas: 50, color: '#059669', practicaAsociada: 'Práctica 4 (Obligatoria)' },
  { id: 6, num: 'VI', titulo: 'El diseño gráfico', paginas: '256–310', lecciones: [10, 11, 12], preguntasEstimadas: 75, color: '#db2777' },
  { id: 7, num: 'VII', titulo: 'Estilos y paradigmas', paginas: '311–350', lecciones: [13, 14], preguntasEstimadas: 55, color: '#4f46e5' },
  { id: 8, num: 'VIII', titulo: 'Accesibilidad', paginas: '351–390', lecciones: [15, 16], preguntasEstimadas: 60, color: '#0d9488' },
  { id: 9, num: 'IX', titulo: 'Evaluación de la usabilidad', paginas: '391–445', lecciones: [17, 18, 19], preguntasEstimadas: 80, color: '#ea580c' },
  { id: 10, num: 'X', titulo: 'Estándares y guías de estilo', paginas: '446–480', lecciones: [20, 21], preguntasEstimadas: 50, color: '#475569' }
];

// Cronograma de 15 semanas (1er Cuatrimestre)
const CRONOGRAMA_SEMANAS = [
  { semana: 1, mes: 'Septiembre', tema: 1, leccion: 'L1', desc: 'Presentación de la asignatura y Tema 1: Fundamentos de IPO.', hito: 'Inicio del cuatrimestre' },
  { semana: 2, mes: 'Septiembre', tema: 2, leccion: 'L2', desc: 'Tema 2.1: Modelos mentales y canales sensoriales.', hito: 'Práctica 1: Introducción' },
  { semana: 3, mes: 'Octubre', tema: 2, leccion: 'L3', desc: 'Tema 2.2: Percepción visual, atención y memoria de trabajo.', hito: '' },
  { semana: 4, mes: 'Octubre', tema: 2, leccion: 'L4', desc: 'Tema 2.3: Memoria a largo plazo y razonamiento.', hito: '' },
  { semana: 5, mes: 'Octubre', tema: 3, leccion: 'L5', desc: 'Tema 3: Metáforas verbales, visuales y escritorio.', hito: 'Práctica 2: Diseño de metáforas' },
  { semana: 6, mes: 'Octubre', tema: 4, leccion: 'L6', desc: 'Tema 4.1: Ingeniería de la interfaz y ciclo de vida.', hito: '' },
  { semana: 7, mes: 'Noviembre', tema: 4, leccion: 'L7', desc: 'Tema 4.2: Análisis de tareas y diseño centrado en el usuario.', hito: 'Práctica 3: Diseño de la interfaz' },
  { semana: 8, mes: 'Noviembre', tema: 5, leccion: 'L8', desc: 'Tema 5.1: Internacionalización, formatos culturales y fuentes.', hito: '' },
  { semana: 9, mes: 'Noviembre', tema: 5, leccion: 'L9', desc: 'Tema 5.2: Localización y adaptación de software.', hito: 'Práctica 4: Internacionalización (Obligatoria)' },
  { semana: 10, mes: 'Noviembre', tema: 6, leccion: 'L10', desc: 'Tema 6.1: Principios de diseño visual, composición y color.', hito: '' },
  { semana: 11, mes: 'Diciembre', tema: 6, leccion: 'L11-L12', desc: 'Tema 6.2 y 6.3: Tipografía, iconografía y jerarquía.', hito: '' },
  { semana: 12, mes: 'Diciembre', tema: 7, leccion: 'L13-L14', desc: 'Tema 7: Estilos de interacción, WIMP, móvil y voz.', hito: '' },
  { semana: 13, mes: 'Diciembre', tema: 8, leccion: 'L15-L16', desc: 'Tema 8: Accesibilidad web, WCAG y diseño para todos.', hito: 'Entrega final de defensas' },
  { semana: 14, mes: 'Enero', tema: 9, leccion: 'L17-L19', desc: 'Tema 9: Métodos de evaluación, inspección heurística y tests.', hito: 'Consolidación de tiques' },
  { semana: 15, mes: 'Enero', tema: 10, leccion: 'L20-L21', desc: 'Tema 10: Estándares ISO, guías de estilo y repaso global.', hito: 'Simulacro de examen final' }
];

// Estado local reactivo
let currentUser = null;
let userProgress = {};
let userSettings = {
  examDate: '2027-01-20',
  dailyMinutes: 30,
  studyDays: [1, 2, 3, 4, 5], // Lunes a Viernes
  tiquesObtenidos: 14
};

// ============================================================================
// 1. GESTIÓN DE SESIÓN INSTITUCIONAL UJA (@red.ujaen.es / @ujaen.es)
// ============================================================================

function initAuth() {
  try {
    const raw = localStorage.getItem(UJA_STORAGE_KEY);
    if (raw) currentUser = JSON.parse(raw);
  } catch (e) {
    currentUser = null;
  }

  try {
    const progRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (progRaw) userProgress = JSON.parse(progRaw);
    else initDefaultProgress();
  } catch (e) {
    initDefaultProgress();
  }

  try {
    const setRaw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (setRaw) userSettings = Object.assign(userSettings, JSON.parse(setRaw));
  } catch (e) {}

  renderAuthUI();
  renderDashboard();
  renderPlanner();
}

function initDefaultProgress() {
  userProgress = {};
  TEMAS_UJA.forEach(t => {
    // Si ya existen preguntas reales en banco (T1, T2, T3), calculamos estado base
    const esActivo = [1, 2, 3].includes(t.id);
    userProgress[t.id] = {
      vistas: esActivo ? Math.floor(t.preguntasEstimadas * (t.id === 1 ? 0.75 : t.id === 2 ? 0.5 : 0.3)) : 0,
      aciertos: esActivo ? Math.floor(t.preguntasEstimadas * (t.id === 1 ? 0.65 : t.id === 2 ? 0.38 : 0.2)) : 0,
      fallos: esActivo ? (t.id === 1 ? 4 : t.id === 2 ? 6 : 4) : 0,
      dudas: esActivo ? (t.id === 1 ? 3 : 5) : 0,
      cajasLeitner: esActivo ? [2, 4, 8, 12, 10, 4] : [0, 0, 0, 0, 0, 0],
      ultimoRepaso: esActivo ? Date.now() - (t.id * 86400000) : null
    };
  });
  saveProgress();
}

function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(userProgress));
  } catch (e) {}
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(userSettings));
  } catch (e) {}
}

function loginUJA(email, nombre = 'Estudiante UJA') {
  email = email.trim().toLowerCase();
  const domain = email.split('@')[1] || '';

  if (domain !== 'red.ujaen.es' && domain !== 'ujaen.es') {
    return {
      success: false,
      error: 'El dominio "@' + (domain || 'desconocido') + '" no está autorizado. Para acceder a la sincronización institucional debes usar tu cuenta oficial de la Universidad de Jaén (@red.ujaen.es para alumnos o @ujaen.es para PDI).'
    };
  }

  const isStudent = domain === 'red.ujaen.es';
  const role = isStudent ? 'Alumno (Grado en Ingeniería Informática)' : 'Profesorado / Investigador';
  const grupo = isStudent ? (email.charCodeAt(0) % 2 === 0 ? 'Grupo A (Teoría) · Lab 1' : 'Grupo B (Teoría) · Lab 3') : 'Docente';

  currentUser = {
    email,
    nombre: nombre || (isStudent ? 'Estudiante UJA' : 'Profesor UJA'),
    tipo: isStudent ? 'alumno' : 'pdi',
    rol: role,
    grupo: grupo,
    avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(nombre) + '&background=006957&color=fff&rounded=true&bold=true',
    loggedAt: Date.now()
  };

  try {
    localStorage.setItem(UJA_STORAGE_KEY, JSON.stringify(currentUser));
  } catch (e) {}

  renderAuthUI();
  renderDashboard();
  return { success: true };
}

function logoutUJA() {
  currentUser = null;
  localStorage.removeItem(UJA_STORAGE_KEY);
  renderAuthUI();
  renderDashboard();
}

// ============================================================================
// 2. DOMINIO Y ANALÍTICA (Mastery = Cobertura × Solidez)
// ============================================================================

function calculateMastery(temaId) {
  const t = TEMAS_UJA.find(x => x.id === temaId);
  const p = userProgress[temaId];
  if (!t || !p || p.vistas === 0) return { dominio: 0, cobertura: 0, solidez: 0, estado: 'sin-empezar' };

  const cobertura = Math.min(1, p.vistas / t.preguntasEstimadas);
  // Solidez basada en aciertos netos sobre vistas y cajas avanzadas
  const solidez = Math.min(1, Math.max(0, (p.aciertos - (p.fallos * 0.33)) / Math.max(1, p.vistas)));
  const dominio = Math.round(cobertura * solidez * 100);

  let estado = 'sin-empezar';
  if (dominio >= 75) estado = 'dominado';
  else if (dominio >= 45) estado = 'consolidando';
  else if (dominio > 0) estado = 'aprendiendo';

  return { dominio, cobertura: Math.round(cobertura * 100), solidez: Math.round(solidez * 100), estado };
}

function calculateGlobalMastery() {
  let totalDominio = 0;
  TEMAS_UJA.forEach(t => {
    totalDominio += calculateMastery(t.id).dominio;
  });
  return Math.round(totalDominio / TEMAS_UJA.length);
}

// ============================================================================
// 3. GENERADOR DE CALENDARIO (.ICS) PARA GOOGLE CALENDAR / OUTLOOK
// ============================================================================

function generateICS() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const formatICSDate = d => {
    return d.getUTCFullYear() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) + 'T' +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      pad(d.getUTCSeconds()) + 'Z';
  };

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//UJA//IPO Study Lab Planificador//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Plan de Estudio IPO 2026-27 (UJA)',
    'X-WR-TIMEZONE:Europe/Madrid'
  ];

  // Evento del examen final
  if (userSettings.examDate) {
    const examD = new Date(userSettings.examDate + 'T09:00:00');
    const examEnd = new Date(userSettings.examDate + 'T12:00:00');
    ics.push(
      'BEGIN:VEVENT',
      'UID:ipo-exam-final-' + examD.getTime() + '@ujaen.es',
      'DTSTAMP:' + formatICSDate(now),
      'DTSTART:' + formatICSDate(examD),
      'DTEND:' + formatICSDate(examEnd),
      'SUMMARY:★ EXAMEN FINAL TEÓRICO IPO (UJA)',
      'DESCRIPTION:Examen teórico oficial de Interacción Persona-Ordenador (60% de la nota final, mínimo 5.0 requerido).',
      'LOCATION:Aulario Flores de Lemus (Universidad de Jaén)',
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  }

  // Generar eventos de estudio según cronograma
  CRONOGRAMA_SEMANAS.forEach((sem, idx) => {
    const fechaSemana = new Date(2026, 8, 15 + (idx * 7), 16, 0); // Martes 16:00
    const fechaFin = new Date(fechaSemana.getTime() + (userSettings.dailyMinutes * 60000));
    const t = TEMAS_UJA.find(x => x.id === sem.tema);

    let desc = `Semana ${sem.semana}: ${sem.desc}\\nTema ${t.num}: ${t.titulo} (páginas ${t.paginas}).\\nRepaso interactivo en IPO Study Lab.`;
    if (sem.hito) desc += `\\nHITO: ${sem.hito}`;

    ics.push(
      'BEGIN:VEVENT',
      'UID:ipo-semana-' + sem.semana + '@ujaen.es',
      'DTSTAMP:' + formatICSDate(now),
      'DTSTART:' + formatICSDate(fechaSemana),
      'DTEND:' + formatICSDate(fechaFin),
      'SUMMARY:IPO UJA · Sem ' + sem.semana + ' (' + sem.leccion + ' - ' + t.titulo + ')',
      'DESCRIPTION:' + desc,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

function downloadICS() {
  const content = generateICS();
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'IPO-UJA-Plan-Estudio-2026-27.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ============================================================================
// 4. RENDERIZADO VISUAL DEL PROTOTIPO
// ============================================================================

function renderAuthUI() {
  const container = document.getElementById('auth-section');
  if (!container) return;

  if (currentUser) {
    container.innerHTML = `
      <div class="user-badge-card">
        <img src="${currentUser.avatar}" alt="${currentUser.nombre}" class="user-avatar">
        <div class="user-info">
          <div style="display:flex; align-items:center; gap:8px;">
            <strong>${currentUser.nombre}</strong>
            <span class="badge ok">✓ Verificado UJA</span>
          </div>
          <div class="user-email">${currentUser.email} · ${currentUser.grupo}</div>
          <div class="user-meta">${currentUser.rol} · Sesión activa y sincronizada</div>
        </div>
        <button id="btn-logout" class="button secondary" style="margin-left:auto; padding:6px 14px; font-size:0.85rem;">Cerrar sesión</button>
      </div>
    `;
    document.getElementById('btn-logout').onclick = logoutUJA;
  } else {
    container.innerHTML = `
      <div class="login-card">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <span style="font-size:2rem;">🏛️</span>
          <div>
            <h3 style="margin:0; font-size:1.15rem;">Acceso con Cuenta Institucional de la Universidad de Jaén</h3>
            <p class="muted" style="margin:2px 0 0; font-size:0.88rem;">Sincroniza tu progreso, plan de estudio y banco de preguntas en todos tus dispositivos.</p>
          </div>
        </div>

        <form id="form-login" onsubmit="return false;" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
          <input type="email" id="input-email" placeholder="usuario@red.ujaen.es" required style="flex:1; min-width:240px; padding:10px 14px; border:1px solid var(--line); border-radius:8px; font-size:0.95rem;">
          <button type="submit" class="button" style="display:inline-flex; align-items:center; gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
            Entrar con Google UJA
          </button>
          <button type="button" id="btn-demo-login" class="button secondary" style="font-size:0.88rem;">Usar cuenta demo alumno</button>
        </form>
        <div id="login-error" class="login-error-msg" hidden></div>
      </div>
    `;

    document.getElementById('form-login').onsubmit = () => {
      const email = document.getElementById('input-email').value;
      const res = loginUJA(email, email.split('@')[0].toUpperCase());
      if (!res.success) {
        const err = document.getElementById('login-error');
        err.textContent = res.error;
        err.hidden = false;
      }
    };

    document.getElementById('btn-demo-login').onclick = () => {
      loginUJA('ajgarcia@red.ujaen.es', 'Antonio José García Arias');
    };
  }
}

function renderDashboard() {
  const globalMastery = calculateGlobalMastery();
  const globalEl = document.getElementById('global-mastery-val');
  if (globalEl) globalEl.textContent = globalMastery + '%';

  const tiquesEl = document.getElementById('tiques-count');
  if (tiquesEl) tiquesEl.textContent = userSettings.tiquesObtenidos + ' / 50';

  const grid = document.getElementById('temas-mastery-grid');
  if (!grid) return;

  grid.innerHTML = TEMAS_UJA.map(t => {
    const m = calculateMastery(t.id);
    const p = userProgress[t.id];
    const badgeCls = m.estado === 'dominado' ? 'ok' : m.estado === 'consolidando' ? 'warn' : m.estado === 'aprendiendo' ? 'info' : 'muted';
    const badgeText = m.estado === 'dominado' ? '🟢 Dominado' : m.estado === 'consolidando' ? '🟡 Consolidando' : m.estado === 'aprendiendo' ? '🟠 Aprendiendo' : '⚪ Sin empezar';

    return `
      <div class="topic-mastery-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <span class="eyebrow" style="color:${t.color}">TEMA ${t.num} · LECCIONES ${t.lecciones.join(', ')}</span>
          <span class="badge ${badgeCls}">${badgeText}</span>
        </div>
        <h3 style="margin:0 0 6px; font-size:1.05rem;">${t.titulo}</h3>
        <div style="font-size:0.84rem; color:var(--muted); margin-bottom:12px;">Páginas ${t.paginas} · ${t.preguntasEstimadas} preguntas estimadas ${t.practicaAsociada ? `· <strong style="color:var(--accent);">${t.practicaAsociada}</strong>` : ''}</div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem; margin-bottom:4px;">
          <span>Dominio (Cobertura × Solidez)</span>
          <strong>${m.dominio}%</strong>
        </div>
        <div class="mastery-progress-bar">
          <div class="mastery-progress-fill" style="width:${m.dominio}%; background:${t.color};"></div>
        </div>

        <div class="topic-stats-row">
          <span>Vistas: <strong>${p.vistas}/${t.preguntasEstimadas}</strong></span>
          <span>Aciertos: <strong class="ok">${p.aciertos}</strong></span>
          <span>Fallos: <strong class="wrong">${p.fallos}</strong></span>
        </div>

        <div style="margin-top:12px; display:flex; gap:8px;">
          <a href="tema-${t.id <= 3 ? t.id : '1'}.html" class="button" style="padding:6px 12px; font-size:0.85rem; flex:1; text-align:center;">Generar test →</a>
          <button type="button" class="btn-simulate-practice" data-tema="${t.id}" style="padding:6px 10px; font-size:0.8rem; background:none; border:1px solid var(--line); border-radius:6px; cursor:pointer;" title="Simular 5 preguntas estudiadas">+5 repasar</button>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.btn-simulate-practice').forEach(btn => {
    btn.onclick = e => {
      const temaId = Number(e.target.dataset.tema);
      simulateStudy(temaId);
    };
  });
}

function simulateStudy(temaId) {
  const p = userProgress[temaId];
  if (!p) return;
  p.vistas = Math.min(TEMAS_UJA.find(x => x.id === temaId).preguntasEstimadas, p.vistas + 5);
  p.aciertos += 4;
  p.fallos += 1;
  p.ultimoRepaso = Date.now();
  saveProgress();
  renderDashboard();
}

function renderPlanner() {
  const list = document.getElementById('cronograma-list');
  if (!list) return;

  const hoy = new Date();
  const diasHastaExamen = Math.max(0, Math.ceil((new Date(userSettings.examDate).getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)));
  const examDaysEl = document.getElementById('exam-countdown');
  if (examDaysEl) examDaysEl.textContent = diasHastaExamen + ' días';

  list.innerHTML = CRONOGRAMA_SEMANAS.map(sem => {
    const t = TEMAS_UJA.find(x => x.id === sem.tema);
    const m = calculateMastery(t.id);
    return `
      <div class="timeline-row">
        <div class="timeline-week">
          <strong>Semana ${sem.semana}</strong>
          <span>${sem.mes}</span>
        </div>
        <div class="timeline-content">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>${sem.leccion}: ${t.titulo}</strong>
            <span class="badge ${m.dominio >= 50 ? 'ok' : 'muted'}">${m.dominio}% dominado</span>
          </div>
          <p style="margin:4px 0; font-size:0.88rem; color:var(--muted);">${sem.desc}</p>
          ${sem.hito ? `<div class="timeline-milestone">⚑ ${sem.hito}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Configurar listeners globales
document.addEventListener('DOMContentLoaded', () => {
  initAuth();

  const btnExportICS = document.getElementById('btn-export-ics');
  if (btnExportICS) btnExportICS.onclick = downloadICS;

  const btnAddTique = document.getElementById('btn-add-tique');
  if (btnAddTique) {
    btnAddTique.onclick = () => {
      userSettings.tiquesObtenidos = Math.min(50, userSettings.tiquesObtenidos + 1);
      saveSettings();
      renderDashboard();
    };
  }

  // Pestañas del prototipo
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-view').forEach(v => v.hidden = true);
      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const target = document.getElementById(targetId);
      if (target) target.hidden = false;
    };
  });
});
