import HamburgerTabUI from "./HamburgerTabUI.js";
import SearchBarUI from "./SearchBarUI.js";
import CalendarMaker from "./CalendarMaker.js";
import CalendarManager from "./CalendarManager.js";

const $hamburgerTab = document.querySelector(".popup__icon-list");
const $iconNavigator = document.querySelector(".nav--icons");
const $navMenuRoom = document.querySelector(".search-section");
const $navMenuActivity = document.querySelector(".search-section__activity");
const $iconPerson = document.querySelector(".icon-person");
const $navMenu = document.querySelector(".nav__menu");
const $radioList = document.getElementsByName("nav");
const $activityDate = document.querySelector(".date-view");

const init = () => {
  const hamburgerTabUI = new HamburgerTabUI($hamburgerTab, $iconPerson);

  const searchBarUI = new SearchBarUI(
    $navMenu,
    $radioList,
    $navMenuRoom,
    $navMenuActivity
  );

  const calendarUI = new CalendarMaker($navMenuRoom, $navMenuActivity);

  const calendarManager = new CalendarManager($activityDate);
};

init();
