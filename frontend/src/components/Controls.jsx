export function Controls({ mode, onReset, onSwitchMode }) {
  return (
    <div className="controls">
      <button className="btn" onClick={onReset}>리셋</button>
      <button
        className={['btn', 'btn-accent', mode === 'break' && 'break'].filter(Boolean).join(' ')}
        onClick={onSwitchMode}
      >
        모드 전환
      </button>
    </div>
  );
}
