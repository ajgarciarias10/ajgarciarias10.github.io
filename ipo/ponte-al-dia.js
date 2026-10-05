'use strict';
/* ============================================================================
   IPO · Ponte al día
   Un alumno que empieza tarde demuestra, tema a tema, las competencias que la
   clase ya ha visto. Competencia = apartado del tema; se demuestra acertando
   2 de 2 preguntas de ese apartado. Requiere curso.js, datos-evaluacion.js y
   preguntas-globales.js.
   ========================================================================== */

const $ = id => document.getElementById(id);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const barajar = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const PREGUNTAS_POR_COMPETENCIA = 2;
const CONCEPTOS_KEY = 'ipo_conceptos_v1';

/* Apartados (competencias) de cada tema con banco de preguntas. */
const COMPETENCIAS = {};
BANCO_GLOBAL.forEach(q => {
  const t = Number(q.tema);
  if (!t) return;
  COMPETENCIAS[t] = COMPETENCIAS[t] || [];
  COMPETENCIAS[t][q.bloqueIndex] = q.bloqueNombre;
});

const tieneBanco = t => Array.isArray(COMPETENCIAS[t]);
const conceptosDe = t => (typeof ESQUEMAS_TEMARIO !== 'undefined' && ESQUEMAS_TEMARIO[t]) ? ESQUEMAS_TEMARIO[t].conceptosClave : [];

function leerConceptos() {
  try { return JSON.parse(localStorage.getItem(CONCEPTOS_KEY) || '{}'); } catch (e) { return {}; }
}
function guardarConceptos(c) {
  try { localStorage.setItem(CONCEPTOS_KEY, JSON.stringify(c)); } catch (e) { /* sin almacenamiento */ }
}

/* Estado de un tema: { total, hechas, items:[{nombre, ok}] } */
function estadoTema(t) {
  if (tieneBanco(t)) {
    const comp = leerCompetencias()[t] || {};
    const items = COMPETENCIAS[t].map((nombre, i) => ({ nombre, ok: Boolean(comp[i]) }));
    return { total: items.length, hechas: items.filter(x => x.ok).length, items };
  }
  const marcados = leerConceptos()[t] || [];
  const items = conceptosDe(t).map((nombre, i) => ({ nombre, ok: marcados.includes(i) }));
  return { total: items.length, hechas: items.filter(x => x.ok).length, items };
}

const temaCompleto = t => { const e = estadoTema(t); return e.total > 0 && e.hechas === e.total; };

/* Fechas objetivo: reparte los temas pendientes según su extensión. */
function planificar(pendientes) {
  const hoy = hoySinHora();
  // Meta: el domingo en que debe estar estudiado el tema que se da ahora,
  // pero con al menos 3 días por tema pendiente para que sea realista.
  let meta = objetivoDeTema(temaProfesor());
  const minimo = new Date(hoy.getTime() + Math.max(3, pendientes.length * 3) * DIA_MS);
  if (meta < minimo) meta = minimo;

  const dias = Math.round((meta - hoy) / DIA_MS);
  const pesoTotal = pendientes.reduce((s, t) => s + TEMAS_CURSO[t].peso, 0);
  const plan = {};
  let acumulado = 0;
  pendientes.forEach(t => {
    acumulado += TEMAS_CURSO[t].peso;
    plan[t] = new Date(hoy.getTime() + Math.max(1, Math.round(dias * acumulado / pesoTotal)) * DIA_MS);
  });
  return { plan, dias };
}

/* ---------- Render ---------- */

