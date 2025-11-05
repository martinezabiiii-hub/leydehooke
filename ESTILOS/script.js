/*script.js*/
const baseQuestions = [ 
  {q:"¿Qué establece la Ley de Hooke?", opts:{A:"La fuerza es proporcional a la deformación del resorte",B:"La masa es igual a la aceleración",
  C:"La energía se conserva", D:"Todo cuerpo cae con la misma velocidad"}, 
  a:"La fuerza es proporcional a la deformación del resorte"},
  
  {q:"¿Cuál es la fórmula de la Ley de Hooke?", opts:{A:"F = m·a",B:"E = 1/2 k x²",
  C:"F = k·x",D:"P = F/A"}, a:"F = k·x"},
  
  {q:"En F = k·x, ¿qué representa k?", opts:{A:"Constante de elasticidad",B:"Masa del objeto",
  C:"Gravedad",D:"Distancia total"}, a:"Constante de elasticidad"},
  
  {q:"Unidad de fuerza en el Sistema Internacional", opts:{A:"Joule (J)",B:"Newton (N)",
  C:"Pascal (Pa)",D:"Kilogramo (kg)"}, a:"Newton (N)"},
  
  {q:"Si k = 200 N/m y x = 0.1 m, ¿qué fuerza ejerce?", opts:{A:"2 N",B:"10 N",C:"20 N",D:"0.2 N"}, a:"20 N"},
  
  {q:"¿Qué ocurre si se excede el límite elástico?", opts:{A:"Vuelve a su forma original",B:"Se deforma permanentemente",
  C:"k aumenta",D:"La fuerza desaparece"}, a:"Se deforma permanentemente"},
  
  {q:"¿Quién formuló la Ley de Hooke?", opts:{A:"Isaac Newton",B:"Robert Hooke",
  C:"Galileo Galilei",D:"Albert Einstein"}, a:"Robert Hooke"},
  {q:"Si duplicas x (elongación), ¿qué pasa con F si k es constante?", opts:{A:"F se duplica",B:"F se divide por 2",
  C:"F se mantiene igual",D:"No hay relación"}, a:"F se duplica"},
  
  {q:"La constante k depende principalmente de:", opts:{A:"El color del resorte",B:"Material y geometría del resorte",
  C:"La masa colgada",D:"La velocidad"}, 
  a:"Material y geometría del resorte"},
  
  {q:"Si un resorte tiene k grande, significa que es:", opts:{A:"Muy rígido",B:"Muy blando",
  C:"Más pesado",D:"Más largo"}, a:"Muy rígido"},
  
  {q:"La energía potencial elástica se calcula como:", opts:{A:"E = 1/2 k x²",B:"E = k x",
  C:"E = mgh",D:"E = F·d"}, a:"E = 1/2 k x²"},
  
  {q:"Para pequeñas deformaciones, la Ley de Hooke es:", opts:{A:"Válida (aproximación lineal)",B:"Inválida siempre",
  C:"Solo para metales",D:"Solo para líquidos"}, 
  a:"Válida (aproximación lineal)"},
  
  {q:"¿Qué representa x en F = k·x?", opts:{A:"Deformación (elongación)",B:"La masa del objeto",
  C:"La fuerza",D:"La energía"}, a:"Deformación (elongación)"},
  
  {q:"Si k = 50 N/m y aplicas F = 10 N, ¿cuál es x? (x = F/k)", opts:{A:"0.2 m",B:"5 m",
  C:"0.02 m",D:"2 m"}, a:"0.2 m"},
  
  {q:"La frecuencia de oscilación de una masa en resorte depende de:", opts:{A:"k y la masa m",B:"Solo k",
  C:"Solo m",D:"La forma del gancho"}, a:"k y la masa m"},
  
  {q:"¿La Ley de Hooke aplica igual a sólidos, líquidos y gases?", opts:{A:"Principalmente sólidos elásticos",B:"Sí, por igual",
  C:"Solo gases",D:"Solo líquidos"}, a:"Principalmente sólidos elásticos"},
  
  {q:"Si k = 0, ¿qué implica físicamente?", opts:{A:"Resorte sin resistencia (flojo)",B:"Resorte muy rígido",
  C:"Resorte roto",D:"Nada cambia"}, a:"Resorte sin resistencia (flojo)"},
 
  {q:"La relación fuerza vs elongación en un resorte ideal es:", opts:{A:"Lineal",B:"Exponencial",
  C:"Cuadrática",D:"Logarítmica"}, a:"Lineal"},
 
  {q:"Unidades de la constante elástica k en SI son:", opts:{A:"N/m",B:"N·m",C:"m/N",D:"kg/m"}, a:"N/m"},
  
  {q:"Una aplicación práctica que usa la Ley de Hooke es:", opts:{A:"Amortiguadores de autos",
  B:"Reacciones químicas",C:"Turbinas eólicas",D:"Celdas solares"}, a:"Amortiguadores de autos"}
]; 

