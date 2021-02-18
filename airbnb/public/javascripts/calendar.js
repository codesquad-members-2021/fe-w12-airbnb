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
  let calendarContents = '';

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

const init = (n) => {
  date.setMonth(date.getMonth() + n);
  const thisMonth = renderCalendar();
  date.setMonth(date.getMonth() + 1 + n);
  const nextMonth = renderCalendar();
  $calendarContainer.innerHTML = thisMonth + nextMonth;
};

// document.querySelector('.prev').addEventListener('click', () => {
//   date.setMonth(date.getMonth() - 1);
//   renderCalendar();
// });

// document.querySelector('.next').addEventListener('click', () => {
//   date.setMonth(date.getMonth() + 1);
//   renderCalendar();
// });

init(0);
