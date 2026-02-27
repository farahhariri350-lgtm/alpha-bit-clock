
export const formatTime = (date) => {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};


export const formatDate = (date) => {
  return date.toLocaleDateString('ar-SA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};