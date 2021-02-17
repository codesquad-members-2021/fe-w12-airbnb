(function (window, document) {
  'use strict';

  // Burger Button
  const $burgerButton = document.querySelector('#user__button');
  const $redCircle = document.querySelector('.red-circle');
  const $burgerContainer = document.querySelector('.burger__container');

  $burgerButton.addEventListener('click', openBurgerBox);

  function openBurgerBox() {
    $burgerContainer.classList.remove('visible--hidden');
    $redCircle.classList.add('visible--hidden');
  }

  console.log($burgerButton);
})(window, document);
