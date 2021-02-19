// 달력 토글 이벤트

const checkinButton = document.querySelector('.search-bar__checkin');
const checkoutButton = document.querySelector('.search-bar__checkout');
const calendrUI = document.querySelector('.header__calendar-container');

checkinButton.addEventListener('click', (e) => {
  calendrUI.classList.toggle('display-none');
  e.stopPropagation()
});

checkoutButton.addEventListener('click', (e) => {
  calendrUI.classList.toggle('display-none');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if(e.target !== calendrUI) {
    calendrUI.classList.add('display-none')
  }
})
