import { useState, useEffect, useRef } from 'react';
import { playSound, stopSounds } from '../utils/soundManager';

const useTimer = () => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);
  
 
  const soundPlayed = useRef(false);

  const startTimer = () => {
    const total = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    if (total > 0) {
      setTimeLeft(total);
      setIsRunning(true);
      setIsTimerDone(false);
      soundPlayed.current = false; 
    }
  };

  const stopTimerSound = () => {
    stopSounds();
    setIsTimerDone(false);
    setTimeLeft(0);
    setMinutes('');
    setSeconds('');
    soundPlayed.current = false;
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsTimerDone(true);
            
            // تشغيل الصوت مرة وحدة فقط
            if (!soundPlayed.current) {
              soundPlayed.current = true;
              playSound('timer');
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);


  useEffect(() => {
    if (!isTimerDone) {
      soundPlayed.current = false;
    }
  }, [isTimerDone]);

  return { 
    minutes, setMinutes, 
    seconds, setSeconds, 
    timeLeft, isRunning, 
    isTimerDone, 
    startTimer, 
    pauseTimer: () => setIsRunning(false), 
    resetTimer: () => { 
      stopSounds(); 
      setIsRunning(false); 
      setTimeLeft(0); 
      setIsTimerDone(false);
      setMinutes('');
      setSeconds('');
      soundPlayed.current = false;
    }, 
    stopTimerSound 
  };
};

export default useTimer;