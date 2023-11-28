import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix, { Notify }  from 'notiflix';

const text = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Proszę wybierz inną datę");
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    }
};
flatpickr(text, options);

function convertMs(ms) {
    const day = hour * 24;
    const hour = minute * 60;
    const minute = second * 60;
    const second = 1000;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
    let timeTimer = setInterval(() => {
        let countdown = new Date(text.value) - new Date();
        startBtn.disabled = true;
        if (countdown >= 0) {
            let timeElements = convertMs(countdown);
            days.textContent = addLeadingZero(timeElements.days);
            hours.textContent = addLeadingZero(timeElements.hours);
            minutes.textContent = addLeadingZero(timeElements.minutes);
            seconds.textContent = addLeadingZero(timeElements.seconds);

            if (countdown <= 10000) {
                timer.style.color = 'tomato';
            }
        } else {
            Notiflix.Notify.success('Odliczanie zakończone');
            timer.style.color = 'black';
            clearInterval(timeTimer);
        }
    }, 1000)
});

