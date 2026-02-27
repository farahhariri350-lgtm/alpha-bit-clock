import React, { useEffect, useRef } from 'react';
import useAlarm from '../../hooks/useAlarm';
import './AlarmSystem.css';

const AlarmSystem = ({ showNotification }) => {  
  const { 
    alarmTime, 
    setAlarmTime, 
    isAlarmSet, 
    setIsAlarmSet, 
    isRinging,   
    stopAlarm    
  } = useAlarm();

 
  const notificationShown = useRef(false);

 
  useEffect(() => {
    if (isRinging && !notificationShown.current) {
      notificationShown.current = true;
      showNotification(`⏰ حان وقت المنبه! (${alarmTime})`, stopAlarm);
    }
    
 
    if (!isRinging) {
      notificationShown.current = false;
    }
  }, [isRinging, alarmTime, showNotification, stopAlarm]);

  const handleCancel = () => {
    stopAlarm(); 
    setIsAlarmSet(false); 
    notificationShown.current = false; 
  };

  return (
    <div className={`alarm-card ${isRinging ? 'ringing-active' : ''}`}>
      <div className="alarm-glass">
        <div className="alarm-header">
          <i className="fa-solid fa-bell-concierge neon-icon-alarm"></i>
          <h2 className="alarm-label">نظام المنبه</h2>
        </div>

        <div className="alarm-input-container">
          <div className="time-wrapper">
             <i className="fa-regular fa-clock"></i>
             <input 
               type="time" 
               value={alarmTime} 
               onChange={(e) => setAlarmTime(e.target.value)} 
               disabled={isAlarmSet || isRinging}
               className="neon-time-input"
             />
          </div>
        </div>

        <div className="alarm-controls">
          {!isRinging ? (
            <button 
              className={isAlarmSet ? "btn-cancel" : "btn-set"}
              onClick={isAlarmSet ? handleCancel : () => setIsAlarmSet(true)}
            >
              {isAlarmSet ? (
                <><i className="fa-solid fa-bell-slash"></i> إلغاء الضبط</>
              ) : (
                <><i className="fa-solid fa-check"></i> ضبط المنبه</>
              )}
            </button>
          ) : (
            <button className="btn-stop-ringing pulse-orange" onClick={stopAlarm}>
              <i className="fa-solid fa-volume-xmark"></i> إيقاف التنبيه
            </button>
          )}
        </div>

        {isAlarmSet && !isRinging && (
          <div className="status-badge">
            <i className="fa-solid fa-circle-check"></i> نشط: {alarmTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmSystem;