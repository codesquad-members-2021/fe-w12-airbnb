import { calendarCheckOut, checkOutButton } from "../calendars/checkOutCalendar.js";
import { calendarCheckIn, checkInButton } from "../calendars/checkInCalendar.js";
import { experienceDateButton } from "../calendars/experienceDateCalendar.js";
import SearchBar from "./searchBar.js";

const checkInTab = new SearchBar(checkInButton, calendarCheckOut);
checkInTab.focusEvent();

const checkOutTab = new SearchBar(checkOutButton, calendarCheckIn);
checkOutTab.focusEvent();

const experienceDateTab = new SearchBar(experienceDateButton);
experienceDateTab.focusEvent();
