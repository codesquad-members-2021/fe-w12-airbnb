const toogleBtn = document.querySelector('.toogle');
const loginPOPUP = document.querySelector('.login__pop-up');

toogleBtn.addEventListener('click', () => {
    loginPOPUP.classList.toggle('active');
})

if(loginPOPUP.className === 'login__pop-up active'){
    document.addEventListener('click', ()=> {
            loginPOPUP.classList.toggle('active');
    });
}