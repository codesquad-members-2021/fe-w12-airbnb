(function (window, document) {
  'use strict';

  const $headerButtonGrounp = document.querySelector('.header__container--centerbox > ul');
  const $airbnbBtn = document.querySelector('#airbnb--button');
  const $activityBtn = document.querySelector('#activity--button');
  const $onlineActBtn = document.querySelector('#online--activity--button');
  const $longBar = document.querySelector('.low-bar-long');

  console.log($headerButtonGrounp);

  $activityBtn.addEventListener('click', () => changeBar($activityBtn));
  $activityBtn.addEventListener('mouseenter', () => shortBar($activityBtn));
  $activityBtn.addEventListener('mouseleave', () => lowBar($activityBtn));
  $onlineActBtn.addEventListener('mouseenter', () => shortBar($onlineActBtn));
  $onlineActBtn.addEventListener('mouseleave', () => lowBar($onlineActBtn));

  cursorInit();

  // 양이 엄청 날 것 같다...
  // 이걸 다 클래스로 만들어야겠지?...
  function cursorInit() {
    if ($headerButtonGrounp.querySelector('.low-bar-long')) {
      document.querySelector('.button').classList.replace('button', 'button--default');
    }
  }

  function changeBar(btn) {
    if (btn.querySelector('.lower--box').classList.contains('low-bar-long')) return;
    btn.querySelector('.lower--box').classList.replace('low-bar-short', 'low-bar-long');
    btn.querySelector('.lower--box').classList.replace('low-bar-short', 'low-bar-long');
  }

  function shortBar(btn) {
    // cursor change.. 분리할 수 있나..
    // 그런데 이렇게 하면 mouseenter가 됐을 때에서야 커서가 바뀐다
    if (btn.querySelector('.lower--box').classList.contains('low-bar-long')) {
      btn.classList.remove('button');
      console.log(btn.classList);
    }
    btn.querySelector('.lower--box').classList.replace('low-bar-transparent', 'low-bar-short');
    btn.querySelector('.menu').className = 'menu__hover';
  }

  function lowBar(btn) {
    btn.querySelector('.menu__hover').className = 'menu';
    if (btn.querySelector('.lower--box').classList.contains('low-bar-long')) return;
    btn.querySelector('.lower--box').classList.replace('low-bar-short', 'low-bar-transparent');
  }
})(window, document);
