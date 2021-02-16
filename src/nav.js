// 숙소, 체험 탭 테스트

export default class NavTab {
  constructor(myElement, sibling, mySearchBar, sSearchBar) {
    this.myElement = document.querySelector(`.${myElement}`);
    this.sibling = document.querySelector(`.${sibling}`);
    this.mySearchBar = document.querySelector(`.${mySearchBar}`);
    this.sSearchBar = document.querySelector(`.${sSearchBar}`);
    this.className = {
      set: "set__underBar",
      none: "none",
    };
  }

  eventListen() {
    this.myElement.addEventListener("click", () => {
      this.sibling.childNodes[3].classList.remove(this.className.set);
      this.myElement.childNodes[3].classList.add(this.className.set);
      this.mySearchBar.classList.remove(this.className.none);
      this.sSearchBar.classList.add(this.className.none);
    });
  }
}
