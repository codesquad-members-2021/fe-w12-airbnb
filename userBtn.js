class UserBtnLayer {
    constructor({userBtn, userLayer}) {
        this.userBtn = userBtn;
        this.userLayer = userLayer;
        this.setEvent();
    }
    setEvent() {
        this.userBtn.addEventListener('click', this.showLayer.bind(this));
    }
    showLayer() {
        this.userLayer.classList.toggle('hidden');
    }
}

const reference = {
    userBtn: document.querySelector('.header__user'),
    userLayer: document.querySelector('.user_menu')
}
const userBtnLayer = new UserBtnLayer(reference);
