import { ProfileMenu } from './profileMenu.js';
import { TopMenu } from './topMenu.js';

const calendarWrapper = document.querySelector('.calendars-wrapper');

class Calendar {
  constructor(target) {
    this.target = target;
    this.days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  init(e) {
    if (
      !e.target.closest('.input-date') &&
      !e.target.closest('.calendars-wrapper')
    ) {
      calendarWrapper.classList.add('calendars-wrapper-hidden');
    } else return;
  }

  onEvents() {
    this.target.addEventListener('click', this.dateClickHandler);
    document.body.addEventListener('click', (e) => this.init(e));
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
    const calendarDays = document.querySelector('.calendar-days');
    console.log(calendarDays);
    const month = new Date().getMonth();
    const daysNum = this.days[month];
    for (let i = 1; i <= daysNum; i += 1) {
      const span = document.createElement('span');
      const day = document.createTextNode(i);
      span.appendChild(day);
      calendarDays.appendChild(span);
    }
  }

  render() {
    this.showCalendarTitle();
    this.showCalendarDays();
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
