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

  insertDayName(calHtml) {
    const dayName = ["일", "월", "화", "수", "목", "금", "토", "일"];
    for (let j = 0; j < 7; j++) {
      calHtml += `<div class="calendar__date day-name"><span>${dayName[j]}</span></div>`;
    }
    return calHtml;
  }

  setCalendarData(year, month, index) {
    let calHtml = `<div class="month month__${index}">`;
    if (index === 0) calHtml += `<div class="calendar_title"><span>${year}년 ${month}월</span></div>`;
    else if (index === 1) calHtml += `<div class="calendar_title"><span>${year}년 ${month}월</span></div>`;
    calHtml += `<div class="calendar__content">`;
    calHtml = this.insertDayName(calHtml);
    const today = new Date();
    const setDate = new Date(year, month - 1, 1);
    const firstDay = setDate.getDate();
    const firstDayName = setDate.getDay();
    const lastDay = new Date(this.day.getFullYear(), this.day.getMonth() + 1, 0).getDate();
    const preLastDay = new Date(this.day.getFullYear(), this.day.getMonth(), 0).getDate();

    let startDayCount = 1;
    let lastDayCount = 1;
    const date = [year, month];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        // 일~토: 7번 반복
        if (i === 0) {
          if (j < firstDayName) {
            calHtml += `<div class="calendar__date}"><span></span></div>`;
          } else {
            calHtml += `<div id="${year}-${month}-${this.setFixDayCount(startDayCount)}" class="calendar__date ${this.checkDate(startDayCount, today, date)} ${year}-${month}-${startDayCount}"><span>${startDayCount++}</span></div>`;
            // className으로 해당 날짜를 넣어보려고했다... 근데 어차피 id로 주어지니까 필요 없는 것 같기도 하다.. day부분이 -1 되어서 표기된다는 것만 유의하면서 진행하면 될거같은 느낌이다..
          }
        } else if (i > 0 && startDayCount <= lastDay) {
          calHtml += `<div id="${year}-${month}-${this.setFixDayCount(startDayCount)}" class="calendar__date ${this.checkDate(startDayCount, today, date)} ${year}-${month}-${startDayCount}"><span>${startDayCount++}</span></div>`;
        } else if (startDayCount > lastDay) {
          calHtml += `<div class="calendar__date"><span></span></div>`;
        }
      }
    }

    calHtml += `</div>`;
    this.calendarHtml.insertAdjacentHTML("beforeend", (calHtml += `</div>`));
  }
}
