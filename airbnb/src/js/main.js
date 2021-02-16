import NavBar from './navBar.js';
import QueryFormTab from './queryFormTab.js';
import { CalendarView } from './calendar.js';

//nav bar
const navUserBtn = document.querySelector('.nav-user');
const navUserBar = document.querySelector('.nav-user__bar');

const navBar = new NavBar(navUserBtn, navUserBar);
navBar.init();

//query form
const formTab = document.querySelector('.search-form__tab');
const formStay = document.querySelector('.form__stay');
const formExperience = document.querySelector('.form__experience');

const queryFormTab = new QueryFormTab(formTab, formStay, formExperience);
queryFormTab.init();

//calendar

const queryDateStay = document.querySelector('.form__stay .query-date-wrapper');
const queryDateExperience = document.querySelector(
  '.form__experience .query__date'
);

const calendarStay = document.querySelector('.form__stay .calendar');
const calendarExperience = document.querySelector(
  '.form__experience .calendar'
);
console.log(calendarStay);
console.log(calendarExperience);

const stayCalendarView = new CalendarView(
  formStay,
  queryDateStay,
  calendarStay
);
const experienceCalendarView = new CalendarView(
  formExperience,
  queryDateExperience,
  calendarExperience
);

stayCalendarView.init();
experienceCalendarView.init();
