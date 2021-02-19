//날짜버튼
let dayBtn = document.querySelector(".day-btn")
let calendar = document.querySelector(".calendar")
dayBtn.addEventListener("click", dayHandler)

function dayHandler() {
    calendar.style.display = "block";
}

//////////////////
//전역변수
let preCalendarTable = document.querySelector(".pre-calendar-table")
let currentCalendarTable = document.querySelector(".current-calendar-table")

//오른쪽 달력
let date = new Date();
date = new Date(date.getFullYear(), date.getMonth(), date.getDate());


//왼쪽 달력
let date2 = new Date()
date2 = new Date(date2.getFullYear(), date2.getMonth() - 1, date2.getDate());


//달력에 숫자넣어주기
class MakeCalendar {
    constructor(dateObj) {
        this.date = dateObj;

        this.y = this.date.getFullYear();
        this.m = this.date.getMonth(); //2월
        this.firstDate = new Date(this.y, this.m, 1) //2월 1일
        this.dayOfFirstDate = this.firstDate.getDay();
        this.last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.templateCalendar = ``;
    }

    checkLeapYear() {
        if ((this.y % 4 == 0 && this.y % 100 != 0) || this.y % 400 == 0) {
            this.last[1] = 29;
        }
    }

    MaketemplateCalendar() {
        let dateNumber = 1; // 달력에 표기되는 일의 초깃값
        let row = Math.ceil((this.dayOfFirstDate + this.last[this.m]) / 7);

        this.templateCalendar = `
            <tr>
                <th class="month-tab" colspan="7"></th>
            </tr>
             <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>`;

        for (let i = 0; i < row; i++) {

            this.templateCalendar += `<tr>`;

            for (let j = 1; j <= 7; j++) {
                if ((i === 0 && j <= this.dayOfFirstDate) || dateNumber > this.last[this.m]) {
                    this.templateCalendar += `<td> &nbsp; </td>`
                } else {
                    this.templateCalendar += `<td> ${dateNumber} </td>`
                    dateNumber++;
                }
            }
            this.templateCalendar += `</tr>`
        }
    }

    view(htmlTag, templateCalendar) {
        htmlTag.innerHTML = templateCalendar;
    }

    viewMonthTab(className, date) {
        document.querySelector(className).innerHTML = `${date.getFullYear()}년 ${date.getMonth()+1}월`
    }

}

//메인함수
function main() {
    let currentCal = new MakeCalendar(date);
    // console.log(currentCal)
    currentCal.checkLeapYear();
    currentCal.MaketemplateCalendar();
    currentCal.view(currentCalendarTable, currentCal.templateCalendar);
    currentCal.viewMonthTab(".current-calendar-table .month-tab", date);


    let preCal = new MakeCalendar(date2);
    // console.log(preCal)
    preCal.checkLeapYear();
    preCal.MaketemplateCalendar();
    preCal.view(preCalendarTable, preCal.templateCalendar);
    preCal.viewMonthTab(".pre-calendar-table .month-tab", date2);
}

main();


// 저번달 // 다음달버튼
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")

prev.addEventListener("click", prevHandler)
next.addEventListener("click", nextHandler)


function prevHandler() {
    date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth() - 1, date2.getDate());
    main();
}

function nextHandler() {
    date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth() + 1, date2.getDate());
    main();
}