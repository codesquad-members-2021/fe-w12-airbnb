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
  const ShortBar = '.low-bar-short';
  const TpBar = '.low-bar-transparent';
  const Button = '.button';
  const DefaultButton = '.button--default';
  const LowerBox = '.lower--box';
  const Menu = '.menu';
  const MenuHover = '.menu__hover';

  console.log($headerButtonGrounp);

  // HEADER__MENU--BUTTON-GROUP

  $airbnbBtn.addEventListener('mouseenter', () => shortBar($airbnbBtn));
  $airbnbBtn.addEventListener('mouseleave', () => transparentBar($airbnbBtn));
  $airbnbBtn.addEventListener('click', () => longBar($airbnbBtn));

  $activityBtn.addEventListener('mouseenter', () => shortBar($activityBtn));
  $activityBtn.addEventListener('mouseleave', () => transparentBar($activityBtn));
  $activityBtn.addEventListener('click', () => longBar($activityBtn));

  $onlineActBtn.addEventListener('mouseenter', () => shortBar($onlineActBtn));
  $onlineActBtn.addEventListener('mouseleave', () => transparentBar($onlineActBtn));

  cursorInit();

  // 양이 엄청 날 것 같다...
  // 이걸 다 클래스로 만들어야겠지?...

  function cursorInit() {
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

  function longBar(btn) {
    cursorInit();
    if (isLongBar($headerButtonGrounp)) {
      $headerButtonGrounp.querySelector(LongBar).classList.replace(LONG_BAR, TP_BAR);
    }
    btn.querySelector(LowerBox).classList.replace(SHORT_BAR, LONG_BAR);
    cursorChange();
  }

  function shortBar(btn) {
    if (isLongBar(btn)) return;
    btn.querySelector(LowerBox).classList.replace(TP_BAR, SHORT_BAR);
    btn.querySelector(Menu).className = MENU_HOVER;
  }

  function transparentBar(btn) {
    if (btn.querySelector(MenuHover)) {
      btn.querySelector(MenuHover).className = MENU;
    }
    if (isLongBar(btn)) return;
    btn.querySelector(LowerBox).classList.replace(SHORT_BAR, TP_BAR);
  }
})(window, document);
