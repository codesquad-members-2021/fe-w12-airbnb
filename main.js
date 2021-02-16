(function (window, document) {
  'use strict';

  const $airbnbBtn = document.querySelector('#airbnb--button');
  const $activityBtn = document.querySelector('#activity--button');
  const $onlineActBtn = document.querySelector('#online--activity--button');
  const $longBar = document.querySelector('.low-bar-long');

  console.log();

  $activityBtn.addEventListener('mouseenter', () => shortBar($activityBtn));
  $activityBtn.addEventListener('mouseleave', () => lowBar($activityBtn));
  $onlineActBtn.addEventListener('mouseenter', () => shortBar($onlineActBtn));
  $onlineActBtn.addEventListener('mouseleave', () => lowBar($onlineActBtn));

  function shortBar(btn) {
    if ($longBar) {
      document.querySelector('li').style.cursor = 'default';
    }
    if (btn.querySelector('.lower--box').classList[1] === 'low-bar-short') return;
    btn.querySelector('.low-bar').style.width = '4px';
    btn.querySelector('.low-bar').style.background = '#fff';
  }

  function lowBar(btn) {
    btn.querySelector('.low-bar').style.width = '0px';
    btn.querySelector('.low-bar').style.background = 'transparent';
  }
})(window, document);
