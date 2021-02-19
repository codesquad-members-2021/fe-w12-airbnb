// 숙소, 체험 탭 테스트

export default class NavTab {
  constructor(tabName, sibling, mySearchBar, sSearchBar) {
    this.navTab = document.querySelector(`.${tabName}`);
    this.myUnderBar = document.querySelector(`.underBar__${tabName}`);
    this.siblingUnderBar = document.querySelector(`.underBar__${sibling}`);
    this.mySearchBar = document.querySelector(`.${mySearchBar}`);
    this.sSearchBar = document.querySelector(`.${sSearchBar}`);
    this.className = {
      set: "set__underBar",
      none: "none",
    };
  }

  eventListen() {
    this.navTab.addEventListener("click", () => {
      this.siblingUnderBar.classList.remove(this.className.set);
      this.myUnderBar.classList.add(this.className.set);
      this.mySearchBar.classList.remove(this.className.none);
      this.sSearchBar.classList.add(this.className.none);
    });
  }
}
