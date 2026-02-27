// تنسيق الوقت ليظهر HH:MM:SS
export const formatTime = (date) => {
  return date.toLocaleTimeString('en-GB', { // en-GB تضمن تنسيق 24 ساعة
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// تنسيق التاريخ بشكل جمالي
export const formatDate = (date) => {
  return date.toLocaleDateString('ar-SA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};