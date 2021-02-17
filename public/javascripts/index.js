import _ from './util.js';
import SearchBarControl from './index/SearchBarControl.js';
import TabUI from './index/TabUI.js';
import Calendar from './index/Calendar.js';

// 상단 큰 검색바
const inputList = _.$All('.header__main__search__options input');
inputList.forEach((input) => new SearchBarControl(input).init());

// 햄버거
const tabUISetting = new TabUI(
    _.$('.header__main__login > .tabUI'),
    _.$('.header__main__login > .navBtn'),
);
tabUISetting.init();

// 달력 초기 생성
const calendarList = Array.from(
    _.$All('.calendarWrapper > .calendarSubWrapper .calendar'),
    (calendar) =>
        new Calendar(calendar, calendar.querySelector('.date__dynamic')),
);
calendarList.forEach((calendar) => calendar.createCalendar());

// 달력 (이전 / 다음) 버튼 이벤트
_.$All('.move-month__btn').forEach((btn) => btn.addEventListener('click', () => {
    calendarList.forEach((calendarClass) => {
        if (_.classContains(btn, 'move-month__btn--left'))
            calendarClass.optionMonthMinus()
        else 
            calendarClass.optionMonthPlus();
        
        calendarClass.removeAllChildNodes(); 
        calendarClass.createCalendar();
    });    
}));