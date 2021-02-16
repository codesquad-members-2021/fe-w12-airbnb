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
window.onscroll = function () {
  myFunction();
};

// Get the navbar
var navbar = document.querySelector('nav');

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}
