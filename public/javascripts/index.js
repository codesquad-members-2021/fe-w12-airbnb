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
// 1) 달력 초기 생성 및 매니저 등록
const calendarList = Array.from(
    _.$All('.calendarWrapper > .calendarSubWrapper .calendar'),
    (calendar) =>
        new Calendar(calendar, calendar.querySelector('.date__dynamic')),
);

const leftCalendarManager = new CalendarManager(calendarList.find((cal) => _.classContains(cal.target, 'left')));
const rightCalendarManager = new CalendarManager(calendarList.find((cal) => _.classContains(cal.target, 'right')));

// 2) 달력 (이전 / 다음) 버튼 이벤트
const btnList = Array.from(_.$All('.move-month__btn'));
const prevBtn = btnList.find((btn) => _.classContains(btn, 'move-month__btn--left'));
const nextBtn = btnList.find((btn) => _.classContains(btn, 'move-month__btn--right'));
leftCalendarManager.setButtons(prevBtn, nextBtn);
leftCalendarManager.setButtonsEvent(prevBtn, nextBtn);
rightCalendarManager.setButtons(prevBtn, nextBtn);
rightCalendarManager.setButtonsEvent(prevBtn, nextBtn);

// 3?) 달력 최초 생성
leftCalendarManager.init();
rightCalendarManager.init();
