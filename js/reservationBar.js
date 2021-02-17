(function (window, document) {
  'use strict';

  const $leftLabel = document.querySelector('.leftside__radius__box');
  const $popupLeftLabel = document.querySelector('.location__container');
  const $checkInBtn = document.querySelector('#check-in-button');
  const $checkOutBtn = document.querySelector('#check-out-button');
  const $calendarBox = document.querySelector('.calendar__container');

  $leftLabel.addEventListener('mouseup', openLeftLabel);
  window.addEventListener('click', closeLeftLabel);

  $checkInBtn.addEventListener('mouseup', openCalendar);
  $checkOutBtn.addEventListener('mouseup', openCalendar);
  window.addEventListener('click', closeCalendar);

  function openLeftLabel(e) {
    e.currentTarget.classList.replace('leftside__radius__box', 'leftside__radius__box--click');
    $popupLeftLabel.classList.remove('visible--hidden');
  }

  function closeLeftLabel(e) {
    if (e.path.includes($leftLabel)) return;
    $popupLeftLabel.classList.add('visible--hidden');
    $leftLabel.classList.replace('leftside__radius__box--click', 'leftside__radius__box');
  }

  function openCalendar() {
    $calendarBox.classList.remove('visible--hidden');
  }

  function closeCalendar(e) {
    if (e.path.includes($checkInBtn)) return;
    if (e.path.includes($checkOutBtn)) return;
    $calendarBox.classList.add('visible--hidden');
  }
})(window, document);
