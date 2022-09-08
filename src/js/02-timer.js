import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDateUnix = selectedDates[0].getTime();
    let id = null;

    if (Date.now() > selectedDateUnix) {
      Notiflix.Notify.failure('Please choose a date in the future');

      buttonStartTimer.disabled = true;
      return;
    } else {
        buttonStartTimer.disabled = false;
    }
    // console.log(selectedDates[0]);
  },
};

const inputDataEl = document.querySelector('#datetime-picker');
flatpickr(inputDataEl, options);
const buttonStartTimer = document.querySelector('button[data-start]');
buttonStartTimer.addEventListener('click', () => {
    const timer = {
  timerDeadline: new Date(inputDataEl.value),
  intervalId: null,
  rootSelector: document.querySelector('.timer'),

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.timerDeadline - Date.now();

      if (diff <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = this.getTimeComponents(diff);

      this.rootSelector.querySelector('.js-timer__days').textContent = this.pad(days);
      this.rootSelector.querySelector('.js-timer__hours').textContent = this.pad(hours);
      this.rootSelector.querySelector('.js-timer__minutes').textContent = this.pad(minutes);
      this.rootSelector.querySelector('.js-timer__seconds').textContent = this.pad(seconds);

    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },

    };
    timer.start();

})



// console.log(inputDataEl);



