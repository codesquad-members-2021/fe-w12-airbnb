/*========= CalendarMaker =========
[✔] 이번달 1일 날짜의 Date 객체 만들기
    → new Date(year, month, 1)
    → Mon Feb 01 2021 00:00:00 GMT+0900
[✔] 이번달 1일 요일 구하기 〰 firstDayName
    → (요일 = 1일 앞 빈 요소 개수)
[✔] 이번달 마지막 날짜 구하기 〰 lastDay
[ ] 날짜 요소 그리기 (7열 5~6행)
    → (빈 요소 ~ 이번달 1일 ~ 이번달 마지막 날짜 ~ 빈 요소)*/

/*========== To Do List ===========
    1. 매직넘버 없애기 ex) daysOfWeek = 7;
    2. 함수 인자로 넘겨줄 수 있는 것은 constructor에서 제거
====================================*/ 

export default class CalendarMaker {
    constructor() {
        this.today = new Date();
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.firstDayName; // 1일 요일
        this.lastDay;      // 마지막 일
        this.lastDayName;  // 마지막 일 요일
        this.lastDayOfWeek;// 주의 마지막 일
        this.calendarHtml = ``;
    }
    // 캘린더뷰 클래스에서 이 함수 호출
    getCalendarData(when) {
        if(when === 'current') { // 날짜지정X → 현재 년,월 달력 표시
            this.saveMonthInfo(this.year, this.month);
            this.makeCalendar();
            return {'year':this.year, 'month':this.month + 1, 'html':this.calendarHtml};
        } else { // 날짜지정O or 버튼클릭 → 인자로 받아온 년,월 달력 표시

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
        this.lastDayOfWeek = 7 - this.firstDayName;
        let week = `<tr>`;
        for(let i = 0; i < this.firstDayName; i++) {
            week += `<td></td>`
        }
        for(let j = 0; j < this.lastDayOfWeek; j++) {
            week += `<td><span>${j+1}</span></td>`
        }
        return week + `</tr>`
    }

    getMiddleWeek() {
        let week = `<tr>`;
        for(let i = 0; i < 7; i++) {
            week += `<td><span>${this.lastDayOfWeek + i + 1}</span></td>`
        }
        this.lastDayOfWeek += 7;
        if(this.lastDayOfWeek + 7 >= this.lastDay) return week +`</>`
        else this.getMiddleWeek();
    }

    getLastWeek() {
        const lastDayName = this.lastDayName + 1
        let week = `<tr>`;
        for(let i = 0; i < lastDayName; i++) {
            week += `<td><span>${this.lastDayOfWeek + i + 1}</span></td>`
        }
        for(let j = 0; j < 7 - lastDayName; j++) {
            week += `<td></td>`
        }
        return week + `</tr>`
    }
}