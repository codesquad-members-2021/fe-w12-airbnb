const roomBtn = document.querySelector('.menu__rooms');
const experienceBtn = document.querySelector('.menu__experience');

const searchMain = document.querySelector('.search');
const searchSub = document.querySelector('.search-sub');

experienceBtn.addEventListener('click', () => {
    if(searchSub.className === "search-sub") {
        searchMain.classList.add('active');
        searchSub.classList.add('active');
    }
})

roomBtn.addEventListener('click', () => {
    if(searchMain.className === "search active") {
    searchMain.classList.remove('active');
    searchSub.classList.remove('active');
    }
})