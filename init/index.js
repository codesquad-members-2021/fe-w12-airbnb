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

  onEvents() {
    navMenu.addEventListener("click", this.changeSearchBar.bind(this));
  }

  init() {
    this.menuRoom.classList.add("display-block");
    this.menuActivity.classList.add("display-none");
  }
}

class CalenderUI {
  constructor() {
    this.day = new Date();
    this.month = this.day.getMonth() + 1;
    this.date = this.day.getDate();
  }
  drawCalender() {}
  moveNextMonth() {}
  moveLastMonth() {}
}

const init = () => {
  const hamburgerTabUI = new HamburgerTabUI();
  hamburgerTabUI.onEvents();

  const searchBarUI = new SearchBarUI();
  searchBarUI.init();
  searchBarUI.onEvents();
};

init();
