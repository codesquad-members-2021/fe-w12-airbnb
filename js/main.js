const Calendar = require('./calendar');
const header = document.querySelector('header');
const navToggleButton = document.querySelector('.nav__button-toggle');
const navList = document.querySelector('.nav__list');
const modalItems = document.querySelectorAll('.input-item__modal');
const calendarTarget = document.querySelector('#calendarTarget');
const searchPlaceTarget = document.querySelector('.search-place');
const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
const inputItems = document.querySelectorAll('.input-item');

const init = () => {
  navToggleButton.addEventListener('click', () => navList.classList.toggle('hidden'));
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    {threshold: [1]}
  );
  observer.observe(header);
  const calendar = new Calendar(calendarTarget, new Date(), startDate, endDate);
  calendar.init();
  window.addEventListener('click', ({ target }) => {
    if(!(navList.contains(target) || navToggleButton.contains(target))) {
      navList.classList.add('hidden');
    }
  }); 
  inputItems.forEach(v => v.addEventListener('click', ({ target }) => {
    if(target.classList.contains('js-toggle-calendar') || target.parentNode.classList.contains('js-toggle-calendar')) {
      if(calendarTarget.classList.contains('hidden')) {
        hiddenModal();
        calendarTarget.classList.remove('hidden');
      } else {
        hiddenModal();
      }
      return;
    }
    if(target.classList.contains('js-toggle-place') || target.parentNode.classList.contains('js-toggle-place')) {
      if(searchPlaceTarget.classList.contains('hidden')) {
        hiddenModal();
        searchPlaceTarget.classList.remove('hidden');
      } else {
        hiddenModal();
      }
      return;
    }
  }));
  const hiddenModal = () => {
    modalItems.forEach(v => v.classList.add('hidden'));
  }
}

window.addEventListener('load', init);