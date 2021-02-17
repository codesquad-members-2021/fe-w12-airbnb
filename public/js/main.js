import { ProfileMenu } from './profileMenu.js';
import { TopMenu } from './topMenu.js';
import { Calendar } from './calendar.js';

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
