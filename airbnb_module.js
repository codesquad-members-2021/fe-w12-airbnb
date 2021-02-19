import UserBtnLayer from './userBtn.js';
import SearchChanger from './searchChanger.js';
import CalendarMaker from './calendarMaker.js';
import CalendarView from './calendarView.js';

const ref = {
    userAnchor: document.querySelector('.header__user').firstElementChild,
    userLayer: document.querySelector('.user_menu'),
    body: document.querySelector('body'),
    headerAccommo: document.querySelector('.header__accommo'),
    headeractivity: document.querySelector('.header__activity'),
    searchAccommo: document.querySelector('.search__accommo'),
    searchActivity: document.querySelector('.search__activity'),
    activityDate: document.querySelector('.activity__date'),
    calendarDiv: document.querySelector('.calendar'),
    calendarTitle: document.querySelector('.calendar__title'),
    calendarDate: document.querySelector('.calendar__date'),
    calendarBtn: document.querySelectorAll('.calendar > button')
}
const userBtnLayer = new UserBtnLayer(ref);
const searchChanger = new SearchChanger(ref);
const calendarMaker = new CalendarMaker(ref);
const calendarView = new CalendarView(ref, calendarMaker);