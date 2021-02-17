(function (window, document) {
  'use strict';

  // Burger Button
  const $burgerButton = document.querySelector('#user__button');
  const $redCircle = document.querySelector('.red-circle');
  const $burgerContainer = document.querySelector('.burger__container');

  $burgerButton.addEventListener('click', openBurgerBox);
  window.addEventListener('click', closeBurgerBox);

  function openBurgerBox() {
    $burgerContainer.classList.toggle('visible--hidden');
    $redCircle.classList.add('visible--hidden');
  }

  function closeBurgerBox(e) {
    if (e.path.includes($burgerButton)) return;
    $burgerContainer.classList.add('visible--hidden');
  }
})(window, document);
