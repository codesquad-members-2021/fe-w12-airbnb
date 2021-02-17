import { ProfileMenu } from './profileMenu.js';
import { TopMenu } from './topMenu.js';

const calendarWrapper = document.querySelector('.calendars-wrapper');

class Calendar {
  constructor(target) {
    this.target = target;
    this.days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  init() {}

  onEvents() {
    this.target.addEventListener('click', this.dateClickHandler);
    this.render();
  }

  dateClickHandler() {
    calendarWrapper?.classList.toggle('calendars-wrapper-hidden');
  }

  showCalendarTitle() {
    const calendarTitle = document.querySelector('.calendar-title');
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    calendarTitle.textContent = `${year}년 ${month}월`;
  }

  showCalendarDays() {
    const date = new Date();
  }

  render() {
    this.showCalendarTitle();
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
