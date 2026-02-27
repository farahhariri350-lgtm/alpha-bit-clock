import React, { useEffect, useRef } from 'react';
import useTimer from '../../hooks/useTimer';
import './CountdownTimer.css';

const CountdownTimer = ({ showNotification }) => {
  const { 
    minutes, setMinutes, 
    seconds, setSeconds, 
    timeLeft, isRunning, 
    isTimerDone, 
    startTimer, pauseTimer, resetTimer,
    stopTimerSound 
  } = useTimer();

 
  const notificationShown = useRef(false);

 
  useEffect(() => {
    if (isTimerDone && !notificationShown.current) {
      notificationShown.current = true;
     
      showNotification('⏳ انتهى الوقت!', stopTimerSound);
    }
    
 
    if (!isTimerDone) {
      notificationShown.current = false;
    }
  }, [isTimerDone, showNotification, stopTimerSound]);

  const formatDisplay = () => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
  const timeUsed = totalSeconds - timeLeft;
  const blueToRedProgress = totalSeconds > 0 ? (timeUsed / totalSeconds) * 100 : 0;
  const redStart = Math.max(0, 100 - blueToRedProgress);
  
  const progressStyle = {
    '--blue-to-red': `${blueToRedProgress}%`,
    '--red-start': `${Math.min(100, redStart + 10)}%`
  };

  const hourglassClass = `fa-solid ${isRunning ? 'fa-hourglass-half spin-hourglass' : 'fa-hourglass'} ${isTimerDone ? 'ringing-hourglass' : ''}`;

  const handleMinutesChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    if (value < 0) value = 0;
    if (value > 99) value = 99;
    setMinutes(value);
  };

  const handleSecondsChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    if (value < 0) value = 0;
    if (value > 59) value = 59;
    setSeconds(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

 

  return (
    <div className={`timer-glass ${isTimerDone ? 'ringing-active' : ''}`} style={progressStyle}>
      <div className="timer-header">
        <i className={hourglassClass}></i>
        <h2 className="timer-label">المؤقت التنازلي</h2>
      </div>

      <div className="timer-display">
        <span className="glow-text-timer">{formatDisplay()}</span>
      </div>
      
      <div className="inputs-row">
        <div className="input-field">
          <label>دقائق</label>
          <input 
            type="number" 
            value={minutes} 
            onChange={handleMinutesChange}
            onKeyDown={handleKeyDown}
            disabled={isRunning || isTimerDone} 
            placeholder="00"
            min="0"
            max="99"
          />
        </div>
        <div className="input-field">
          <label>ثواني</label>
          <input 
            type="number" 
            value={seconds} 
            onChange={handleSecondsChange}
            onKeyDown={handleKeyDown}
            disabled={isRunning || isTimerDone} 
            placeholder="00"
            min="0"
            max="59"
          />
        </div>
      </div>

      <div className="controls">
        <button className="btn-start" onClick={startTimer} title="بدء" disabled={isRunning || isTimerDone}>
          <i className="fa-solid fa-play"></i>
        </button>
        <button className="btn-pause" onClick={pauseTimer} title="إيقاف مؤقت" disabled={!isRunning || isTimerDone}>
          <i className="fa-solid fa-pause"></i>
        </button>
        <button className="btn-reset" onClick={resetTimer} title="إعادة تعيين">
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;