const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const TOTAL_SESSIONS = 4;
const CX = 140, CY = 140, R = 110;

let timeLeft = FOCUS_TIME;
let isRunning = false;
let mode = 'focus';
let sessionCount = 0;
let intervalId = null;

const timeDisplay = document.getElementById('time-display');
const modeLabel = document.getElementById('mode-label');
const centerBtn = document.getElementById('center-btn');
const progressPath = document.getElementById('progress-path');
const sessionDots = document.getElementById('session-dots');

function init() {
  generateClockFace();
  renderDots();
  updateDisplay();
  updateProgress();
}

function generateClockFace() {
  const ticksGroup = document.getElementById('ticks');
  const numsGroup = document.getElementById('tick-numbers');

  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * Math.PI / 180;
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 104 : 109;
    const x1 = CX + r1 * Math.cos(angle);
    const y1 = CY + r1 * Math.sin(angle);
    const x2 = CX + 116 * Math.cos(angle);
    const y2 = CY + 116 * Math.sin(angle);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', isMajor ? '#888' : '#bbb');
    line.setAttribute('stroke-width', isMajor ? 2 : 1);
    ticksGroup.appendChild(line);

    if (isMajor) {
      const nr = 91;
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', CX + nr * Math.cos(angle));
      text.setAttribute('y', CY + nr * Math.sin(angle));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('font-size', '11');
      text.setAttribute('fill', '#888');
      text.setAttribute('font-family', '-apple-system, sans-serif');
      text.textContent = i;
      numsGroup.appendChild(text);
    }
  }
}

function toggleTimer() {
  isRunning ? pauseTimer() : startTimer();
}

function startTimer() {
  isRunning = true;
  centerBtn.textContent = '⏸';
  intervalId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    updateProgress();
    if (timeLeft <= 0) onTimerEnd();
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  centerBtn.textContent = '▶';
  clearInterval(intervalId);
}

function resetTimer() {
  pauseTimer();
  timeLeft = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  updateDisplay();
  updateProgress();
}

function switchMode() {
  pauseTimer();
  mode = mode === 'focus' ? 'break' : 'focus';
  timeLeft = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  modeLabel.textContent = mode === 'focus' ? '집중 시간' : '휴식 시간';
  document.body.classList.toggle('break-mode', mode === 'break');
  updateDisplay();
  updateProgress();
}

function onTimerEnd() {
  pauseTimer();
  playBeep();
  if (mode === 'focus') {
    sessionCount = (sessionCount + 1) % TOTAL_SESSIONS;
    renderDots();
  }
  switchMode();
}

function updateDisplay() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  timeDisplay.textContent = `${m}:${s}`;
}

function updateProgress() {
  const total = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  const fraction = timeLeft / total;

  if (fraction <= 0) {
    progressPath.setAttribute('d', '');
    return;
  }
  if (fraction >= 1) {
    progressPath.setAttribute('d',
      `M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.01} ${CY - R} Z`);
    return;
  }

  const endAngle = (-90 + fraction * 360) * Math.PI / 180;
  const x = CX + R * Math.cos(endAngle);
  const y = CY + R * Math.sin(endAngle);
  const largeArc = fraction > 0.5 ? 1 : 0;
  progressPath.setAttribute('d',
    `M ${CX} ${CY} L ${CX} ${CY - R} A ${R} ${R} 0 ${largeArc} 1 ${x} ${y} Z`);
}

function renderDots() {
  sessionDots.innerHTML = '';
  for (let i = 0; i < TOTAL_SESSIONS; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i < sessionCount ? ' filled' : '');
    sessionDots.appendChild(dot);
  }
}

function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.value = 880;
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1);
}

init();
