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
// let y = date.getFullYear(); // 2021년
// let m = date.getMonth(); //2월
// let firstDate = new Date(y, m, 1) //2월 1일
// let dayOfFirstDate = firstDate.getDay(); //월요일

//왼쪽 달력
let date2 = new Date()
date2 = new Date(date2.getFullYear(), date2.getMonth() - 1, date2.getDate());
// let y2 = date2.getFullYear(); // 2021년
// let m2 = date2.getMonth() - 1; //1월
// let firstDate2 = new Date(y2, m2, 1)
// let dayOfFirstDate2 = firstDate2.getDay();

// //각 달의 마지막 날
// let last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// let lastDate = last[m]
// //////////////////

// //윤년체크
// function checkLeapYear(y) {
//     if (y % 4 && y % 100 != 0 || y % 400 == 0) {
//         lastDate = last[1] = 29;
//     }
// }



//달력에 숫자넣어주기
let templateCalendar = ``

function makeCalendar(dateObj) {

    let date = dateObj;
    let y = date.getFullYear(); // 2021년
    let m = date.getMonth(); //2월
    let firstDate = new Date(y, m, 1) //2월 1일
    let dayOfFirstDate = firstDate.getDay(); //월요일


    let last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let lastDate = last[m]

    // 윤년체크 - 오류
    // if ((y % 4 && y % 100 != 0) || y % 400 == 0) {
    //     lastDate = last[1] = 29;
    // }

    let dateNumber = 1; // 달력에 표기되는 일의 초깃값
    let row = Math.ceil((dayOfFirstDate + last[m]) / 7);

    templateCalendar = `
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

        templateCalendar += `<tr>`;

        for (let j = 1; j <= 7; j++) {
            if ((i === 0 && j <= dayOfFirstDate) || dateNumber > last[m]) {
                templateCalendar += `<td> &nbsp; </td>`
            } else {
                templateCalendar += `<td> ${dateNumber} </td>`
                dateNumber++;
            }
        }
        templateCalendar += `</tr>`
    }
    return templateCalendar;
}


function view(htmlTag, templateCalendar) {
    htmlTag.innerHTML = templateCalendar;
}


//메인함수
function main() {
    let february = makeCalendar(date);
    view(currentCalendarTable, february);
    let january = makeCalendar(date2);
    view(preCalendarTable, january);
}

main();
































// 저번달 // 다음달 
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