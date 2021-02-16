const $accountButton = document.querySelector('.account-group');
const $accountMenu = document.querySelector('.account-menu');

function hideMenu(e) {
  const isClickMenu = $accountMenu.contains(e.target);
  const isClickButton = $accountButton.contains(e.target);
  if (!isClickMenu && !isClickButton) {
    $accountMenu.classList.remove('visible');
  }
}

function showMenu() {
  $accountMenu.classList.toggle('visible');
}

$accountButton.addEventListener('click', showMenu);

document.addEventListener('click', hideMenu);
