(function (window, document) {
  'use strict';

  const WEEKDAY = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };
  const $calendarWrapper = document.querySelector('.calendar__wrapper');
  const $prevBtn = document.querySelector('.calendar__prev--button-box');
  const $nextBtn = document.querySelector('.calendar__next--button-box');

  const TODAY = new Date();
  const calendarData = {
    year: TODAY.getFullYear(),
    month: TODAY.getMonth(),
  };

  const STATUS = { prev: 'prev', current: 'current', next: 'next', nextNext: 'next-next' };

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
      let position = 'beforeend';
      if (status === 'prev') {
        position = 'afterbegin';
      }
      return $calendarWrapper.insertAdjacentHTML(
        position,
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
        this.dayDOM[i + this.day].classList.add('day-box-data');
      }
    }
  }

  // const thisMonth = new CalendarData(2021, 0); // 데이터 생성
  // 흠... 요기가 반복되고있다....

  function calendarInit() {
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
  }

  // css 추가

  // eventListener: button

  $prevBtn.addEventListener('click', goPrev);
  $nextBtn.addEventListener('click', goNext);

  function goPrev() {
    // 현재 날짜 수정

    if (calendarData.month === 0) {
      calendarData.month = 11;
      calendarData.year--;
    } else {
      calendarData.month--;
    }

    let nextNextMonth = document.querySelector('.calendar__box--next-next');
    $calendarWrapper.removeChild(nextNextMonth);
    $calendarWrapper.querySelector('.calendar__box--next').classList.replace('calendar__box--next', 'calendar__box--next-next');
    $calendarWrapper.querySelector('.calendar__box--current').classList.replace('calendar__box--current', 'calendar__box--next');
    $calendarWrapper.querySelector('.calendar__box--prev').classList.replace('calendar__box--prev', 'calendar__box--current');

    // 함수에 넣어줄 때는 prev로 따로 계산

    getPrevMonth(calendarData.year, calendarData.month);

    function getPrevMonth(currentYear, currentMonth) {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }

      const prevData = new CalendarData(currentYear, currentMonth);
      const prevBox = new CalendarBox(prevData.year, prevData.month, prevData.day, prevData.lastDay, STATUS.prev);
      prevBox.drawMonth();
      const prevDataPush = new CalendarManager(prevData.year, prevData.month, prevData.day, prevData.getMonthArr());
      prevDataPush.inputMonth();
    }
  }

  function goNext() {
    if (calendarData.month === 11) {
      calendarData.month = 0;
      calendarData.year++;
    } else {
      calendarData.month++;
    }

    let prevMonth = document.querySelector('.calendar__box--prev');
    $calendarWrapper.removeChild(prevMonth);
    $calendarWrapper.querySelector('.calendar__box--current').classList.replace('calendar__box--current', 'calendar__box--prev');
    $calendarWrapper.querySelector('.calendar__box--next').classList.replace('calendar__box--next', 'calendar__box--current');
    $calendarWrapper.querySelector('.calendar__box--next-next').classList.replace('calendar__box--next-next', 'calendar__box--next');

    getNextNextMonth(calendarData.year, calendarData.month);
    function getNextNextMonth(currentYear, currentMonth) {
      if (currentMonth === 10) {
        currentMonth = 0;
        currentYear++;
      } else if (currentMonth === 11) {
        currentMonth = 1;
        currentYear++;
      } else {
        currentMonth += 2;
      }

      const nextNextData = new CalendarData(currentYear, currentMonth);
      const nextNextBox = new CalendarBox(nextNextData.year, nextNextData.month, nextNextData.day, nextNextData.lastDay, STATUS.nextNext);
      nextNextBox.drawMonth();
      const nextNextDataPush = new CalendarManager(nextNextData.year, nextNextData.month, nextNextData.day, nextNextData.getMonthArr());
      nextNextDataPush.inputMonth();
    }
  }

  calendarInit();

  const $dayBoxData = document.querySelectorAll('.day-box-data');
  $dayBoxData.forEach((element) => element.addEventListener('click', dayBoxDataPick));

  function dayBoxDataPick(e) {
    e.currentTarget.classList.replace('day-box-data', 'day-box-data--pick');
  }

  function pickCheckIn() {}

  function pickCheckOut() {}
})(window, document);
