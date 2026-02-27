import React, { useEffect, useState } from 'react';
import './NotificationModal.css';

const NotificationModal = ({ isOpen, message, onStop }) => {
  const [countdown, setCountdown] = useState(5);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCountdown(5);
      
  
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onStop(); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onStop]);


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onStop();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onStop]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onStop}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">🔔</div>
        <h2>تنبيه!</h2>
        <p>{message}</p>
        <p style={{ fontSize: '0.9rem', color: '#ffaa00', marginTop: '-10px' }}>
          إغلاق تلقائي خلال {countdown} ثواني
        </p>
        <button className="modal-stop-btn" onClick={onStop} autoFocus>
          <i className="fa-solid fa-bell-slash"></i>
          إيقاف التنبيه وإغلاق ({countdown})
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;