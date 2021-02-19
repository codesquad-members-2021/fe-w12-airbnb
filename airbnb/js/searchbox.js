const homebtn = document.querySelector('.center__menu-home');
const activebtn = document.querySelector('.center__menu-active');
const onlinebtn = document.querySelector('.center__menu-online');

const search__box = document.querySelector('.search__box');
const search__box_nonact=document.querySelector('.search__box.nonact');
console.log(homebtn);
console.log(activebtn);
console.log(onlinebtn);
console.log(search__box);
console.log(search__box_nonact);

activebtn.addEventListener('click',function(e){

    search__box.classList.remove('act');
    search__box.classList.add('nonact');
    search__box_nonact.classList.remove('nonact');
    search__box_nonact.classList.add('act');
});

homebtn.addEventListener('click',function(e){

    search__box_nonact.classList.remove('act');
    search__box_nonact.classList.add('nonact');
    search__box.classList.remove('nonact');
    search__box.classList.add('act');
});

