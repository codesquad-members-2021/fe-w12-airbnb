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
        this.firstDayName; // 1일 요일
        this.lastDay;      // 마지막 일
        this.lastDayName;  // 마지막 일 요일
        this.lastDayOfWeek;// 주의 마지막 일
    }
    // 캘린더뷰 클래스에서 이 함수 호출
    getCalendarData(when) {
        if(when === 'current') { // 날짜지정X → 현재 년,월 달력 표시
            const today = new Date();
            const [year, month] = [today.getFullYear(), today.getMonth()]
            this.saveMonthInfo(year, month);
            const data = {year: year, month: month + 1, html: this.getCalendarHtml()};
            return data;
        } else { // 날짜지정O or 버튼클릭 → 인자로 받아온 년,월 달력 표시

        }
    }

    // month는 0 ~ 11 
    saveMonthInfo(year, month) {
        this.firstDayName = new Date(year, month, 1).getDay();
        const last = new Date(year, month + 1, 0);
        this.lastDay = last.getDate();
        this.lastDayName = last.getDay();
    }

    getCalendarHtml() {
        const html = this.getFirstWeek() + this.getMiddleWeek() + this.getLastWeek();
        return html; 
    }

    getFirstWeek() {
        this.lastDayOfWeek = 7 - this.firstDayName;
        let week = `<tr>`;
        for(let i = 0; i < this.firstDayName; i++) {
            week += `<td></td>`
        }
        for(let j = 0; j < this.lastDayOfWeek; j++) {
            week += `<td><span>${j + 1}</span></td>`
        }
        return week + `</tr>`;
    }

    getMiddleWeek(week = `<tr>`) {
        for(let i = 0; i < 7; i++) {
            week += `<td><span>${this.lastDayOfWeek + i + 1}</span></td>`
        }
        this.lastDayOfWeek += 7;
        if(this.lastDayOfWeek + 7 >= this.lastDay) return week +`</tr>`;
        else return this.getMiddleWeek(week + `</tr>`);
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
        return week + `</tr>`;
    }
}