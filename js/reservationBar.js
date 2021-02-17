(function (window, document) {
  'use strict';

  const $leftLabel = document.querySelector('.leftside__radius__box');
  const $popupLeftLabel = document.querySelector('.location__container');

  $leftLabel.addEventListener('mouseup', openLeftLabel);
  window.addEventListener('click', closeLeftLabel);

  function openLeftLabel(e) {
    e.currentTarget.classList.replace('leftside__radius__box', 'leftside__radius__box--click');
    $popupLeftLabel.classList.remove('visible--hidden');
  }

  function closeLeftLabel(e) {
    if (e.path.includes($leftLabel)) return;
    $popupLeftLabel.classList.add('visible--hidden');
    $leftLabel.classList.replace('leftside__radius__box--click', 'leftside__radius__box');
  }
})(window, document);
