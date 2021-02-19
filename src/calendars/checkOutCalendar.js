import CalendarManager from "./class/calendarManager.js";
import Toggle from "../toggle.js";

const checkOutButton = document.querySelector(".check-out");
const checkOutPrevButton = document.querySelector(".prev__button_check-out");
const checkOutNextButton = document.querySelector(".next__button_check-out");
const calendarHtmlCheckOut = document.querySelector("#calendar__check-out");
const calendarCheckOut = new Toggle("calendar__background_check-out");

const CM_checkOut = new CalendarManager(checkOutButton, checkOutPrevButton, checkOutNextButton, calendarHtmlCheckOut);

export { calendarCheckOut, checkOutButton, CM_checkOut };
