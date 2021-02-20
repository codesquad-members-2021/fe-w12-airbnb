import CalendarManager from "./class/calendarManager.js";
import Toggle from "../toggle.js";

const checkInButton = document.querySelector(".check-in");
const checkInPrevButton = document.querySelector(".prev__button_check-in");
const checkInNextButton = document.querySelector(".next__button_check-in");
const calendarHtmlCheckIn = document.querySelector("#calendar__check-in");
const calendarCheckIn = new Toggle("calendar__background_check-in");

const CM_checkIn = new CalendarManager(checkInButton, checkInPrevButton, checkInNextButton, calendarHtmlCheckIn);

export { calendarCheckIn, checkInButton, CM_checkIn };
