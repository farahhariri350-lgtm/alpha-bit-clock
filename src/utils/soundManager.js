const timerAudio = new Audio('/sounds/timer-sound.mp3');
const alarmAudio = new Audio('/sounds/alarm-sound.mp3');

export const playSound = (type) => {
  const audio = type === 'timer' ? timerAudio : alarmAudio;
  audio.currentTime = 0;
  audio.loop = true; // خليه يكرر الصوت لحتى يضغط المستخدم إيقاف
  audio.play().catch(e => console.log("تحتاج ضغطة على الصفحة أولاً"));
};

export const stopSounds = () => {
  timerAudio.pause();
  timerAudio.currentTime = 0;
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
};