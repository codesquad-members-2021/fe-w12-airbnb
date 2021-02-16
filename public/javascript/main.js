import ProfileMenu from './profileMenu.js';

const showProfileTab = () => {
  const navProfileBtn = document.querySelector('.nav-btn.profile');
  const profileMenu = new ProfileMenu(navProfileBtn);
  profileMenu.onEvents();
};

const main = () => {
  showProfileTab();
};

main();
