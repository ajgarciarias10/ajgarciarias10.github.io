'use strict';
/* ============================================================================
   IPO · Cronograma del curso 2026–27 (fuente única de fechas)
   Semana 1 = lunes 7 sep 2026 · fin de docencia = viernes 18 dic 2026.
   Lo usan Ponte al día, la portada y el calendario (CRONOGRAMA_SEMANAS).
   ========================================================================== */

const CURSO_INICIO = new Date(2026, 8, 7); // lunes, semana 1
const CURSO_FIN = new Date(2026, 11, 18);

const TEMAS_CURSO = {
  1: { titulo: 'Introducción a la IPO', paginas: '16–48', peso: 33, pagina: 'tema-1.html' },
  2: { titulo: 'El factor humano', paginas: '49–115', peso: 67, pagina: 'tema-2.html' },
  3: { titulo: 'Metáforas', paginas: '116–166', peso: 51, pagina: 'tema-3.html' },
  4: { titulo: 'Ingeniería de la interfaz', paginas: '167–222', peso: 56, pagina: 'tema-4.html' },
  5: { titulo: 'Internacionalización', paginas: '223–284', peso: 62 },
  6: { titulo: 'El diseño gráfico', paginas: '285–349', peso: 65 },
  7: { titulo: 'Estilos y paradigmas', paginas: '350–406', peso: 57 },
  8: { titulo: 'Accesibilidad', paginas: '407–456', peso: 50 },
  9: { titulo: 'Evaluación', paginas: '457–515', peso: 59 },
  10: { titulo: 'Estándares y guías de estilo', paginas: '516–602', peso: 87 }
};

/* Planificación oficial de teoría (IPO2627.pdf, p. 15): cada clase con su tema y lección.
   Miércoles y jueves; los días sin clase (inauguración, festivos) no aparecen. */
const SESIONES_TEORIA = [
  { fecha: '2026-09-09', tema: 1, leccion: 'L1', contenido: 'Presentación e Introducción a la IPO' },
  { fecha: '2026-09-10', tema: 1, leccion: 'L1', contenido: 'Introducción a la IPO' },
  { fecha: '2026-09-17', tema: 2, leccion: 'L2', contenido: 'El modelo mental y modelo de procesamiento' },
  { fecha: '2026-09-23', tema: 2, leccion: 'L3', contenido: 'Los sentidos' },
  { fecha: '2026-09-24', tema: 2, leccion: 'L4', contenido: 'El modelo de memoria' },
  { fecha: '2026-09-30', tema: 3, leccion: 'L5', contenido: 'Metáforas' },
  { fecha: '2026-10-01', tema: 4, leccion: 'L6', contenido: 'Ingeniería de la interfaz → Análisis de tareas. Implementación' },
  { fecha: '2026-10-07', tema: 4, leccion: 'L7', contenido: 'Prototipos → Conclusiones' },
  { fecha: '2026-10-08', tema: 5, leccion: 'L8', contenido: 'Internacionalización → Esquemas de codificación Unicode' },
  { fecha: '2026-10-14', tema: 5, leccion: 'L9', contenido: 'Zonas de internacionalización → Conclusiones' },
  { fecha: '2026-10-15', tema: 6, leccion: 'L10', contenido: 'El diseño gráfico → Elementos de la imagen. La composición' },
  { fecha: '2026-10-21', tema: 6, leccion: 'L11', contenido: 'Uso del color' },
  { fecha: '2026-10-22', tema: 6, leccion: 'L12', contenido: 'Técnicas de diseño gráfico → Conclusiones' },
  { fecha: '2026-10-28', tema: 7, leccion: 'L13', contenido: 'Estilos y paradigmas → Ejemplo: Microsoft Agent' },
  { fecha: '2026-10-29', tema: 7, leccion: 'L14', contenido: 'Paradigmas de interacción → Conclusiones' },
  { fecha: '2026-11-04', tema: 8, leccion: 'L15', contenido: 'Accesibilidad → Ceguera. Recomendaciones' },
  { fecha: '2026-11-05', tema: 8, leccion: 'L16', contenido: 'Discapacidades auditivas → Conclusiones' },
  { fecha: '2026-11-11', tema: 9, leccion: 'L17', contenido: 'Evaluación → Inspección: inspección de estándares' },
  { fecha: '2026-11-12', tema: 9, leccion: 'L18', contenido: 'Inspección: indagación' },
  { fecha: '2026-11-18', tema: 9, leccion: 'L19', contenido: 'Inspección: test → Conclusiones' },
  { fecha: '2026-11-19', tema: 10, leccion: 'L20', contenido: 'Estándares y guías de estilo → Estándares de facto' },
  { fecha: '2026-11-26', tema: 10, leccion: 'L21', contenido: 'Guías de estilo → Conclusiones' },
  { fecha: '2026-12-02', tema: null, leccion: '', contenido: 'Ejercicios de examen' }
];