function renderCabecera(prof, atrasados, dias) {
  const sem = semanaDelCurso();
  $('today-strip').innerHTML =
    `<span>Hoy, <strong>${esc(FECHA_LARGA.format(new Date()))}</strong></span>` +
    `<span>Semana <strong>${sem}</strong> del curso</span>` +
    `<span>En clase: <strong>Tema ${prof}</strong></span>` +
    proximasClases(1).map(c => `<span>Próxima clase: <strong>${esc(FECHA_CORTA.format(desdeISO(c.fecha)))}</strong> · ${c.tema ? `Tema ${c.tema} (${c.leccion})` : esc(c.contenido)}</span>`).join('');

  let total = 0, hechas = 0;
  atrasados.forEach(t => { const e = estadoTema(t); total += e.total; hechas += e.hechas; });
  const pendientes = atrasados.filter(t => !temaCompleto(t));

  $('st-comp').textContent = `${hechas}/${total}`;
  $('st-temas').textContent = pendientes.length;
  $('st-dias').textContent = pendientes.length ? dias : '—';
  $('pad-bar').style.width = total ? `${Math.round(100 * hechas / total)}%` : '100%';

  if (!atrasados.length) {
    $('pad-title').textContent = 'Vas al día';
    $('pad-lead').textContent = 'La clase está en el primer tema: no hay nada que recuperar. Sigue el tema actual desde el principio.';
  } else if (!pendientes.length) {
    $('pad-title').innerHTML = 'Estás al día. <span class="gradient-text">Bien hecho.</span>';
    $('pad-lead').textContent = `Has demostrado todas las competencias de los temas 1–${prof - 1}. Ahora céntrate en el Tema ${prof}, el que se está dando en clase.`;
  } else {
    $('pad-title').innerHTML = `La clase va por el Tema ${prof}.<br><span class="gradient-text">Te toca recuperar ${pendientes.length === 1 ? '1 tema' : pendientes.length + ' temas'}.</span>`;
  }
}

function renderSelectorProfesor(prof) {
  const sel = $('prof-tema');
  sel.innerHTML = Object.keys(TEMAS_CURSO).map(t =>
    `<option value="${t}" ${Number(t) === prof ? 'selected' : ''}>Tema ${t}</option>`).join('');
  sel.onchange = () => {
    const elegido = Number(sel.value);
    fijarTemaProfesor(elegido === temaProfesorPorFecha() ? null : elegido);
    render();
  };
}

/* «Se dio en clase el 17 sep – 24 sep (L2–L4)» */
function cuandoSeDio(t) {
  const ses = sesionesDeTema(t);
  if (!ses.length) return '';
  const f = c => FECHA_CORTA.format(desdeISO(c.fecha));
  const lecs = [...new Set(ses.map(c => c.leccion))];
  const rango = ses.length > 1 ? `${f(ses[0])} – ${f(ses[ses.length - 1])}` : f(ses[0]);
  return `${rango} · ${lecs.length > 1 ? lecs[0] + '–' + lecs[lecs.length - 1] : lecs[0]}`;
}

/* Lista de clases del tema con su fecha: las dadas, marcadas. */
function htmlClases(t) {
  const hoy = fechaISO(new Date());
  return '<ul class="concept-list">' + sesionesDeTema(t).map(c => {
    const dada = c.fecha <= hoy;
    return `<li style="display:flex;gap:10px;"><span class="badge ${dada ? 'ok' : 'brand'}" style="min-width:92px;justify-content:center;">${esc(FECHA_CORTA.format(desdeISO(c.fecha)))}</span><span><strong>${c.leccion}</strong> · ${esc(c.contenido)}${dada ? '' : ' <span class="muted">(próxima)</span>'}</span></li>`;
  }).join('') + '</ul>';
}

function htmlCompetencias(estado) {
  return '<ul class="skills">' + estado.items.map(it =>
    `<li class="${it.ok ? 'ok' : ''}"><span class="chk">${it.ok ? '✓' : ''}</span>${esc(it.nombre)}</li>`).join('') + '</ul>';
}

function htmlConceptos(t, estado) {
  return '<ul class="concept-list">' + estado.items.map((it, i) =>
    `<li><label><input type="checkbox" data-tema="${t}" data-concepto="${i}" ${it.ok ? 'checked' : ''}> <span>${esc(it.nombre)}</span></label></li>`).join('') + '</ul>';
}

