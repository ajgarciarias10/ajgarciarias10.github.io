'use strict';

// ============================================================================
// PLATAFORMA INSTITUCIONAL DE ESTUDIO Y DOMINIO DE IPO · UNIVERSIDAD DE JAÉN
// Asignatura: Interacción Persona-Ordenador · Grado en Ingeniería Informática
// Profesores: Drª. Salud Mª Jiménez Zafra y Dr. Manuel García Vega
// Material docente oficial © Universidad de Jaén. USO ESTRICTAMENTE ACADÉMICO.
// PROHIBIDO CUALQUIER USO COMERCIAL O CON ÁNIMO DE LUCRO.
// ============================================================================

const UJA_STORAGE_KEY = 'ipo_uja_profile_v2';
const PROGRESS_STORAGE_KEY = 'ipo_uja_progress_v2';
const SETTINGS_STORAGE_KEY = 'ipo_uja_settings_v2';

// ----------------------------------------------------------------------------
// 1. ESTRUCTURA DOCENTE OFICIAL (IPO2627.pdf)
// ----------------------------------------------------------------------------
const TEMAS_UJA = [
  { id: 1, num: 'I', titulo: 'Introducción a la IPO', paginas: '16–48', lecciones: [1], preguntasEstimadas: 40, color: '#006957', tieneEjercicios: false },
  { id: 2, num: 'II', titulo: 'El factor humano', paginas: '49–115', lecciones: [2, 3, 4], preguntasEstimadas: 40, color: '#0284c7', tieneEjercicios: true, ejercicioId: 'ej-fitts' },
  { id: 3, num: 'III', titulo: 'Metáforas de interacción', paginas: '116–166', lecciones: [5], preguntasEstimadas: 40, color: '#7c3aed', tieneEjercicios: false },
  { id: 4, num: 'IV', titulo: 'Ingeniería de la interfaz', paginas: '167–215', lecciones: [6, 7], preguntasEstimadas: 50, color: '#d97706', tieneEjercicios: true, practicaAsociada: 'Práctica 3' },
  { id: 5, num: 'V', titulo: 'Internacionalización', paginas: '216–255', lecciones: [8, 9], preguntasEstimadas: 40, color: '#059669', tieneEjercicios: false, practicaAsociada: 'Práctica 4 (Obligatoria)' },
  { id: 6, num: 'VI', titulo: 'El diseño gráfico', paginas: '256–310', lecciones: [10, 11, 12], preguntasEstimadas: 50, color: '#db2777', tieneEjercicios: true, ejercicioId: 'ej-gestalt' },
  { id: 7, num: 'VII', titulo: 'Estilos y paradigmas', paginas: '311–350', lecciones: [13, 14], preguntasEstimadas: 40, color: '#4f46e5', tieneEjercicios: false },
  { id: 8, num: 'VIII', titulo: 'Accesibilidad', paginas: '351–390', lecciones: [15, 16], preguntasEstimadas: 40, color: '#0d9488', tieneEjercicios: true, ejercicioId: 'ej-wcag' },
  { id: 9, num: 'IX', titulo: 'Evaluación de la usabilidad', paginas: '391–445', lecciones: [17, 18, 19], preguntasEstimadas: 50, color: '#ea580c', tieneEjercicios: true, ejercicioId: 'ej-nielsen' },
  { id: 10, num: 'X', titulo: 'Estándares y guías de estilo', paginas: '446–480', lecciones: [20, 21], preguntasEstimadas: 35, color: '#475569', tieneEjercicios: false }
];

// Cronograma de 15 semanas sincronizado con el calendario académico UJA
const CRONOGRAMA_SEMANAS = [
  { semana: 1, mes: 'Septiembre', tema: 1, leccion: 'L1', desc: 'Presentación de la asignatura y Fundamentos de la IPO.', hito: 'Inicio del cuatrimestre · Normativa y grupos' },
  { semana: 2, mes: 'Septiembre', tema: 2, leccion: 'L2', desc: 'El factor humano: Modelos mentales y canales sensoriales.', hito: 'Práctica 1: Introducción a herramientas' },
  { semana: 3, mes: 'Octubre', tema: 2, leccion: 'L3', desc: 'Percepción visual, atención dividida y memoria de trabajo.', hito: 'Seminario 1: Resolución de dudas' },
  { semana: 4, mes: 'Octubre', tema: 2, leccion: 'L4', desc: 'Memoria a largo plazo, razonamiento y Leyes de Fitts y Hick.', hito: 'Primer repaso antiolvido Tema 2' },
  { semana: 5, mes: 'Octubre', tema: 3, leccion: 'L5', desc: 'Metáforas verbales, visuales y del escritorio.', hito: 'Práctica 2: Diseño de metáforas' },
  { semana: 6, mes: 'Octubre', tema: 4, leccion: 'L6', desc: 'Ingeniería de la interfaz y ciclo de vida en estrella.', hito: 'Defensa Práctica 1' },
  { semana: 7, mes: 'Noviembre', tema: 4, leccion: 'L7', desc: 'Análisis Jerárquico de Tareas (HTA) y diseño centrado en el usuario.', hito: 'Práctica 3: Diseño de la interfaz' },
  { semana: 8, mes: 'Noviembre', tema: 5, leccion: 'L8', desc: 'Internacionalización (i18n), codificación UTF-8 y formatos.', hito: 'Defensa Práctica 2' },
  { semana: 9, mes: 'Noviembre', tema: 5, leccion: 'L9', desc: 'Localización (l10n), catálogos .po y lenguajes RTL.', hito: 'PRÁCTICA 4 OBLIGATORIA (Internacionalización)' },
  { semana: 10, mes: 'Noviembre', tema: 6, leccion: 'L10', desc: 'Principios de diseño gráfico, leyes de la Gestalt y composición.', hito: 'Seminario virtual 2' },
  { semana: 11, mes: 'Diciembre', tema: 6, leccion: 'L11-L12', desc: 'Color, accesibilidad visual (daltonismo) y tipografía.', hito: 'Defensa Práctica 3' },
  { semana: 12, mes: 'Diciembre', tema: 7, leccion: 'L13-L14', desc: 'Estilos de interacción, manipulación directa y paradigmas.', hito: 'Repaso cruzado Temas 1 a 6' },
  { semana: 13, mes: 'Diciembre', tema: 8, leccion: 'L15-L16', desc: 'Accesibilidad web, pautas WCAG 2.1 (POUR) y ratios de contraste.', hito: 'DEFENSA FINAL PRÁCTICA 4 (OBLIGATORIA)' },
  { semana: 14, mes: 'Enero', tema: 9, leccion: 'L17-L19', desc: 'Evaluación heurística de Nielsen, test con usuarios y SUS.', hito: 'Cierre y cómputo de tiques de clase' },
  { semana: 15, mes: 'Enero', tema: 10, leccion: 'L20-L21', desc: 'Estándares ISO 9241, guías de estilo y simulacro de examen.', hito: '★ Examen Teórico Final (Flores de Lemus)' }
];

// Estado global de la aplicación
let currentUser = null;
let userProgress = {};
let userSettings = {
  examDate: '2027-01-20',
  dailyMinutes: 30,
  studyDays: [1, 2, 3, 4, 5],
  tiquesObtenidos: 16,
  semanaActual: 4
};

// Estado transitorio de interacción
let testState = {
  temaSeleccionado: 'todos',
  preguntaActual: null,
  rachaActual: 0,
  rachaMaxima: 0,
  respondidasSesion: 0,
  aciertosSesion: 0
};

let currentShortQuestionIndex = 0;
let currentExerciseIndex = 0;

// ----------------------------------------------------------------------------
// 2. GESTIÓN DE SESIÓN Y PERSISTENCIA (Local-First)
// ----------------------------------------------------------------------------

function initApp() {
  loadStoredSession();
  loadStoredProgress();
  loadStoredSettings();

  renderAuthBadge();
  renderWeeklyPlanner();
  renderMasteryDashboard();
  renderNotebookLMSchemaSection();
  renderAntiforgettingTest();
  renderShortQuestionsSection();
  renderPracticalExercisesSection();
  renderTicketsSection();

  setupGlobalEventListeners();
}

function loadStoredSession() {
  try {
    const raw = localStorage.getItem(UJA_STORAGE_KEY);
    if (raw) currentUser = JSON.parse(raw);
    else {
      // Por defecto iniciamos con la sesión de demo para comodidad del alumno
      loginDemoStudent();
    }
  } catch (e) {
    loginDemoStudent();
  }
}

function loadStoredProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) userProgress = JSON.parse(raw);
    else initDefaultProgress();
  } catch (e) {
    initDefaultProgress();
  }
}

function loadStoredSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) userSettings = Object.assign(userSettings, JSON.parse(raw));
  } catch (e) {}
}