/* Prácticas de laboratorio (martes, A3-170), misma fuente. */
const SESIONES_PRACTICAS = [
  { fecha: '2026-09-15', contenido: 'Práctica 1 · Introducción (Tema I)' },
  { fecha: '2026-09-22', contenido: 'Práctica 1 · Introducción' },
  { fecha: '2026-09-29', contenido: 'Práctica 1 · Introducción · Evaluación' },
  { fecha: '2026-10-06', contenido: 'Práctica 2 · Metáforas (Tema III)' },
  { fecha: '2026-10-13', contenido: 'Práctica 2 · Metáforas · Evaluación' },
  { fecha: '2026-10-20', contenido: 'Práctica 3 · Diseño de la interfaz (Tema IV)' },
  { fecha: '2026-10-27', contenido: 'Práctica 3 · Diseño de la interfaz' },
  { fecha: '2026-11-03', contenido: 'Práctica 3 · Diseño de la interfaz · Evaluación' },
  { fecha: '2026-11-10', contenido: 'Práctica 4 · Internacionalización (Tema V) · obligatoria' },
  { fecha: '2026-11-17', contenido: 'Práctica 4 · Internacionalización' },
  { fecha: '2026-11-24', contenido: 'Práctica 4 · Internacionalización' },
  { fecha: '2026-12-01', contenido: 'Práctica 4 · Internacionalización' },
  { fecha: '2026-12-15', contenido: 'Práctica 4 · Internacionalización · Evaluación' }
];

/* Días sin clase que marca la planificación. */
const DIAS_SIN_CLASE = {
  '2026-09-16': 'Inauguración del curso',
  '2026-10-12': 'El Pilar',
  '2026-10-19': 'San Lucas',
  '2026-11-02': 'Todos los Santos',
  '2026-11-25': 'Santa Catalina',
  '2026-12-07': 'Constitución',
  '2026-12-08': 'Inmaculada',
  '2026-12-09': 'TC × 5'
};

const fechaISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const desdeISO = iso => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };

const CURSO_OVERRIDE_KEY = 'ipo_tema_profesor_override';
const DIA_MS = 86400000;

