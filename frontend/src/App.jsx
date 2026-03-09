import { useTimer } from './hooks/useTimer';
import { ClockFace } from './components/ClockFace';
import { SessionDots } from './components/SessionDots';
import { Controls } from './components/Controls';
import { FriendTimer } from './components/FriendTimer';
import './App.css';

const DUMMY_FRIENDS = [
  { name: '민준', timeLeft: 18 * 60 + 30, mode: 'focus' },
  { name: '서연', timeLeft: 4 * 60 + 12, mode: 'break' },
  { name: '지호', timeLeft: 22 * 60 + 45, mode: 'focus' },
];

export default function App() {
  const { mode, timeLeft, totalTime, isRunning, sessionCount, toggle, reset, switchMode } = useTimer();

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="page">
      <div className="window">
        <div className="window-bar">
          <span className="traffic-dot red" />
          <span className="traffic-dot yellow" />
          <span className="traffic-dot green" />
        </div>
        <div className="app">
          <div className="time-section">
            <div className="time-display">{minutes}:{seconds}</div>
            <div className={`mode-label ${mode}`}>
              {mode === 'focus' ? '집중 시간' : '휴식 시간'}
            </div>
          </div>
          <ClockFace
            mode={mode}
            timeLeft={timeLeft}
            totalTime={totalTime}
            isRunning={isRunning}
            onToggle={toggle}
          />
          <SessionDots sessionCount={sessionCount} mode={mode} />
          <Controls mode={mode} onReset={reset} onSwitchMode={switchMode} />
        </div>
      </div>

      <div className="friends-section">
        <div className="friends-label">함께 공부 중</div>
        <div className="friends-row">
          {DUMMY_FRIENDS.map(f => (
            <FriendTimer key={f.name} name={f.name} timeLeft={f.timeLeft} mode={f.mode} />
          ))}
        </div>
      </div>
    </div>
  );
}
