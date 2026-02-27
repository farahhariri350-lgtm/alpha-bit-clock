import { useState, useEffect, useRef } from 'react';
import { playSound, stopSounds } from '../utils/soundManager';

const useAlarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  
  const soundPlayed = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAlarmSet && !isRinging) {
        const now = new Date();
      
        const currentTime = now.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
    
        if (currentTime === alarmTime) {
          if (!soundPlayed.current) {
            console.log("المنبه بدأ الآن..."); 
            setIsRinging(true);
            soundPlayed.current = true;
            playSound('alarm');
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAlarmSet, alarmTime, isRinging]);

 
  const stopAlarm = () => {
    stopSounds();       
    setIsRinging(false); 
    setIsAlarmSet(false);
    soundPlayed.current = false;
  };

  return { 
    alarmTime, 
    setAlarmTime, 
    isAlarmSet, 
    setIsAlarmSet, 
    isRinging,   
    stopAlarm    
  };
};

export default useAlarm;