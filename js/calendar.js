(function (window, document) {
  'use strict';

  const WEEKDAY = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };
  const $calendarWrapper = document.querySelector('.calendar__wrapper');
  const TODAY = new Date();
  const STATUS = { perv: 'prev', current: 'current', next: 'next', nextNext: 'next-next' };

  // 돔 생성 (그리기)
  class CalendarBox {
    constructor(year, month, day, lastDay, status) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.lastDay = lastDay;
      this.status = status;

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

    getWeekLine() {
      let weekLine = 5;
      if (this.lastDay === 28 && this.day === 0) {
        return (weekLine = 4);
      }
      if (this.lastDay === 30 && this.day > 5) {
        return (weekLine = 6);
      }
      if (this.lastDay === 31 && this.day > 4) {
        return (weekLine = 6);
      }
      return weekLine;
    }

    drawWeeks() {
      let weekLine = this.getWeekLine();

      let weeks = ``;
      for (let i = 0; i < weekLine; i++) {
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
      let status = this.status;
      return $calendarWrapper.insertAdjacentHTML(
        'beforeend',
        `
        <div class="calendar__box calendar__box--${status}" id="calendar${this.year}-${this.month + 1}">
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
      this.day = this.DATE.getDay();
      this.lastDay = new Date(this.fullYear, this.monthIdx + 1, 0).getDate();
      this.dayKorean = WEEKDAY[this.DATE.getDay()];
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
    constructor(year, month, day, monthArr) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.monthArr = monthArr;
      this.dayDOM = document.querySelectorAll(`#calendar${this.year}-${this.month + 1} .day-box`);
    }

    inputMonth() {
      for (let i = 0; i < this.monthArr.length; i++) {
        this.dayDOM[i + this.day].insertAdjacentHTML('afterbegin', this.monthArr[i]);
      }
    }
  }

  // const thisMonth = new CalendarData(2021, 0); // 데이터 생성
  // 흠... 요기가 반복되고있다....
  const prevMonth = new CalendarData(TODAY.getFullYear(), TODAY.getMonth() - 1);
  const thisMonth = new CalendarData(TODAY.getFullYear(), TODAY.getMonth());
  const nextMonth = new CalendarData(TODAY.getFullYear(), TODAY.getMonth() + 1);
  const nextNextMonth = new CalendarData(TODAY.getFullYear(), TODAY.getMonth() + 2);

  const prevMonthBox = new CalendarBox(prevMonth.year, prevMonth.month, prevMonth.day, prevMonth.lastDay, STATUS.prev);
  prevMonthBox.drawMonth();
  const thisMonthBox = new CalendarBox(thisMonth.year, thisMonth.month, thisMonth.day, thisMonth.lastDay, STATUS.current);
  thisMonthBox.drawMonth();
  const nextMonthBox = new CalendarBox(nextMonth.year, nextMonth.month, nextMonth.day, nextMonth.lastDay, STATUS.next);
  nextMonthBox.drawMonth();
  const nextNextMonthBox = new CalendarBox(nextNextMonth.year, nextNextMonth.month, nextNextMonth.day, nextNextMonth.lastDay, STATUS.nextNext);
  nextNextMonthBox.drawMonth();

  const prevMonthDataPush = new CalendarManager(prevMonth.year, prevMonth.month, prevMonth.day, prevMonth.getMonthArr());
  prevMonthDataPush.inputMonth();
  const thisMonthDataPush = new CalendarManager(thisMonth.year, thisMonth.month, thisMonth.day, thisMonth.getMonthArr());
  thisMonthDataPush.inputMonth();
  const nextMonthDataPush = new CalendarManager(nextMonth.year, nextMonth.month, nextMonth.day, nextMonth.getMonthArr());
  nextMonthDataPush.inputMonth();
  const nextNextMonthDataPush = new CalendarManager(nextNextMonth.year, nextNextMonth.month, nextNextMonth.day, nextNextMonth.getMonthArr());
  nextNextMonthDataPush.inputMonth();

  // css 추가
})(window, document);
