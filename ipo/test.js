'use strict';
const $ = id => document.getElementById(id);
const TEMA = document.documentElement.dataset.tema || '1';
const KEY = `ipo-tema${TEMA}-v1`;
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = values => { const a = [...values]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };

let state = null;
let saved = null;
let history = [];

try {
  const data = JSON.parse(localStorage.getItem(KEY) || '{}');
  history = Array.isArray(data.history) ? data.history.slice(0,10) : [];
  const s = data.active;
  if(s && Array.isArray(s.items) && s.items.length && s.items.every(i => BANCO.some(q=>q.id===i.id) && Array.isArray(i.order) && i.order.length===4 && new Set(i.order).size===4 && i.order.every(n=>Number.isInteger(n)&&n>=0&&n<4) && (i.answer===null || i.order.includes(i.answer)) && ['alta','media','azar',null].includes(i.confidence)) && Number.isInteger(s.position) && s.position>=0 && s.position<s.items.length) saved = s;
} catch {
  $('storage-note').textContent = 'No se ha podido recuperar el guardado local. Puedes realizar la prueba normalmente.';
}
$('resume').hidden = !saved;

function persist(){
  try {
    localStorage.setItem(KEY, JSON.stringify({history, active: state && !state.finished ? state : null}));
  } catch {
    $('storage-note').textContent = 'El navegador no permite guardar el progreso. Mantén esta pestaña abierta hasta terminar.';
    $('storage-note').hidden = false;
    if($('setup').hidden) $('exam').prepend($('storage-note'));
  }
}

function question(item){ return BANCO.find(q=>q.id===item.id); }
function correct(item){ return item.answer !== null && question(item).opciones[item.answer].correcta; }
function pending(item){ return !correct(item) || item.confidence!=='alta'; }
function stats(items){
  const a = items.filter(correct).length;
  const b = items.filter(i=>i.answer===null).length;
  return {a, b, e: items.length - a - b, n: items.length};
}
function score(s){ return (Math.max(0, (s.a - s.e/3)/s.n) * 10).toFixed(2); }

function start(ids, label){
  state = {
    items: shuffle(ids).map(id => ({id, order: shuffle([0,1,2,3]), answer: null, confidence: null, note: ''})),
    position: 0,
    label,
    started: Date.now(),
    finished: false
  };
  saved = null;
  $('resume').hidden = true;
  $('setup').hidden = true;
  $('results').hidden = true;
  $('history').hidden = true;
  $('exam').hidden = false;
  $('finish-check').hidden = true;
  persist();
  render();
}

$('start').onclick = () => {
  const scope = $('scope').value;
  let pool = BANCO.filter(q => scope === 'all' || q.bloque === Number(scope)).map(q => q.id);
  pool = shuffle(pool);
  const countEl = $('question-count');
  if (countEl && countEl.value !== 'all') {
    const limit = Math.min(Number(countEl.value) || 10, pool.length);
    pool = pool.slice(0, limit);
  }
  const label = scope === 'all' ? 'Examen global' : BLOQUES[Number(scope)];
  start(pool, label);
};

$('resume').onclick = () => {
  state = saved;
  $('setup').hidden = true;
  $('results').hidden = true;
  $('history').hidden = true;
  $('exam').hidden = false;
  render();
};

