const date = new Date();
let thisYear = date.getFullYear();
// 현재 월
let thisMonth = date.getMonth()+1;;
function printCalender(y,m) {
    // 날짜 객체
    // 현재 연도
    let today = date.getDate();
    console.log(y);
    console.log(m);
    // console.log(thisYear, thisMonth, today?);
    if(y!== undefined || m !== undefined) {
        thisYear = y;
        thisMonth = m-1;
    }
    displayYearMonth(thisYear, thisMonth+1);
    return createDate(thisYear, thisMonth); 
}
let cnt =1;
function displayYearMonth(y, m) {
    console.log(y,m);
    const calendarYearMonth = document.querySelector(`.calendar__year-month${cnt}`);
    // const calendarYearMonth2 = document.querySelector('.calendar__year-month2');
    calendarYearMonth.innerHTML = `${y}년 ${m}월`;
    // calendarYearMonth2.innerHTML = `${y}년 ${m+1}월`;
    // let calendarYearMonth = `<div class="calendar__year-month">${y}년 ${m}월</div>`
}

function createDate(y, m, d){
    // 요일 월 연도 시간
    let theDate = new Date(y,m,1);
    // 요일만 인덱스로 추출 
    let theDay = theDate.getDay();
    let lastDateArr = [31,28,31,30,31,30,31,31,30,31,30,31];
    let weekDay = ['일','월','화','수','목','금','토'];
    let lastDate = lastDateArr[m];
    // 윤년일 경우 2월 마지막날 변경
    if((y%4 === 0 && y%100=== 0) || y%400 === 0) {
        lastDateArr[1] = 29;
    }
    let rowCnt = Math.ceil((theDay+lastDate)/7);
    const calendarDay = document.querySelector(`.calendar__day${cnt}`);
    let calendar = "<tr>";
    for(let i=0; i<weekDay.length; i++) {
        calendar += `<th>${weekDay[i]}</th>`;
    }
    calendar += "</tr>";
    let dNum = 1;
    for(let j=1; j<=rowCnt; j++) {
        calendar += "<tr>";
    for(let k=1; k<=7; k++) {
        if((j==1 && k<=theDay) || dNum>lastDate) {
            calendar+= "<td> &nbsp;</td>";
        }
        else {
            calendar += "<td>" +dNum+ "</td>";
            dNum++;
        }
    }
    calendar+= "<tr>";
}

    calendarDay.innerHTML = calendar;
    if(cnt %2 === 1) {
        cnt++;
        return printCalender(thisYear, thisMonth+2);
        // return addCnt();
    }
}
let monthCnt =-1;
function addCnt() {
    monthCnt++;
    // const date = new Date();
    printCalender(thisYear, thisMonth+monthCnt);
}
// addCnt();
// printCalender(thisYear, thisMonth);
const subCalendarBtn = document.querySelector('.search-sub__calendarBtn');

const subCalendar = document.querySelector('.calendar');

subCalendarBtn.addEventListener('click', () => {
    subCalendar.classList.toggle('active');
});

// if(subCalendarBtn.className === 'calendar active') {
//     document.addEventListener('click', () => {
//         subCalendar.classList.toggle('active');
//     })
// }

const arrowRight = document.querySelector('.next-month');
arrowRight.addEventListener('click', ()=> {
    cnt = 1;
    addCnt();
})