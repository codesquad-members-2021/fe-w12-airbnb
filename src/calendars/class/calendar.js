import { isSameWithStartDate, isBetweenSelectedDates, isSameWithEndDate } from "../functions/calendarDateEvent.js";

export default class Calendar {
  constructor(day, calendarHtml) {
    this.day = !day ? new Date() : new Date(day[0], day[1]);
    this.calendarHtml = calendarHtml;
  }

  setFixDayCount(number) {
    return number <= 10 ? `0${number - 1}` : number - 1;
  }

  checkDate(startDayCount, today, date) {
    const [year, month] = date;
    const [presentYear, presentMonth, presentDate] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
    if (presentYear > year || (presentYear === year && presentMonth > month)) return `yesterday`;
    if (presentYear < year || (presentYear === year && presentMonth < month)) return `tomorrow`;
    if (presentYear === year && presentMonth === month) {
      return startDayCount < presentDate ? `yesterday` : startDayCount === presentDate ? `today` : `tomorrow`;
    }
  }

  insertTitle(date) {
    const [year, month] = date;
    return `<div class="calendar_title"><span>${year}년 ${month}월</span></div>`;
  }

  insertDayName() {
    const dayName = ["일", "월", "화", "수", "목", "금", "토"];
    return dayName.reduce((acc, val) => acc + `<div class="calendar__date day-name"><span>${val}</span></div>`, ``);
  }

  createHtmlTagOfDate(date, startDayCount) {
    const [year, month] = date;
    const today = new Date();
    const currDate = [year, month, startDayCount - 1];
    return `<div id="${year}-${month}-${this.setFixDayCount(startDayCount)}" class="calendar__date ${this.checkDate(startDayCount, today, date)} ${isBetweenSelectedDates(currDate) ? "connected" : ""}"><span id="${year}-${month}-${this.setFixDayCount(startDayCount)}" class="data ${isSameWithStartDate(currDate) || isSameWithEndDate(currDate) ? "selected" : ""}">${startDayCount++}</span></div>`;
  }

  setCalendarData(year, month, index) {
    const date = [year, month];
    let calHtml = `<div class="month month__${index}">`;
    calHtml += this.insertTitle(date);
    calHtml += `<div class="calendar__content">`;
    calHtml += this.insertDayName();
    // calHtml = this.insertDayName(calHtml);
    const setDate = new Date(year, month - 1, 1);
    // const firstDay = setDate.getDate();
    const firstDayName = setDate.getDay();
    const lastDay = new Date(this.day.getFullYear(), this.day.getMonth() + 1, 0).getDate();
    // const preLastDay = new Date(this.day.getFullYear(), this.day.getMonth(), 0).getDate();

    let startDayCount = 1;
    // let lastDayCount = 1;
    const oneMonth = Array.from(Array(5), () => Array(7).fill(0)); // 5주, 각 7일이 있는 배열 생성

    oneMonth.forEach((week, i) => {
      week.forEach((day, j) => {
        if (i === 0) {
          if (j < firstDayName) calHtml += `<div class="calendar__date}"><span></span></div>`;
          else {
            calHtml += this.createHtmlTagOfDate(date, startDayCount);
            startDayCount++;
          }
        } else if (i > 0 && startDayCount <= lastDay) {
          calHtml += this.createHtmlTagOfDate(date, startDayCount);
          startDayCount++;
        } else if (startDayCount > lastDay) calHtml += `<div class="calendar__date"><span></span></div>`;
      });
    });

    calHtml += `</div>`;
    this.calendarHtml.insertAdjacentHTML("beforeend", (calHtml += `</div>`));
  }
}
