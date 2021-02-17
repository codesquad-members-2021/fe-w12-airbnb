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
    if (year > this.day.getMonth() || month > this.day.getMonth()) return `tomorrow`;
    if (year < this.day.getMonth() || month < this.day.getMonth()) return `yesterday`;
    const todayDate = today.getDate();
    if (startDayCount < todayDate) return `yesterday`;
    if (startDayCount === todayDate) return `today`;
    if (startDayCount > todayDate) return `tomorrow`;
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
    // const firstDay = setDate.getDate();
    const firstDayName = setDate.getDay();
    const lastDay = new Date(this.day.getFullYear(), this.day.getMonth() + 1, 0).getDate();
    // const preLastDay = new Date(this.day.getFullYear(), this.day.getMonth(), 0).getDate();

    let startDayCount = 1;
    // let lastDayCount = 1;
    const date = [year, month];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        // 일~토: 7번 반복
        if (i === 0) {
          if (j < firstDayName) {
            calHtml += `<div class="calendar__date}"><span></span><span></span></div>`;
          } else {
            calHtml += `<div class="calendar__date ${this.checkDate(startDayCount, today, date)}"><span>${startDayCount}</span><span id="${year}${month}${this.setFixDayCount(startDayCount++)}"></span></div>`;
          }
        } else if (i > 0 && startDayCount <= lastDay) {
          calHtml += `<div class="calendar__date ${this.checkDate(startDayCount, today, date)}"><span>${startDayCount}</span><span id="${year}${month}${this.setFixDayCount(startDayCount++)}"></span></div>`;
        } else if (startDayCount > lastDay) {
          calHtml += `<div class="calendar__date"><span></span><span></span></div>`;
        }
      }
    }

    calHtml += `</div>`;
    // this.calendarMonthHtml.insertAdjacentHTML("beforeend", calMonthHtml);
    this.calendarHtml.insertAdjacentHTML("beforeend", (calHtml += `</div>`));
  }
}

// class Calendar {
//   constructor(day, calendarElement) {
//     this.day = !day ? new Date() : new Date(day[0], day[1]);
//     this.element = calendarElement;
//   }

//   setFixDayCount(number) {
//     return number <= 10 ? `0${number - 1}` : number - 1;
//   }

//   checkDate(startDayCount, today) {
//     if (this.day.getMonth() > today.getMonth()) return `tomorrow`;
//     const todayDate = today.getDate();
//     if (startDayCount < todayDate) return `yesterday`;
//     if (startDayCount === todayDate) return `today`;
//     if (startDayCount > todayDate) return `tomorrow`;
//   }

//   insertDayName(calHtml) {
//     const dayName = ["일", "월", "화", "수", "목", "금", "토", "일"];
//     for (let j = 0; j < 7; j++) {
//       calHtml += `<div class="day-name"><span>${dayName[j]}</span></div>`;
//     }
//     return calHtml;
//   }

//   setCalendarData(year, month) {
//     let calHtml = `<div class="month month__${month}">`;
//     calHtml += `<p>${year}년 ${month}월</p>`;
//     // calHtml += `<div class="calendar__title"><p>${year}년 ${month}월</p></div>`;
//     calHtml += `<div class="calendar__content">`;
//     calHtml = this.insertDayName(calHtml);
//     const today = new Date();
//     const setDate = new Date(year, month - 1, 1);
//     const firstDay = setDate.getDate();
//     const firstDayName = setDate.getDay();
//     const lastDay = new Date(this.day.getFullYear(), this.day.getMonth() + 1, 0).getDate();
//     const preLastDay = new Date(this.day.getFullYear(), this.day.getMonth(), 0).getDate();

//     let startDayCount = 1;
//     let lastDayCount = 1;

//     for (let i = 0; i < 5; i++) {
//       for (let j = 0; j < 7; j++) {
//         // 일~토: 7번 반복
//         if (i === 0) {
//           if (j < firstDayName) {
//             calHtml += `<div class="calendar__date}"><span></span><span></span></div>`;
//           } else if (j === firstDayName) {
//             calHtml += `<div class="calendar__date ${this.checkDate(startDayCount, today)}"><span>${startDayCount}</span><span id="${year}${month}${this.setFixDayCount(startDayCount++)}"></span></div>`;
//           } else {
//             calHtml += `<div class="calendar__date ${this.checkDate(startDayCount, today)}"><span>${startDayCount}</span><span id="${year}${month}${this.setFixDayCount(startDayCount++)}"></span></div>`;
//           }
//         } else if (i > 0 && startDayCount <= lastDay) {
//           calHtml += `<div class="calendar__date ${this.checkDate(startDayCount, today)}"><span>${startDayCount}</span><span id="${year}${month}${this.setFixDayCount(startDayCount++)}"></span></div>`;
//         } else if (startDayCount > lastDay) {
//           calHtml += `<div class="calendar__date"><span></span><span></span></div>`;
//         }
//       }
//     }

//     calHtml += `</div>`;

//     this.element.insertAdjacentHTML("beforeend", (calHtml += `</div>`));
//   }
// }

// function createCalendar(calendarElement) {
//   const today = new Date();
//   for (let i = 0; i < 2; i++) {
//     const calendar = new Calendar([today.getFullYear(), today.getMonth() + i], calendarElement);
//     calendar.setCalendarData(calendar.day.getFullYear(), calendar.day.getMonth() + 1);
//   }
// }

// export function calendarEvent(item, f) {
//   item.element.innerHTML = ``;
//   createCalendar(item.element);
//   item.init();
// }
