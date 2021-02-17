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

class CalendarUI {
  constructor() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1; //2월은 1이 찍힘.
    this.date = this.today.getDate();
    this.dayList = ["일", "월", "화", "수", "목", "금", "토"];
    this.lastDateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  changeNullToBlank(array) {
    //  빈 칸을 공백으로 바꿔줌
    for (let i = 0; i < 36; i++) {
      if (!array[i]) array[i] = ``;
    }
    return array;
  }

  drawCalendar() {
    //이전 버튼 누를 때 마다 month-1 됨 -> 1월 1일의 요일을 찾음 -> 1월 1일 1부터 31일까지 뿌림
    //2월 = current month -> 2월 1일의 요일은? -> 월 -> 월요일의 인덱스는 1 -> 1 번 td 부터 숫자 1을 채우기 시작한다.
    // -> 어디까지? -> 인덱스 31번까지. -> 인덱스 6는 6까지 있음 . 숫자가 6 이상이면 다시 0부터 시작 ....
  }
  drawLastMonth() {}
  drawNextMonth() {}
  drawThisMonth() {
    const currentDateObj = new Date(`${this.year}-${this.month}-1`);
    let currentDay = currentDateObj.getDay(); //이 인덱스부터...td를 만들으렴..
    let tdDateList = []; //얘는 그냥 바둑판임
    let previousBtnClicks = 0;
    let nextBtnClicks = 1;

    for (let date = 1; date <= this.lastDateOfMonth[this.month - 1]; date++) {
      tdDateList[currentDay] = date;
      currentDay++;
    }
    tdDateList = this.changeNullToBlank(tdDateList);

    console.log(tdDateList);

    //하단 반복문으로 바꾸기
    const leftTbody = `<tr> 
    <td>${tdDateList[0]}</td>
    <td>${tdDateList[1]}</td>
    <td>${tdDateList[2]}</td>
    <td>${tdDateList[3]}</td>
    <td>${tdDateList[4]}</td>
    <td>${tdDateList[5]}</td>
    <td>${tdDateList[6]}</td>
  </tr>
  <tr>
    <td>${tdDateList[7]}</td>
    <td>${tdDateList[8]}</td>
    <td>${tdDateList[9]}</td>
    <td>${tdDateList[10]}</td>
    <td>${tdDateList[11]}</td>
    <td>${tdDateList[12]}</td>
    <td>${tdDateList[13]}</td>
  </tr>
  <tr>
  <td>${tdDateList[14]}</td>
  <td>${tdDateList[15]}</td>
  <td>${tdDateList[16]}</td>
  <td>${tdDateList[17]}</td>
  <td>${tdDateList[18]}</td>
  <td>${tdDateList[19]}</td>
  <td>${tdDateList[20]}</td>
  </tr>
  <tr>
  <td>${tdDateList[21]}</td>
  <td>${tdDateList[22]}</td>
  <td>${tdDateList[23]}</td>
  <td>${tdDateList[24]}</td>
  <td>${tdDateList[25]}</td>
  <td>${tdDateList[26]}</td>
  <td>${tdDateList[27]}</td>
  </tr>
  <tr>
  <td>${tdDateList[28]}</td>
  <td>${tdDateList[29]}</td>
  <td>${tdDateList[30]}</td>
  <td>${tdDateList[31]}</td>
  <td>${tdDateList[32]}</td>
  <td>${tdDateList[33]}</td>
  <td>${tdDateList[34]}</td>
  <td>${tdDateList[35]}</td>
  </tr>`;

    const outerDivTemplate = `<div class="search-calendar">
    <div id="calendar-left">
      <div class="calendar-title">
        <button id="btn-left"><</button>
        <span>${this.year}년 ${this.month}월</span>
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
    </div>

    <div id="calendar-right">
      <div class="calendar-title">
        <span>${this.year}년 ${this.month + nextBtnClicks}월</span>
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
        <tbody class="calendar-right-tbody"></tbody>
      </table>
    </div>
  </div>`;
    //여기에 동적으로 어떻게 넣을거니..
    searchActivitySectionEl.insertAdjacentHTML("afterend", outerDivTemplate);
    this.hideCalendar();
  }

  hideCalendar() {}
  moveNextMonth() {}
  moveLastMonth() {}
}

const init = () => {
  const hamburgerTabUI = new HamburgerTabUI();
  hamburgerTabUI.onEvents();

  const searchBarUI = new SearchBarUI();
  searchBarUI.init();
  searchBarUI.onEvents();

  const calendarUI = new CalendarUI();
  calendarUI.drawThisMonth();
};

init();
