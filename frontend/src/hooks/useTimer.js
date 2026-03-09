import { useState, useEffect, useRef, useCallback } from 'react';
import { FOCUS_TIME, BREAK_TIME, TOTAL_SESSIONS } from '../constants';

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
  osc.start();
  osc.stop(ctx.currentTime + 1);
}

export function useTimer() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const modeRef = useRef('focus');
  const intervalRef = useRef(null);
  const endedRef = useRef(false);

  // 카운트다운 인터벌
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          endedRef.current = true;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // 타이머 종료 처리
  useEffect(() => {
    if (!endedRef.current || timeLeft !== 0) return;
    endedRef.current = false;
    setIsRunning(false);
    playBeep();
    if (modeRef.current === 'focus') {
      setSessionCount(c => (c + 1) % TOTAL_SESSIONS);
    }
    const nextMode = modeRef.current === 'focus' ? 'break' : 'focus';
    modeRef.current = nextMode;
    setMode(nextMode);
    setTimeLeft(nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  }, [timeLeft]);

  const toggle = useCallback(() => {
    setIsRunning(prev => {
      if (prev) clearInterval(intervalRef.current);
      return !prev;
    });
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(modeRef.current === 'focus' ? FOCUS_TIME : BREAK_TIME);
  }, []);

  const switchMode = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    const nextMode = modeRef.current === 'focus' ? 'break' : 'focus';
    modeRef.current = nextMode;
    setMode(nextMode);
    setTimeLeft(nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  }, []);

  const totalTime = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  return { mode, timeLeft, totalTime, isRunning, sessionCount, toggle, reset, switchMode };
}
