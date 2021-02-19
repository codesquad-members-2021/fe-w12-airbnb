// 숙소, 체험 탭 테스트

export default class NavTab {
  constructor(tabName, myUnderBar, siblingUnderBar, mySearchBar, sSearchBar) {
    this.navTab = tabName;
    this.myUnderBar = myUnderBar;
    this.siblingUnderBar = siblingUnderBar;
    this.mySearchBar = mySearchBar;
    this.sSearchBar = sSearchBar;
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