function initDefaultProgress() {
  userProgress = {};
  TEMAS_UJA.forEach(t => {
    // Si es un tema inicial (1, 2), configuramos un avance de ejemplo coherente
    const esTema1 = t.id === 1;
    const esTema2 = t.id === 2;
    userProgress[t.id] = {
      planificadoCalendario: esTema1 || esTema2,
      esquemaValidado: esTema1,
      esquemaTexto: esTema1 && typeof ESQUEMAS_TEMARIO !== 'undefined' ? ESQUEMAS_TEMARIO[1].esquemaEjemploBueno : '',
      esquemaFeedback: null,
      testAntiolvido: esTema1,
      vistas: esTema1 ? 28 : (esTema2 ? 16 : 0),
      aciertos: esTema1 ? 25 : (esTema2 ? 13 : 0),
      fallos: esTema1 ? 3 : (esTema2 ? 3 : 0),
      racha: esTema1 ? 8 : (esTema2 ? 4 : 0),
      ejerciciosResueltos: esTema1,
      preguntasCortasRespondidas: esTema1 ? ['pc-1'] : [],
      ejerciciosExamenCompletados: []
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

function loginUJA(email, nombre) {
  email = (email || '').trim().toLowerCase();
  const domain = email.split('@')[1] || '';

  if (domain !== 'red.ujaen.es' && domain !== 'ujaen.es') {
    return {
      success: false,
      error: 'Dominio "@' + (domain || 'desconocido') + '" no autorizado. Debes acceder con tu cuenta oficial de la Universidad de Jaén (@red.ujaen.es para alumnado o @ujaen.es para profesorado).'
    };
  }

  const isStudent = domain === 'red.ujaen.es';
  const shortName = nombre || email.split('@')[0].toUpperCase();

  currentUser = {
    email,
    nombre: shortName,
    tipo: isStudent ? 'alumno' : 'pdi',
    rol: isStudent ? 'Alumno (Grado en Ingeniería Informática · EPS Jaén)' : 'Profesor / Investigador (Dpto. de Informática)',
    nia: isStudent ? '24' + Math.floor(10000 + Math.random() * 90000) : 'PDI-UJA',
    grupo: isStudent ? 'Grupo A (Teoría) · Laboratorio A3-170' : 'Docente Responsable',
    avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(shortName) + '&background=006957&color=ffffff&bold=true&rounded=true',
    loggedAt: Date.now()
  };

  try {
    localStorage.setItem(UJA_STORAGE_KEY, JSON.stringify(currentUser));
  } catch (e) {}

  renderAuthBadge();
  renderMasteryDashboard();
  renderWeeklyPlanner();
  return { success: true };
}

function loginDemoStudent() {
  loginUJA('ajgarcia@red.ujaen.es', 'Antonio José García Arias');
}

function logoutUJA() {
  currentUser = null;
  localStorage.removeItem(UJA_STORAGE_KEY);
  renderAuthBadge();
}

// ----------------------------------------------------------------------------
// 3. CÁLCULO DIDÁCTICO DEL DOMINIO DEL TEMA (Definición Pedagógica Oficial)
// "El tema está dominado si el alumno:
//   1. Establece un plan de estudio en el calendario (25%)
//   2. Lo estudia realizando un esquema y comprobándolo en NotebookLM (25%)
//   3. Hace tipo test para frenar la curva del olvido (25%)
//   4. Resuelve preguntas cortas y ejercicios de examen (25%)"
// ----------------------------------------------------------------------------

function calculateTopicMastery(temaId) {
  const p = userProgress[temaId];
  if (!p) {
    return { porcentaje: 0, estado: 'sin-empezar', checks: { calendario: false, esquema: false, test: false, practica: false } };
  }

  let puntos = 0;
  const checks = {
    calendario: !!p.planificadoCalendario,
    esquema: !!p.esquemaValidado,
    test: !!p.testAntiolvido,
    practica: !!p.ejerciciosResueltos
  };

  if (checks.calendario) puntos += 25;
  if (checks.esquema) puntos += 25;
  if (checks.test) puntos += 25;
  if (checks.practica) puntos += 25;

  let estado = 'sin-empezar';
  if (puntos === 100) estado = 'dominado';
  else if (puntos >= 50) estado = 'consolidando';
  else if (puntos > 0) estado = 'aprendiendo';

  return { porcentaje: puntos, estado, checks };
}

function calculateGlobalMastery() {
  let suma = 0;
  TEMAS_UJA.forEach(t => {
    suma += calculateTopicMastery(t.id).porcentaje;
  });
  return Math.round(suma / TEMAS_UJA.length);
}

// ----------------------------------------------------------------------------
// 4. RENDERIZADO VISUAL DEL BADGE DE AUTENTICACIÓN
// ----------------------------------------------------------------------------

function renderAuthBadge() {
  const container = document.getElementById('auth-section');
  if (!container) return;

  if (currentUser) {
    container.innerHTML = `
      <div class="user-badge-card">
        <img src="${currentUser.avatar}" alt="${currentUser.nombre}" class="user-avatar">
        <div class="user-info" style="flex:1;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="font-size:1.05rem;">${currentUser.nombre}</strong>
            <span class="badge ok">✓ Identidad UJA Verificada</span>
            <span class="badge" style="background:#fef3c7; color:#92400e;">NIA: ${currentUser.nia}</span>
          </div>
          <div class="user-email">${currentUser.email} · ${currentUser.grupo}</div>
          <div class="user-meta">${currentUser.rol}</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button id="btn-logout" class="button secondary" style="padding:6px 14px; font-size:0.85rem;">Cambiar usuario</button>
        </div>
      </div>
    `;
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) btnLogout.onclick = logoutUJA;
  } else {
    container.innerHTML = `
      <div class="login-card">
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:12px;">
          <span style="font-size:2.4rem;">🏛️</span>
          <div>
            <h3 style="margin:0; font-size:1.2rem;">Acceso Institucional · Universidad de Jaén</h3>
            <p class="muted" style="margin:2px 0 0; font-size:0.9rem;">Plataforma de estudio docente de Interacción Persona-Ordenador (IPO2627).</p>
          </div>
        </div>

        <form id="form-login-inst" onsubmit="return false;" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
          <input type="email" id="input-email-inst" placeholder="tu_usuario@red.ujaen.es" required style="flex:1; min-width:260px; padding:10px 14px; border:1px solid var(--line); border-radius:8px; font-size:0.95rem;">
          <button type="submit" class="button" style="display:inline-flex; align-items:center; gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
            Entrar con Google UJA
          </button>
          <button type="button" id="btn-demo-quick" class="button secondary" style="font-size:0.88rem;">⚡ Acceso demo rápido alumno</button>
        </form>
        <div id="login-error-msg" class="login-error-msg" hidden></div>
      </div>
    `;

    const form = document.getElementById('form-login-inst');
    if (form) {
      form.onsubmit = () => {
        const email = document.getElementById('input-email-inst').value;
        const res = loginUJA(email);
        if (!res.success) {
          const err = document.getElementById('login-error-msg');
          err.textContent = res.error;
          err.hidden = false;
        }
      };
    }

    const btnDemo = document.getElementById('btn-demo-quick');
    if (btnDemo) {
      btnDemo.onclick = () => {
        loginDemoStudent();
      };
    }
  }

  updateDockUserChip();
}

// ----------------------------------------------------------------------------
// 5. PESTAÑA 1: INICIO SEMANAL Y PLAN DE ESTUDIO DEL CALENDARIO (15 Semanas)
// ----------------------------------------------------------------------------

function renderWeeklyPlanner() {
  const container = document.getElementById('semanal-container');
  if (!container) return;

  const semanaNum = userSettings.semanaActual || 4;
  const sem = CRONOGRAMA_SEMANAS.find(s => s.semana === semanaNum) || CRONOGRAMA_SEMANAS[3];
  const tema = TEMAS_UJA.find(t => t.id === sem.tema);
  const mastery = calculateTopicMastery(tema.id);

  // Selector de semanas
  let selectorHtml = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
      <div>
        <span class="eyebrow" style="color:var(--accent);">CRONOGRAMA OFICIAL IPO 2026–27 · 15 SEMANAS</span>
        <h2 style="margin:2px 0 0;">Plan de Estudio: Semana ${sem.semana} de 15</h2>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <label for="select-semana-activa" style="font-size:0.88rem; font-weight:600;">Ver semana:</label>
        <select id="select-semana-activa" style="width:auto; margin:0; padding:6px 12px; font-weight:700;">
          ${CRONOGRAMA_SEMANAS.map(s => `
            <option value="${s.semana}" ${s.semana === semanaNum ? 'selected' : ''}>Semana ${s.semana} (${s.leccion} · Tema ${s.tema})</option>
          `).join('')}
        </select>
      </div>
    </div>
  `;

  // Ficha didáctica de la semana
  let cardHtml = `
    <div class="card" style="border-left: 5px solid ${tema.color}; margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
        <div>
          <span class="badge" style="background:var(--soft); color:${tema.color}; font-weight:800;">LECCIÓN ${sem.leccion} · TEMA ${tema.num} (${tema.titulo})</span>
          <h3 style="margin:8px 0 4px; font-size:1.35rem;">${sem.desc}</h3>
          <p class="muted" style="margin:0 0 10px; font-size:0.92rem;">Material oficial en <a href="../IPO2627.pdf" target="_blank" rel="noopener">IPO2627.pdf</a> (páginas ${tema.paginas}).</p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.82rem; color:var(--muted); text-transform:uppercase; font-weight:700;">Estado del Tema</div>
          <span class="badge ${mastery.porcentaje === 100 ? 'ok' : mastery.porcentaje >= 50 ? 'warn' : 'info'}" style="font-size:0.95rem; margin-top:4px;">
            ${mastery.porcentaje}% Dominado
          </span>
        </div>
      </div>

      ${sem.hito ? `
        <div style="background:#fef3c7; color:#92400e; border:1px solid #fde68a; border-radius:8px; padding:10px 14px; margin:12px 0; font-size:0.9rem; display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">📌</span>
          <div><strong>Hito académico de la semana:</strong> ${sem.hito}</div>
        </div>
      ` : ''}

      <!-- HOJA DE RUTA DE 3 PASOS EN LA SEMANA -->
      <h4 style="margin:20px 0 10px; font-size:1.05rem; border-bottom:1px solid var(--line); padding-bottom:6px;">
        Ruta pedagógica semanal para dominar el tema:
      </h4>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-top:10px;">
        <!-- PASO 1 -->
        <div style="background:var(--paper); border:1px solid var(--line); border-radius:12px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:var(--accent); font-size:0.88rem;">1. DÍA DE CLASE / TEORÍA</strong>
            <span class="badge ${mastery.checks.calendario ? 'ok' : 'muted'}">${mastery.checks.calendario ? '✓ Agendado' : 'Pendiente'}</span>
          </div>
          <h5 style="margin:0 0 6px; font-size:1rem;">Lectura comprensiva de diapositivas</h5>
          <p style="margin:0 0 12px; font-size:0.85rem; color:var(--muted);">Revisa las transparencias ${tema.paginas} y toma notas de conceptos que generen dudas para consultar en clase o tutoría.</p>
          <button class="button secondary btn-toggle-calendar-plan" data-tema="${tema.id}" style="width:100%; font-size:0.82rem; padding:6px;">
            ${mastery.checks.calendario ? '✓ Plan agendado en calendario' : '📅 Añadir a mi calendario de estudio'}
          </button>
        </div>

        <!-- PASO 2 -->
        <div style="background:var(--paper); border:1px solid var(--line); border-radius:12px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:var(--accent); font-size:0.88rem;">2. DÍA DE ESTUDIO ACTIVO</strong>
            <span class="badge ${mastery.checks.esquema ? 'ok' : 'muted'}">${mastery.checks.esquema ? '✓ Validado' : 'Pendiente'}</span>
          </div>
          <h5 style="margin:0 0 6px; font-size:1rem;">Elaborar esquema y corregir con NotebookLM</h5>
          <p style="margin:0 0 12px; font-size:0.85rem; color:var(--muted);">Construye tu mapa conceptual o esquema jerárquico y somételo al evaluador para detectar lagunas y trampas de examen.</p>
          <button class="button btn-goto-schema" data-tema="${tema.id}" style="width:100%; font-size:0.82rem; padding:6px;">
            📝 Subir y validar esquema ahora →
          </button>
        </div>

        <!-- PASO 3 -->
        <div style="background:var(--paper); border:1px solid var(--line); border-radius:12px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:var(--accent); font-size:0.88rem;">3. FIN DE SEMANA ANTIOLVIDO</strong>
            <span class="badge ${mastery.checks.test && mastery.checks.practica ? 'ok' : 'muted'}">${mastery.checks.test && mastery.checks.practica ? '✓ Consolidado' : 'Pendiente'}</span>
          </div>
          <h5 style="margin:0 0 6px; font-size:1rem;">Test sin agobio + Cortas + Ejercicios</h5>
          <p style="margin:0 0 12px; font-size:0.85rem; color:var(--muted);">Frena la curva del olvido: batería de test sin número visible de preguntas, preguntas cortas de desarrollo y ejercicios prácticos de examen.</p>
          <button class="button btn-goto-weekend" data-tema="${tema.id}" style="width:100%; font-size:0.82rem; padding:6px; background:#1e293b; border-color:#1e293b;">
            🎯 Iniciar sesión antiolvido →
          </button>
        </div>
      </div>
    </div>
  `;

  // Barra de sincronización con Google Calendar y .ics
  let syncBarHtml = `
    <div class="card" style="background:#f8fafc; border:1px solid var(--line); margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h4 style="margin:0 0 4px;">Sincronización con tu Calendario (Google Calendar & .ics)</h4>
          <p class="muted" style="margin:0; font-size:0.88rem;">Configura tus recordatorios de estudio para recibir alertas en tu móvil o cuenta UJA antes de la sesión de consolidación.</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button id="btn-export-week-ics" class="button secondary" style="display:inline-flex; align-items:center; gap:6px;">
            ⬇️ Exportar semana a .ics
          </button>
          <button id="btn-export-full-ics" class="button" style="display:inline-flex; align-items:center; gap:6px;">
            📅 Exportar cuatrimestre completo (15 sem)
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = selectorHtml + cardHtml + syncBarHtml;

  // Event listener del selector de semanas
  const selSem = document.getElementById('select-semana-activa');
  if (selSem) {
    selSem.onchange = e => {
      userSettings.semanaActual = Number(e.target.value);
      saveSettings();
      renderWeeklyPlanner();
    };
  }

  // Listener para agendar en calendario
  const btnPlan = container.querySelector('.btn-toggle-calendar-plan');
  if (btnPlan) {
    btnPlan.onclick = () => {
      const p = userProgress[tema.id];
      p.planificadoCalendario = true;
      saveProgress();
      renderWeeklyPlanner();
      renderMasteryDashboard();
    };
  }

  // Listener para ir al verificador de esquemas
  const btnSchema = container.querySelector('.btn-goto-schema');
  if (btnSchema) {
    btnSchema.onclick = () => {
      switchTab('tab-schema');
      const selTema = document.getElementById('select-schema-tema');
      if (selTema) {
        selTema.value = tema.id;
        selTema.dispatchEvent(new Event('change'));
      }
    };
  }

  // Listener para ir a la sesión de fin de semana
  const btnWeekend = container.querySelector('.btn-goto-weekend');
  if (btnWeekend) {
    btnWeekend.onclick = () => {
      switchTab('tab-weekend');
      const selTestTema = document.getElementById('select-test-tema');
      if (selTestTema) {
        selTestTema.value = String(tema.id);
        selTestTema.dispatchEvent(new Event('change'));
      }
    };
  }

  const btnExportWeek = document.getElementById('btn-export-week-ics');
  if (btnExportWeek) {
    btnExportWeek.onclick = () => downloadWeekICS(sem.semana);
  }
  const btnExportFull = document.getElementById('btn-export-full-ics');
  if (btnExportFull) {
    btnExportFull.onclick = downloadICS;
  }
}

// ----------------------------------------------------------------------------
// EXPORTADOR DE CALENDARIO (.ICS) PARA GOOGLE CALENDAR / OUTLOOK / APPLE
// ----------------------------------------------------------------------------
function generateICS(semanaFiltro = null) {
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
    'PRODID:-//UJA//IPO Study Lab Plataforma//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Plan de Estudio IPO 2026-27 (UJA)',
    'X-WR-TIMEZONE:Europe/Madrid'
  ];

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

  const semanas = semanaFiltro
    ? CRONOGRAMA_SEMANAS.filter(s => s.semana === semanaFiltro)
    : CRONOGRAMA_SEMANAS;

  semanas.forEach((sem, idx) => {
    const semIndex = sem.semana - 1;
    // 1. Bloque 1 post-clase (Viernes 18:00, en ventana 24–48 h tras la teoría del Jueves)
    const fechaTeoria = new Date(2026, 8, 18 + (semIndex * 7), 18, 0);
    const finTeoria = new Date(fechaTeoria.getTime() + (userSettings.dailyMinutes * 60000));
    const t = TEMAS_UJA.find(x => x.id === sem.tema);

    ics.push(
      'BEGIN:VEVENT',
      'UID:ipo-sem-teoria-' + sem.semana + '@ujaen.es',
      'DTSTAMP:' + formatICSDate(now),
      'DTSTART:' + formatICSDate(fechaTeoria),
      'DTEND:' + formatICSDate(finTeoria),
      'SUMMARY:IPO UJA · Sem ' + sem.semana + ' (' + sem.leccion + ' - ' + t.titulo + ')',
      'DESCRIPTION:Semana ' + sem.semana + ': ' + sem.desc + '\\nPáginas ' + t.paginas + ' de IPO2627.pdf' + (sem.hito ? '\\nHITO: ' + sem.hito : ''),
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );

    // 2. Día de Estudio y Esquema NotebookLM (Sábado 11:00)
    const fechaEsquema = new Date(2026, 8, 19 + (semIndex * 7), 11, 0);
    const finEsquema = new Date(fechaEsquema.getTime() + (userSettings.dailyMinutes * 60000));
    ics.push(
      'BEGIN:VEVENT',
      'UID:ipo-sem-esquema-' + sem.semana + '@ujaen.es',
      'DTSTAMP:' + formatICSDate(now),
      'DTSTART:' + formatICSDate(fechaEsquema),
      'DTEND:' + formatICSDate(finEsquema),
      'SUMMARY:📝 IPO UJA · Esquema y NotebookLM Sem ' + sem.semana,
      'DESCRIPTION:Elaborar esquema conceptual del Tema ' + t.id + ' y someterlo al evaluador de NotebookLM.',
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );

    // 3. Fin de semana Antiolvido (Domingo 11:00)
    const fechaRepaso = new Date(2026, 8, 20 + (semIndex * 7), 11, 0);
    const finRepaso = new Date(fechaRepaso.getTime() + (userSettings.dailyMinutes * 60000));
    ics.push(
      'BEGIN:VEVENT',
      'UID:ipo-sem-repaso-' + sem.semana + '@ujaen.es',
      'DTSTAMP:' + formatICSDate(now),
      'DTSTART:' + formatICSDate(fechaRepaso),
      'DTEND:' + formatICSDate(finRepaso),
      'SUMMARY:🎯 IPO UJA · Consolidación Antiolvido Sem ' + sem.semana,
      'DESCRIPTION:Sesión antiolvido: test aleatorio sin número visible, preguntas cortas y ejercicios de examen.',
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
  a.download = 'IPO-UJA-Plan-Cuatrimestre-2026-27.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadWeekICS(semanaNum) {
  const content = generateICS(semanaNum);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `IPO-UJA-Semana-${semanaNum}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}


// ----------------------------------------------------------------------------
// 6. PESTAÑA 2: SUBIDA Y CORRECCIÓN DE ESQUEMAS CON NOTEBOOKLM
// ----------------------------------------------------------------------------

function renderNotebookLMSchemaSection() {
  const container = document.getElementById('schema-section-container');
  if (!container) return;

  const temaId = Number(document.getElementById('select-schema-tema')?.value || 2);
  const infoTema = ESQUEMAS_TEMARIO[temaId] || ESQUEMAS_TEMARIO[2];
  const p = userProgress[temaId];

  container.innerHTML = `
    <div class="card" style="margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <div>
          <span class="eyebrow" style="color:var(--accent);">EVALUADOR DIDÁCTICO FORMAL BASADO EN NOTEBOOKLM</span>
          <h2 style="margin:2px 0 0;">Subida y Validación de Esquemas Conceptuales</h2>
          <p class="muted" style="margin:2px 0 0; font-size:0.9rem;">El esquema es la prueba de asimilación activa: contrástalo contra las fuentes oficiales de la UJA antes de la evaluación.</p>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <label for="select-schema-tema" style="font-weight:600; font-size:0.9rem;">Tema:</label>
          <select id="select-schema-tema" style="width:auto; margin:0; padding:6px 12px; font-weight:700;">
            ${TEMAS_UJA.map(t => `<option value="${t.id}" ${t.id === temaId ? 'selected' : ''}>Tema ${t.id}: ${t.titulo}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:14px 18px; margin-bottom:18px;">
        <strong style="color:var(--accent); font-size:0.92rem;">Conceptos nucleares que el evaluador espera en este tema:</strong>
        <ul style="margin:8px 0 0; padding-left:20px; font-size:0.88rem; color:var(--muted);">
          ${infoTema.conceptosClave.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <!-- BOTONES DE CARGA RÁPIDA DE PRUEBA -->
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px; align-items:center;">
        <span style="font-size:0.85rem; font-weight:600; color:var(--muted);">Plantillas para probar la corrección:</span>
        <button id="btn-load-good-schema" class="button secondary" style="font-size:0.82rem; padding:4px 10px;">✨ Cargar esquema completo (Excelente)</button>
        <button id="btn-load-bad-schema" class="button secondary" style="font-size:0.82rem; padding:4px 10px; color:#b91c1c; border-color:#fca5a5;">⚠️ Cargar esquema con lagunas y trampas</button>
        <button id="btn-clear-schema" class="button secondary" style="font-size:0.82rem; padding:4px 10px;">Limpiar</button>
      </div>

      <!-- ÁREA DE ENTRADA DEL ESQUEMA -->
      <div style="margin-bottom:16px;">
        <label for="schema-text-input" style="font-size:0.92rem; font-weight:700; display:block; margin-bottom:6px;">
          Pega o redacta tu esquema (Texto o formato Markdown estructurado):
        </label>
        <textarea id="schema-text-input" rows="9" placeholder="Escribe aquí tu esquema conceptual del tema (ej. 1. Modelo MHP, 2. Memoria Sensorial, 3. Ley de Fitts...)..." style="font-family:ui-monospace, SFMono-Regular, monospace; font-size:0.88rem; line-height:1.5;">${p.esquemaTexto || ''}</textarea>
      </div>

      <!-- SUBIDA DE ARCHIVO (FOTOGRAFÍA / DIAGRAMA / PDF) -->
      <div style="border:2px dashed var(--line); border-radius:10px; padding:14px; text-align:center; margin-bottom:18px; background:#fafafa;">
        <div style="font-size:1.8rem; margin-bottom:4px;">📷 / 📄</div>
        <strong style="font-size:0.92rem; display:block;">¿Tienes tu esquema en papel o en un diagrama conceptual?</strong>
        <span class="muted" style="font-size:0.82rem; display:block; margin-bottom:8px;">Sube una foto de tu libreta, captura de Miro/Excalidraw o archivo .txt / .md / .pdf</span>
        <input type="file" id="schema-file-input" accept="image/*,.txt,.md,.pdf" style="font-size:0.85rem;">
        <div id="schema-file-preview" style="margin-top:10px;" hidden></div>
      </div>

      <!-- BOTONES DE ACCIÓN PRINCIPAL -->
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <button id="btn-evaluate-schema" class="button" style="display:inline-flex; align-items:center; gap:8px; font-size:1.02rem;">
          <span>🤖</span> Validar y Corregir Esquema con NotebookLM
        </button>
        <button id="btn-open-real-notebooklm" class="button secondary" style="display:inline-flex; align-items:center; gap:6px; font-size:0.9rem;">
          🚀 Abrir en Google NotebookLM oficial (Prompt preparado)
        </button>
      </div>

      <!-- RESULTADO DE LA EVALUACIÓN DE NOTEBOOKLM -->
      <div id="schema-evaluation-results" style="margin-top:24px;" ${p.esquemaFeedback ? '' : 'hidden'}>
        ${p.esquemaFeedback ? renderSchemaFeedbackContent(p.esquemaFeedback, temaId) : ''}
      </div>
    </div>
  `;

  // Listeners de la sección
  const selTema = document.getElementById('select-schema-tema');
  if (selTema) {
    selTema.onchange = e => {
      renderNotebookLMSchemaSection();
    };
  }

  const btnLoadGood = document.getElementById('btn-load-good-schema');
  if (btnLoadGood) {
    btnLoadGood.onclick = () => {
      document.getElementById('schema-text-input').value = infoTema.esquemaEjemploBueno;
    };
  }

  const btnLoadBad = document.getElementById('btn-load-bad-schema');
  if (btnLoadBad) {
    btnLoadBad.onclick = () => {
      document.getElementById('schema-text-input').value = infoTema.esquemaEjemploIncompleto;
    };
  }

  const btnClear = document.getElementById('btn-clear-schema');
  if (btnClear) {
    btnClear.onclick = () => {
      document.getElementById('schema-text-input').value = '';
    };
  }

  const fileInput = document.getElementById('schema-file-input');
  if (fileInput) {
    fileInput.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const prev = document.getElementById('schema-file-preview');
      prev.hidden = false;
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        prev.innerHTML = `<img src="${url}" alt="Esquema subido" style="max-height:180px; border-radius:8px; border:1px solid var(--line); box-shadow:0 2px 6px rgba(0,0,0,0.1);">`;
      } else {
        prev.innerHTML = `<span class="badge ok">✓ Archivo cargado: ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>`;
      }
      // Si el texto estaba vacío, indicamos esquema adjunto
      const ta = document.getElementById('schema-text-input');
      if (!ta.value.trim()) {
        ta.value = `[Esquema gráfico adjunto en archivo: ${file.name}]\nContiene mapa conceptual jerárquico del Tema ${temaId}.`;
      }
    };
  }

  const btnEval = document.getElementById('btn-evaluate-schema');
  if (btnEval) {
    btnEval.onclick = () => {
      const texto = document.getElementById('schema-text-input').value;
      if (!texto.trim()) {
        alert('Por favor redacta o pega tu esquema antes de solicitar la corrección.');
        return;
      }
      evaluateSchemaWithNotebookLM(temaId, texto);
    };
  }

  const btnPromptNBLM = document.getElementById('btn-open-real-notebooklm');
  if (btnPromptNBLM) {
    btnPromptNBLM.onclick = () => {
      openNotebookLMPromptModal(temaId);
    };
  }
}

// Motor de evaluación y contraste de esquemas al estilo NotebookLM
function evaluateSchemaWithNotebookLM(temaId, texto) {
  const info = ESQUEMAS_TEMARIO[temaId] || ESQUEMAS_TEMARIO[1];
  const lower = texto.toLowerCase();

  // 1. Análisis de cobertura de conceptos clave
  const detectados = [];
  const omitidos = [];

  info.conceptosClave.forEach(c => {
    // Extracción de tokens significativos
    const palabras = c.toLowerCase().split(/[ ,():;.\/]+/).filter(w => w.length > 4);
    const encontrado = palabras.some(w => lower.includes(w));
    if (encontrado) {
      detectados.push(c);
    } else {
      omitidos.push(c);
    }
  });

  const total = info.conceptosClave.length;
  const coberturaPct = Math.round((detectados.length / total) * 100);

  // 2. Detección de trampas de examen y errores conceptuales
  const erroresDetectados = [];
  if (temaId === 1) {
    if (lower.includes('bonit') || lower.includes('colores')) {
      erroresDetectados.push('Reducción estética: La IPO no se limita a hacer interfaces atractivas, sino que evalúa empíricamente eficacia, eficiencia y satisfacción humana.');
    }
    if (!lower.includes('accesib') && !lower.includes('usabil')) {
      erroresDetectados.push('Omisión de la distinción esencial entre Usabilidad (rendimiento específico) y Accesibilidad (diseño universal sin barreras).');
    }
  } else if (temaId === 2) {
    if (lower.includes('ram') || lower.includes('disco duro')) {
      erroresDetectados.push('Analogía informática engañosa: El procesador humano (MHP) no opera como un ordenador tradicional; la MCP satura por interferencia y la memoria sensorial decae en milisegundos.');
    }
    if (!lower.includes('fitts') && !lower.includes('fórmula')) {
      erroresDetectados.push('Omisión crítica para examen: Falta la Ley de Fitts y su repercusión en bordes y esquinas de pantalla de anchura virtual infinita.');
    }
  } else if (temaId === 5) {
    if (lower.includes('google translate') || (!lower.includes('i18n') && !lower.includes('l10n'))) {
      erroresDetectados.push('Confusión entre traducción simple y localización completa. Recuerda que la Práctica 4 de la UJA es obligatoria y exige separación estricta de catálogos y locale.');
    }
  }

  // 3. Veredicto pedagógico
  const aprobado = coberturaPct >= 70 && erroresDetectados.length === 0;

  const feedback = {
    fecha: Date.now(),
    coberturaPct,
    detectados,
    omitidos,
    erroresDetectados,
    aprobado,
    citasUJA: `Material de clase de la UJA: Tema ${temaId} (${info.paginas} de IPO2627.pdf).`,
    preguntaSocratica: temaId === 2
      ? '¿Por qué las cuatro esquinas de la pantalla tienen un índice de dificultad (ID) mínimo según la Ley de Fitts y cómo influye eso en el diseño del botón de inicio o la barra de tareas?'
      : '¿Qué diferencia existe entre un fallo que afecta a la usabilidad frente a una barrera que vulnera el principio Perceptible de accesibilidad?'
  };

  // Guardar en el progreso del usuario
  userProgress[temaId].esquemaTexto = texto;
  userProgress[temaId].esquemaValidado = aprobado;
  userProgress[temaId].esquemaFeedback = feedback;
  saveProgress();

  // Actualizar vistas
  const resultsContainer = document.getElementById('schema-evaluation-results');
  if (resultsContainer) {
    resultsContainer.hidden = false;
    resultsContainer.innerHTML = renderSchemaFeedbackContent(feedback, temaId);
  }

  renderMasteryDashboard();
  renderWeeklyPlanner();
}

function renderSchemaFeedbackContent(fb, temaId) {
  return `
    <div style="background:white; border:2px solid ${fb.aprobado ? '#10b981' : '#f59e0b'}; border-radius:14px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.8rem;">${fb.aprobado ? '✅' : '⚠️'}</span>
          <div>
            <h3 style="margin:0; font-size:1.2rem; color:${fb.aprobado ? '#065f46' : '#92400e'};">
              ${fb.aprobado ? 'Esquema Validado y Aprobado por NotebookLM' : 'Revisión Didáctica Sugerida: Se detectan lagunas conceptuales'}
            </h3>
            <span style="font-size:0.84rem; color:var(--muted);">Evaluado con el canon oficial de la Universidad de Jaén (IPO2627)</span>
          </div>
        </div>
        <div style="font-size:1.1rem; font-weight:800; color:${fb.aprobado ? '#059669' : '#d97706'};">
          Cobertura: ${fb.coberturaPct}%
        </div>
      </div>

      <!-- CONCEPTOS DETECTADOS VS OMITIDOS -->
      <div style="margin-bottom:14px;">
        <strong style="font-size:0.88rem; display:block; margin-bottom:6px;">Conceptos clave identificados:</strong>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${fb.detectados.map(d => `<span class="badge ok">✓ ${d}</span>`).join('')}
          ${fb.detectados.length === 0 ? '<span class="muted" style="font-size:0.85rem;">Ningún concepto nuclear explícito detectado.</span>' : ''}
        </div>
      </div>

      ${fb.omitidos.length > 0 ? `
        <div style="margin-bottom:14px;">
          <strong style="font-size:0.88rem; color:#b91c1c; display:block; margin-bottom:6px;">Conceptos esenciales que faltan en tu esquema:</strong>
          <ul style="margin:0; padding-left:20px; font-size:0.88rem; color:#991b1b;">
            ${fb.omitidos.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${fb.erroresDetectados.length > 0 ? `
        <div style="background:#fee2e2; border:1px solid #fecaca; border-radius:8px; padding:12px 14px; margin-bottom:14px;">
          <strong style="color:#991b1b; font-size:0.88rem;">⚠️ Trampas de examen y confusiones detectadas:</strong>
          <ul style="margin:6px 0 0; padding-left:20px; font-size:0.85rem; color:#7f1d1d;">
            ${fb.erroresDetectados.map(e => `<li>${e}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="background:var(--soft); border-left:4px solid var(--accent); padding:12px 14px; border-radius:6px; margin-bottom:14px;">
        <strong style="color:var(--accent); font-size:0.88rem;">💡 Pregunta de reflexión socrática de NotebookLM:</strong>
        <p style="margin:4px 0 0; font-size:0.9rem; color:var(--ink);">${fb.preguntaSocratica}</p>
      </div>

      <div style="font-size:0.82rem; color:var(--muted); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
        <span><strong>Referencia docente:</strong> ${fb.citasUJA}</span>
        ${fb.aprobado ? '<span class="badge ok">★ Sello de Esquema Aprobado sumado al Dominio del Tema</span>' : ''}
      </div>
    </div>
  `;
}

function openNotebookLMPromptModal(temaId) {
  const info = ESQUEMAS_TEMARIO[temaId] || ESQUEMAS_TEMARIO[1];
  const promptText = `Actúa como el profesor de Interacción Persona-Ordenador de la Universidad de Jaén (Dra. Salud Mª Jiménez Zafra y Dr. Manuel García Vega, IPO2627). He elaborado un esquema conceptual para el Tema ${temaId}: "${info.titulo}".

Por favor, contrasta mi esquema con las transparencias oficiales de la asignatura:
1. Señala qué conceptos clave o leyes matemáticas he omitido.
2. Comprueba si he caído en trampas típicas de examen (como confundir modelos mentales o leyes motoras).
3. Formúlame tres preguntas tipo test de aplicación práctica y una pregunta corta de desarrollo para verificar que domino el tema.`;

  navigator.clipboard.writeText(promptText).catch(() => {});

  alert(`¡Prompt copiado al portapapeles!\n\nPégalo en tu cuaderno oficial de Google NotebookLM con las fuentes de la UJA.\n\nPrompt:\n\n${promptText}`);
  window.open('https://notebooklm.google.com/', '_blank');
}

// ----------------------------------------------------------------------------
// 7. PESTAÑA 3: SESIÓN ANTIOLVIDO DE FIN DE SEMANA (Evaluación Multimodal)
// ----------------------------------------------------------------------------

function renderAntiforgettingTest() {
  const container = document.getElementById('test-random-container');
  if (!container) return;

  // Filtrar banco por tema seleccionado
  let pool = typeof BANCO_GLOBAL !== 'undefined' ? BANCO_GLOBAL : [];
  if (testState.temaSeleccionado !== 'todos') {
    pool = pool.filter(q => String(q.tema) === String(testState.temaSeleccionado));
  }
  if (pool.length === 0) pool = typeof BANCO_GLOBAL !== 'undefined' ? BANCO_GLOBAL : [];

  // Seleccionar pregunta aleatoria si no hay una activa
  if (!testState.preguntaActual) {
    const rIdx = Math.floor(Math.random() * pool.length);
    testState.preguntaActual = pool[rIdx];
  }

  const q = testState.preguntaActual;
  if (!q) {
    container.innerHTML = '<p class="muted">Cargando banco de preguntas...</p>';
    return;
  }

  container.innerHTML = `
    <!-- FILTRO Y ESTADÍSTICAS SIN NÚMEROS TOTALES INTIMIDANTES -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <label for="select-test-tema" style="font-weight:600; font-size:0.88rem;">Filtrar tema:</label>
        <select id="select-test-tema" style="width:auto; margin:0; padding:6px 12px; font-weight:700;">
          <option value="todos" ${testState.temaSeleccionado === 'todos' ? 'selected' : ''}>Todos los temas (Modo Examen)</option>
          <option value="1" ${testState.temaSeleccionado === '1' ? 'selected' : ''}>Tema 1 · Fundamentos</option>
          <option value="2" ${testState.temaSeleccionado === '2' ? 'selected' : ''}>Tema 2 · Factor Humano</option>
          <option value="3" ${testState.temaSeleccionado === '3' ? 'selected' : ''}>Tema 3 · Metáforas</option>
          <option value="clevertracker" ${testState.temaSeleccionado === 'clevertracker' ? 'selected' : ''}>Auditoría CleverTracker</option>
        </select>
      </div>

      <div style="display:flex; align-items:center; gap:14px;">
        <div style="font-size:0.95rem; font-weight:800; color:var(--accent);">
          🔥 Racha: <span id="test-racha-val">${testState.rachaActual}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--muted); font-weight:600;">
          Sesión: <span class="ok">${testState.aciertosSesion} aciertos</span> de ${testState.respondidasSesion}
        </div>
      </div>
    </div>

    <!-- TARJETA DE LA PREGUNTA ACTIVA -->
    <div class="card" style="border-top: 4px solid var(--accent); padding:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span class="eyebrow" style="color:var(--accent); font-weight:800;">${q.temaTitulo || 'TEMA IPO'} · PÁGINA ${q.pagina || 'UJA'}</span>
        <span class="badge" style="background:var(--soft); color:var(--accent); font-size:0.75rem;">Sin límite de tiempo</span>
      </div>

      <h3 style="margin:0 0 18px; font-size:1.15rem; line-height:1.5;">${q.enunciado}</h3>

      <div id="test-options-list" style="display:flex; flex-direction:column; gap:10px;">
        ${q.opciones.map((opt, oIdx) => `
          <div class="option test-opt-btn" data-oidx="${oIdx}">
            <div style="width:20px; height:20px; border-radius:50%; border:2px solid var(--line); flex-shrink:0; margin-top:2px;"></div>
            <div style="flex:1;">
              <div style="font-size:0.95rem;">${opt.texto}</div>
              <div class="option-feedback" hidden></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div id="test-instant-banner" class="instant-banner" hidden></div>

      <div style="margin-top:20px; display:flex; justify-content:flex-end;">
        <button id="btn-next-random-q" class="button" style="display:inline-flex; align-items:center; gap:8px;" hidden>
          Siguiente pregunta aleatoria →
        </button>
      </div>
    </div>
  `;

  // Listener del filtro de tema
  const selTestTema = document.getElementById('select-test-tema');
  if (selTestTema) {
    selTestTema.onchange = e => {
      testState.temaSeleccionado = e.target.value;
      testState.preguntaActual = null;
      renderAntiforgettingTest();
    };
  }

  // Listeners de selección de opciones con corrección instantánea
  let respondida = false;
  const optBtns = container.querySelectorAll('.test-opt-btn');
  optBtns.forEach(btn => {
    btn.onclick = () => {
      if (respondida) return;
      respondida = true;

      const chosenIdx = Number(btn.dataset.oidx);
      const chosenOpt = q.opciones[chosenIdx];
      const isCorrect = !!chosenOpt.correcta;

      testState.respondidasSesion++;

      // Actualizar progreso del tema en base de datos local
      const temaNum = Number(q.tema) || 1;
      if (userProgress[temaNum]) {
        userProgress[temaNum].vistas++;
        if (isCorrect) {
          userProgress[temaNum].aciertos++;
          userProgress[temaNum].racha = (userProgress[temaNum].racha || 0) + 1;
          if (userProgress[temaNum].racha >= 4) {
            userProgress[temaNum].testAntiolvido = true;
          }
        } else {
          userProgress[temaNum].fallos++;
          userProgress[temaNum].racha = 0;
        }
        saveProgress();
      }

      if (isCorrect) {
        testState.rachaActual++;
        testState.aciertosSesion++;
        if (testState.rachaActual > testState.rachaMaxima) {
          testState.rachaMaxima = testState.rachaActual;
        }
      } else {
        testState.rachaActual = 0;
      }

      const rachaEl = document.getElementById('test-racha-val');
      if (rachaEl) rachaEl.textContent = testState.rachaActual;

      // Resaltar opciones y mostrar explicaciones
      optBtns.forEach((b, idx) => {
        b.classList.add('is-disabled');
        const opt = q.opciones[idx];
        const fbEl = b.querySelector('.option-feedback');

        if (idx === chosenIdx) {
          if (isCorrect) {
            b.classList.add('correct-choice');
            fbEl.textContent = '✓ ' + opt.explicacion;
            fbEl.hidden = false;
          } else {
            b.classList.add('wrong-choice');
            fbEl.textContent = '✗ ' + opt.explicacion;
            fbEl.hidden = false;
          }
        } else if (opt.correcta) {
          b.classList.add('revealed-correct');
          fbEl.textContent = 'Respuesta correcta oficial: ' + opt.explicacion;
          fbEl.hidden = false;
        }
      });

      // Banner instantáneo
      const banner = document.getElementById('test-instant-banner');
      if (banner) {
        banner.hidden = false;
        if (isCorrect) {
          banner.className = 'instant-banner is-correct';
          banner.textContent = '🎉 ¡Respuesta correcta! Buen recuerdo activo del concepto.';
        } else {
          banner.className = 'instant-banner is-wrong';
          banner.textContent = '❌ Has caído en el distractor conceptual. Revisa la justificación arriba.';
        }
      }

      // Mostrar botón de siguiente
      const btnNext = document.getElementById('btn-next-random-q');
      if (btnNext) {
        btnNext.hidden = false;
        btnNext.onclick = () => {
          testState.preguntaActual = null;
          renderAntiforgettingTest();
          renderMasteryDashboard();
        };
      }
    };
  });
}

// ----------------------------------------------------------------------------
// 8. PREGUNTAS CORTAS DE EXAMEN (Desarrollo Conceptual Oficial UJA)
// ----------------------------------------------------------------------------

function renderShortQuestionsSection() {
  const container = document.getElementById('short-questions-container');
  if (!container || typeof PREGUNTAS_CORTAS === 'undefined' || PREGUNTAS_CORTAS.length === 0) return;

  const q = PREGUNTAS_CORTAS[currentShortQuestionIndex] || PREGUNTAS_CORTAS[0];
  const tema = TEMAS_UJA.find(t => t.id === q.temaId) || TEMAS_UJA[0];
  const p = userProgress[q.temaId];
  const yaRespondida = p.preguntasCortasRespondidas && p.preguntasCortasRespondidas.includes(q.id);

  container.innerHTML = `
    <div class="card" style="margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <span class="eyebrow" style="color:${tema.color};">PREGUNTA CORTA DE EXAMEN ${currentShortQuestionIndex + 1} DE ${PREGUNTAS_CORTAS.length} · ${q.leccion} (${tema.titulo})</span>
        <div style="display:flex; gap:6px;">
          <button id="btn-prev-short-q" class="button secondary" style="padding:4px 10px; font-size:0.82rem;" ${currentShortQuestionIndex === 0 ? 'disabled' : ''}>← Anterior</button>
          <button id="btn-next-short-q" class="button secondary" style="padding:4px 10px; font-size:0.82rem;" ${currentShortQuestionIndex === PREGUNTAS_CORTAS.length - 1 ? 'disabled' : ''}>Siguiente →</button>
        </div>
      </div>

      <h3 style="margin:0 0 14px; font-size:1.15rem; line-height:1.5;">${q.enunciado}</h3>

      <div style="margin-bottom:14px;">
        <label for="short-q-answer-input" style="font-weight:700; font-size:0.88rem; display:block; margin-bottom:6px;">
          Redacta tu respuesta con tus propias palabras (ensayo activo de examen):
        </label>
        <textarea id="short-q-answer-input" rows="4" placeholder="Escribe tu desarrollo conceptual aquí..."></textarea>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button id="btn-check-short-q" class="button" style="display:inline-flex; align-items:center; gap:6px;">
          <span>📝</span> Comprobar con Respuesta Modelo Oficial UJA
        </button>
      </div>

      <div id="short-q-solution-box" style="margin-top:18px; ${yaRespondida ? '' : 'display:none;'}">
        <div style="background:var(--soft); border-left:4px solid var(--accent); border-radius:8px; padding:16px;">
          <strong style="color:var(--accent); font-size:0.95rem; display:block; margin-bottom:6px;">Respuesta modelo oficial:</strong>
          <p style="margin:0 0 12px; font-size:0.92rem; line-height:1.6;">${q.respuestaModelo}</p>

          <strong style="color:var(--ink); font-size:0.88rem; display:block; margin-bottom:6px;">Criterios de puntuación en la rúbrica del profesor:</strong>
          <ul style="margin:0 0 14px; padding-left:20px; font-size:0.85rem; color:var(--muted);">
            ${q.rubrica.map(r => `<li>${r}</li>`).join('')}
          </ul>

          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; border-top:1px solid rgba(0,105,87,0.2); padding-top:10px;">
            <span style="font-size:0.85rem; font-weight:600;">Autoevalúa tu respuesta:</span>
            <button class="button secondary btn-grade-short-q" data-score="aprobado" style="font-size:0.82rem; padding:4px 10px;">✓ Bien respondida (Suma a Dominio)</button>
            <button class="button secondary btn-grade-short-q" data-score="repasar" style="font-size:0.82rem; padding:4px 10px; color:#b91c1c;">Revisar más adelante</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Listeners de navegación de preguntas cortas
  const btnPrev = document.getElementById('btn-prev-short-q');
  if (btnPrev) {
    btnPrev.onclick = () => {
      if (currentShortQuestionIndex > 0) {
        currentShortQuestionIndex--;
        renderShortQuestionsSection();
      }
    };
  }

  const btnNext = document.getElementById('btn-next-short-q');
  if (btnNext) {
    btnNext.onclick = () => {
      if (currentShortQuestionIndex < PREGUNTAS_CORTAS.length - 1) {
        currentShortQuestionIndex++;
        renderShortQuestionsSection();
      }
    };
  }

  const btnCheck = document.getElementById('btn-check-short-q');
  if (btnCheck) {
    btnCheck.onclick = () => {
      document.getElementById('short-q-solution-box').style.display = 'block';
    };
  }

  const gradeBtns = container.querySelectorAll('.btn-grade-short-q');
  gradeBtns.forEach(b => {
    b.onclick = () => {
      const score = b.dataset.score;
      if (score === 'aprobado') {
        if (!p.preguntasCortasRespondidas) p.preguntasCortasRespondidas = [];
        if (!p.preguntasCortasRespondidas.includes(q.id)) {
          p.preguntasCortasRespondidas.push(q.id);
        }
        p.ejerciciosResueltos = true;
        saveProgress();
        renderMasteryDashboard();
        renderWeeklyPlanner();
        alert('¡Excelente! Pregunta corta consolidada en tu perfil.');
      }
    };
  });
}

// ----------------------------------------------------------------------------
// 9. EJERCICIOS PRÁCTICOS DE EXAMEN (Cálculos y Casos Aplicados)
// ----------------------------------------------------------------------------

function renderPracticalExercisesSection() {
  const container = document.getElementById('practical-exercises-container');
  if (!container || typeof EJERCICIOS_EXAMEN === 'undefined' || EJERCICIOS_EXAMEN.length === 0) return;

  const ej = EJERCICIOS_EXAMEN[currentExerciseIndex] || EJERCICIOS_EXAMEN[0];
  const tema = TEMAS_UJA.find(t => t.id === ej.temaId) || TEMAS_UJA[1];
  const p = userProgress[ej.temaId];
  const completado = p.ejerciciosExamenCompletados && p.ejerciciosExamenCompletados.includes(ej.id);

  container.innerHTML = `
    <div class="card" style="margin-bottom:20px; border-top: 4px solid #d97706;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <span class="eyebrow" style="color:#d97706;">EJERCICIO PRÁCTICO ${currentExerciseIndex + 1} DE ${EJERCICIOS_EXAMEN.length} · TEMA ${tema.id} (${tema.titulo})</span>
        <div style="display:flex; gap:6px;">
          <button id="btn-prev-ej" class="button secondary" style="padding:4px 10px; font-size:0.82rem;" ${currentExerciseIndex === 0 ? 'disabled' : ''}>← Anterior</button>
          <button id="btn-next-ej" class="button secondary" style="padding:4px 10px; font-size:0.82rem;" ${currentExerciseIndex === EJERCICIOS_EXAMEN.length - 1 ? 'disabled' : ''}>Siguiente →</button>
        </div>
      </div>

      <h3 style="margin:0 0 8px; font-size:1.2rem;">${ej.titulo}</h3>
      <p style="margin:0 0 14px; font-size:0.92rem; color:var(--muted); line-height:1.5;">${ej.contexto}</p>

      <div style="background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:16px; margin-bottom:18px;">
        <strong style="display:block; margin-bottom:6px; font-size:0.95rem;">Enunciado del problema de examen:</strong>
        <div style="font-size:0.9rem; line-height:1.6; white-space:pre-line;">${ej.enunciado}</div>
      </div>

      <!-- CAMPOS INTERACTIVOS PARA INTRODUCIR CÁLCULOS -->
      <form id="form-ejercicio-interactivo" onsubmit="return false;" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:18px;">
        ${ej.inputsInteractivas.map(inp => `
          <div>
            <label for="${inp.id}" style="font-size:0.84rem; font-weight:600; display:block; margin-bottom:4px;">${inp.label}</label>
            <input type="${inp.esTexto ? 'text' : 'number'}" step="0.01" id="${inp.id}" placeholder="${inp.esTexto ? 'Escribe aquí' : '0.00'}" style="width:100%; padding:8px 12px; border:1px solid var(--line); border-radius:6px; font:inherit;">
          </div>
        `).join('')}
      </form>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button id="btn-verify-ej" class="button" style="display:inline-flex; align-items:center; gap:6px;">
          <span>📐</span> Verificar mis cálculos y ver resolución guiada
        </button>
      </div>

      <div id="ej-solution-box" style="margin-top:20px; ${completado ? '' : 'display:none;'}">
        <div style="background:#f8fafc; border:1px solid var(--line); border-radius:12px; padding:18px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            <span style="font-size:1.4rem;">💡</span>
            <h4 style="margin:0; font-size:1.05rem;">Resolución guiada paso a paso (Canon oficial UJA):</h4>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            ${ej.pasosResolucion.map(paso => `
              <div style="background:white; border:1px solid var(--line); border-radius:8px; padding:12px;">
                <strong style="color:var(--accent); font-size:0.88rem; display:block;">${paso.paso}</strong>
                <code style="display:block; margin:4px 0; background:var(--paper); padding:4px 8px; border-radius:4px; font-size:0.85rem;">${paso.formula}</code>
                <div style="font-size:0.88rem; color:var(--ink);">${paso.calculo}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top:14px; text-align:right;">
            <span class="badge ok">✓ Ejercicio Práctico resuelto correctamente y guardado</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Listeners de los ejercicios
  const btnPrev = document.getElementById('btn-prev-ej');
  if (btnPrev) {
    btnPrev.onclick = () => {
      if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        renderPracticalExercisesSection();
      }
    };
  }

  const btnNext = document.getElementById('btn-next-ej');
  if (btnNext) {
    btnNext.onclick = () => {
      if (currentExerciseIndex < EJERCICIOS_EXAMEN.length - 1) {
        currentExerciseIndex++;
        renderPracticalExercisesSection();
      }
    };
  }

  const btnVerify = document.getElementById('btn-verify-ej');
  if (btnVerify) {
    btnVerify.onclick = () => {
      let aciertos = 0;
      ej.inputsInteractivas.forEach(inp => {
        const valEl = document.getElementById(inp.id);
        if (!valEl) return;
        if (inp.esTexto) {
          if (valEl.value.trim().toLowerCase().includes(inp.respuestaCorrecta)) aciertos++;
        } else {
          const num = parseFloat(valEl.value);
          if (!isNaN(num) && Math.abs(num - inp.respuestaCorrecta) <= (inp.tolerancia || 0.1)) {
            aciertos++;
          }
        }
      });

      document.getElementById('ej-solution-box').style.display = 'block';

      if (!p.ejerciciosExamenCompletados) p.ejerciciosExamenCompletados = [];
      if (!p.ejerciciosExamenCompletados.includes(ej.id)) {
        p.ejerciciosExamenCompletados.push(ej.id);
      }
      p.ejerciciosResueltos = true;
      saveProgress();
      renderMasteryDashboard();
      renderWeeklyPlanner();
    };
  }
}

// ----------------------------------------------------------------------------
// 10. PESTAÑA 4: MATRIZ DE DOMINIO DE TEMAS (10 Temas UJA)
// ----------------------------------------------------------------------------

function renderMasteryDashboard() {
  const globalPct = calculateGlobalMastery();
  const globalEl = document.getElementById('global-mastery-val');
  if (globalEl) globalEl.textContent = globalPct + '%';

  const tiquesEl = document.getElementById('tiques-count');
  if (tiquesEl) tiquesEl.textContent = userSettings.tiquesObtenidos + ' / 50';

  const hoy = new Date();
  const diasHastaExamen = Math.max(0, Math.ceil((new Date(userSettings.examDate).getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)));
  const examDaysEl = document.getElementById('exam-countdown');
  if (examDaysEl) examDaysEl.textContent = diasHastaExamen + ' días';

  const grid = document.getElementById('temas-mastery-grid');
  if (!grid) return;

  grid.innerHTML = TEMAS_UJA.map(t => {
    const m = calculateTopicMastery(t.id);
    const p = userProgress[t.id];

    let badgeClass = 'muted';
    let badgeText = '⚪ Sin empezar';
    if (m.estado === 'dominado') {
      badgeClass = 'ok';
      badgeText = '🟢 DOMINADO (100%)';
    } else if (m.estado === 'consolidando') {
      badgeClass = 'warn';
      badgeText = '🟡 En consolidación (' + m.porcentaje + '%)';
    } else if (m.estado === 'aprendiendo') {
      badgeClass = 'info';
      badgeText = '🟠 En estudio (' + m.porcentaje + '%)';
    }

    return `
      <div class="topic-mastery-card" style="border-top:3px solid ${t.color};">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <span class="eyebrow" style="color:${t.color};">TEMA ${t.num} · LECCIONES ${t.lecciones.join(', ')}</span>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>

        <h3 style="margin:0 0 4px; font-size:1.1rem;">${t.titulo}</h3>
        <div style="font-size:0.82rem; color:var(--muted); margin-bottom:12px;">
          Páginas ${t.paginas} ${t.practicaAsociada ? `· <strong style="color:var(--accent);">${t.practicaAsociada}</strong>` : ''}
        </div>

        <!-- BARRA DE PROGRESO DE DOMINIO -->
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.84rem; margin-bottom:4px;">
          <span>Progreso de Dominio</span>
          <strong>${m.porcentaje}%</strong>
        </div>
        <div class="mastery-progress-bar">
          <div class="mastery-progress-fill" style="width:${m.porcentaje}%; background:${t.color};"></div>
        </div>

        <!-- LOS 4 PILARES DEL DOMINIO SEGÚN EL REQUISITO PEDAGÓGICO -->
        <div style="background:var(--paper); border-radius:8px; padding:10px 12px; margin-bottom:12px; font-size:0.82rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>📅 1. Plan agendado:</span>
            <strong class="${m.checks.calendario ? 'ok' : 'muted'}">${m.checks.calendario ? '✓ Agendado' : '○ Pendiente'}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>📝 2. Esquema NotebookLM:</span>
            <strong class="${m.checks.esquema ? 'ok' : 'muted'}">${m.checks.esquema ? '✓ Aprobado' : '○ Pendiente'}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>🎯 3. Test antiolvido:</span>
            <strong class="${m.checks.test ? 'ok' : 'muted'}">${m.checks.test ? '✓ Superado' : '○ Pendiente'}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>✍️ 4. Cortas / Ejercicios:</span>
            <strong class="${m.checks.practica ? 'ok' : 'muted'}">${m.checks.practica ? '✓ Resueltos' : '○ Pendiente'}</strong>
          </div>
        </div>

        <!-- ACCIONES RÁPIDAS -->
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:auto;">
          <button class="button secondary btn-card-action" data-action="schema" data-tema="${t.id}" style="padding:5px 8px; font-size:0.78rem; flex:1;">
            📝 Esquema
          </button>
          <button class="button secondary btn-card-action" data-action="test" data-tema="${t.id}" style="padding:5px 8px; font-size:0.78rem; flex:1;">
            🎯 Test
          </button>
          <button class="button secondary btn-card-action" data-action="short" data-tema="${t.id}" style="padding:5px 8px; font-size:0.78rem; flex:1;">
            ✍️ Cortas
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Listeners de los botones de la tarjeta
  grid.querySelectorAll('.btn-card-action').forEach(btn => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      const temaId = Number(btn.dataset.tema);

      if (action === 'schema') {
        switchTab('tab-schema');
        const sel = document.getElementById('select-schema-tema');
        if (sel) {
          sel.value = temaId;
          renderNotebookLMSchemaSection();
        }
      } else if (action === 'test') {
        switchTab('tab-weekend');
        const sel = document.getElementById('select-test-tema');
        if (sel) {
          sel.value = String(temaId);
          testState.temaSeleccionado = String(temaId);
          testState.preguntaActual = null;
          renderAntiforgettingTest();
        }
      } else if (action === 'short') {
        switchTab('tab-weekend');
        const idx = PREGUNTAS_CORTAS.findIndex(q => q.temaId === temaId);
        if (idx !== -1) {
          currentShortQuestionIndex = idx;
          renderShortQuestionsSection();
        }
      }
    };
  });
}

// ----------------------------------------------------------------------------
// 11. PESTAÑA 5: TIQUES Y EVALUACIÓN SEGÚN EL PDF (IPO2627.pdf)
// ----------------------------------------------------------------------------

function renderTicketsSection() {
  const tiquesCountEl = document.getElementById('tiques-count');
  if (tiquesCountEl) tiquesCountEl.textContent = userSettings.tiquesObtenidos + ' / 50';

  const btnAdd = document.getElementById('btn-add-tique');
  if (btnAdd) {
    btnAdd.onclick = () => {
      userSettings.tiquesObtenidos = Math.min(50, userSettings.tiquesObtenidos + 1);
      saveSettings();
      renderTicketsSection();
      renderMasteryDashboard();
    };
  }

  const btnAddDefensa = document.getElementById('btn-add-defensa');
  if (btnAddDefensa) {
    btnAddDefensa.onclick = () => {
      userSettings.tiquesObtenidos = Math.min(50, userSettings.tiquesObtenidos + 3);
      saveSettings();
      renderTicketsSection();
      renderMasteryDashboard();
    };
  }
}

// ----------------------------------------------------------------------------
// 12. GESTIÓN DE PESTAÑAS, TEMA CLARO/OSCURO Y EVENTOS GLOBALES (2026 DOCK)
// ----------------------------------------------------------------------------

function switchTab(targetId) {
  document.querySelectorAll('.dock-nav-item, .tab-btn').forEach(b => {
    if (b.dataset.tab === targetId) b.classList.add('active');
    else b.classList.remove('active');
  });

  document.querySelectorAll('.tab-view').forEach(v => {
    v.hidden = v.id !== targetId;
  });
}

function initThemeSwitcher() {
  const btn = document.getElementById('btn-theme-toggle');
  if (!btn) return;

  btn.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };
}

function updateDockUserChip() {
  const chip = document.getElementById('dock-user-chip');
  if (!chip) return;

  if (currentUser) {
    const primerNombre = (currentUser.nombre || 'Alumno').split(' ')[0];
    chip.innerHTML = `
      <img src="${currentUser.avatar}" alt="${currentUser.nombre}" class="dock-user-avatar">
      <span class="dock-user-name">${primerNombre}</span>
    `;
    chip.title = `${currentUser.nombre} (${currentUser.email}) · ${currentUser.grupo}`;
  } else {
    chip.innerHTML = `
      <span class="dock-pulse-dot" style="background:#f59e0b;"></span>
      <span class="dock-user-name">Invitado</span>
    `;
    chip.title = 'Sesión no iniciada';
  }
}

function setupGlobalEventListeners() {
  document.querySelectorAll('.dock-nav-item, .tab-btn').forEach(btn => {
    btn.onclick = () => {
      const targetId = btn.dataset.tab;
      if (targetId) switchTab(targetId);
    };
  });

  initThemeSwitcher();
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  updateDockUserChip();
});

