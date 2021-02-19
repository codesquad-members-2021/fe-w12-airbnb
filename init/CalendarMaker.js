export default class CalendarMaker {
  constructor($navMenuRoom, $navMenuActivity) {
    this.$navMenuRoom = $navMenuRoom;
    this.$navMenuActivity = $navMenuActivity;
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.activeMonth = this.today.getMonth();
    this.dayList = ["일", "월", "화", "수", "목", "금", "토"];
    this.lastDateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  changeNullToBlank(array) {
    for (let i = 0; i < 35; i++) {
      if (!array[i]) array[i] = ``;
    }
    return array;
  }

  makeDateList(section) {
    let isRight = 0;
    section === "R" ? isRight++ : isRight;

    const today = new Date();
    today.setDate(1); //date를 1로 지정
    today.setMonth(this.activeMonth); //activeMonth로 left 달력의 월 세팅
    let dayIdx = today.getDay(); //각 달의 시작 요일의 idx
    let dateRawList = [];

    for (let date = 1; date <= this.lastDateOfMonth[this.activeMonth]; date++) {
      dateRawList[dayIdx] = date;
      dayIdx++;
    }
    return dateRawList;
  }

  showCalendar() {
    const leftDateList = this.makeDateList("L");
    const rightDateList = this.makeDateList("R");

    this.drawTbody(this.changeNullToBlank(leftDateList), "left");
    this.drawTbody(this.changeNullToBlank(rightDateList), "right");
  }

  drawTbody(tdList, section) {
    let adderForMonth = 1;
    let btn = "<";

    if (section == "right") {
      adderForMonth++;
      btn = ">";
    }

    let tBody = ``;
    let tdListIdx = 0;
    for (let i = 0; i < 5; i++) {
      tBody += `<tr>`;
      for (let j = 0; j < 7; j++) {
        tBody += `<td class="td-${section}">${tdList[tdListIdx]}</td>`;
        tdListIdx++;
      }
    }

    const div = `<div id="calendar-${section}">
      <div class="calendar-title">
        <button id="btn-${section}">${btn}</button>
        <span>${this.year}년 ${this.activeMonth + adderForMonth}월</span>
      </div>
      <table class="calendar-table">
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody class="calendar-${section}-tbody">${tBody}</tbody>
      </table>
    </div>`;

    document
      .querySelector(".search-calendar")
      .insertAdjacentHTML("beforeend", div);
  }

  drawParentCalendar() {
    const outerDivTemplate = `<div class="search-calendar"></div>`;
    this.$navMenuActivity.insertAdjacentHTML("afterend", outerDivTemplate);
  }

  init() {
    this.drawParentCalendar();
    this.showCalendar();
  }
}