function hoySinHora(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function semanaDelCurso(d = new Date()) {
  const dias = Math.floor((hoySinHora(d) - CURSO_INICIO) / DIA_MS);
  return Math.max(1, Math.min(15, Math.floor(dias / 7) + 1));
}

function lunesDeSemana(sem) {
  return new Date(CURSO_INICIO.getTime() + (sem - 1) * 7 * DIA_MS);
}

/* Qué tema se imparte cada semana (último tema dado en la semana), para el calendario. */
const CRONOGRAMA_SEMANAS = Array.from({ length: 15 }, (_, i) => {
  const sem = i + 1;
  const ini = fechaISO(lunesDeSemana(sem));
  const fin = fechaISO(new Date(lunesDeSemana(sem).getTime() + 6 * DIA_MS));
  const clases = SESIONES_TEORIA.filter(s => s.tema && s.fecha >= ini && s.fecha <= fin);
  return { semana: sem, leccion: clases.map(c => c.leccion).join('-'), tema: clases.length ? clases[clases.length - 1].tema : null };
}).map((c, i, arr) => c.tema ? c : Object.assign(c, { tema: (arr.slice(0, i).reverse().find(x => x.tema) || { tema: 10 }).tema }));

/* Clases de teoría ya dadas hasta hoy (incluido). */
function clasesDadas(d = new Date()) {
  const hoy = fechaISO(d);
  return SESIONES_TEORIA.filter(s => s.tema && s.fecha <= hoy);
}

function proximasClases(n = 2, d = new Date()) {
  const hoy = fechaISO(d);
  return SESIONES_TEORIA.filter(s => s.fecha > hoy).slice(0, n);
}

function proximaPractica(d = new Date()) {
  const hoy = fechaISO(d);
  return SESIONES_PRACTICAS.find(s => s.fecha >= hoy) || null;
}

function sesionesDeTema(t) {
  return SESIONES_TEORIA.filter(s => s.tema === t);
}

/* Tema en clase hoy: el de la última clase de teoría dada. Se puede corregir a mano. */
function temaProfesor(d = new Date()) {
  try {
    const manual = Number(localStorage.getItem(CURSO_OVERRIDE_KEY));
    if (manual >= 1 && manual <= 10) return manual;
  } catch (e) { /* sin almacenamiento */ }
  const dadas = clasesDadas(d);
  return dadas.length ? dadas[dadas.length - 1].tema : 1;
}

function temaProfesorPorFecha(d = new Date()) {
  const dadas = clasesDadas(d);
  return dadas.length ? dadas[dadas.length - 1].tema : 1;
}

function fijarTemaProfesor(tema) {
  try {
    if (tema) localStorage.setItem(CURSO_OVERRIDE_KEY, String(tema));
    else localStorage.removeItem(CURSO_OVERRIDE_KEY);
  } catch (e) { /* sin almacenamiento */ }
}

/* Domingo de la semana en que se da la última clase del tema: fecha para tenerlo estudiado. */
function objetivoDeTema(t) {
  const ses = sesionesDeTema(t);
  if (!ses.length) return CURSO_FIN;
  const ultima = desdeISO(ses[ses.length - 1].fecha);
  return new Date(ultima.getTime() + ((7 - ultima.getDay()) % 7) * DIA_MS);
}

/* Fecha en que empieza el tema siguiente al que se da ahora. */
function inicioDelSiguienteTema(d = new Date()) {
  const t = temaProfesor(d);
  const sig = SESIONES_TEORIA.find(s => s.tema && s.tema > t);
  return sig ? desdeISO(sig.fecha) : CURSO_FIN;
}

const FECHA_LARGA = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
const FECHA_CORTA = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

/* ---------- Competencias demostradas (localStorage) ---------- */
const COMP_KEY = 'ipo_competencias_v1';

function leerCompetencias() {
  try { return JSON.parse(localStorage.getItem(COMP_KEY) || '{}'); } catch (e) { return {}; }
}

function guardarCompetencias(c) {
  try { localStorage.setItem(COMP_KEY, JSON.stringify(c)); } catch (e) { /* sin almacenamiento */ }
}

/* Marca el tema como superado en el progreso que lee el calendario. */
function marcarTemaSuperadoEnCalendario(tema) {
  try {
    const p = JSON.parse(localStorage.getItem('ipo_uja_progress_v2') || '{}');
    p[String(tema)] = Object.assign({}, p[String(tema)], { testAntiolvido: true });
    localStorage.setItem('ipo_uja_progress_v2', JSON.stringify(p));
  } catch (e) { /* sin almacenamiento */ }
}
