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

  // 양이 엄청 날 것 같다...
  // 이걸 다 클래스로 만들어야겠지?...
  function shortBar(btn) {
    // cursor change.. 분리할 수 있나..
    if ($longBar) {
      document.querySelector('li').style.cursor = 'default';
    }
    if (btn.querySelector('.lower--box').classList[1] === 'low-bar-short') return;
    btn.querySelector('.low-bar').style.width = '4px';
    btn.querySelector('.low-bar').style.background = '#fff';
    btn.querySelector('.menu').style.color = 'rgba(255, 255, 255, 0.8)';
  }

  function lowBar(btn) {
    btn.querySelector('.low-bar').style.width = '0px';
    btn.querySelector('.low-bar').style.background = 'transparent';
    btn.querySelector('.menu').style.color = 'rgba(255, 255, 255)';
  }
})(window, document);