/* =========== Estado del juego =========== */
const STEPS = 20; 
const state = { 
  p1: { index:0, score:0, pos:0, questions:[] }, 
  p2: { index:0, score:0, pos:0, questions:[] },
  finished:false
}; 

/* =========== Elementos del DOM =========== */
const qEls = { 
  q1: document.getElementById('q1'),
  q2: document.getElementById('q2'),
  opts1: document.getElementById('opts1'),
  opts2: document.getElementById('opts2'),
  score1: document.getElementById('score1'),
  score2: document.getElementById('score2'),
  feedback1: document.getElementById('feedback1'),
  feedback2: document.getElementById('feedback2'),
  next1: document.getElementById('next1'),
  next2: document.getElementById('next2'),
  skip1: document.getElementById('skip1'),
  skip2: document.getElementById('skip2'),
  bannerArea: document.getElementById('bannerArea'),
  avatar1: document.getElementById('avatar1'),
  avatar2: document.getElementById('avatar2'),
  sprite1Frames: [document.getElementById('s1-f1'),document.getElementById('s1-f2'),document.getElementById('s1-f3'),
  document.getElementById('s1-f4')],
  sprite2Frames: [document.getElementById('s2-f1'),document.getElementById('s2-f2'),document.getElementById('s2-f3'),
  document.getElementById('s2-f4')],
  track: document.getElementById('track')
}

