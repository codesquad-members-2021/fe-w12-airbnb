const mypage = document.querySelector('.navbar__mypage');
const popUpLayer = document.querySelector('.pop-up-layer')

document.addEventListener('click', (e) => {
  if(e.target !== mypage) {
    popUpLayer.classList.add('display-none');
  }
})

mypage.addEventListener('click', (e) => {
  popUpLayer.classList.toggle('display-none');
  e.stopPropagation();
}, true)