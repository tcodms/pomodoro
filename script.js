const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const TOTAL_SESSIONS = 4;
const CIRCUMFERENCE = 2 * Math.PI * 90; // r=90

let timeLeft = FOCUS_TIME;
let isRunning = false;
let mode = 'focus';
let sessionCount = 0;
let intervalId = null;

const timeDisplay = document.getElementById('time-display');
const modeLabel = document.getElementById('mode-label');
const startBtn = document.getElementById('start-btn');
const progressCircle = document.getElementById('progress-circle');
const sessionDots = document.getElementById('session-dots');

function init() {
  progressCircle.style.strokeDasharray = CIRCUMFERENCE;
  renderDots();
  updateDisplay();
}

function toggleTimer() {
  isRunning ? pauseTimer() : startTimer();
}

function startTimer() {
  isRunning = true;
  startBtn.textContent = '일시정지';
  intervalId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    updateProgress();
    if (timeLeft <= 0) onTimerEnd();
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startBtn.textContent = '시작';
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
    sessionCount++;
    if (sessionCount >= TOTAL_SESSIONS) sessionCount = 0;
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
  const offset = CIRCUMFERENCE * (1 - timeLeft / total);
  progressCircle.style.strokeDashoffset = offset;
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
