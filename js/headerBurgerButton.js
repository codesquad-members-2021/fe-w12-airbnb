(function (window, document) {
  'use strict';

  // Burger Button
  const $burgerButton = document.querySelector('#user__button');
  const $redCircle = document.querySelector('.red-circle');
  const $burgerContainer = document.querySelector('.buger__container');

  $burgerButton.addEventListener('click', openBurgerBox);

  window.onclick = function (e) {
    if (e.target === $burgerContainer) {
      $burgerContainer.classList.add('visible--hidden');
      console.log('here');
    }
  };

  function openBurgerBox() {
    document.querySelector('.burger__container').classList.remove('visible--hidden');
    $redCircle.classList.add('visible--hidden');
  }

  console.log($burgerButton);
})(window, document);
