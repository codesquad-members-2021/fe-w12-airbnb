//날짜 테이블 만들기
class Calendar {
  constructor() {
    this.today = new Date();
    this.countMonth = 0;
    this.currentDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + this.countMonth,
      1
    ); //현재 날짜의 month에 해당하는 1일
  }
  showCurrentCal() {
    this.buildCalendar();
  }
  showNextCal() {
    //
  }

  buildCalendar() {
    const calendarTable = document.querySelector(".calendar");
    const numOfDaysInMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    ).getDate(); //현재 날짜의 month에 해당하는 마지막 일 (ex 28, 30, 31)

    let cnt = 0;
    let row = calendarTable.insertRow();
    let cell;

    //어디부터 1일이 시작하는지 알기 위한 for문..
    for (let i = 0; i < this.currentDate.getDay(); i++) {
      cell = row.insertCell();
      cnt += 1;
    }

    for (let i = 1; i <= numOfDaysInMonth; i++) {
      cell = row.insertCell();
      cell.innerHTML = i;
      cnt++;

      if (cnt % 7 === 0) {
        cell.innerHTML = i;
        row = calendarTable.insertRow();
      }
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let calendar = new Calendar();
  calendar.showCurrentCal();
});

// window.addEventListener("DOMContentLoaded", () => {
//   const calendarTable = document.querySelector(".calendar");

//   const today = new Date(); //오늘날짜
//   const currentDate = new Date(today.getFullYear(), today.getMonth(), 1); //현재 날짜의 month에 해당하는 1일

//   const numOfDaysInMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   ).getDate(); //현재 날짜의 month에 해당하는 마지막 일 (ex 28, 30, 31)

//   const nextDate = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 2,
//     0
//   ).getDate(); //현재 날짜 기준 다음달에 해당하는 달의 마지막 일(ex 28, 30, 31)

//   let cnt = 0;
//   let row = calendarTable.insertRow();

//   //어디부터 1일이 시작하는지 알기 위한 for문..
//   for (let i = 0; i < currentDate.getDay(); i++) {
//     cell = row.insertCell();
//     cnt += 1;
//   }

//   for (let i = 1; i <= numOfDaysInMonth; i++) {
//     cell = row.insertCell();
//     cell.innerHTML = i;
//     cnt++;

//     if (cnt % 7 === 0) {
//       cell.innerHTML = i;
//       row = calendarTable.insertRow();
//     }
//   }
// });