function render() {
  const prof = temaProfesor();
  const atrasados = [];
  for (let t = 1; t < prof; t++) atrasados.push(t);
  const pendientes = atrasados.filter(t => !temaCompleto(t));
  const { plan, dias } = planificar(pendientes);
  const siguiente = pendientes[0];

  renderCabecera(prof, atrasados, dias);
  renderSelectorProfesor(prof);

  const pasos = atrasados.map(t => {
    const info = TEMAS_CURSO[t];
    const e = estadoTema(t);
    const completo = temaCompleto(t);
    const clase = completo ? 'is-done' : (t === siguiente ? 'is-next' : '');
    let etiqueta;
    if (completo) etiqueta = '<span class="badge ok">Demostrado</span>';
    else if (plan[t]) etiqueta = `<span class="badge ${t === siguiente ? 'brand' : ''}">Objetivo: ${esc(FECHA_CORTA.format(plan[t]))}</span>`;

    let cuerpo, acciones;
    if (tieneBanco(t)) {
      cuerpo = htmlCompetencias(e);
      const restantes = e.total - e.hechas;
      acciones = completo
        ? `<a class="button secondary" href="${info.pagina}">Seguir practicando</a>`
        : `<button type="button" data-prueba="${t}">${e.hechas ? `Demostrar las ${restantes} restantes` : 'Demostrar competencias'}</button>
           <a class="button ghost" href="${info.pagina}">Repasar antes →</a>`;
    } else {
      cuerpo = `<p class="muted" style="margin:14px 0 0;font-size:.9rem;">Este tema aún no tiene banco de preguntas. Estúdialo con la guía y marca cada concepto cuando sepas explicarlo sin apuntes.</p>` + htmlConceptos(t, e);
      acciones = `<a class="button secondary" href="guia-estudio.html">Abrir la guía</a>`;
    }

    return `<li class="route-step ${clase}">
      <span class="route-marker">${completo ? '✓' : t}</span>
      <article class="card route-card">
        <div class="route-head">
          <div>
            <span class="route-meta">Tema ${t} · pp. ${info.paginas} · dado en clase: ${cuandoSeDio(t)} · ${e.hechas}/${e.total} competencias</span>
            <h3>${esc(info.titulo)}</h3>
          </div>
          ${etiqueta || ''}
        </div>
        ${cuerpo}
        <div class="actions">${acciones}</div>
      </article>
    </li>`;
  });

  // Tema en clase ahora: se estudia esta semana (objetivo: el domingo)
  const infoProf = TEMAS_CURSO[prof];
  const eProf = estadoTema(prof);
  const profCompleto = temaCompleto(prof);
  const domingo = objetivoDeTema(prof);
  const quedanClases = sesionesDeTema(prof).some(c => c.fecha > fechaISO(new Date()));
  let cuerpoProf, accionesProf;
  if (tieneBanco(prof)) {
    cuerpoProf = `<p class="muted" style="margin:14px 0 0;font-size:.9rem;">${quedanClases ? 'Aún queda clase de este tema: ve, estúdialo' : 'Ya se ha terminado de dar en clase: estúdialo'} y demuestra sus competencias antes del ${esc(FECHA_CORTA.format(domingo))}.</p>` + htmlClases(prof) + htmlCompetencias(eProf);
    accionesProf = profCompleto
      ? `<a class="button secondary" href="${infoProf.pagina}">Seguir practicando</a>`
      : `<button type="button" data-prueba="${prof}">${eProf.hechas ? `Demostrar las ${eProf.total - eProf.hechas} restantes` : 'Demostrar competencias'}</button>
         <a class="button ghost" href="${infoProf.pagina}">Practicar antes →</a>`;
  } else {
    cuerpoProf = `<p class="muted" style="margin:14px 0 0;font-size:.9rem;">Ve a clase aunque aún estés recuperando: este tema lo sigues en directo. Marca cada concepto cuando lo entiendas.</p>` + htmlClases(prof) + (eProf.total ? htmlConceptos(prof, eProf) : '');
    accionesProf = `<a class="button ghost" href="calendario.html">Planificar la semana →</a>`;
  }
  pasos.push(`<li class="route-step ${profCompleto ? 'is-done' : 'is-class'}">
    <span class="route-marker">${profCompleto ? '✓' : prof}</span>
    <article class="card route-card">
      <div class="route-head">
        <div>
          <span class="route-meta">Tema ${prof} · pp. ${infoProf.paginas} · ${eProf.hechas}/${eProf.total} ${tieneBanco(prof) ? 'competencias' : 'conceptos'}</span>
          <h3>${esc(infoProf.titulo)}</h3>
        </div>
        ${profCompleto ? '<span class="badge ok">Demostrado</span>' : '<span class="badge brand"><span class="dot"></span> Ahora en clase</span>'}
      </div>
      ${cuerpoProf}
      <div class="actions">${accionesProf}</div>
    </article>
  </li>`);

  // Siguiente tema según la planificación oficial
  const sigTema = prof + 1;
  const clasesSig = sesionesDeTema(sigTema);
  if (TEMAS_CURSO[sigTema] && clasesSig.length) {
    pasos.push(`<li class="route-step">
      <span class="route-marker">${sigTema}</span>
      <article class="card route-card" style="opacity:.7;">
        <div class="route-head">
          <div>
            <span class="route-meta">Tema ${sigTema} · pp. ${TEMAS_CURSO[sigTema].paginas} · próximo en clase</span>
            <h3>${esc(TEMAS_CURSO[sigTema].titulo)}</h3>
          </div>
          <span class="badge">Empieza ${esc(FECHA_CORTA.format(desdeISO(clasesSig[0].fecha)))}</span>
        </div>
        ${htmlClases(sigTema)}
      </article>
    </li>`);
  }

  $('route').innerHTML = pasos.join('');

  $('route').querySelectorAll('[data-prueba]').forEach(b => {
    b.onclick = () => abrirPrueba(Number(b.dataset.prueba));
  });
  $('route').querySelectorAll('input[data-concepto]').forEach(chk => {
    chk.onchange = () => {
      const c = leerConceptos();
      const t = chk.dataset.tema;
      const i = Number(chk.dataset.concepto);
      const set = new Set(c[t] || []);
      if (chk.checked) set.add(i); else set.delete(i);
      c[t] = [...set];
      guardarConceptos(c);
      render();
    };
  });
}

