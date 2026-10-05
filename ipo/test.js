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

let activeScope = 'all';
let onlyFailed = false;
let currentQuestion = null;
let currentOrder = [];
let currentAnswer = null;
let unseenIds = [];
let streak = 0;
let maxStreak = 0;
let countCorrect = 0;
let countWrong = 0;
let failedIds = new Set();
let sessionHistory = [];

function getMatchingPool() {
  let pool = BANCO;
  if (activeScope !== 'all') {
    const scopeNum = Number(activeScope);
    pool = pool.filter(q => q.bloque === scopeNum);
  }
  if (onlyFailed) {
    const subset = pool.filter(q => failedIds.has(q.id));
    if (subset.length) return subset;
    onlyFailed = false;
    if ($('filter-failed')) $('filter-failed').checked = false;
  }
  return pool;
}

function nextRandomQuestion() {
  const pool = getMatchingPool();
  if (!pool || !pool.length) return;

  let available = pool.filter(q => unseenIds.includes(q.id));
  if (!available.length) {
    unseenIds = pool.map(q => q.id);
    available = pool;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  unseenIds = unseenIds.filter(id => id !== selected.id);

  currentQuestion = selected;
  currentOrder = shuffle([0, 1, 2, 3]);
  currentAnswer = null;

  renderCurrent();
}

function renderCurrent() {
  if (!currentQuestion) return;
  const q = currentQuestion;
  const isAnswered = currentAnswer !== null;

  if ($('gen-block-badge')) $('gen-block-badge').textContent = BLOQUES[q.bloque] || 'General';
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
  currentAnswer = choiceIdx;
  const isCorrect = currentQuestion.opciones[choiceIdx].correcta;

  if (isCorrect) {
    streak++;
    maxStreak = Math.max(maxStreak, streak);
    countCorrect++;
    failedIds.delete(currentQuestion.id);
    triggerStreakBump();
  } else {
    streak = 0;
    countWrong++;
    failedIds.add(currentQuestion.id);
  }

  sessionHistory.unshift({
    question: currentQuestion,
    order: currentOrder,
    answer: choiceIdx,
    isCorrect,
    time: Date.now()
  });

  renderCurrent();
  renderHistory();
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
        <small class="muted">${BLOQUES[q.bloque]} · ${q.pagina ? `pág. ${q.pagina}` : 'Caso real'}</small>
      </div>
      <h4>${escapeHTML(q.enunciado)}</h4>
      <p style="font-size:0.9rem; margin:4px 0;"><strong>Tu elección:</strong> ${escapeHTML(chosen.texto)}</p>
      <p style="font-size:0.85rem; color:var(--muted); margin:0;">${escapeHTML(chosen.explicacion)}</p>
    </div>`;
  }).join('');
}

// Event Listeners
if ($('gen-options')) {
  $('gen-options').onchange = e => {
    if (e.target.name === 'gen-opt') {
      handleAnswer(Number(e.target.value));
    }
  };
}

if ($('btn-next')) $('btn-next').onclick = nextRandomQuestion;
if ($('btn-skip')) $('btn-skip').onclick = nextRandomQuestion;

if ($('btn-reset')) {
  $('btn-reset').onclick = () => {
    streak = 0;
    countCorrect = 0;
    countWrong = 0;
    failedIds.clear();
    unseenIds = [];
    sessionHistory = [];
    updateStatsDisplay();
    renderHistory();
    nextRandomQuestion();
  };
}

if ($('filter-failed')) {
  $('filter-failed').onchange = e => {
    onlyFailed = e.target.checked;
    nextRandomQuestion();
  };
}

if ($('scope-selector')) {
  $('scope-selector').onchange = e => {
    activeScope = e.target.value;
    unseenIds = [];
    if (currentAnswer === null) {
      nextRandomQuestion();
    }
  };
}

window.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
  const key = e.key.toLowerCase();

  if (currentAnswer === null) {
    let optIdx = -1;
    if (['1', 'a'].includes(key)) optIdx = 0;
    else if (['2', 'b'].includes(key)) optIdx = 1;
    else if (['3', 'c'].includes(key)) optIdx = 2;
    else if (['4', 'd'].includes(key)) optIdx = 3;

    if (optIdx !== -1 && currentOrder[optIdx] !== undefined) {
      e.preventDefault();
      handleAnswer(currentOrder[optIdx]);
      return;
    }
  }

  if (key === ' ' || key === 'enter') {
    if (currentAnswer !== null) {
      e.preventDefault();
      nextRandomQuestion();
    }
  } else if (key === 's' || key === 'r') {
    e.preventDefault();
    nextRandomQuestion();
  }
});

// Start: ?apartado=N abre directamente ese apartado (enlace desde «Ponte al día»)
const apartadoURL = new URLSearchParams(location.search).get('apartado');
if (apartadoURL !== null && BLOQUES[Number(apartadoURL)] && $('scope-selector')) {
  activeScope = apartadoURL;
  $('scope-selector').value = apartadoURL;
}
nextRandomQuestion();
