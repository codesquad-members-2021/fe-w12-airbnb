import CalendarManager from "./class/calendarManager.js";
import Toggle from "../toggle.js";

const experienceDateButton = document.querySelector(".experience-date");
const experienceDatePrevButton = document.querySelector(".prev__button_experience-date");
const experienceDateNextButton = document.querySelector(".next__button_experience-date");
const calendarHtmlExperienceDate = document.querySelector("#calendar__experience-date");
const calendarExperienceDate = new Toggle("calendar__background_experience-date");
const experienceDateStart = document.querySelector("#experience-date__start");
const experienceDateEnd = document.querySelector("#experience-date__end");
const placeholder = document.querySelector("#experience-date__placeholder");

const CM_experienceDate = new CalendarManager(experienceDateButton, experienceDatePrevButton, experienceDateNextButton, calendarHtmlExperienceDate);
CM_experienceDate.todayCalendar(calendarExperienceDate, experienceDateStart, experienceDateEnd, placeholder);
CM_experienceDate.prevCalendar(experienceDateStart, experienceDateEnd, placeholder);
CM_experienceDate.nextCalendar(experienceDateStart, experienceDateEnd, placeholder);

export { calendarExperienceDate, experienceDateButton, experienceDateStart, experienceDateEnd, placeholder };