/* ---------- Prueba de competencias ---------- */

let prueba = null;

function abrirPrueba(tema) {
  const comp = leerCompetencias()[tema] || {};
  const preguntas = [];
  COMPETENCIAS[tema].forEach((_, bloque) => {
    if (comp[bloque]) return;
    const pool = BANCO_GLOBAL.filter(q => Number(q.tema) === tema && q.bloqueIndex === bloque);
    barajar(pool).slice(0, PREGUNTAS_POR_COMPETENCIA).forEach(q => preguntas.push(q));
  });
  if (!preguntas.length) return;

  prueba = { tema, preguntas: barajar(preguntas), i: 0, orden: [], respuesta: null, aciertos: {} };
  $('quiz-title').textContent = `Tema ${tema} · Prueba`;
  $('quiz').showModal();
  pintarPregunta();
}

function pintarPregunta() {
  const p = prueba;
  const q = p.preguntas[p.i];
  if (p.respuesta === null) p.orden = barajar([0, 1, 2, 3]);
  const total = p.preguntas.length;

  $('quiz-count').textContent = `${p.i + 1}/${total}`;
  $('quiz-bar').style.width = `${Math.round(100 * (p.i + (p.respuesta !== null ? 1 : 0)) / total)}%`;

  const respondida = p.respuesta !== null;
  const opciones = p.orden.map((oi, idx) => {
    const o = q.opciones[oi];
    let cls = 'option';
    let fb = '';
    if (respondida) {
      cls += ' is-disabled';
      if (oi === p.respuesta) cls += o.correcta ? ' correct-choice' : ' wrong-choice';
      else if (o.correcta) cls += ' revealed-correct';
      if (oi === p.respuesta || o.correcta) fb = `<div class="option-feedback">${esc(o.explicacion)}</div>`;
    }
    return `<label class="${cls}">
      <input type="radio" name="q" value="${oi}" ${oi === p.respuesta ? 'checked' : ''} ${respondida ? 'disabled' : ''}>
      <div><strong>${'ABCD'[idx]}.</strong> ${esc(o.texto)}${fb}</div>
    </label>`;
  }).join('');

  $('quiz-body').innerHTML =
    `<span class="badge">${esc(q.bloqueNombre)}</span>
     <h3>${esc(q.enunciado)}</h3>
     <form id="quiz-form" onsubmit="return false;">${opciones}</form>`;

  $('quiz-form').onchange = e => {
    if (e.target.name !== 'q' || p.respuesta !== null) return;
    p.respuesta = Number(e.target.value);
    const ok = q.opciones[p.respuesta].correcta;
    p.aciertos[q.bloqueIndex] = (p.aciertos[q.bloqueIndex] || 0) + (ok ? 1 : 0);
    pintarPregunta();
  };

  const ultima = p.i === total - 1;
  $('quiz-foot').innerHTML = respondida
    ? `<button type="button" id="quiz-next">${ultima ? 'Ver resultado' : 'Siguiente →'}</button>`
    : '<span class="muted" style="font-size:.82rem;">Responde sin mirar apuntes · teclas 1–4</span>';
  if (respondida) {
    $('quiz-next').onclick = siguientePregunta;
    $('quiz-next').focus();
  }
}

