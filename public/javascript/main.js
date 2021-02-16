import ProfileMenu from './profileMenu.js';

class TopMenu {
  constructor(targetEl) {
    this.targetEl = targetEl;
    this.accommodations = targetEl[0];
    this.activity = targetEl[1];
  }

  changeFormForActivity() {
    this.activity.addEventListener('click', this.activityFormHandler);
  }

  activityFormHandler() {
    const detailsForRooms = document.querySelectorAll('.input-for-rooms');
    const dateInput = document.querySelector('.input-date-hidden');
    detailsForRooms.forEach((input) =>
      input.classList.add('check-inout-hidden')
    );
    dateInput.classList.remove('input-date-hidden');
    dateInput.classList.add('input-date');
  }
}

const showProfileTab = () => {
  const navProfileBtn = document.querySelector('.nav-btn.profile');
  const profileMenu = new ProfileMenu(navProfileBtn);
  profileMenu.onEvents();
};

const changeForm = () => {
  const topMenuLists = document.querySelectorAll('.top-list-words');
  const topmenu = new TopMenu(topMenuLists);
  topmenu.changeFormForActivity();
};

const main = () => {
  showProfileTab();
  changeForm();
};

main();
