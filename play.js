import {
   CalendarMaker
} from './calendar.maker.js';
import {
   _
} from './util.js';
import {
   ScrollCtrl
} from './scroll.ctrl.js';
import {
   getValue
} from './search_bar.ctrl.js';
import {
   UserBtnCtrl
} from './user_btn.ctrl.js';


//* ScrollCtrl
const loadedWindow = new ScrollCtrl();
loadedWindow.onScrollEvents();

//* SearchBar_Ctrl
const centerMenu = document.querySelectorAll(".menu_center>label>span");
centerMenu.forEach(el => el.addEventListener('click', () => getValue(el.innerText)))

//*CallCalendar
export const readCalendarJS = function () {
   new CalendarMaker(new Date(), _.$(".calendar_area"));
}
export const dateBtn = _.$('.call_calendar');
dateBtn.addEventListener('click', readCalendarJS);

//* BtnCtrl


_.$All(".toggleBtn").forEach((el => new UserBtnCtrl(el)))