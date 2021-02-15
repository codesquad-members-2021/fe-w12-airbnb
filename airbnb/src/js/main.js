import NavBar from "./navBar.js";

const navUserBtn = document.querySelector(".nav-user");
const navUserBar = document.querySelector(".nav-user__bar");

const navBar = new NavBar(navUserBtn, navUserBar);
navBar.init();
