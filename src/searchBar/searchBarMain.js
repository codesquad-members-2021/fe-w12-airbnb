import { calendarCheckOut, checkOutButton } from "../calendars/checkOutCalendar.js";
import { calendarCheckIn, checkInButton } from "../calendars/checkInCalendar.js";
import { experienceDateButton } from "../calendars/experienceDateCalendar.js";
import SearchBar from "./searchBar.js";
// const calendarCheckIn = new Toggle("calendar__background_check-in");
// const checkInButton = document.querySelector(".check-in");

// 체크아웃 버튼 - 체크아웃용 달력
// const checkOutButton = document.querySelector(".check-out");
// const calendarCheckOut = new Toggle("calendar__background_check-out");
// 체험 > 날짜 버튼 - 체험 날짜용 달력
// const experienceDateButton = document.querySelector(".experience-date");

const checkInTab = new SearchBar(checkInButton, calendarCheckOut);
checkInTab.focusEvent();

const checkOutTab = new SearchBar(checkOutButton, calendarCheckIn);
checkOutTab.focusEvent();

const experienceDateTab = new SearchBar(experienceDateButton);
experienceDateTab.focusEvent();
