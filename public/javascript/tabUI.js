export default class TabUI {
  constructor(targetEl) {
    this.targetEl = targetEl;
  }

  onEvents() {
    this.targetEl.addEventListener('click', this.navProfileHandler);
    this.targetEl.addEventListener('focusout', this.init);
  }

  navProfileHandler() {
    const profileTab = document.querySelector('.nav-profile-tab');
    profileTab.classList.toggle('nav-profile-tab-show');
  }

  init() {
    const profileTab = document.querySelector('.nav-profile-tab');
    profileTab.classList.remove('nav-profile-tab-show');
  }
}
