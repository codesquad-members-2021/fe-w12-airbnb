const $date = document.querySelector('.date');
const $calendarContainer = document.querySelector('.calendar-container');
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
  let weekday = '';
  let days = '';
  const calendarTitle = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  weekdays.forEach((e) => {
    weekday += `<div>${e}</div>`;
  });

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date"> </div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date"> </div>`;
  }

  return `<div class="calendar">
            <div>
              <div class="calendar-title">${calendarTitle}</div>
              <div class="weekdays">${weekday}</div>
              <div class="days">${days}</div>
            </div>
          </div>`;
};

const init = (direction) => {
  date.setMonth(date.getMonth());
  const thisMonthCal = renderCalendar();
  date.setMonth(date.getMonth() + 1);
  const nextMonthCal = renderCalendar();
  $calendarContainer.innerHTML = `
                                  <i class="prev">▷</i>
                                  ${thisMonthCal} ${nextMonthCal}
                                  <i class="next">◁</i>`;
};

init();

const $days = document.querySelectorAll('.days > div');
let clickCount = 0;

$days.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const $checkIn = document.querySelector('.sub-check-in');
    const $checkOut = document.querySelector('.sub-check-out');
    const $checkInDate = document.querySelector('.check-in-date');
    const $checkOutDate = document.querySelector('.check-out-date');

    function selectDate(inOrOut, dateDOM) {
      event.target.classList.add(inOrOut, 'clicked');
      dateDOM.innerHTML = `${date.getMonth() + 1}월 ${
        event.target.innerText
      }일`;
      clickCount++;
    }

    function switchCheckOutDate() {
      $checkOutDate.classList.remove('check-out-date', 'clicked');
      if (
        parseInt(event.target.textContent) > parseInt($checkOutDate.textContent)
      ) {
        event.target.classList.add('check-out-date', 'clicked');
      } else {
        $checkInDate.classList.remove('check-out-date', 'clicked');
        clickCount = 0;
      }
    }

    if (clickCount === 0) {
      selectDate('check-in-date', $checkIn);
      return;
    }

    if (clickCount === 1) {
      if (
        parseInt(event.target.textContent) < parseInt($checkInDate.textContent)
      ) {
        $checkInDate.classList.remove('check-in-date', 'clicked');
        clickCount--;
        selectDate('check-in-date', $checkIn);
        return;
      }
      selectDate('check-out-date', $checkOut);
      return;
    }

    if (clickCount === 2) {
      switchCheckOutDate();
    }
  });
});
