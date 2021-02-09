const header = document.querySelector('header');

const init = () => {
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    {threshold: [1]}
  );
  observer.observe(header);
}

window.addEventListener('load', init);