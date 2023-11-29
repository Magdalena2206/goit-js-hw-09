import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
const spans = document.querySelectorAll('.value');

startBtn.disabled = true;
let timer = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
  
      }
    },
};
flatpickr(text, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return `${value}`.padStart(2, '0');
}  
  startBtn.addEventListener('click', onBtnStartClick);
  
  function onBtnStartClick() {
    spans.forEach(item => item.classList.toggle('end'));
    startBtn.disabled = true;
    text.disabled = true;
    timer = setInterval(() => { 
      const countdown = new Date(text.value); - Date.now();
      const { days, hours, minutes, seconds } = convertMs(countdown);
  
      day.textContent = addLeadingZero(days);
      hour.textContent = addLeadingZero(hours);
      minute.textContent = addLeadingZero(minutes);
      second.textContent = addLeadingZero(seconds);
  
      if (countdown <= 1000) {
        spans.forEach(item => item.classList.toggle('end'));
        clearInterval(timer);
        text.disabled = false;
      }
    }, 1000);
};





