import NavBar from './navBar.js';
import QueryForm from './queryForm.js';

//nav bar
const navUserBtn = document.querySelector('.nav-user');
const navUserBar = document.querySelector('.nav-user__bar');

const navBar = new NavBar(navUserBtn, navUserBar);
navBar.init();

//query form
const formTab = document.querySelector('.search-form__tab');
const formStay = document.querySelector('.form__stay');
const formExperience = document.querySelector('.form__experience');

const queryForm = new QueryForm(formTab, formStay, formExperience);
queryForm.init();
