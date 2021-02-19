(function (window, document) {
  'use strict';

  const WEEKDAY = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };
  const $calendarWrapper = document.querySelector('.calendar__wrapper');

  // 돔 생성 (그리기)
  class CalendarBox {
    constructor(year, month) {
      this.year = year;
      this.month = month;
      // this.id_num = 1;
    }

    // Title: 년 월
    drawTitle() {
      const calendarUpper = `
      <div class="calendar--upper">
        <div class="monthly--title">
        ${this.year}년 ${this.month + 1}월
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
        // let boxID = `box${this.id_num}`;
        week += `<td><div class="day-box"></div><td>\n`;
        // week += `<td><div class="day-box" id="${boxID}"></div><td>\n`;
        // this.id_num++;
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

  // 데이터 생성

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

    getMonthArr() {
      const LASTDAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let monthArr = [];
      for (let i = 1; i < LASTDAY[this.monthIdx] + 1; i++) {
        monthArr.push(i);
      }
      return monthArr;
    }
  }

  // 데이터 넣기

  class CalendarManager {
    constructor(monthArr) {
      this.monthArr = monthArr;
      this.dayDOM = document.querySelectorAll('.day-box');
      console.log(this.dayDOM);
    }

    inputMonth() {
      for (let i = 0; i < this.monthArr.length; i++) {
        this.dayDOM[i].insertAdjacentHTML('afterbegin', this.monthArr[i]);
      }
    }
  }

  const feb = new CalendarData(2021, 1); // 데이터 생성
  const mar = new CalendarData(2021, 2);

  const monthBox = new CalendarBox(feb.year, feb.month);
  monthBox.drawMonth(); // 그리기 (아무래도 그린 후에 돔을 잡아야겠지?..)
  const monthBox2 = new CalendarBox(mar.year, mar.month);
  monthBox2.drawMonth();

  const dataPush = new CalendarManager(feb.getMonthArr());
  dataPush.inputMonth();
  const dataPush2 = new CalendarManager(mar.getMonthArr());
  dataPush2.inputMonth();

  // css 추가
})(window, document);
