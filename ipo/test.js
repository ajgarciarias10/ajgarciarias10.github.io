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
} catch { $('storage-note').textContent = 'No se ha podido recuperar el guardado local. Puedes realizar la prueba normalmente.'; }
$('resume').hidden = !saved;
function persist(){
  try { localStorage.setItem(KEY, JSON.stringify({history,active:state && !state.finished ? state : null})); }
  catch { $('storage-note').textContent = 'El navegador no permite guardar el progreso. Mantén esta pestaña abierta hasta terminar.'; $('storage-note').hidden=false; if($('setup').hidden) $('exam').prepend($('storage-note')); }
}
function question(item){ return BANCO.find(q=>q.id===item.id); }
function correct(item){return item.answer !== null && question(item).opciones[item.answer].correcta;}
function pending(item){return !correct(item) || item.confidence!=='alta';}
function stats(items){const a=items.filter(correct).length;const b=items.filter(i=>i.answer===null).length;return {a,b,e:items.length-a-b,n:items.length};}
function score(s){return (Math.max(0,(s.a-s.e/3)/s.n)*10).toFixed(2);}
function start(ids, label){
  state={items:shuffle(ids).map(id=>({id,order:shuffle([0,1,2,3]),answer:null,confidence:null,note:''})),position:0,label,started:Date.now(),finished:false};
  saved=null;$('resume').hidden=true;$('setup').hidden=true;$('results').hidden=true;$('history').hidden=true;$('exam').hidden=false;$('finish-check').hidden=true;persist();render();
}
$('start').onclick=()=>{const scope=$('scope').value; start(BANCO.filter(q=>scope==='all'||q.bloque===Number(scope)).map(q=>q.id),scope==='all'?'Examen global':BLOQUES[Number(scope)]);};
$('resume').onclick=()=>{state=saved;$('setup').hidden=true;$('results').hidden=true;$('history').hidden=true;$('exam').hidden=false;render();};
function render(focus=true){
  const item=state.items[state.position], q=question(item);
  $('counter').textContent=`${state.label} · ${state.position+1} / ${state.items.length}`;
  updateProgress();
  $('navigator').innerHTML=state.items.map((x,i)=>`<button type="button" data-index="${i}" class="${x.answer!==null?'answered':''}" ${i===state.position?'aria-current="step"':''} aria-label="Pregunta ${i+1}${x.answer!==null?', respondida':', sin responder'}">${i+1}</button>`).join('');
  $('question').innerHTML=`<fieldset><legend tabindex="-1" id="prompt">${escapeHTML(q.enunciado)}</legend>${item.order.map((oi,i)=>`<label class="option"><input type="radio" name="answer" value="${oi}" ${item.answer===oi?'checked':''}><span><strong>${'ABCD'[i]}.</strong> ${escapeHTML(q.opciones[oi].texto)}</span></label>`).join('')}</fieldset><button type="button" id="clear" class="secondary">Dejar en blanco</button><fieldset class="confidence"><legend>¿Cuánta confianza tienes? <small>(opcional)</small></legend>${[['alta','Estoy seguro'],['media','Tengo dudas'],['azar','Al azar']].map(([v,t])=>`<label><input type="radio" name="confidence" value="${v}" ${item.confidence===v?'checked':''}>${t}</label>`).join('')}</fieldset><label for="reason">Tu razonamiento antes de corregir <small>(opcional)</small></label><textarea id="reason" placeholder="¿Qué matiz hace correcta esta opción y descarta la más parecida?">${escapeHTML(item.note||'')}</textarea>`;
  $('question').onchange=e=>{if(e.target.name==='answer') item.answer=Number(e.target.value);if(e.target.name==='confidence')item.confidence=e.target.value;persist();updateProgress();updateNav();};
  $('reason').oninput=e=>{item.note=e.target.value;persist();};
  $('clear').onclick=()=>{item.answer=null;item.confidence=null;persist();render(false);};
  $('prev').disabled=state.position===0;$('next').disabled=state.position===state.items.length-1;
  if(focus)$('prompt').focus();
}
function updateNav(){[...$('navigator').children].forEach((b,i)=>{const answered=state.items[i].answer!==null;b.classList.toggle('answered',answered);b.setAttribute('aria-label',`Pregunta ${i+1}, ${answered?'respondida':'sin responder'}`);});}
function updateProgress(){const n=state.items.filter(i=>i.answer!==null).length;$('answered').textContent=`${n} respondidas · ${state.items.length-n} en blanco`;$('progress').max=state.items.length;$('progress').value=n;}
function go(position){state.position=position;$('finish-check').hidden=true;persist();render();}
$('navigator').onclick=e=>{const b=e.target.closest('button');if(b)go(Number(b.dataset.index));};
$('prev').onclick=()=>go(state.position-1);$('next').onclick=()=>go(state.position+1);
$('question').onsubmit=e=>e.preventDefault();
$('finish').onclick=()=>{const s=stats(state.items);$('finish-message').textContent=`Vas a cerrar el intento con ${s.b} pregunta${s.b===1?'':'s'} en blanco. Después verás las soluciones y no podrás cambiar las respuestas de este intento.`;$('finish-check').hidden=false;$('confirm-finish').focus();};
$('keep-working').onclick=()=>{$('finish-check').hidden=true;$('finish').focus();};
$('confirm-finish').onclick=()=>{
  state.finished=true;state.ended=Date.now();const s=stats(state.items);
  history.unshift({date:new Date().toISOString(),label:state.label,...s,score:score(s)});history=history.slice(0,10);persist();showResults();
};
function showResults(){
  $('exam').hidden=true;$('setup').hidden=true;$('results').hidden=false;$('history').hidden=false;$('only-review').checked=false;
  const s=stats(state.items);
  $('summary').innerHTML=[[`${s.a}/${s.n}`,'Aciertos'],[s.e,'Errores'],[s.b,'En blanco'],[score(s),'Nota / 10 con penalización']].map(([v,l])=>`<div class="stat"><strong>${v}</strong><span>${l}</span></div>`).join('');
  $('diagnosis').textContent=`Acierto bruto: ${(100*s.a/s.n).toFixed(1)} %. Nota de práctica = máx(0, aciertos − errores/3) ÷ preguntas × 10. Este intento describe tu rendimiento en estas preguntas; no certifica por sí solo el dominio del tema.`;
  $('breakdown').innerHTML=BLOQUES.map((b,index)=>{const items=state.items.filter(i=>question(i).bloque===index);if(!items.length)return '';const t=stats(items);return `<tr><th scope="row">${b}</th><td>${t.a}/${t.n}</td><td>${t.e}</td><td>${t.b}</td></tr>`;}).join('');
  const seguroError=state.items.filter(i=>i.answer!==null&&!correct(i)&&i.confidence==='alta').length;
  const dudoso=state.items.filter(i=>correct(i)&&i.confidence!=='alta').length;
  $('confidence-summary').textContent=`Prioridad de repaso: ${seguroError} errores con confianza alta (revisa la idea que dabas por cierta). Además, ${dudoso} aciertos con dudas, al azar o sin confianza indicada. Intenta justificar estos aciertos sin mirar las opciones.`;
  $('retry').disabled=!state.items.some(pending);renderReview();renderHistory();$('result-title').focus();
}
function confidenceLabel(i){return {alta:'seguro',media:'con dudas',azar:'al azar'}[i.confidence]||'sin indicar';}
function renderReview(){
  $('review').innerHTML=state.items.map((item,index)=>{
    if($('only-review').checked&&!pending(item))return '';
    const q=question(item), result=item.answer===null?'En blanco':correct(item)?'Correcta':'Incorrecta';
    return `<article class="card"><span class="badge ${correct(item)?'ok':'wrong'}">${result}</span> <small>Pregunta ${index+1} · Banco #${q.id} · ${BLOQUES[q.bloque]} · Confianza: ${confidenceLabel(item)}</small><h3>${escapeHTML(q.enunciado)}</h3>${item.note?`<p><strong>Tu razonamiento:</strong> ${escapeHTML(item.note)}</p>`:''}${item.order.map((oi,j)=>{const o=q.opciones[oi];return `<div class="solution ${o.correcta?'correct':item.answer===oi?'chosen-wrong':''}"><strong>${'ABCD'[j]}. ${escapeHTML(o.texto)}</strong><p><span class="badge">${o.correcta?'Respuesta correcta':'Distractor'}${item.answer===oi?' · Tu elección':''}</span></p><p>${escapeHTML(o.explicacion)}</p></div>`;}).join('')}<p class="muted">Referencia: IPO2627.pdf · página ${q.pagina}</p></article>`;
  }).join('')||'<p class="card empty">No quedan preguntas pendientes de consolidar en este intento.</p>';
}
$('only-review').onchange=renderReview;
$('retry').onclick=()=>{const ids=state.items.filter(pending).map(i=>i.id);if(ids.length)start(ids,'Repaso dirigido');};
$('new').onclick=()=>{state=null;$('results').hidden=true;$('exam').hidden=true;$('setup').hidden=false;$('history').hidden=false;$('resume').hidden=true;$('start').focus();};
function renderHistory(){ $('history-list').innerHTML=history.length?history.map(h=>`<div class="history-entry"><strong>${escapeHTML(h.label)}</strong> · ${escapeHTML(new Date(h.date).toLocaleString('es-ES'))}<br>${escapeHTML(h.a)}/${escapeHTML(h.n)} aciertos · ${escapeHTML(h.e)} errores · ${escapeHTML(h.b)} blancos · Nota ${escapeHTML(h.score)}/10</div>`).join(''):'<p class="muted">Tus intentos terminados aparecerán aquí. Se guardan los diez últimos resultados, no las correcciones completas: descarga el informe si quieres conservarlas.</p>'; }
$('download').onclick=()=>{
  const s=stats(state.items);
   const text=[`IPO · Tema ${TEMA} · ${state.label}`,new Date(state.ended).toLocaleString('es-ES'),`Aciertos ${s.a}/${s.n}; errores ${s.e}; blancos ${s.b}; nota de práctica ${score(s)}/10.`,...state.items.map((item,i)=>{const q=question(item);return `\n${i+1}. [Banco #${q.id}] ${q.enunciado}\nApartado: ${BLOQUES[q.bloque]}\nTu respuesta: ${item.answer===null?'En blanco':q.opciones[item.answer].texto}\nConfianza: ${confidenceLabel(item)}\nTu razonamiento: ${item.note||'—'}\n${item.order.map((oi,j)=>`${'ABCD'[j]}. ${q.opciones[oi].texto} ${q.opciones[oi].correcta?'[CORRECTA]':''}\n${q.opciones[oi].explicacion}`).join('\n')}\nFuente: IPO2627.pdf, p. ${q.pagina}.`;})].join('\n');
   const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`IPO-tema-${TEMA}-informe.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
renderHistory();
