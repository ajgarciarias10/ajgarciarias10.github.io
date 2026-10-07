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
  try { return JSON.parse((window.IPOStorage || localStorage).getItem(CONCEPTOS_KEY) || '{}'); } catch (e) { return {}; }
}
function guardarConceptos(c) {
  try { (window.IPOStorage || localStorage).setItem(CONCEPTOS_KEY, JSON.stringify(c)); } catch (e) { /* sin almacenamiento */ }
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
        : `<button type="button" data-prueba="${t}">${e.hechas ? `Continuar el test del tema` : 'Hacer test de 40 preguntas'}</button>
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
      : `<button type="button" data-prueba="${prof}">${eProf.hechas ? `Demostrar las ${eProf.total - eProf.hechas} restantes` : 'Hacer test de 40 preguntas'}</button>
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

/* All topic assessments use the saved 40-question test. */
function abrirPrueba(tema) {
  location.href = TEMAS_CURSO[tema].pagina || `generador.html?tema=${tema}`;
}
render();
