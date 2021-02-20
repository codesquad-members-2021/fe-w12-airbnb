import _ from './util.js';
import SearchBarControl from './index/SearchBarControl.js';
import TabUI from './index/TabUI.js';
import Calendar from './index/Calendar.js';
import CalendarManager from './index/CalendarManager.js';

// 상단 큰 검색바
const inputList = _.$All('.header__main__search__options input');
inputList.forEach((input) => new SearchBarControl(input).init());

// 햄버거
const tabUISetting = new TabUI(
    _.$('.header__main__login > .tabUI'),
    _.$('.header__main__login > .navBtn'),
);
tabUISetting.init();

// 달력 
// 1) 달력 초기 생성
const calendarList = Array.from(
    _.$All('.calendarWrapper > .calendarSubWrapper .calendar'),
    (calendar) =>
        new Calendar(calendar, _.$('.date__dynamic', calendar)),
);

const leftCalendar = calendarList.find((cal) => _.classContains(cal.target, 'left'));
const rightCalendar = calendarList.find((cal) => _.classContains(cal.target, 'right'));
leftCalendar.setAnotherCalendar = rightCalendar;
rightCalendar.setAnotherCalendar = leftCalendar;

// 2) calendarManager로 달력 첫 Render 및 나머지 구성요소 생성
const calendarManager = new CalendarManager('.calendarWrapper', leftCalendar, rightCalendar);
calendarManager.init();