'use strict';
const $ = id => document.getElementById(id);
const TEMA = document.documentElement.dataset.tema || '1';
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = values => {
  const a = [...values];
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isGlobal = typeof BANCO_GLOBAL !== 'undefined';
const QUESTIONS = isGlobal ? BANCO_GLOBAL.map(q => ({ ...q, bloque: q.bloqueIndex }))
  : BANCO.map(q => ({ ...q, tema: TEMA }));
let activeScope = 'all';
let activeTema = isGlobal ? (new URLSearchParams(location.search).get('tema') || 'all') : TEMA;
let onlyFailed = new URLSearchParams(location.search).get('fallos') === '1';
let currentQuestion = null;
let currentOrder = [];
let currentAnswer = null;
let streak = 0;
let countCorrect = 0;
let countWrong = 0;
let failedIds = new Set();
let sessionHistory = [];
let session;
const labelBlock = q => isGlobal ? q.bloqueNombre : BLOQUES[q.bloque];
function getMatchingPool() {
  return QUESTIONS.filter(q => (activeTema === 'all' || String(q.tema) === activeTema) &&
    (activeScope === 'all' || q.bloque === Number(activeScope)));
}
function sessionKey() { return JSON.stringify([isGlobal ? 'global' : TEMA, activeTema, activeScope, onlyFailed]); }
function openSession(fresh = false) {
  session = IPOStudy.session(sessionKey(), getMatchingPool(), onlyFailed, fresh);
  syncSession();
}
function syncSession() {
  sessionHistory = session.responses.map((answer, i) => {
    const question = QUESTIONS.find(q => IPOStudy.identity(q) === session.ids[i]);
    return question && { question, order: session.orders[i], answer, isCorrect: question.opciones[answer].correcta };
  }).filter(Boolean).reverse();
  countCorrect = sessionHistory.filter(e => e.isCorrect).length;
  countWrong = sessionHistory.length - countCorrect;
  streak = 0;
  for (const entry of sessionHistory) { if (!entry.isCorrect) break; streak++; }
  failedIds = new Set(IPOStudy.eligible(getMatchingPool(), true).map(q => q.id ?? q.globalId));
  currentQuestion = QUESTIONS.find(q => IPOStudy.identity(q) === session.ids[session.index]);
  currentOrder = session.orders[session.index] || [];
  currentAnswer = session.responses[session.index] ?? null;
  renderHistory();
  updateStatsDisplay();
  renderProgress();
  if (currentQuestion) renderCurrent();
  else {
    $('gen-prompt').textContent = 'No quedan preguntas disponibles en este filtro.';
    $('gen-options').innerHTML = '';
    $('gen-banner').hidden = true;
  }
  $('btn-next').disabled = !currentQuestion || currentAnswer === null || session.completed;
  $('btn-next').textContent = session.completed ? 'Test terminado' : 'Siguiente pregunta';
}
function nextRandomQuestion() {
  if (!session || currentAnswer === null || session.completed) return;
  session.index++;
  IPOStudy.save();
  syncSession();
}
function renderProgress() {
  const answered = session.responses.length;
  $('test-progress').textContent = `Test: ${answered}/${session.ids.length} respuestas · ${countCorrect} aciertos · ${countWrong} fallos`;
  $('test-save').textContent = IPOStudy.storageOK
    ? 'Sesión guardada en este navegador. Puedes salir y continuar aquí.'
    : 'No se ha podido guardar: el almacenamiento del navegador no está disponible.';
  $('test-status').textContent = session.completed
    ? 'Test terminado. Los aciertos no se repetirán; puedes iniciar otro test con preguntas nuevas y errores pendientes.'
    : session.ids.length < 40 ? `Hay ${session.ids.length} preguntas disponibles de las 40 previstas, sin repetir aciertos.` : 'Responde las 40 preguntas. El repaso se registra al terminar.';
  $('btn-reset').textContent = 'Nuevo test';
  $('btn-reset').disabled = session.ids.length > 0 && !session.completed;
  document.querySelectorAll('.pill-tab').forEach(t => t.classList.toggle('active', t.dataset.tema === activeTema));
}

function renderCurrent() {
  if (!currentQuestion) return;
  const q = currentQuestion;
  if ($('gen-topic-badge')) $('gen-topic-badge').textContent = q.temaTitulo || `Tema ${q.tema}`;
  const isAnswered = currentAnswer !== null;

  if ($('gen-block-badge')) $('gen-block-badge').textContent = labelBlock(q) || 'General';
  if ($('gen-ref-badge')) {
    $('gen-ref-badge').textContent = q.pagina ? `pág. ${q.pagina}` : 'Caso real';
  }

  if ($('gen-prompt')) $('gen-prompt').textContent = q.enunciado;

  const banner = $('gen-banner');
  if (banner) {
    if (isAnswered) {
      const isCorrect = q.opciones[currentAnswer].correcta;
      banner.hidden = false;
      banner.className = `instant-banner ${isCorrect ? 'is-correct' : 'is-wrong'}`;
      banner.innerHTML = isCorrect
        ? `✓ ¡Correcto! ${escapeHTML(q.opciones[currentAnswer].explicacion)}`
        : `✗ Incorrecto. La opción correcta está señalada en verde abajo.`;
    } else {
      banner.hidden = true;
      banner.innerHTML = '';
    }
  }

  const optionsContainer = $('gen-options');
  if (optionsContainer) {
    optionsContainer.innerHTML = currentOrder.map((oi, idx) => {
      const o = q.opciones[oi];
      let optionClass = 'option';
      let badgeHTML = '';
      let explanationHTML = '';

      if (isAnswered) {
        optionClass += ' is-disabled';
        if (currentAnswer === oi) {
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
        <input type="radio" name="gen-opt" value="${oi}" ${currentAnswer === oi ? 'checked' : ''} ${isAnswered ? 'disabled' : ''}>
        <div style="flex:1;">
          <span><strong>${'ABCD'[idx]}.</strong> ${escapeHTML(o.texto)}${badgeHTML}</span>
          ${explanationHTML}
        </div>
      </label>`;
    }).join('');
  }

  const nextBtn = $('btn-next');
  if (nextBtn) {
    if (isAnswered) {
      nextBtn.classList.add('btn-next-random');
      nextBtn.focus();
    } else {
      nextBtn.classList.remove('btn-next-random');
    }
  }

  updateStatsDisplay();
}

function handleAnswer(choiceIdx) {
  if (currentAnswer !== null || !currentQuestion) return;
  IPOStudy.answer(session, currentQuestion, choiceIdx);
  syncSession();
  if (session.completed) {
    const competencies = leerCompetencias();
    const themes = [...new Set(sessionHistory.map(e => e.question.tema))];
    themes.filter(t => Number(t)).forEach(t => {
      const comp = competencies[t] ||= {};
      const blocks = [...new Set(QUESTIONS.filter(q => q.tema === t).map(q => q.bloque))];
      blocks.forEach(b => {
        const entries = sessionHistory.filter(e => e.question.tema === t && e.question.bloque === b);
        if (entries.length >= 2 && entries.every(e => e.isCorrect)) comp[b] = fechaISO(new Date());
      });
      if (blocks.every(b => comp[b])) marcarTemaSuperadoEnCalendario(t);
    });
    guardarCompetencias(competencies);
  }
  syncSession();
}

function triggerStreakBump() {
  const el = $('streak-val');
  if (el && el.parentElement) {
    el.parentElement.classList.remove('bump');
    void el.parentElement.offsetWidth;
    el.parentElement.classList.add('bump');
  }
}

function updateStatsDisplay() {
  if ($('streak-val')) $('streak-val').textContent = streak;
  if ($('correct-val')) $('correct-val').textContent = countCorrect;
  if ($('wrong-val')) $('wrong-val').textContent = countWrong;
  if ($('failed-count')) $('failed-count').textContent = failedIds.size;
  if ($('failed-box')) $('failed-box').hidden = failedIds.size === 0;
}

function renderHistory() {
  const countEl = $('history-count');
  if (countEl) countEl.textContent = sessionHistory.length;
  const listEl = $('history-list');
  if (!listEl) return;

  if (!sessionHistory.length) {
    listEl.innerHTML = '<p class="muted">Aún no has respondido ninguna pregunta en esta sesión.</p>';
    return;
  }

  listEl.innerHTML = sessionHistory.map(entry => {
    const q = entry.question;
    const isCor = entry.isCorrect;
    const chosen = q.opciones[entry.answer];
    return `<div class="history-item">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <span class="badge ${isCor ? 'ok' : 'wrong'}">${isCor ? '✓ Acierto' : '✗ Fallo'}</span>
        <small class="muted">${escapeHTML(labelBlock(q))} · ${q.pagina ? `pág. ${q.pagina}` : 'Caso real'}</small>
      </div>
      <h4>${escapeHTML(q.enunciado)}</h4>
      <p style="font-size:0.9rem; margin:4px 0;"><strong>Tu elección:</strong> ${escapeHTML(chosen.texto)}</p>
      <p style="font-size:0.85rem; color:var(--muted); margin:0;">${escapeHTML(chosen.explicacion)}</p>
    </div>`;
  }).join('');
}

// All navigation preserves the current test; unanswered questions cannot be skipped.
$('gen-options').onchange = e => {
  if (e.target.name === 'gen-opt') handleAnswer(Number(e.target.value));
};
$('btn-next').onclick = nextRandomQuestion;
$('btn-skip').hidden = true;
$('btn-reset').onclick = () => openSession(true);
if ($('filter-failed')) $('filter-failed').checked = onlyFailed;
if ($('filter-failed')) $('filter-failed').onchange = e => {
  onlyFailed = e.target.checked;
  openSession();
};
if ($('scope-selector')) {
  $('scope-selector').innerHTML = '<option value="all">Todos los apartados</option>' +
    BLOQUES.map((name, i) => `<option value="${i}">${escapeHTML(name)}</option>`).join('');
  const scope = new URLSearchParams(location.search).get('apartado');
  if (scope !== null && BLOQUES[Number(scope)]) activeScope = scope;
  $('scope-selector').value = activeScope;
  $('scope-selector').onchange = e => { activeScope = e.target.value; openSession(); };
}
document.querySelectorAll('.pill-tab').forEach(tab => {
  tab.onclick = () => { activeTema = tab.dataset.tema; openSession(); };
});
window.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(document.activeElement.tagName)) return;
  const i = ['1', '2', '3', '4'].indexOf(e.key);
  if (i !== -1 && currentAnswer === null && currentOrder[i] !== undefined) {
    e.preventDefault(); handleAnswer(currentOrder[i]);
  } else if ((e.key === ' ' || e.key === 'Enter') && currentAnswer !== null) {
    e.preventDefault(); nextRandomQuestion();
  }
});
const progress = document.createElement('section');
progress.className = 'card';
progress.innerHTML = '<p id="test-progress" role="status" aria-live="polite"></p><p id="test-status"></p><small id="test-save" class="muted"></small>';
document.querySelector('.gen-bar').before(progress);
document.querySelectorAll('.kbd-hint').forEach(el => { el.textContent = 'Teclas: 1–4 responder · Espacio siguiente'; });
openSession();
