(function (window, document) {
  'use strict';

  const WEEKDAY = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };
  const $calendarWrapper = document.querySelector('.calendar__wrapper');

  // 돔 생성 (그리기)

  class CalendarData {
    constructor(fullYear, monthIdx) {
      this.fullYear = fullYear;
      this.monthIdx = monthIdx;
      this.DATE = new Date(this.fullYear, this.monthIdx);
      this.year = this.DATE.getFullYear();
      this.month = this.DATE.getMonth();
      this.date = this.DATE.getDate();
      this.day = WEEKDAY[this.DATE.getDay()];
    }

    getMonth() {
      const LASTDAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let monthArr = [];
      for (let i = 1; i < LASTDAY[this.monthIdx] + 1; i++) {
        monthArr.push(i);
      }
      return monthArr;
    }
  }

  let data = new CalendarData(2021, 3);
  console.log(data.getMonth());

  class CalendarBox {
    // constructor(year, monthIdx) {
    //   this.DATE = new Date(year, monthIdx);
    //   this.year = this.DATE.getFullYear();
    //   this.month = this.DATE.getMonth() + 1;
    //   this.date = this.DATE.getDate();
    //   this.day = WEEKDAY[this.DATE.getDay()];
    // }

    // Title: 년 월
    drawTitle() {
      const calendarUpper = `
      <div class="calendar--upper">
        <div class="monthly--title">
        ${this.year}년 ${this.month}월
        </div>
      </div>`;
      return calendarUpper;
    }

    // Weekdays: 월화수목금퇼
    drawWeekdays() {
      let weekdays = `
        <div class="weekdays">
          <ul class="weekdays--ul">`;
      for (let key in WEEKDAY) {
        weekdays += `<li class="weekdays--li">${WEEKDAY[key]}</li>\n`;
      }
      weekdays += `</ul></div>`;
      return weekdays;
    }

    // Week: 한 주
    drawWeek() {
      let week = `<tr>\n`;
      for (let i = 0; i < 7; i++) {
        week += `<td><div>${this.date}</div><td>\n`;
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
      return $calendarWrapper.insertAdjacentHTML(
        'beforeend',
        `
        <div class="calendar__box">
          ${this.drawTitle() + this.drawWeekdays() + this.drawDays()}
        </div>`
      );
    }
  }

  // const monthBox = new CalendarBox(2021, 1);
  // const monthBox2 = new CalendarBox(2021, 2);
  // monthBox.drawMonth();
  // monthBox2.drawMonth();

  // 데이터
  // 생성(분리);
  // 데이터 넣기

  // css 추가
})(window, document);
