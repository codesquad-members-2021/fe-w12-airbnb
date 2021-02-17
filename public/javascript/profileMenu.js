export class ProfileMenu {
  constructor(targetEl) {
    this.targetEl = targetEl;
  }

  init() {
    const profileTab = document.querySelector('.nav-profile-tab');
    profileTab.classList.remove('nav-profile-tab-show');
  }

  onEvents() {
    this.targetEl.addEventListener('click', this.navProfileHandler);
    this.targetEl.addEventListener('focusout', this.init);
  }

  navProfileHandler() {
    const profileTab = document.querySelector('.nav-profile-tab');
    profileTab.classList.toggle('nav-profile-tab-show');
  }
}
