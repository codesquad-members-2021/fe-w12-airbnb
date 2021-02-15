class NavBar {
  constructor(navUserBtn, navUserBar) {
    this.navBtn = navUserBtn;
    this.navBar = navUserBar;
    this.hidden = "hidden";
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    document.addEventListener("click", this.renderNavBar.bind(this));
  }
  renderNavBar(e) {
    if (this.navBtn.contains(e.target)) {
      this.navBar.classList.toggle(this.hidden);
    } else if (e.target !== this.navBar) {
      this.navBar.classList.add(this.hidden);
    }
  }
}

export default NavBar;
