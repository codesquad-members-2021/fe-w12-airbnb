const header = document.querySelector('header');
const navToggleButton = document.querySelector('.nav__button-toggle');
const navList = document.querySelector('.nav__list');

const init = () => {
  navToggleButton.addEventListener('click', () => navList.classList.toggle('hidden'));
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    {threshold: [1]}
  );
  observer.observe(header);
}

window.addEventListener('load', init);