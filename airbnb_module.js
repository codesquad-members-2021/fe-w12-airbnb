import UserBtnLayer from './userBtn.js';
import ChangeSearch from './changeSearch.js';

const reference = {
    userAnchor: document.querySelector('.header__user').firstElementChild,
    userLayer: document.querySelector('.user_menu'),
    body: document.querySelector('body'),
    navAccommo: document.querySelector('header__accommo'),
    navActivity: document.querySelector('header__activity')
}

const userBtnLayer = new UserBtnLayer(reference);
const changeSearch = new ChangeSearch(reference);