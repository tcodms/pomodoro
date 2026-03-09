import { CX, CY, R, FOCUS_TIME, BREAK_TIME } from '../constants';

function getProgressPath(timeLeft, totalTime) {
  const fraction = timeLeft / totalTime;
  if (fraction <= 0) return '';
  if (fraction >= 1) return `M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.01} ${CY - R} Z`;
  const endAngle = (-90 + fraction * 360) * (Math.PI / 180);
  const x = CX + R * Math.cos(endAngle);
  const y = CY + R * Math.sin(endAngle);
  const largeArc = fraction > 0.5 ? 1 : 0;
  return `M ${CX} ${CY} L ${CX} ${CY - R} A ${R} ${R} 0 ${largeArc} 1 ${x} ${y} Z`;
}

const TICKS = Array.from({ length: 60 }, (_, i) => {
  const angle = (i * 6 - 90) * (Math.PI / 180);
  const isMajor = i % 5 === 0;
  const r1 = isMajor ? 104 : 109;
  return { i, angle, isMajor, r1 };
});

export function FriendTimer({ name, timeLeft, mode }) {
  const totalTime = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const progressColor = mode === 'focus' ? '#e8716a' : '#0f9b8e';

  return (
    <div className="friend-window">
      <div className="window-bar">
        <span className="traffic-dot red" />
        <span className="traffic-dot yellow" />
        <span className="traffic-dot green" />
        <span className="friend-name">{name}</span>
      </div>
      <div className="friend-app">
        <div className="friend-clock-wrap">
          <svg className="clock-svg" viewBox="0 0 280 280">
            <circle cx={CX} cy={CY} r="122" fill="#ebebeb" />
            <path d={getProgressPath(timeLeft, totalTime)} fill={progressColor} />
            <g>
              {TICKS.map(({ i, angle, isMajor, r1 }) => (
                <line
                  key={i}
                  x1={CX + r1 * Math.cos(angle)} y1={CY + r1 * Math.sin(angle)}
                  x2={CX + 116 * Math.cos(angle)} y2={CY + 116 * Math.sin(angle)}
                  stroke={isMajor ? '#888' : '#bbb'}
                  strokeWidth={isMajor ? 2 : 1}
                />
              ))}
            </g>
            <circle cx={CX} cy={CY} r="32" fill="white" />
            <text x={CX} y={CY} textAnchor="middle" dominantBaseline="central"
              fontSize="28" fontWeight="800" fill="#111" fontFamily="-apple-system, sans-serif"
              letterSpacing="-1">
              {minutes}:{seconds}
            </text>
          </svg>
        </div>
        <div className={`mode-label ${mode}`}>
          {mode === 'focus' ? '집중 중' : '휴식 중'}
        </div>
      </div>
    </div>
  );
}
