import UserBtnLayer from './userBtn.js';
import SearchChanger from './searchChanger.js';
import CalendarMaker from './calendarMaker.js';

const ref = {
    userAnchor: document.querySelector('.header__user').firstElementChild,
    userLayer: document.querySelector('.user_menu'),
    body: document.querySelector('body'),
    accommoAnchor: document.querySelector('.header__accommo'),
    activityAnchor: document.querySelector('.header__activity'),
    searchAccommo: document.querySelector('.search__accommo'),
    searchActivity: document.querySelector('.search__activity')
}

const userBtnLayer = new UserBtnLayer(ref);
const searchChanger = new SearchChanger(ref);
const calendarMaker = new CalendarMaker(ref);