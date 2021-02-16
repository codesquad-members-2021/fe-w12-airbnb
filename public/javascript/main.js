import TabUI from './tabUI.js';

const showProfileTab = () => {
  const navProfileBtn = document.querySelector('.nav-btn.profile');
  const tabUI = new TabUI(navProfileBtn);
  tabUI.onEvents();
};

const main = () => {
  showProfileTab();
};

main();