function render(focus = true){
  const item = state.items[state.position], q = question(item);
  const isAnswered = item.answer !== null;
  const isCorrect = isAnswered && q.opciones[item.answer].correcta;

  // Título sin números intimidantes
  $('counter').textContent = state.label;
  updateProgress();

  // Navegador de puntos/píldoras sin números visibles (reduce pereza cognitiva)
  $('navigator').innerHTML = state.items.map((x, i) => {
    let cls = '';
    if (x.answer !== null) {
      cls = question(x).opciones[x.answer].correcta ? 'correct-step' : 'wrong-step';
    }
    const current = i === state.position ? 'aria-current="step"' : '';
    return `<button type="button" data-index="${i}" class="${cls}" ${current} aria-label="Pregunta ${i+1}${x.answer!==null?(question(x).opciones[x.answer].correcta?', correcta':', incorrecta'):', sin responder'}"></button>`;
  }).join('');

  // Banner interactivo inmediato
  let bannerHTML = '';
  if (isAnswered) {
    bannerHTML = isCorrect
      ? `<div class="instant-banner is-correct">✓ ¡Correcto! ${escapeHTML(q.opciones[item.answer].explicacion)}</div>`
      : `<div class="instant-banner is-wrong">✗ Incorrecto. La opción correcta está señalada en verde.</div>`;
  }

  // Opciones con feedback inmediato
  const optionsHTML = item.order.map((oi, i) => {
    const o = q.opciones[oi];
    let optionClass = 'option';
    let badgeHTML = '';
    let explanationHTML = '';

    if (isAnswered) {
      optionClass += ' is-disabled';
      if (item.answer === oi) {
        if (o.correcta) {
          optionClass += ' correct-choice';
          badgeHTML = ' <span class="badge ok">✓ Tu respuesta</span>';
        } else {
          optionClass += ' wrong-choice';
          badgeHTML = ' <span class="badge wrong">✗ Tu respuesta</span>';
        }
      } else if (o.correcta) {
        optionClass += ' revealed-correct';
        badgeHTML = ' <span class="badge ok">✓ Respuesta correcta</span>';
      }
      explanationHTML = `<div class="option-feedback">${escapeHTML(o.explicacion)}</div>`;
    }

    return `<label class="${optionClass}">
      <input type="radio" name="answer" value="${oi}" ${item.answer===oi?'checked':''} ${isAnswered?'disabled':''}>
      <div style="flex:1;">
        <span><strong>${'ABCD'[i]}.</strong> ${escapeHTML(o.texto)}${badgeHTML}</span>
        ${explanationHTML}
      </div>
    </label>`;
  }).join('');

  $('question').innerHTML = `
    <fieldset>
      <legend tabindex="-1" id="prompt">${escapeHTML(q.enunciado)}</legend>
      ${bannerHTML}
      ${optionsHTML}
    </fieldset>
    ${!isAnswered ? '<button type="button" id="clear" class="secondary" style="margin-top:6px;">Saltar pregunta</button>' : ''}
    <details class="confidence-drawer" ${item.note || item.confidence ? 'open' : ''}>
      <summary>¿Dudas o notas personales? <small>(opcional)</small></summary>
      <fieldset class="confidence" style="margin-top:10px;">
        ${[['alta','Estoy seguro'],['media','Tengo dudas'],['azar','Al azar']].map(([v,t])=>`<label><input type="radio" name="confidence" value="${v}" ${item.confidence===v?'checked':''}>${t}</label>`).join('')}
      </fieldset>
      <label for="reason" style="margin-top:8px; display:block;">Tu razonamiento:</label>
      <textarea id="reason" placeholder="¿Por qué elegiste esta opción o qué matiz descarta la más parecida?">${escapeHTML(item.note||'')}</textarea>
    </details>
  `;

  $('question').onchange = e => {
    if (e.target.name === 'answer' && item.answer === null) {
      item.answer = Number(e.target.value);
      persist();
      updateProgress();
      updateNav();
      render(false);
    }
    if (e.target.name === 'confidence') {
      item.confidence = e.target.value;
      persist();
    }
  };

  const reasonEl = $('reason');
  if (reasonEl) {
    reasonEl.oninput = e => { item.note = e.target.value; persist(); };
  }

  const clearBtn = $('clear');
  if (clearBtn) {
    clearBtn.onclick = () => {
      item.answer = null;
      item.confidence = null;
      persist();
      if (state.position < state.items.length - 1) {
        go(state.position + 1);
      } else {
        render(false);
      }
    };
  }

  $('prev').disabled = state.position === 0;

  if (state.position === state.items.length - 1) {
    $('next').textContent = 'Finalizar sesión →';
    $('next').onclick = finishExam;
  } else {
    $('next').textContent = 'Siguiente →';
    $('next').onclick = () => go(state.position + 1);
  }

  if (focus) $('prompt').focus();
}

function updateNav(){
  [...$('navigator').children].forEach((b, i) => {
    const it = state.items[i];
    const answered = it.answer !== null;
    b.classList.remove('correct-step', 'wrong-step');
    if (answered) {
      b.classList.add(question(it).opciones[it.answer].correcta ? 'correct-step' : 'wrong-step');
    }
  });
}

function updateProgress(){
  const s = stats(state.items);
  $('answered').innerHTML = `<span class="badge ok">✓ ${s.a}</span> <span class="badge wrong" style="margin-left:6px">✗ ${s.e}</span>`;
  $('progress').max = state.items.length;
  $('progress').value = s.a + s.e;
}

function go(position){
  state.position = position;
  $('finish-check').hidden = true;
  persist();
  render();
}

$('navigator').onclick = e => {
  const b = e.target.closest('button');
  if (b) go(Number(b.dataset.index));
};
$('prev').onclick = () => go(state.position - 1);

function finishExam(){
  const s = stats(state.items);
  if (s.b > 0) {
    $('finish-message').textContent = `Vas a cerrar la sesión con ${s.b} pregunta${s.b===1?'':'s'} sin responder. ¿Quieres finalizar y ver el diagnóstico global?`;
    $('finish-check').hidden = false;
    $('confirm-finish').focus();
  } else {
    doFinish();
  }
}

function doFinish(){
  state.finished = true;
  state.ended = Date.now();
  const s = stats(state.items);
  history.unshift({date: new Date().toISOString(), label: state.label, ...s, score: score(s)});
  history = history.slice(0, 10);
  persist();
  showResults();
}

$('finish').onclick = finishExam;
$('keep-working').onclick = () => { $('finish-check').hidden = true; $('finish').focus(); };
$('confirm-finish').onclick = doFinish;