function siguientePregunta() {
  if (prueba.i < prueba.preguntas.length - 1) {
    prueba.i++;
    prueba.respuesta = null;
    pintarPregunta();
  } else {
    terminarPrueba();
  }
}

function terminarPrueba() {
  const p = prueba;
  const tema = p.tema;
  const todas = leerCompetencias();
  const comp = todas[tema] || {};
  const hoy = new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD local

  const evaluados = [...new Set(p.preguntas.map(q => q.bloqueIndex))].sort((a, b) => a - b);
  const nuevas = [];
  const fallidas = [];
  evaluados.forEach(b => {
    const n = p.preguntas.filter(q => q.bloqueIndex === b).length;
    if ((p.aciertos[b] || 0) === n) { comp[b] = hoy; nuevas.push(b); } else fallidas.push(b);
  });
  todas[tema] = comp;
  guardarCompetencias(todas);
  if (temaCompleto(tema)) marcarTemaSuperadoEnCalendario(tema);

  const totalAciertos = Object.values(p.aciertos).reduce((s, n) => s + n, 0);
  const completo = temaCompleto(tema);
  const info = TEMAS_CURSO[tema];

  $('quiz-count').textContent = '';
  $('quiz-bar').style.width = '100%';
  $('quiz-body').innerHTML =
    `<div class="result-hero">
       <div class="num">${totalAciertos}/${p.preguntas.length}</div>
       <p class="muted">${completo ? `Tema ${tema} demostrado por completo.` : `${nuevas.length} competencia${nuevas.length === 1 ? '' : 's'} nueva${nuevas.length === 1 ? '' : 's'} demostrada${nuevas.length === 1 ? '' : 's'}.`}</p>
     </div>
     <ul class="skills">${evaluados.map(b =>
       `<li class="${nuevas.includes(b) ? 'ok' : 'fail'}"><span class="chk">${nuevas.includes(b) ? '✓' : ''}</span>
         <span style="flex:1">${esc(COMPETENCIAS[tema][b])}</span>
         ${nuevas.includes(b) ? '' : `<a href="${info.pagina}?apartado=${b}" style="font-size:.8rem;white-space:nowrap;">Repasar →</a>`}
       </li>`).join('')}</ul>
     ${fallidas.length ? '<p class="muted" style="font-size:.88rem;margin-top:14px;">Repasa los apartados marcados con el generador del tema y vuelve a intentarlo: solo se te preguntará lo pendiente.</p>' : ''}`;

  $('quiz-foot').innerHTML = fallidas.length
    ? `<button type="button" class="secondary" id="quiz-done">Cerrar</button><button type="button" id="quiz-retry">Reintentar lo pendiente</button>`
    : `<button type="button" id="quiz-done">${completo ? 'Siguiente tema →' : 'Cerrar'}</button>`;
  $('quiz-done').onclick = () => { $('quiz').close(); };
  if ($('quiz-retry')) $('quiz-retry').onclick = () => abrirPrueba(tema);

  prueba = null;
  render();
}

$('quiz-close').onclick = () => $('quiz').close();
$('quiz').addEventListener('close', () => {
  prueba = null;
  const sig = document.querySelector('.route-step.is-next');
  if (sig) sig.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.addEventListener('keydown', e => {
  if (!prueba || !$('quiz').open) return;
  const n = ['1', '2', '3', '4'].indexOf(e.key);
  if (n !== -1 && prueba.respuesta === null) {
    const input = $('quiz-form').querySelectorAll('input')[n];
    if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); }
  }
});

render();
