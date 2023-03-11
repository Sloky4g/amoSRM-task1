const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const changeTimeFormat = (seconds) => {
  let hoursCalc = Math.floor(seconds / 60 / 60);
  let hh = hoursCalc < 10 ? `0${hoursCalc}` : hoursCalc;
  let minutesCalc = Math.floor(seconds / 60) - (hh * 60);
  let mm = minutesCalc < 10 ? `0${minutesCalc}` : minutesCalc;
  let ss = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

  return `${hh}:${mm}:${ss}`;
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    let timerValue = changeTimeFormat(seconds);

    timerEl.innerText = timerValue;
    const timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        timerValue = changeTimeFormat(seconds);
        timerEl.innerText = timerValue;
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      buttonEl.disabled = false;
    }, seconds * 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  e.target.value = e.target.value.replace(/[^\d.]/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  buttonEl.disabled = true;
  inputEl.value = '';
});
