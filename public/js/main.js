import { ProfileMenu } from './profileMenu.js';
import { TopMenu } from './topMenu.js';

class Calendar {
  constructor(target) {
    this.target = target;
  }

  onEvents() {
    this.target.addEventListener('click', this.dateClickHandler);
  }

  dateClickHandler() {
    const calendarWrapper = document.querySelector('.calendars-wrapper');
    calendarWrapper?.classList.toggle('calendars-wrapper-hidden');
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
  topmenu.onEvents();
};

const showCalendar = () => {
  const dateForm = document.querySelector('.input-date');
  const calendar = new Calendar(dateForm);
  calendar.onEvents();
};

const main = () => {
  showProfileTab();
  changeForm();
  showCalendar();
};

main();
