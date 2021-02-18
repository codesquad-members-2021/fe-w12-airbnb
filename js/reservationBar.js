(function (window, document) {
  'use strict';

  const $middleLabel = document.querySelector('.middle__box');
  const $popupLocation = document.querySelector('.location__container');

  const $locationBtn = document.querySelector('#location--button');
  const $checkInBtn = document.querySelector('#check-in-button');
  const $checkOutBtn = document.querySelector('#check-out-button');
  const $personBtn = document.querySelector('#person--button');
  const $dateBtn = document.querySelector('#date--button');

  const $middleBar1 = document.querySelector('#middle__bar-1');
  const $middleBar2 = document.querySelector('#middle__bar-2');
  const $middleBar3 = document.querySelector('#middle__bar-3');
  const $middleBar4 = document.querySelector('#middle__bar-4');

  const $calendarBox = document.querySelector('.calendar__container');

  $locationBtn.addEventListener('mouseenter', hoverButton);
  $locationBtn.addEventListener('mouseleave', leaveButton);
  $locationBtn.addEventListener('mouseup', openLocation);
  window.addEventListener('click', closeLocation);

  $checkInBtn.addEventListener('mouseenter', hoverButton);
  $checkInBtn.addEventListener('mouseleave', leaveButton);
  $checkInBtn.addEventListener('mouseup', openCalendar);

  $checkOutBtn.addEventListener('mouseenter', hoverButton);
  $checkOutBtn.addEventListener('mouseleave', leaveButton);
  $checkOutBtn.addEventListener('mouseup', openCalendar);
  window.addEventListener('click', closeCalendar);

  $personBtn.addEventListener('mouseenter', hoverButton);
  $personBtn.addEventListener('mouseleave', leaveButton);

  const searchMiddleBar = function (e) {
    // switch case 가 맞나...
    let btn = e.currentTarget.id;
    let bar = '';
    if (btn === 'location--button') {
      return (bar = [$middleBar1]);
    }
    if (btn === 'check-in-button') {
      return (bar = [$middleBar1, $middleBar2]);
    }
    if (btn === 'check-out-button') {
      return (bar = [$middleBar2, $middleBar3]);
    }
    if (btn === 'person--button') {
      return (bar = [$middleBar3]);
    }
    if (btn === 'date--button') {
      return (bar = [$middleBar4]);
    }
  };

  function hoverButton(e) {
    const targetButton = e.currentTarget.className;
    const targetHover = `${e.currentTarget.className}--hover`;
    const targetMiddleBar = searchMiddleBar(e);

    e.currentTarget.classList.replace(targetButton, targetHover);
    searchMiddleBar(e)[0].classList.replace('middle__bar', 'middle__bar--hover');
    if (targetMiddleBar.length === 2) {
      return searchMiddleBar(e)[1].classList.replace('middle__bar', 'middle__bar--hover');
    }
  }
  function leaveButton(e) {
    const targetHover = e.currentTarget.className;
    const hoverIndex = targetHover.indexOf('--hover');
    const targetButton = e.currentTarget.className.slice(0, hoverIndex);
    const targetMiddleBar = searchMiddleBar(e);

    e.currentTarget.classList.replace(targetHover, targetButton);
    searchMiddleBar(e)[0].classList.replace('middle__bar--hover', 'middle__bar');
    if (targetMiddleBar.length === 2) {
      return searchMiddleBar(e)[1].classList.replace('middle__bar--hover', 'middle__bar');
    }
  }

  function openLocation(e) {
    e.currentTarget.classList.replace('leftside__radius__box', 'leftside__radius__box--click');
    $popupLocation.classList.remove('visible--hidden');
  }

  function closeLocation(e) {
    if (e.path.includes($locationBtn)) return;
    if (e.path.includes($popupLocation)) return;
    $popupLocation.classList.add('visible--hidden');
    $locationBtn.classList.replace('leftside__radius__box--click', 'leftside__radius__box');
  }

  function openCalendar(e) {
    e.currentTarget.classList.replace('middle__box', 'middle__box--click');
    $calendarBox.classList.remove('visible--hidden');
  }

  function closeCalendar(e) {
    if (e.path.includes($checkInBtn)) return;
    if (e.path.includes($checkOutBtn)) return;
    if (e.path.includes($calendarBox)) return;
    $calendarBox.classList.add('visible--hidden');
    $middleLabel.classList.replace('middle__box--click', 'middle__box');
  }
})(window, document);
