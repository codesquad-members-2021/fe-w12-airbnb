/*========= CalendarMaker =========
[✔] 이번달 1일 날짜의 Date 객체 만들기
    → new Date(year, month, 1)
    → Mon Feb 01 2021 00:00:00 GMT+0900
[✔] 이번달 1일 요일 구하기 〰 firstDayName
    → (요일 = 1일 앞 빈 요소 개수)
[✔] 이번달 마지막 날짜 구하기 〰 lastDay
[✔] 날짜 요소 그리기 (7열 5~6행)
    → (빈 요소 ~ 이번달 1일 ~ 이번달 마지막 날짜 ~ 빈 요소)*/

/*========== To Do List ===========
    1. 매직넘버 없애기 ex) daysOfWeek = 7;
    2. 함수 인자로 넘겨줄 수 있는 것은 constructor에서 제거
====================================*/ 

export default class CalendarMaker {
    constructor() {
        this.year;
        this.month;
        this.today;
        this.firstDayName; // 1일 요일
        this.lastDay;      // 마지막 일
        this.lastDayName;  // 마지막 일 요일
        this.lastDayOfWeek;// 주의 마지막 일
    }
    getCalendar(year, month) {
        this.saveMonthInfo(year, month);
        const isPrev = this.isPrevMonth(year, month);
        const html = this.getCalendarHtml(isPrev);
        return html;
    }
    isPrevMonth(year, month) {
        const isPrev = (year < this.year || year === this.year && month < this.month) ?  'isPrev'
        : (year == this.year && month == this.month) ? 'needCheck' : 'isNotPrev';
        return isPrev;
    }

    saveMonthInfo(year, month) {
        this.firstDayName = new Date(year, month, 1).getDay();
        const last = new Date(year, month + 1, 0);
        this.lastDay = last.getDate();
        this.lastDayName = last.getDay();
    }

    getCalendarHtml(isPrev) {
        const html = this.getFirstWeek(isPrev) + this.getMiddleWeek(isPrev) + this.getLastWeek(isPrev);
        return html; 
    }

    getFirstWeek(isPrev) {
        this.lastDayOfWeek = 7 - this.firstDayName;
        let week = `<tr>`;
        for(let i = 0; i < this.firstDayName; i++) {
            week += `<td></td>`
        }
        for(let j = 0; j < this.lastDayOfWeek; j++) {
            const date = j + 1;
            const isPrevDate = isPrev === 'isPrev' || (isPrev === 'needCheck' && date < this.today);
            if(isPrevDate) week += `<td><span class="prevDate">${date}</span></td>`
            else { week += `<td><span>${date}</span></td>` }
        }
        return week + `</tr>`;
    }

    getMiddleWeek(isPrev, week = `<tr>`) {
        for(let i = 0; i < 7; i++) {
            const date = this.lastDayOfWeek + i + 1;
            const isPrevDate = isPrev === 'isPrev' || (isPrev === 'needCheck' && date < this.today);
            if(isPrevDate) week += `<td><span class="prevDate">${date}</span></td>`
            else { week += `<td><span>${date}</span></td>` }
        }
        this.lastDayOfWeek += 7;
        if(this.lastDayOfWeek + 7 >= this.lastDay) return week +`</tr>`;
        else return this.getMiddleWeek(isPrev, week + `</tr>`);
    }

    getLastWeek(isPrev) {
        const lastDayName = this.lastDayName + 1
        let week = `<tr>`;
        for(let i = 0; i < lastDayName; i++) {
            const date = this.lastDayOfWeek + i + 1;
            const isPrevDate = isPrev === 'isPrev' || (isPrev === 'needCheck' && date < this.today);
            if(isPrevDate) week += `<td><span class="prevDate">${date}</span></td>`
            else { week += `<td><span>${date}</span></td>` }
        }
        for(let j = 0; j < 7 - lastDayName; j++) {
            week += `<td></td>`
        }
        return week + `</tr>`;
    }
}