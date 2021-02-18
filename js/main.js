const Calendar = require('./calendar');
const header = document.querySelector('header');
const modalItems = document.querySelectorAll('.modal');
const calendarTarget = document.querySelectorAll('.js-calendar');
const startDate = document.querySelectorAll('.js-start-date');
const endDate = document.querySelectorAll('.js-end-date');
const anchorTab = document.querySelector('.anchor-tab');
const toggleItems = document.querySelectorAll('.js-toggle');

const init = () => {
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    {threshold: [1]}
  );
  observer.observe(header);

  window.addEventListener('click', ({ target }) => windowClickEvent(target));
  anchorTab.addEventListener('click', ({ target }) => toggleCategory(target));
  toggleItems.forEach((v, i) => v.addEventListener('click', ({ target }) => toggleItem(target)));
  calendarTarget.forEach((v, i) => new Calendar(v, new Date(), startDate[i], endDate[i]).init());

  const windowClickEvent = target => {
    // modal 외의 영역 클릭 시 히든처리
  }

  const toggleItem = target => {
    const name = target.dataset.target || target.parentNode.dataset.target;
    const toggleTarget = document.querySelector(`[data-target_name="${name}"]`);
    if(toggleTarget.classList.contains('hidden')) {
      hideModal();
      toggleTarget.classList.remove('hidden');
    } else {
      hideModal();
    }
  };

  const hideModal = () => {
    modalItems.forEach(v => v.classList.add('hidden'));
  }

  const toggleCategory = target => {
    if(!target.classList.contains('category__anchor')) return;
    console.log(target.dataset.index);
  };
}

window.addEventListener('load', init);