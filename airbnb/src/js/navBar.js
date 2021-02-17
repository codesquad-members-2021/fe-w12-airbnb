const HIDDEN = 'hidden';
class NavBar {
  constructor(navUserBtn, navUserBar) {
    this.navBtn = navUserBtn;
    this.navBar = navUserBar;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    document.addEventListener('click', this.renderNavBar.bind(this));
  }
  renderNavBar(e) {
    if (this.navBtn.contains(e.target)) {
      this.navBar.classList.toggle(HIDDEN);
    } else if (!this.navBar.contains(e.target)) {
      this.navBar.classList.add(HIDDEN);
    }
  }
}

export default NavBar;
