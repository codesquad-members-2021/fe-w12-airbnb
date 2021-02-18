import { calendarCheckOut, checkOutButton } from "../calendars/checkOutCalendar.js";
import { calendarCheckIn, checkInButton } from "../calendars/checkInCalendar.js";
import { experienceDateButton } from "../calendars/experienceDateCalendar.js";
import SearchBar from "./searchBar.js";

const checkInTab = new SearchBar(checkInButton);
checkInTab.focusEvent(calendarCheckOut);

const checkOutTab = new SearchBar(checkOutButton);
checkOutTab.focusEvent(calendarCheckIn);

const experienceDateTab = new SearchBar(experienceDateButton);
experienceDateTab.focusEvent();
