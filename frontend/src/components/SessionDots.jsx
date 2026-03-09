import { TOTAL_SESSIONS } from '../constants';

export function SessionDots({ sessionCount, mode }) {
  return (
    <div className="session-dots">
      {Array.from({ length: TOTAL_SESSIONS }, (_, i) => (
        <div
          key={i}
          className={['dot', i < sessionCount && 'filled', mode === 'break' && 'break']
            .filter(Boolean).join(' ')}
        />
      ))}
    </div>
  );
}
