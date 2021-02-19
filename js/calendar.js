(function (window, document) {
  'use strict';
  const DATE = new Date();
  let day = DATE.getDay();
  let month = DATE.getMonth() + 1;
  let fullYear = DATE.getFullYear();

  const $calendarWrapper = document.querySelector('.calendar__wrapper');

  const WEEKDAY = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };

  // 돔 생성 (그리기)
  class CalendarBox {
    constructor() {}

    drawTitle() {}
    drawWeek() {}
    drawDay() {}
  }

  // title -->
  // box > .upper > title

  const calendarUpper = `
    <div class="calendar--upper">
      <div class="monthly--title">
        ${fullYear}년 ${month}월
      </div>
    </div>`;

  const calendarWeekdays = `
    <div class="weekdays">
      <ul class="weekdays--ul">
      ${drawWeekdays()}
      </ul>
    </div>
  `;

  function drawWeekdays() {
    let weekdays = ``;
    for (day in WEEKDAY) {
      weekdays += `<li class="weekdays--li">${WEEKDAY[day]}</li>\n`;
    }
    return weekdays;
  }

  $calendarWrapper.innerHTML = `
    <div class="calendar__box">
    ${calendarUpper + calendarWeekdays}
    </div>
  `;

  // week -->
  // .weekdays > ul > li * 7

  // day -->
  // table > tbody > tr > td * 7 > div * 7

  // 데이터
  // 생성(분리);
  // 데이터 넣기

  // css 추가

  console.log(`DATE: ${DATE}`);
  console.log(`day: ${WEEKDAY[day]}`);
  console.log(`month: ${month}`);
  console.log(`fullYear: ${fullYear}`);
})(window, document);
