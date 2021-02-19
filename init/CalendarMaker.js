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

  showCalendar() {
    const leftDate = new Date();
    leftDate.setDate(1); //date를 1로 지정
    leftDate.setMonth(this.activeMonth); //activeMonth로 left 달력의 월 세팅

    let leftDayIdx = leftDate.getDay(); //각 달의 시작 요일의 idx
    let leftDateRawList = [];

    const rightDate = new Date();
    rightDate.setDate(1);
    rightDate.setMonth(this.activeMonth + 1);

    let rightDayIdx = rightDate.getDay();

    let rightDateRawList = [];

    for (let date = 1; date <= this.lastDateOfMonth[this.activeMonth]; date++) {
      leftDateRawList[leftDayIdx] = date;
      leftDayIdx++;
    }

    for (
      let date = 1;
      date <= this.lastDateOfMonth[this.activeMonth + 1];
      date++
    ) {
      rightDateRawList[rightDayIdx] = date;
      rightDayIdx++;
    }

    this.drawTbody(
      this.changeNullToBlank(leftDateRawList),
      this.changeNullToBlank(rightDateRawList)
    );
  }

  drawTbody(leftTdList, rightTdList) {
    this.drawLeftTbody(leftTdList);
    this.drawRightTbody(rightTdList);
  }

  drawLeftTbody(tdList) {
    let leftTbody = ``;
    let tdListIdx = 0;
    for (let i = 0; i < 5; i++) {
      leftTbody += `<tr>`;
      for (let j = 0; j < 7; j++) {
        leftTbody += `<td class="td-left">${tdList[tdListIdx]}</td>`;
        tdListIdx++;
      }
    }

    const leftDiv = `<div id="calendar-left">
      <div class="calendar-title">
        <button id="btn-left"><</button>
        <span>${this.year}년 ${this.activeMonth + 1}월</span>
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
        <tbody class="calendar-left-tbody">${leftTbody}</tbody>
      </table>
    </div>`;

    document
      .querySelector(".search-calendar")
      .insertAdjacentHTML("beforeend", leftDiv);
  }

  drawRightTbody(tdList) {
    let rightTbody = ``;
    let tdListIdx = 0;

    for (let i = 0; i < 5; i++) {
      rightTbody += `<tr>`;
      for (let j = 0; j < 7; j++) {
        rightTbody += `<td class ="td-right">${tdList[tdListIdx]}</td>`;
        tdListIdx++;
      }
    }

    const rightDiv = `<div id="calendar-right">
          <div class="calendar-title">
            <span>${this.year}년 ${this.activeMonth + 2}월</span>
            <button id="btn-right">></button>
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
            <tbody class="calendar-right-tbody">${rightTbody}</tbody>
          </table>
        </div>`;

    document
      .querySelector(".search-calendar")
      .insertAdjacentHTML("beforeend", rightDiv);
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
