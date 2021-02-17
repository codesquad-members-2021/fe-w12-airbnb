const dropdown = document.querySelector('.dropdown');
const toggleButton = document.querySelector('.right__menu-btn');
const menu = document.querySelector('.dropdown-menu');
const options = document.querySelectorAll('dropdown-option');

//토글버튼 클릭되면 메뉴를 보여준다 
//메뉴 masxheight = 0 
//a메뉴.show - > g해지

toggleButton.addEventListener('click',function(e){
    dropdown.classList.toggle('show');
});

toggleButton.addEventListener('blur',function(e){
    dropdown.classList.remove('show');
});