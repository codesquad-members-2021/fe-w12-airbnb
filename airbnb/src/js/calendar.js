import days from "./daysByMonth.js";

class Calendar {
  constructor(date = new Date()) {
    this.date = date;
  }
  init() {
    const year = this.date.getFullYear();
    const month = this.getMonth() + 1;
    const firstDay = this.getFirstDay(year, month); //요일
    const month = this.setMonthArr(month, firstDay); //월의 날짜가 담긴 2차원 배열
    let calendar = this.makeMonthDiv(month);

    return calendar;
  }
  getFirstDay(year, month) {
    return new Date(year, month, 1).getDate();
  }
  isLeaf(year, month) {
    return year % 4 && month === 2;
  }
  setMonthArr(year, month, day) {
    const monthArr = [];
    let weekArr = [];
    const lastDay = ifLeaf(year, month) ? 29 : days[month];
    for (let i = 1; i <= lastDay; i++) {
      const dayIndex = (day + i - 1) % 7;
      if (dayIndex === 0 && weekArr.length !== 0) {
        monthArr.push(weekArr);
        weekArr = [];
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
    let days = "";
    week.forEach((day) => (days += this.makeDayDiv(day)));
    return `<div class='week'>${days}</div>`;
  }
  makeMonthDiv(month) {
    let weeks = "";
    month.forEach((week) => (weeks += this.makeWeekDiv(week)));
    return `<div class='month'>${weeks}</div>`;
  }
  getCalendarFormat(year, month) {
    const calendarFormat = `
    <div class="calendar__header">
      <div class="calendar__btn prev"><</div>
      <div class="calendar__date">
        <div class="date__year">${year}년</div>
        <div class="date__month">${month}월</div>
      </div>
      <div class="calendar__btn next">></div>
    </div>
    <div class="calendar__index-container">
      <div class="calendar__index day">일</div>
      <div class="calendar__index day">월</div>
      <div class="calendar__index day">화</div>
      <div class="calendar__index day">수</div>
      <div class="calendar__index day">목</div>
      <div class="calendar__index day">금</div>
      <div class="calendar__index day">토</div>
    </div>`;
  }
}

export default Calendar;
