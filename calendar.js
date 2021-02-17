function printCalender(y,m) {
    // 날짜 객체
    let date = new Date();
    // 현재 연도
    let thisYear = date.getFullYear();
    // 현재 월
    let thisMonth = date.getMonth();
    let today = date.getDate();
    // console.log(thisYear, thisMonth, today?);
    displayYearMonth(thisYear, thisMonth+1);
    return (y=== undefined || m === undefined) ? createDate(thisYear, thisMonth, today): createDate(y,m,today); 
}

function displayYearMonth(y, m) {
    const calendarYearMonth = document.querySelector('.calendar__year-month');
    calendarYearMonth.innerHTML = `${y}년 ${m}월`;
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
    const calendarDay = document.querySelector('.calendar__day');
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
}

printCalender();