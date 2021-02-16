const $accountButton = document.querySelector('.account-group');
const $accountMenu = document.querySelector('.account-menu');

function hideMenu(e) {
  const isClickMenuButton = $accountButton.contains(e.target);
  const isClickInside = $accountMenu.contains(e.target);
  console.log(isClickMenuButton);

  $accountMenu.classList.toggle('visible', isClickMenuButton);
  console.log($accountMenu.className);

  if (!isClickInside) {
    $accountMenu.classList.remove('visible');
  }
}

function showMenu() {
  $accountMenu.classList.toggle('visible');
}

$accountButton.addEventListener('click', showMenu);

// document.body.addEventListener('click', hideMenu);
