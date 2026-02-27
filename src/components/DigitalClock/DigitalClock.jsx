import React, { useState, useEffect } from 'react';
import { formatTime, formatDate } from '../../utils/timeFormatter';
import './DigitalClock.css';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); 
  }, []);

  return (
    <div className="clock-card">
      <div className="clock-glass">
     
        <div className="clock-header">
          <i className="fa-solid fa-clock-pulse neon-icon"></i>
          <h2 className="clock-label">الوقت الحالي</h2>
        </div>
        
     
        <div className="clock-time">
          <span className="glow-text">{formatTime(time)}</span>
        </div>
        
        <div className="clock-date">
          <i className="fa-regular fa-calendar-days"></i> {formatDate(time)}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;