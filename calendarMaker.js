/*========= CalendarMaker =========
[✔] 이번달 1일 날짜의 Date 객체 만들기
    → new Date(year, month, 1)
    → Mon Feb 01 2021 00:00:00 GMT+0900
[✔] 이번달 1일 요일 구하기 〰 firstDayName
    → (요일 = 1일 앞 빈 요소 개수)
[✔] 이번달 마지막 날짜 구하기 〰 lastDay
[ ] 날짜 요소 그리기 (7열 5~6행)
    → (빈 요소 ~ 이번달 1일 ~ 이번달 마지막 날짜 ~ 빈 요소)*/

export default class CalendarMaker {
    constructor() {
        // 함수 인자로 넘겨줄 수 있는 값은 나중에 제거하기
        this.today = new Date();
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.firstDayName;
        this.lastDay;
        this.lastDayName;
        this.calendarHtml = ``;
    }
    // 캘린더뷰 클래스에서 이 함수 호출
    getCalendarData(when) {
        // 날짜지정X → 현재 년,월 달력 표시
        if(when === 'current') {
            this.saveMonthInfo(this.year, this.month);
            this.makeCalendar();
            return {year:this.year, month:this.month + 1, html:this.calendarHtml};
        } 
        // 날짜지정O or 버튼클릭 → 인자로 받아온 년,월 달력 표시
        else {

        }
    }

    // month는 0 ~ 11 
    saveMonthInfo(year, month) {
        this.firstDayName = new Date(year, month, 1).getDay(); // 1(월요일)
        const last = new Date(year, month + 1, 0);
        this.lastDay = last.getDate();     // 28
        this.lastDayName = last.getDay();  // 0(일요일)
    }
    makeCalendar() {
        this.calendarHtml = this.getFirstWeek() + this.getMiddleWeek() + this.getLastWeek();
    }
    getFirstWeek() {
        
    }
    getMiddleWeek() {

    }
    getLastWeek() {

    }
}