const headerBar = document.querySelector('.header');
const navContents = document.querySelectorAll('.nav-sticky-font');
const formContainer = document.querySelector('.info-form-container');
const topMenu = document.querySelector('.top-list');
const logo = document.querySelector('.logo-font');
const searchBtn = document.querySelector('.search-btn-container');
const searchBtnInput = document.querySelector('.search-btn-input-hidden');
const barOffset = headerBar.offsetTop;

function stickheaderBar() {
  if (window.pageYOffset >= barOffset) {
    headerBar.classList.add('header-bar-sticky');
    formContainer.classList.add('form-display-hidden');
    topMenu.classList.add('form-display-hidden');
    logo.classList.add('header-bar-sticky-logo');
    navContents.forEach((navContent) => {
      navContent.style.color = 'var(--black)';
    });
    searchBtn.classList.add('search-btn-sticky');
    searchBtnInput.classList.remove('search-btn-input-hidden');
  } else {
    headerBar.classList.remove('header-bar-sticky');
    formContainer.classList.remove('form-display-hidden');
    topMenu.classList.remove('form-display-hidden');
    logo.classList.remove('header-bar-sticky-logo');
    navContents.forEach((navContent) => {
      navContent.style.color = 'var(--info-color)';
    });
    searchBtn.classList.remove('search-btn-sticky');
    searchBtnInput.classList.add('search-btn-input-hidden');
  }
}

window.onscroll = () => {
  stickheaderBar();
};
