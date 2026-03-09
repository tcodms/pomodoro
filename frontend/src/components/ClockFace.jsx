import { useMemo } from 'react';
import { CX, CY, R } from '../constants';

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

export function ClockFace({ mode, timeLeft, totalTime, isRunning, onToggle }) {
  const ticks = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * (Math.PI / 180);
      const isMajor = i % 5 === 0;
      const r1 = isMajor ? 104 : 109;
      items.push(
        <line
          key={`t${i}`}
          x1={CX + r1 * Math.cos(angle)} y1={CY + r1 * Math.sin(angle)}
          x2={CX + 116 * Math.cos(angle)} y2={CY + 116 * Math.sin(angle)}
          stroke={isMajor ? '#888' : '#bbb'}
          strokeWidth={isMajor ? 2 : 1}
        />
      );
      if (isMajor) {
        items.push(
          <text
            key={`n${i}`}
            x={CX + 91 * Math.cos(angle)} y={CY + 91 * Math.sin(angle)}
            textAnchor="middle" dominantBaseline="central"
            fontSize="11" fill="#888" fontFamily="-apple-system, sans-serif"
          >{i}</text>
        );
      }
    }
    return items;
  }, []);

  const progressColor = mode === 'focus' ? '#e8716a' : '#0f9b8e';

  return (
    <div className="clock-wrap">
      <svg className="clock-svg" viewBox="0 0 280 280">
        <circle cx={CX} cy={CY} r="122" fill="#ebebeb" />
        <path d={getProgressPath(timeLeft, totalTime)} fill={progressColor} />
        <g>{ticks}</g>
        <circle cx={CX} cy={CY} r="32" fill="white" />
      </svg>
      <button className="center-btn" onClick={onToggle}>
        {isRunning ? '⏸' : '▶'}
      </button>
    </div>
  );
}
