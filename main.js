(function (window, document) {
  'use strict';

  const $headerButtonGrounp = document.querySelector('.header__container--centerbox > ul');
  const $airbnbBtn = document.querySelector('#airbnb--button');
  const $activityBtn = document.querySelector('#activity--button');
  const $onlineActBtn = document.querySelector('#online--activity--button');

  const LONG_BAR = 'low-bar-long';
  const SHORT_BAR = 'low-bar-short';
  const TP_BAR = 'low-bar-transparent';
  const BUTTON = 'button';
  const DEFAULT_BUTTON = 'button--default';
  const MENU = 'menu';
  const MENU_HOVER = 'menu__hover';

  const LongBar = '.low-bar-long';
  const TpBar = '.low-bar-transparent';
  const Button = '.button';
  const DefaultButton = '.button--default';
  const LowerBox = '.lower--box';
  const Menu = '.menu';
  const MenuHover = '.menu__hover';

  // HEADER__MENU--BUTTON-GROUP

  $airbnbBtn.addEventListener('mouseenter', () => changeShortBar($airbnbBtn));
  $airbnbBtn.addEventListener('mouseleave', () => changeHiddenBar($airbnbBtn));
  $airbnbBtn.addEventListener('click', () => changeLongBar($airbnbBtn));

  $activityBtn.addEventListener('mouseenter', () => changeShortBar($activityBtn));
  $activityBtn.addEventListener('mouseleave', () => changeHiddenBar($activityBtn));
  $activityBtn.addEventListener('click', () => changeLongBar($activityBtn));

  $onlineActBtn.addEventListener('mouseenter', () => changeShortBar($onlineActBtn));
  $onlineActBtn.addEventListener('mouseleave', () => changeHiddenBar($onlineActBtn));

  initCursor();

  function initCursor() {
    if ($headerButtonGrounp.querySelector(LongBar)) {
      document.querySelector(Button).classList.replace(BUTTON, DEFAULT_BUTTON);
    }
  }

  function cursorChange() {
    if ($headerButtonGrounp.querySelector(TpBar)) {
      document.querySelector(DefaultButton).classList.replace(DEFAULT_BUTTON, BUTTON);
    }
  }

  function isLongBar(btn) {
    return btn.querySelector(LongBar);
  }

  function changeLongBar(btn) {
    initCursor();
    if (isLongBar($headerButtonGrounp)) {
      $headerButtonGrounp.querySelector(LongBar).classList.replace(LONG_BAR, TP_BAR);
    }
    btn.querySelector(LowerBox).classList.replace(SHORT_BAR, LONG_BAR);
    cursorChange();
  }

  function changeShortBar(btn) {
    if (isLongBar(btn)) return;
    btn.querySelector(LowerBox).classList.replace(TP_BAR, SHORT_BAR);
    btn.querySelector(Menu).className = MENU_HOVER;
  }

  function changeHiddenBar(btn) {
    if (btn.querySelector(MenuHover)) {
      btn.querySelector(MenuHover).className = MENU;
    }
    if (isLongBar(btn)) return;
    btn.querySelector(LowerBox).classList.replace(SHORT_BAR, TP_BAR);
  }

  // NAV
})(window, document);
