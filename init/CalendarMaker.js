import { changeNullToBlank } from "./changeNullToBlank.js";
export default class CalendarMaker {
  constructor($navMenuRoom, $navMenuActivity) {
    this.$navMenuRoom = $navMenuRoom;
    this.$navMenuActivity = $navMenuActivity;
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.activeMonth = this.today.getMonth();

    this.lastDateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  makeDateList(section) {
    let adderForNextMonth = 0;
    section === "right" ? adderForNextMonth++ : adderForNextMonth;

    const today = new Date();
    today.setDate(1); //date를 1로 지정
    today.setMonth(this.activeMonth); //activeMonth로 left 달력의 월 세팅
    let dayIdx = today.getDay(); //각 달의 시작 요일의 idx
    let dateRawList = [];

    for (
      let date = 1;
      date <= this.lastDateOfMonth[this.activeMonth + adderForNextMonth];
      date++
    ) {
      dateRawList[dayIdx] = date;
      dayIdx++;
    }
    return dateRawList;
  }

  drawCalendar() {
    const leftDateList = this.makeDateList("left");
    const rightDateList = this.makeDateList("right");

    this.drawTbody(changeNullToBlank(leftDateList), "left");
    this.drawTbody(changeNullToBlank(rightDateList), "right");
  }

  drawDayOfWeek() {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days.reduce((totalDay, curDay) => {
      return totalDay + `<th>${curDay}</th>`;
    }, "");
  }

  drawTbody(tdList, section) {
    let adderForNextMonth = 1;
    let btn = "<";

    if (section == "right") {
      adderForNextMonth++;
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

    const calendarSection = `<div id="calendar-${section}">
      <div class="calendar-title">
        <button id="btn-${section}">${btn}</button>
        <span>${this.year}년 ${this.activeMonth + adderForNextMonth}월</span>
      </div>
      <table class="calendar-table">
        <thead>
          <tr>${this.drawDayOfWeek()}</tr>
        </thead>
        <tbody class="calendar-${section}-tbody">${tBody}</tbody>
      </table>
    </div>`;

    document
      .querySelector(".search-calendar")
      .insertAdjacentHTML("beforeend", calendarSection);
  }

  drawParentCalendar() {
    const outerDivTemplate = `<div class="search-calendar"></div>`;
    this.$navMenuActivity.insertAdjacentHTML("afterend", outerDivTemplate);
  }

  init() {
    this.drawParentCalendar();
    this.drawCalendar();
  }
}
