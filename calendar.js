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
    return (y=== undefined || m === undefined) ? findWeekDay(thisYear, thisMonth, today): findWeekDay(y,m,today); 
    // console.log(thisYear);
}

function displayYearMonth(y, m) {
    const calendarYearMonth = document.querySelector('.calendar__year-month');
    calendarYearMonth.innerHTML = `${y}년 ${m}월`;
}

function findWeekDay(y, m, d){
    let lastDateArr = [31,28,31,30,31,30,31,31,30,31,30,31];
    let lastDate = lastDateArr[m];
    if((y%4 === 0 && y%100=== 0) || y%400 === 0) {
        lastDateArr[1] = 29;
    }
    // console.log(lastDate);
    let rowCnt = Math.ceil((d+lastDate)/7);

}

printCalender();