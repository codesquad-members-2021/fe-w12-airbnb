const iconListEl = document.querySelector(".popup__icon-list");
const iconNavigator = document.querySelector(".nav--icons");
const searchSectionEl = document.querySelector(".search-section");
const searchActivitySectionEl = document.querySelector(
  ".search-section__activity"
);
const iconPerson = document.querySelector(".icon-person");
const navMenu = document.querySelector(".nav__menu");
const radioListEl = document.getElementsByName("nav");

class HamburgerTabUI {
  constructor() {
    this.bPopUp = false;
    this.hamburgerTab = iconListEl;
  }
  drawPopupTable() {
    this.trList = [
      "회원가입",
      "로그인",
      "숙소 호스트 되기",
      "체험 호스팅 하기",
      "도움말",
    ];
    this.tbClass = "popup-tb";
    this.tdClass = "popup-tb-td";

    this.tableTemplate = `<table class=${this.tbClass}>
  <tbody><tr><td class=${this.tdClass}>${this.trList[0]}</td></tr>
  <tr><td class=${this.tdClass}>${this.trList[1]}</td></tr>
  <tr><td class=${this.tdClass}>${this.trList[2]}</td></tr>
  <tr><td class=${this.tdClass}>${this.trList[3]}</td></tr>
  <tr><td class=${this.tdClass}>${this.trList[4]}</td></tr>
  </tbody>
  </table>`;
    iconPerson.insertAdjacentHTML("afterend", this.tableTemplate);
    this.bPopUp = true;
  }

  hidePopupTable(event) {
    this.table = document.querySelector(".popup-tb");
    if (!event.target.className.includes("popup") && this.bPopUp) {
      this.table.remove();
      this.bPopUp = false;
    } else {
      return;
    }
  }

  onEvents() {
    this.hamburgerTab.addEventListener("click", this.drawPopupTable.bind(this));
    document.addEventListener("click", this.hidePopupTable.bind(this));
  }
}

class SearchBarUI {
  constructor() {
    this.menu = navMenu;
    this.menuRadio = radioListEl;
    this.menuRoom = searchSectionEl;
    this.menuActivity = searchActivitySectionEl;
  }
  changeSearchBar() {
    for (let node of this.menuRadio) {
      if (node.checked && node.value === "room") {
        this.menuRoom.classList.replace("display-none", "display-block");
        this.menuActivity.classList.replace("display-block", "display-none");
      } else if (node.checked && node.value === "activity") {
        this.menuRoom.classList.replace("display-block", "display-none");
        this.menuActivity.classList.replace("display-none", "display-block");
      }
    }
  }
  d;

  onEvents() {
    navMenu.addEventListener("click", this.changeSearchBar.bind(this));
  }

  init() {
    this.menuRoom.classList.add("display-block");
    this.menuActivity.classList.add("display-none");
    this.onEvents();
  }
}

class CalendarController {
  constructor() {}
}

class CalendarMaker {
  constructor() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.activeMonth = this.today.getMonth(); //실제 Month -1
    this.dayList = ["일", "월", "화", "수", "목", "금", "토"];
    this.lastDateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //월별 마지막 일
  }

  changeNullToBlank(array) {
    for (let i = 0; i < 35; i++) {
      if (!array[i]) array[i] = ``;
    }
    return array;
  }

  movePrevMonth() {
    const calendarEl = document.querySelector(".search-calendar");
    if (calendarEl) calendarEl.remove();
    this.init();

    if (this.activeMonth <= 0) {
      this.activeMonth = 10;
      this.year--;
    } else {
      this.activeMonth--;
    }
  }

  moveNextMonth() {
    const calendarEl = document.querySelector(".search-calendar");
    if (calendarEl) calendarEl.remove();
    this.init();

    if (this.activeMonth >= 10) {
      this.activeMonth = 0;
      this.year++;
    } else {
      this.activeMonth++;
    }
  }

  showCalendar() {
    const leftDate = new Date();
    leftDate.setDate(1); //date를 1로 지정(매월 시작 요일을 구하기 위함)
    leftDate.setMonth(this.activeMonth); //activeMonth로 left 달력의 월 세팅

    let leftDayIdx = leftDate.getDay(); //각 달의 시작 요일의 idx
    const leftMonthIdx = leftDate.getMonth();
    let leftDateRawList = [];

    const rightDate = new Date();
    rightDate.setDate(1);
    rightDate.setMonth(this.activeMonth + 1);

    let rightDayIdx = rightDate.getDay(); //
    const rightMonthIdx = rightDate.getMonth();
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
        leftTbody += `<td>${tdList[tdListIdx]}</td>`;
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
        rightTbody += `<td>${tdList[tdListIdx]}</td>`;
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

  drawOutline() {
    const outerDivTemplate = `<div class="search-calendar"></div>`;
    searchActivitySectionEl.insertAdjacentHTML("afterend", outerDivTemplate);
  }

  hideCalendar() {}

  onEvents() {
    document
      .querySelector("#btn-left")
      .addEventListener("click", this.movePrevMonth.bind(this));
    document
      .querySelector("#btn-right")
      .addEventListener("click", this.moveNextMonth.bind(this));
  }
  init() {
    this.drawOutline();
    this.showCalendar();
    this.onEvents();
  }
}

const init = () => {
  const hamburgerTabUI = new HamburgerTabUI();
  hamburgerTabUI.onEvents();

  const searchBarUI = new SearchBarUI();
  searchBarUI.init();

  const calendarUI = new CalendarMaker();
  calendarUI.init();
};

init();
