import UserBtnLayer from './userBtn.js';

const reference = {
    userAnchor: document.querySelector('.header__user').firstElementChild,
    userLayer: document.querySelector('.user_menu'),
    body: document.querySelector('body')
}

const userBtnLayer = new UserBtnLayer(reference);
