import MONTH_DAYS from './daysByMonth.js';
const HIDDEN = 'hidden';
class Calendar {
  constructor(date = new Date()) {
    this.date = date;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
  }
  getCalendar() {
    const firstDay = this.getFirstDay(this.year, this.month); //요일
    const monthData = this.setMonthArr(this.year, this.month, firstDay); //월의 날짜가 담긴 2차원 배열
    const monthHTML = this.makeMonthDiv(monthData); //month html
    const calendarHTML = this.getCalendarFormat() + monthHTML; //format + month html
    return calendarHTML;
  }
  getFirstDay(year, month) {
    return new Date(year, month, 1).getDate();
  }
  isLeaf(year, month) {
    return year % 4 && month === 2;
  }
  setMonthArr(year, month, day) {
    const monthArr = [];
    let weekArr = new Array(7).fill(undefined);
    const lastDay = this.isLeaf(year, month) ? 29 : MONTH_DAYS[month];
    for (let i = 1; i <= lastDay; i++) {
      const dayIndex = (day + i - 1) % 7;
      if (dayIndex === 0 && weekArr.length !== 0) {
        monthArr.push(weekArr);
        weekArr = new Array(7).fill(undefined);
      }
      weekArr[dayIndex] = i;
    }
    return monthArr;
  }
  makeDayDiv(day) {
    if (day) return `<div class='day'>${day}</div>`;
    else return `<div class='day'></div>`;
  }
  makeWeekDiv(week) {
    let days = '';
    week.forEach((day) => (days += this.makeDayDiv(day)));
    return `<div class='week'>${days}</div>`;
  }
  makeMonthDiv(month) {
    let weeks = '';
    month.forEach((week) => (weeks += this.makeWeekDiv(week)));
    return `<div class='month'>${weeks}</div>`;
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
    document.addEventListener('click', this.renderCalendar.bind(this));
  }
  renderCalendar(e) {
    if (this.calendar.contains(e.target)) {
      return;
    } else if (this.queryDate.contains(e.target)) {
      this.calendar.classList.toggle(HIDDEN);
    } else {
      this.calendar.classList.add(HIDDEN);
    }
    this.setCalendar();
  }
  setCalendar() {
    const calendarHTML = this.calendarModel.getCalendar();
    this.calendar.innerHTML = calendarHTML;
  }
}