function showResults(){
  $('exam').hidden = true;
  $('setup').hidden = true;
  $('results').hidden = false;
  $('history').hidden = false;
  $('only-review').checked = false;
  const s = stats(state.items);
  $('summary').innerHTML = [
    [`${s.a}/${s.n}`, 'Aciertos'],
    [s.e, 'Errores'],
    [s.b, 'En blanco'],
    [score(s), 'Nota / 10']
  ].map(([v, l]) => `<div class="stat"><strong>${v}</strong><span>${l}</span></div>`).join('');
  
  $('diagnosis').textContent = `Acierto bruto: ${(100*s.a/s.n).toFixed(1)} %. Nota con penalización = máx(0, aciertos − errores/3) ÷ preguntas × 10.`;
  $('breakdown').innerHTML = BLOQUES.map((b, index) => {
    const items = state.items.filter(i => question(i).bloque === index);
    if (!items.length) return '';
    const t = stats(items);
    return `<tr><th scope="row">${b}</th><td>${t.a}/${t.n}</td><td>${t.e}</td><td>${t.b}</td></tr>`;
  }).join('');

  const seguroError = state.items.filter(i => i.answer !== null && !correct(i) && i.confidence === 'alta').length;
  const dudoso = state.items.filter(i => correct(i) && i.confidence !== 'alta').length;
  $('confidence-summary').textContent = `Prioridad de repaso: ${seguroError} errores con confianza alta. Además, ${dudoso} aciertos con dudas o al azar.`;
  $('retry').disabled = !state.items.some(pending);
  renderReview();
  renderHistory();
  $('result-title').focus();
}

function confidenceLabel(i){
  return {alta: 'seguro', media: 'con dudas', azar: 'al azar'}[i.confidence] || 'sin indicar';
}

function renderReview(){
  $('review').innerHTML = state.items.map((item, index) => {
    if ($('only-review').checked && !pending(item)) return '';
    const q = question(item), result = item.answer === null ? 'En blanco' : correct(item) ? 'Correcta' : 'Incorrecta';
    return `<article class="card">
      <span class="badge ${correct(item)?'ok':'wrong'}">${result}</span> 
      <small>${BLOQUES[q.bloque]} · Confianza: ${confidenceLabel(item)}</small>
      <h3>${escapeHTML(q.enunciado)}</h3>
      ${item.note ? `<p><strong>Tu razonamiento:</strong> ${escapeHTML(item.note)}</p>` : ''}
      ${item.order.map((oi, j) => {
        const o = q.opciones[oi];
        return `<div class="solution ${o.correcta ? 'correct' : item.answer === oi ? 'chosen-wrong' : ''}">
          <strong>${'ABCD'[j]}. ${escapeHTML(o.texto)}</strong>
          <p><span class="badge">${o.correcta ? 'Respuesta correcta' : 'Distractor'}${item.answer === oi ? ' · Tu elección' : ''}</span></p>
          <p>${escapeHTML(o.explicacion)}</p>
        </div>`;
      }).join('')}
      <a href="../IPO2627.pdf#page=${q.pagina}" target="_blank" rel="noopener">Consultar PDF · página ${q.pagina}</a>
    </article>`;
  }).join('') || '<p class="card empty">No quedan preguntas pendientes de consolidar en este intento.</p>';
}

$('only-review').onchange = renderReview;
$('retry').onclick = () => {
  const ids = state.items.filter(pending).map(i => i.id);
  if (ids.length) start(ids, 'Repaso dirigido');
};
$('new').onclick = () => {
  state = null;
  $('results').hidden = true;
  $('exam').hidden = true;
  $('setup').hidden = false;
  $('history').hidden = false;
  $('resume').hidden = true;
  $('start').focus();
};

function renderHistory(){
  $('history-list').innerHTML = history.length
    ? history.map(h => `<div class="history-entry"><strong>${escapeHTML(h.label)}</strong> · ${escapeHTML(new Date(h.date).toLocaleString('es-ES'))}<br>${escapeHTML(h.a)}/${escapeHTML(h.n)} aciertos · ${escapeHTML(h.e)} errores · ${escapeHTML(h.b)} blancos · Nota ${escapeHTML(h.score)}/10</div>`).join('')
    : '<p class="muted">Tus intentos terminados aparecerán aquí. Se guardan los diez últimos resultados.</p>';
}

$('download').onclick = () => {
  const s = stats(state.items);
  const text = [
    `IPO · Tema ${TEMA} · ${state.label}`,
    new Date(state.ended).toLocaleString('es-ES'),
    `Aciertos ${s.a}/${s.n}; errores ${s.e}; blancos ${s.b}; nota ${score(s)}/10.`,
    ...state.items.map((item, i) => {
      const q = question(item);
      return `\n[${BLOQUES[q.bloque]}] ${q.enunciado}\nTu respuesta: ${item.answer === null ? 'En blanco' : q.opciones[item.answer].texto}\nConfianza: ${confidenceLabel(item)}\nTu razonamiento: ${item.note || '—'}\n${item.order.map((oi, j) => `${'ABCD'[j]}. ${q.opciones[oi].texto} ${q.opciones[oi].correcta ? '[CORRECTA]' : ''}\n${q.opciones[oi].explicacion}`).join('\n')}\nFuente: IPO2627.pdf, p. ${q.pagina}.`;
    })
  ].join('\n');
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const a = document.createElement('a');
  a.href = url;
  a.download = `IPO-tema-${TEMA}-informe.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

renderHistory();
