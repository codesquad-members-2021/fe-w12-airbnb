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
let rightDate = new Date();
rightDate = new Date(rightDate.getFullYear(), rightDate.getMonth(), rightDate.getDate());


//왼쪽 달력
let leftDate = new Date()
leftDate = new Date(leftDate.getFullYear(), leftDate.getMonth() - 1, leftDate.getDate());


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
}

class View {
    constructor(calendar) {
        this.calendar = calendar;
    }

    viewCalendar(htmlTag, templateCalendar) {
        htmlTag.innerHTML = templateCalendar;
    }

    viewMonthTab(className, date) {
        document.querySelector(className).innerHTML = `${date.getFullYear()}년 ${date.getMonth()+1}월`
    }
}

// //메인함수
function main() {
    let currentCal = new MakeCalendar(rightDate);
    // console.log(currentCal)
    currentCal.checkLeapYear();
    currentCal.MaketemplateCalendar();

    let view = new View(currentCal);
    view.viewCalendar(currentCalendarTable, view.calendar.templateCalendar);
    view.viewMonthTab(".current-calendar-table .month-tab", rightDate)

    let preCal = new MakeCalendar(leftDate);
    preCal.checkLeapYear();
    preCal.MaketemplateCalendar();

    let view2 = new View(preCal);
    view2.viewCalendar(preCalendarTable, view.calendar.templateCalendar);
    view2.viewMonthTab(".pre-calendar-table .month-tab", leftDate)

}

main();


// 저번달 // 다음달버튼
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")

prev.addEventListener("click", prevHandler)
next.addEventListener("click", nextHandler)


function prevHandler() {
    rightDate = new Date(rightDate.getFullYear(), rightDate.getMonth() - 1, rightDate.getDate());
    leftDate = new Date(leftDate.getFullYear(), leftDate.getMonth() - 1, leftDate.getDate());
    main();
}

function nextHandler() {
    rightDate = new Date(rightDate.getFullYear(), rightDate.getMonth() + 1, rightDate.getDate());
    leftDate = new Date(leftDate.getFullYear(), leftDate.getMonth() + 1, leftDate.getDate());
    main();
}