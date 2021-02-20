import NavTab from "./nav.js";

const stayTab = document.querySelector(".stay");
const experiencesTab = document.querySelector(".experiences");
const stayUnderBar = document.querySelector(".underBar__stay");
const experiencesUnderBar = document.querySelector(".underBar__experiences");
const staySearchBar = document.querySelector(".search-bar__stay");
const experiencesSearchBar = document.querySelector(".search-bar__experiences");

const stayNavTab = new NavTab(stayTab, stayUnderBar, experiencesUnderBar, staySearchBar, experiencesSearchBar);
const experiencesNavTab = new NavTab(experiencesTab, experiencesUnderBar, stayUnderBar, experiencesSearchBar, staySearchBar);

export { stayNavTab, experiencesNavTab };
