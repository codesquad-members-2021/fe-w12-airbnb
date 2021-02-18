//날짜 테이블 만들기
class Calendar {
  constructor() {
    this.today = new Date();
    this.countMonth = 0;
  }
  showCurrentCal() {
    this.buildCalendar(".calendar", 0);
  }
  showNextCal() {
    this.buildCalendar(".calendar2", 1);
    //
  }

  buildCalendar(calendar, num_checkNextCal) {
    //num_checkNextCal은 다음달 캘린더이면 1 아니면 0을 받는 파라미터. 아래 함수들에서 + 해준다
    const calendarTable = document.querySelector(calendar);
    const currentDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + this.countMonth + num_checkNextCal,
      1
    ); //현재 날짜의 month에 해당하는 1일
    const numOfDaysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(); //현재 날짜의 month에 해당하는 마지막 일 (ex 28, 30, 31)

    let cnt = 0;
    let row = calendarTable.insertRow();
    let cell;

    //어디부터 1일이 시작하는지 알기 위한 for문..
    for (let i = 0; i < currentDate.getDay(); i++) {
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
  calendar.showNextCal();
});
