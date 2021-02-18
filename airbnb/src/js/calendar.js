import { makeDiv } from './controlHTML.js';
import MONTH_DAYS from './daysByMonth.js';
const HIDDEN = 'hidden';
class Calendar {
  constructor(date = new Date()) {
    this.date = date;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.nowDate = { year: this.year, month: this.month, day: this.day };
  }
  getCalendar() {
    const firstDay = this.getFirstDay(this.year, this.month); //요일
    const monthData = this.setMonthArr(this.year, this.month, firstDay); //월의 날짜가 담긴 2차원 배열
    const monthHtml = this.makeMonthHtml(monthData);
    const calendarHtml = this.getCalendarFormat() + monthHtml;
    return calendarHtml;
  }
  getFirstDay(year, month) {
    return new Date(year, month - 1, 1).getDay();
  }
  isLeaf(year, month) {
    return year % 4 === 0 && month === 2;
  }
  setMonthArr(year, month, day) {
    const monthArr = [];
    let weekArr = new Array(7).fill(undefined);
    const lastDay = this.isLeaf(year, month) ? 29 : MONTH_DAYS[month];
    for (let i = 1; i <= lastDay; i++) {
      const dayIndex = (day + i - 1) % 7;
      //인덱스가 0 && weekArr에 값이 하나라도 들어가있는 경우
      if (dayIndex === 0 && weekArr[weekArr.length - 1]) {
        monthArr.push(weekArr);
        weekArr = new Array(7).fill(undefined);
      }
      weekArr[dayIndex] = i;
    }
    monthArr.push(weekArr); //마지막 weekArr도 추가
    return monthArr;
  }
  isReservable(day) {
    const { year: nowYear, month: nowMonth, day: nowDay } = this.nowDate;
    if (this.year === nowYear && this.month === nowMonth) {
      return day >= nowDay;
    } else {
      return this.year >= nowYear && this.month >= nowMonth;
    }
  }
  makeDayHtml(day) {
    if (day && this.isReservable(day)) return makeDiv(day, 'day', 'able');
    else if (day) return makeDiv(day, 'day', 'past', 'disable');
    else return makeDiv('', 'day', 'disable');
  }
  makeWeekHtml(week) {
    let daysHtml = week.reduce((acc, day) => acc + this.makeDayHtml(day), '');
    return makeDiv(daysHtml, 'week');
  }
  makeMonthHtml(month) {
    let weeksHtml = month.reduce(
      (acc, week) => acc + this.makeWeekHtml(week),
      ''
    );
    return makeDiv(weeksHtml, 'month');
  }
  getCalendarFormat() {
    return `
    <div class="calendar__header">
      <div class="calendar__btn prev"><i class="fas fa-angle-left"></i></div>
      <div class="calendar__date">
        <div class="date__year">${this.year}년&nbsp</div>
        <div class="date__month">${this.month}월</div>
      </div>
      <div class="calendar__btn next"><i class="fas fa-angle-right"></i></div>
    </div>
    <div class="calendar__index-container">
      <div class="calendar__index">일</div>
      <div class="calendar__index">월</div>
      <div class="calendar__index">화</div>
      <div class="calendar__index">수</div>
      <div class="calendar__index">목</div>
      <div class="calendar__index">금</div>
      <div class="calendar__index">토</div>
    </div>`;
  }
}

export class CalendarView {
  constructor(queryForm, queryDate, calendar) {
    this.queryForm = queryForm;
    this.queryDate = queryDate;
    this.calendar = calendar;
    this.calendarModel = new Calendar();
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    document.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick(e) {
    if (this.calendar.contains(e.target)) {
      if (this.isLeftArrow(e.target)) this.setPrevDate();
      else if (this.isRightArrow(e.target)) this.setNextDate();
    } else if (this.queryDate.contains(e.target)) {
      this.calendar.classList.toggle(HIDDEN);
    } else {
      this.calendar.classList.add(HIDDEN);
    }

    this.renderCalendar();
  }

  renderCalendar() {
    const calendarHTML = this.calendarModel.getCalendar();
    this.calendar.innerHTML = calendarHTML;
  }
  isLeftArrow(target) {
    return (
      target.classList.contains('prev') ||
      target.classList.contains('fa-angle-left')
    );
  }
  isRightArrow(target) {
    return (
      target.classList.contains('next') ||
      target.classList.contains('fa-angle-right')
    );
  }
  setPrevDate() {
    if (--this.calendarModel.month <= 0) {
      this.calendarModel.year--;
      this.calendarModel.month = 12;
    }
  }
  setNextDate() {
    if (++this.calendarModel.month > 12) {
      this.calendarModel.year++;
      this.calendarModel.month = 1;
    }
  }
}