/* =========== Audio (Web Audio API) =========== */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, duration=0.12, type='sine', gain=0.12){ 
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type; 
  o.frequency.value = freq;
  g.gain.value = gain; 
  o.connect(g); g.connect(audioCtx.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  setTimeout(()=>{ try{ o.stop(); }catch(e){} }, duration*1000+40);
}
function correctSound(){ playTone(880,0.12,'square',0.12); playTone(1320,0.08,'sine',0.08); }
function wrongSound(){ playTone(240,0.12,'sine',0.12); }
function victorySound(){ playTone(880,0.22,'triangle',0.16); setTimeout(()=>playTone(1320,0.2,'triangle',0.12),180);

setTimeout(()=>playTone(1760,0.18,'sine',0.12),360); }

/* =========== Utilidades =========== */
function shuffleArray(arr){ 
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function prepareSets(){ 
  
  function buildSet(){
    const pool = shuffleArray(baseQuestions);
    const set = [];
    let i=0;
    while(set.length < STEPS){ 
      set.push(pool[i % pool.length]);
      i++;
    }
    return set;
  }
  state.p1.questions = buildSet();
  state.p2.questions = buildSet();
  state.p1.index = 0; state.p1.score = 0; state.p1.pos = 0;
  state.p2.index = 0; state.p2.score = 0; state.p2.pos = 0;
  state.finished = false;
  qEls.score1.textContent = '0'; qEls.score2.textContent = '0';
  qEls.feedback1.textContent = ''; qEls.feedback2.textContent = '';
  qEls.bannerArea.innerHTML = '';
  updateAvatars();
  renderQuestion(1); renderQuestion(2);
}

function renderQuestion(player){ 
  if(state.finished) return; 
  const p = (player===1)?state.p1:state.p2;
  const qEl = (player===1)?qEls.q1:qEls.q2; 
  const optsEl = (player===1)?qEls.opts1:qEls.opts2;
  const fb = (player===1)?qEls.feedback1:qEls.feedback2;
  qEl.textContent = ''; optsEl.innerHTML=''; fb.textContent='';

  if(p.index >= STEPS){
    qEl.textContent = "Has completado tus 20 preguntas.";
    return;
  }
  const item = p.questions[p.index];
  qEl.textContent = `(${p.index+1}/${STEPS}) ${item.q}`;
  ['A','B','C','D'].forEach(letter=>{
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    const lbl = document.createElement('div'); lbl.className='opt-label'; lbl.textContent = letter;
    const txt = document.createElement('div'); txt.className='opt-text'; txt.textContent = item.opts[letter];
    btn.appendChild(lbl); btn.appendChild(txt);
    btn.addEventListener('click', ()=> handleAnswer(player, btn, item.opts[letter], item.a));
    optsEl.appendChild(btn);
  });
}

/* =========== Manejo de respuesta =========== */
function handleAnswer(player, btn, chosen, correct){ 
  if(state.finished) return;
  const p = (player===1)?state.p1:state.p2;
  const optsEl = (player===1)?qEls.opts1:qEls.opts2;
  const fb = (player===1)?qEls.feedback1:qEls.feedback2;

  // disable options for this player
  Array.from(optsEl.querySelectorAll('button')).forEach(b=>b.disabled=true);
  if(chosen === correct){
    btn.classList.add('correct');
    p.score++;
    p.pos = Math.min(STEPS, p.pos + 1);
    fb.textContent = '¡Correcto! Avanzas.';
    
    correctSound();
    triggerSpriteStep(player);
  } else {
    btn.classList.add('incorrect');
    fb.textContent = `Incorrecto — la respuesta correcta es: "${correct}"`;
    wrongSound();
  }

  if(player===1) qEls.score1.textContent = p.score;
  else qEls.score2.textContent = p.score; /*Actualiza el marcador del jugador.*/

  updateAvatars();
  // instant win check
  if(p.pos >= STEPS){
    finishGame(player);
    return;
  }

  
  setTimeout(()=>{
    p.index++;
    renderQuestion(player);
    if(p.index >= STEPS){
      (player===1? qEls.feedback1 : qEls.feedback2).textContent = 'Completaste tus 20 preguntas.';
      checkFinishByCompletion();
    }
  }, 900);
}


function updateAvatars(){ 
  const trackWidth = parseFloat(getComputedStyle(qEls.track).width);
  const stepPx = trackWidth / STEPS;
  const x1 = Math.min(state.p1.pos, STEPS) * stepPx;
  const x2 = Math.min(state.p2.pos, STEPS) * stepPx;
  qEls.avatar1.style.transform = `translateX(${x1}px)`;
  qEls.avatar2.style.transform = `translateX(${x2}px)`;
}

function triggerSpriteStep(player){
  const frames = (player===1)?qEls.sprite1Frames:qEls.sprite2Frames;
  
  let idx = 0;
  const show = (i)=>{
    frames.forEach((f,fi)=> f.style.display = (fi===i)?'inline':'none');
  };
  const interval = 80; 
  const cycles = [0,1,2,3];
  cycles.forEach((c,i)=> setTimeout(()=> show(c), i*interval));
  // return to frame 0 a bit later
  setTimeout(()=> show(0), cycles.length*interval + 20);
}


qEls.skip1.addEventListener('click', ()=>{
  if(state.finished) return;
  state.p1.index++;
  renderQuestion(1);
  if(state.p1.index >= STEPS) qEls.feedback1.textContent = 'Completaste tus 20 preguntas.';
  checkFinishByCompletion();
});
qEls.skip2.addEventListener('click', ()=>{
  if(state.finished) return;
  state.p2.index++;
  renderQuestion(2);
  if(state.p2.index >= STEPS) qEls.feedback2.textContent = 'Completaste tus 20 preguntas.';
  checkFinishByCompletion();
});


function finishGame(winnerPlayer){ 
  if(state.finished) return;
  state.finished = true;
  const banner = document.createElement('div');
  banner.className = 'banner';
  banner.textContent = `¡Victoria! Ganó Jugador ${winnerPlayer} — llegó a la meta 🎉`;
  qEls.bannerArea.innerHTML = '';
  qEls.bannerArea.appendChild(banner);
  victorySound();
}

function checkFinishByCompletion(){
  if(state.p1.index >= STEPS && state.p2.index >= STEPS){
    state.finished = true;
    let msg;
    if(state.p1.pos > state.p2.pos) msg = `Jugador 1 gana por acercarse más a la meta (${state.p1.pos} vs ${state.p2.pos}) 🎉`;
    else if(state.p2.pos > state.p1.pos) msg = `Jugador 2 gana por acercarse más a la meta (${state.p2.pos} vs ${state.p1.pos}) 🎉`;

    else msg = `Empate técnico (${state.p1.pos} vs ${state.p2.pos}) — ¡buenas respuestas!`;
    const banner = document.createElement('div'); banner.className='banner'; banner.textContent = msg;
    qEls.bannerArea.innerHTML = ''; qEls.bannerArea.appendChild(banner);
    victorySound();
  }
}

document.getElementById('restart').addEventListener('click', ()=>{
  
  if(audioCtx.state === 'suspended') audioCtx.resume();
  prepareSets();
});
document.getElementById('shuffle').addEventListener('click', ()=>{
  if(audioCtx.state === 'suspended') audioCtx.resume();
  prepareSets();
});

document.addEventListener('click', ()=>{ if(audioCtx.state === 'suspended') audioCtx.resume(); }, {once:true});

prepareSets();

document.addEventListener('keydown', (e) => { 
al presionar A–D, el script detecta qué opción coincide y ejecuta el clic del botón correspondiente.*/
  const key = e.key.toUpperCase();
  if (!['A','B','C','D'].includes(key)) return;

  
  // Buscar opciones del jugador 1
  const opts1 = Array.from(document.querySelectorAll('#opts1 .opt-btn:not(:disabled)'));
  const opts2 = Array.from(document.querySelectorAll('#opts2 .opt-btn:not(:disabled)'));
 
  const matchBtn = (opts) => opts.find(b => b.querySelector('.opt-label').textContent === key);

  const btn1 = matchBtn(opts1);
  const btn2 = matchBtn(opts2);

  if (btn1) btn1.click();
  else if (btn2) btn2.click();
});