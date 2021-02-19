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

    // Title: 년 월
    drawTitle() {
      const calendarUpper = `
      <div class="calendar--upper">
        <div class="monthly--title">
          ${fullYear}년 ${month}월
        </div>
      </div>`;
      return calendarUpper;
    }

    // Weekdays: 월화수목금퇼
    drawWeekdays() {
      let weekdays = `
        <div class="weekdays">
          <ul class="weekdays--ul">`;
      for (day in WEEKDAY) {
        weekdays += `<li class="weekdays--li">${WEEKDAY[day]}</li>\n`;
      }
      weekdays += `</ul></div>`;
      return weekdays;
    }

    // Week: 한 주
    drawWeek() {
      let week = `<tr>\n`;
      for (let i = 0; i < 7; i++) {
        week += `<td><div></div><td>\n`;
      }
      week += `</tr>`;
      return week;
    }

    // Weeks: 몇 주?
    drawWeeks() {
      const WEEKS = {
        feb: 4,
        short: 5,
        long: 6,
      };
      let weeks = ``;
      for (let i = 0; i < WEEKS.short; i++) {
        weeks += `\n${this.drawWeek()}`;
      }
      return weeks;
    }

    // Days: 하루하루
    drawDays() {
      let days = `
        <table class="calendar--table" role="presentation">
          <tbody>
            ${this.drawWeeks()}
          </tbody>
        </table>`;
      return days;
    }

    drawMonth() {
      return ($calendarWrapper.innerHTML = `
        <div class="calendar__box">
          ${this.drawTitle() + this.drawWeekdays() + this.drawDays()}
        </div>`);
    }
  }

  const monthBox = new CalendarBox();
  monthBox.drawMonth();

  // 데이터
  // 생성(분리);
  // 데이터 넣기

  // css 추가

  console.log(`DATE: ${DATE}`);
  console.log(`day: ${WEEKDAY[day]}`);
  console.log(`month: ${month}`);
  console.log(`fullYear: ${fullYear}`);
})(window, document);
