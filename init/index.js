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
  }
}

class CalendarController {
  constructor() {}
}

class CalendarMaker {
  constructor() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.activeMonth = this.today.getMonth(); //2월은 1이 찍힘.
    this.date = this.today.getDate();
    this.dayList = ["일", "월", "화", "수", "목", "금", "토"];
    this.lastDateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //월별 마지막 일
  }

  changeNullToBlank(array) {
    //  빈 칸을 공백 문자열로 바꿔줌
    for (let i = 0; i < 35; i++) {
      if (!array[i]) array[i] = ``;
    }
    return array;
  }

  //이전 버튼 누를 때 마다 month-1 됨 -> 1월 1일의 요일을 찾음 -> 1월 1일 1부터 31일까지 뿌림
  //2월 = current month -> 2월 1일의 요일은? -> 월 -> 월요일의 인덱스는 1 -> 1 번 td 부터 숫자 1을 채우기 시작한다.
  // -> 어디까지? -> 인덱스 31번까지. -> 인덱스 6는 6까지 있음 . 숫자가 6 이상이면 다시 0부터 시작 ....
  movePrevMonth() {
    console.log("prev");
    //1.화면에 있는 div를 remove 한다.
    //2.active month를 -1 한다.
    this.activeMonth--;
    const calendarEl = document.querySelector(".search-calendar");
    if (calendarEl) calendarEl.remove();

    this.init(); // 상단 월 안바뀜 , 연도 2021이하로 안바뀜 !! 그래도 함 ㅋ
  }

  moveNextMonth() {
    console.log("next");
    this.activeMonth++;
    const calendarEl = document.querySelector(".search-calendar");
    if (calendarEl) calendarEl.remove();

    this.init();
  }

  showThisMonth() {
    //디폴트 파라미터
    //오른쪽 클릭할때마다 + 되게
    const leftDate = new Date();
    leftDate.setDate(1); //1일로
    leftDate.setMonth(this.activeMonth); //2

    const rightDate = new Date();
    rightDate.setDate(1);
    rightDate.setMonth(this.activeMonth + 1); //3

    let leftDayIdx = leftDate.getDay(); //각 달의 시작 요일의 idx
    const leftMonthIdx = leftDate.getMonth();

    let rightDayIdx = rightDate.getDay(); //
    const rightMonthIdx = rightDate.getMonth();

    let leftDateRawList = []; //왼쪽 바둑판
    let rightDateRawList = []; //오른쪽 바둑판

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

    const leftDateList = this.changeNullToBlank(leftDateRawList);
    const rightDateList = this.changeNullToBlank(rightDateRawList);
    console.log(leftDateList);
    console.log(rightDateList);

    this.drawTbody(leftDateList, rightDateList);
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
    <span>2021년 ${this.activeMonth + 1}월</span>
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
        <span>2021년 ${this.activeMonth + 2}월</span>
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
    this.showThisMonth();
    this.onEvents();
  }
}

const init = () => {
  const hamburgerTabUI = new HamburgerTabUI();
  hamburgerTabUI.onEvents();

  const searchBarUI = new SearchBarUI();
  searchBarUI.init();
  searchBarUI.onEvents();

  const calendarUI = new CalendarMaker();
  calendarUI.init();
};

init();
