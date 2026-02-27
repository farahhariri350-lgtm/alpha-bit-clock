import React, { useState, useEffect, useRef } from 'react';
import DigitalClock from './components/DigitalClock/DigitalClock';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import AlarmSystem from './components/AlarmSystem/AlarmSystem';
import NotificationModal from './components/NotificationModal/NotificationModal';
import './App.css';

function App() {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [stopSoundFunction, setStopSoundFunction] = useState(null);


  const notificationTimer = useRef(null);


  const showNotification = (message, stopSound = null) => {
  
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }

    setModalMessage(message);
    setStopSoundFunction(() => stopSound);
    setModalOpen(true);

  
    notificationTimer.current = setTimeout(() => {
      if (stopSoundFunction) {
        stopSoundFunction();
      }
      setModalOpen(false);
      setStopSoundFunction(null);
      notificationTimer.current = null;
    }, 5000);
  };

 
  const handleCloseModal = () => {
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
      notificationTimer.current = null;
    }
    

    if (stopSoundFunction) {
      stopSoundFunction();
    }
    
    setModalOpen(false);
    setStopSoundFunction(null);
  };

  useEffect(() => {
 
    const cards = document.querySelectorAll('.clock-card, .alarm-card, .timer-glass');
    
    const handleMouseMove = (e) => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    };
  }, []);

  return (
    <div className="app-wrapper">
      <div className="animated-bg"></div>
      
      <header className="app-header">
        <h1>Smart Clock</h1>
        <p>⏰ ساعة ذكية - منبه - مؤقت ⏳</p>
      </header>

      <main className="main-layout">
     
        <div className="clock-alarm-column">
          <DigitalClock />
          <AlarmSystem showNotification={showNotification} />
        </div>

    
        <div className="timer-section">
          <CountdownTimer showNotification={showNotification} />
        </div>
      </main>

      <footer className="app-footer">
        <p>تم التطوير بواسطة فرح الحريري - 2026</p>
        <p className="supervisor">
          <i className="fa-regular fa-star"></i>
          إشراف: Majd Alaraki
          <i className="fa-regular fa-star"></i>
        </p>
      </footer>

   
      <NotificationModal 
        isOpen={modalOpen}
        message={modalMessage}
        onStop={handleCloseModal}
      />
    </div>
  );
}

export default App;