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

  // week -->
  // .weekdays > ul > li * 7

  const calendarWeekdays = `
    <div class="weekdays">
      <ul class="weekdays--ul">
      ${drawWeekdays()}
      </ul>
    </div>
  `;

  // 그리는 것과 데이터를 분리?
  function drawWeekdays() {
    let weekdays = ``;
    for (day in WEEKDAY) {
      weekdays += `<li class="weekdays--li">${WEEKDAY[day]}</li>\n`;
    }
    return weekdays;
  }

  // day -->
  // table > tbody > tr > td * 7 > div * 7

  const calendarBody = `
    <table class="calendar--table" role="presentation">
      <tbody>
      ${drawWeeks()}
      </tbody>
    </table>
  `;

  function drawWeek() {
    let week = `<tr>\n`;
    for (let i = 0; i < 7; i++) {
      week += `<td><div></div><td>\n`;
    }
    week += `</tr>`;
    return week;
  }

  function drawWeeks() {
    const WEEKS = {
      feb: 4,
      short: 5,
      long: 6,
    };
    let weeks = ``;
    for (let i = 0; i < WEEKS.short; i++) {
      weeks += `\n${drawWeek()}`;
    }
    return weeks;
  }

  function drawDays() {
    return `${calendarUpper + calendarWeekdays + calendarBody}`;
  }

  // 데이터
  // 생성(분리);
  // 데이터 넣기

  // css 추가

  $calendarWrapper.innerHTML = `
  <div class="calendar__box">
    ${drawDays()}
  </div>
`;

  console.log(`DATE: ${DATE}`);
  console.log(`day: ${WEEKDAY[day]}`);
  console.log(`month: ${month}`);
  console.log(`fullYear: ${fullYear}`);
})(window, document);
