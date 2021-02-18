(function (window, document) {
  'use strict';

  const $middleLabel = document.querySelector('.middle__box');
  const $popupLocation = document.querySelector('.location__container');

  const $locationBtn = document.querySelector('#location--button');
  const $checkInBtn = document.querySelector('#check-in-button');
  const $checkOutBtn = document.querySelector('#check-out-button');
  const $personBtn = document.querySelector('#person--button');
  const $locationActBtn = document.querySelector('#location--activity--button');
  const $dateBtn = document.querySelector('#date--button');

  const $middleBar1 = document.querySelector('#middle__bar-1');
  const $middleBar2 = document.querySelector('#middle__bar-2');
  const $middleBar3 = document.querySelector('#middle__bar-3');
  const $middleBar4 = document.querySelector('#middle__bar-4');

  const $calendarBox = document.querySelector('.calendar__container');

  //=========================== airbnb tab ============================

  // location button
  $locationBtn.addEventListener('mouseenter', hoverButton);
  $locationBtn.addEventListener('mousedown', downButton);
  $locationBtn.addEventListener('mouseleave', leaveButton);
  $locationBtn.addEventListener('mouseup', openLocation);
  window.addEventListener('click', closeLocation);

  // check-in button
  $checkInBtn.addEventListener('mouseenter', hoverButton);
  $checkInBtn.addEventListener('mousedown', downButton);
  $checkInBtn.addEventListener('mouseleave', leaveButton);
  $checkInBtn.addEventListener('mouseup', openCalendar);

  // check-out button
  $checkOutBtn.addEventListener('mouseenter', hoverButton);
  $checkOutBtn.addEventListener('mousedown', downButton);
  $checkOutBtn.addEventListener('mouseleave', leaveButton);
  $checkOutBtn.addEventListener('mouseup', openCalendar);
  window.addEventListener('click', closeCalendar);

  // person button
  $personBtn.addEventListener('mouseenter', hoverButton);
  $personBtn.addEventListener('mouseleave', leaveButton);

  //=========================== activity tab ============================

  // location activity button
  $locationActBtn.addEventListener('mouseenter', hoverButton);
  $locationActBtn.addEventListener('mouseleave', leaveButton);
  $locationActBtn.addEventListener('mouseup', openLocation);
  window.addEventListener('click', closeLocation);

  // date button
  $dateBtn.addEventListener('mouseenter', hoverButton);
  $dateBtn.addEventListener('mouseleave', leaveButton);
  $dateBtn.addEventListener('mouseup', openCalendar);
  window.addEventListener('click', closeCalendar);

  //================================ Fn =================================

  const searchMiddleBar = function (id) {
    // switch case 가 맞나...
    let bar = '';
    if (id === 'location--button') {
      return (bar = [$middleBar1]);
    }
    if (id === 'check-in-button') {
      return (bar = [$middleBar1, $middleBar2]);
    }
    if (id === 'check-out-button') {
      return (bar = [$middleBar2, $middleBar3]);
    }
    if (id === 'person--button') {
      return (bar = [$middleBar3]);
    }
    if (id === 'location--activity--button') {
      return (bar = [$middleBar4]);
    }
    if (id === 'date--button') {
      return (bar = [$middleBar4]);
    }
  };

  function hoverButton(e) {
    const targetButton = e.currentTarget.className;
    const targetHover = `${e.currentTarget.className}--hover`;
    const targetMiddleBar = searchMiddleBar(e.target.id);
    if (e.currentTarget.className.includes('--hover')) return;
    if (e.currentTarget.className.includes('--active')) return;
    e.currentTarget.classList.replace(targetButton, targetHover);
    searchMiddleBar(e.target.id)[0].classList.replace('middle__bar', 'middle__bar--hover');
    if (targetMiddleBar.length === 2) {
      return searchMiddleBar(e.target.id)[1].classList.replace('middle__bar', 'middle__bar--hover');
    }
  }
  function downButton(e) {
    const target = e.currentTarget.className;
    const hoverIndex = target.indexOf('--active');
    const targetButton = e.currentTarget.className.slice(0, hoverIndex);
    const targetHover = `${targetButton}--hover`;
    const targetMiddleBar = searchMiddleBar(e.currentTarget.id);
    if (e.currentTarget === $locationBtn && e.currentTarget.className.includes('--active')) {
      e.currentTarget.classList.replace(target, targetHover);
      searchMiddleBar(e.currentTarget.id)[0].classList.replace('middle__bar', 'middle__bar--hover');
      if (targetMiddleBar.length === 2) {
        searchMiddleBar(e.currentTarget.id)[1].classList.replace('middle__bar', 'middle__bar--hover');
      }
    }
    if (!$popupLocation.classList.contains('visible--hidden')) {
      $popupLocation.classList.add('visible--hidden');
    }
    // if (!$calendarBox.classList.contains('visible--hidden')) {
    //   $calendarBox.classList.add('visible--hidden');
    // }
  }
  function leaveButton(e) {
    const targetHover = e.currentTarget.className;
    const hoverIndex = targetHover.indexOf('--hover');
    const targetButton = e.currentTarget.className.slice(0, hoverIndex);
    const targetMiddleBar = searchMiddleBar(e.target.id);

    if (!e.currentTarget.className.includes('--hover')) return;
    if (e.currentTarget.className.includes('--active')) return;
    e.currentTarget.classList.replace(targetHover, targetButton);
    searchMiddleBar(e.target.id)[0].classList.replace('middle__bar--hover', 'middle__bar');
    if (targetMiddleBar.length === 2) {
      return searchMiddleBar(e.target.id)[1].classList.replace('middle__bar--hover', 'middle__bar');
    }
  }

  function openLocation(e) {
    const targetHover = e.currentTarget.className;
    const hoverIndex = targetHover.indexOf('--hover');
    const targetButton = e.currentTarget.className.slice(0, hoverIndex);
    const targetActive = `${targetButton}--active`;
    e.currentTarget.classList.replace(targetHover, targetActive);
    $popupLocation.classList.remove('visible--hidden');
  }

  function closeLocation(e) {
    // console.log(e.path.includes($locationBtn));
    if (e.path.includes($locationBtn)) return;
    if (e.path.includes($popupLocation)) return;
    searchMiddleBar($locationBtn.id)[0].classList.replace('middle__bar--hover', 'middle__bar');
    $popupLocation.classList.add('visible--hidden');
    $locationBtn.classList.replace('leftside__radius__box--active', 'leftside__radius__box');
  }

  function openCalendar(e) {
    const targetHover = e.currentTarget.className;
    const hoverIndex = targetHover.indexOf('--hover');
    const targetButton = e.currentTarget.className.slice(0, hoverIndex);
    const targetActive = `${targetButton}--active`;

    if (e.currentTarget === $checkInBtn && e.currentTarget.className.includes('--active') && !$calendarBox.classList.contains('visible--hidden')) {
      $checkInBtn.classList.remove('middle__box--hover');
      $calendarBox.classList.toggle('visible--hidden');
      searchMiddleBar($checkInBtn.id)[0].classList.replace('middle__bar--hover', 'middle__bar');
      searchMiddleBar($checkInBtn.id)[1].classList.replace('middle__bar--hover', 'middle__bar');
      return $checkInBtn.classList.replace('middle__box--active', 'middle__box');
    }

    if (e.currentTarget === $checkOutBtn && e.currentTarget.className.includes('--active') && !$calendarBox.classList.contains('visible--hidden')) {
      $checkOutBtn.classList.remove('middle__box--hover');
      $calendarBox.classList.toggle('visible--hidden');
      searchMiddleBar($checkOutBtn.id)[0].classList.replace('middle__bar--hover', 'middle__bar');
      searchMiddleBar($checkOutBtn.id)[1].classList.replace('middle__bar--hover', 'middle__bar');
      return $checkOutBtn.classList.replace('middle__box--active', 'middle__box');
    }

    e.currentTarget.classList.toggle(targetActive);
    if (!$calendarBox.classList.contains('visible--hidden')) return;
    $calendarBox.classList.toggle('visible--hidden');
  }

  function closeCalendar(e) {
    if (e.path.includes($checkInBtn)) return;
    if (e.path.includes($checkOutBtn)) return;
    if (e.path.includes($dateBtn)) return;
    if (e.path.includes($calendarBox)) return;
    if (searchMiddleBar($checkInBtn.id)[0].classList.contains('middle__bar--hover')) {
      searchMiddleBar($checkInBtn.id)[0].classList.replace('middle__bar--hover', 'middle__bar');
      searchMiddleBar($checkInBtn.id)[1].classList.replace('middle__bar--hover', 'middle__bar');
    }
    if ($checkInBtn.classList.contains('middle__box--active')) {
      $checkInBtn.classList.replace('middle__box--active', 'middle__box');
    }
    if ($checkOutBtn.classList.contains('middle__box--active')) {
      $checkOutBtn.classList.replace('middle__box--active', 'middle__box');
    }
    if ($checkInBtn.classList.contains('middle__box--hover')) {
      $checkInBtn.classList.replace('middle__box--hover', 'middle__box');
    }
    if ($checkOutBtn.classList.contains('middle__box--hover')) {
      $checkOutBtn.classList.replace('middle__box--hover', 'middle__box');
    }
    $calendarBox.classList.add('visible--hidden');
  }
})(window, document);
