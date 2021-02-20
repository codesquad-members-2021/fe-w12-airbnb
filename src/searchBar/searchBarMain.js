import { checkOutButton } from "../calendars/checkOutCalendar.js";
import { checkInButton } from "../calendars/checkInCalendar.js";
import { experienceDateButton } from "../calendars/experienceDateCalendar.js";
import SearchBar from "./searchBar.js";

const checkInTab = new SearchBar(checkInButton);
const checkOutTab = new SearchBar(checkOutButton);
const experienceDateTab = new SearchBar(experienceDateButton);

export { checkInTab, checkOutTab, experienceDateTab };
