(function (window, document) {
  'use strict';

  const $headerButtonGrounp = document.querySelector('.header__container--centerbox > ul');
  const $airbnbBtn = document.querySelector('#airbnb--button');
  const $activityBtn = document.querySelector('#activity--button');
  const $onlineActBtn = document.querySelector('#online--activity--button');

  console.log($headerButtonGrounp);

  $airbnbBtn.addEventListener('click', () => longBar($airbnbBtn));
  $airbnbBtn.addEventListener('mouseenter', () => shortBar($airbnbBtn));
  $airbnbBtn.addEventListener('mouseleave', () => transparentBar($airbnbBtn));

  $activityBtn.addEventListener('click', () => longBar($activityBtn));
  $activityBtn.addEventListener('mouseenter', () => shortBar($activityBtn));
  $activityBtn.addEventListener('mouseleave', () => transparentBar($activityBtn));

  $onlineActBtn.addEventListener('mouseenter', () => shortBar($onlineActBtn));
  $onlineActBtn.addEventListener('mouseleave', () => transparentBar($onlineActBtn));

  cursorInit();

  // 양이 엄청 날 것 같다...
  // 이걸 다 클래스로 만들어야겠지?...

  function cursorInit() {
    if ($headerButtonGrounp.querySelector('.low-bar-long')) {
      document.querySelector('.button').classList.replace('button', 'button--default');
    }
  }

  function isLongBar(btn) {
    return btn.querySelector('.lower--box').classList.contains('low-bar-long');
  }

  function longBar(btn) {
    cursorInit();
    if (isLongBar($headerButtonGrounp)) {
      $headerButtonGrounp.querySelector('.lower--box').classList.replace('low-bar-long', 'low-bar-transparent');
    }
    btn.querySelector('.lower--box').classList.replace('low-bar-short', 'low-bar-long');
  }

  function shortBar(btn) {
    if (isLongBar(btn)) return;
    btn.querySelector('.lower--box').classList.replace('low-bar-transparent', 'low-bar-short');
    btn.querySelector('.menu').className = 'menu__hover';
  }

  function transparentBar(btn) {
    if (btn.querySelector('.menu__hover')) {
      btn.querySelector('.menu__hover').className = 'menu';
    }
    if (isLongBar(btn)) return;
    btn.querySelector('.lower--box').classList.replace('low-bar-short', 'low-bar-transparent');
  }
})(window, document);
