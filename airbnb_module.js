import UserBtnLayer from './userBtn.js';
import ChangeSearch from './changeSearch.js';

const reference = {
    userAnchor: document.querySelector('.header__user').firstElementChild,
    userLayer: document.querySelector('.user_menu'),
    body: document.querySelector('body'),
    accommoAnchor: document.querySelector('.header__accommo'),
    activityAnchor: document.querySelector('.header__activity'),
    searchAccommo: document.querySelector('.search__accommo'),
    searchActivity: document.querySelector('.search__activity')
}

const userBtnLayer = new UserBtnLayer(reference);
const changeSearch = new ChangeSearch(reference);