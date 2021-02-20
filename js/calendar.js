const thisMonthDate = document.querySelector("#thisMonth--date");
const nextMonthDate = document.querySelector("#nextMonth--date");
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
let yearCount = new Date().getFullYear();
let monthCount = new Date().getMonth();

class Calendar {
    constructor(year, month) {
        this.year = year;
        this.month = month;
        this.calHtml = "";
        this.dateCnt = 1;
    }

    makeCalendarData() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i == 0 && j < this.firstDayOfWeek()) {
                    this.calHtml += `<div class='calendar__day borderHidden'>&nbsp;</div>`;
                }
                else if (i == 0 && j == this.firstDayOfWeek()) {
                    this.calHtml += `<div class='calendar__day'><span>${this.dateCnt++}</span></div>`;
                }
                else if (i == 0 && j >= this.firstDayOfWeek()) {
                    this.calHtml += `<div class='calendar__day'><span>${this.dateCnt++}</span></div>`;
                }
                else if (i > 0 && this.dateCnt <= this.lastDate()) {
                    this.calHtml += `<div class='calendar__day'><span>${this.dateCnt++}</span></div>`;
                }
                else if (this.dateCnt > this.lastDate()) {
                    this.calHtml += `<div class='borderHidden'></div>`;
                }
            }
        }
        return this.calHtml
    }

    firstDayOfWeek() {
        return new Date(this.year, this.month, 1).getDay()
    }

    lastDate() {
        return new Date(this.year, this.month + 1, 0).getDate()
    }
}

prevButton.addEventListener('click', function () {
    if (monthCount <= 0) {
        yearCount--;
        monthCount = 11;
    }
    monthCount--;
    init();
});

nextButton.addEventListener('click', function () {
    if (monthCount >= 11) {
        yearCount++;
        monthCount = 0;
    }
    monthCount++;
    init();
});


const cleanData = () => {
    while (thisMonthDate.hasChildNodes()) {
        thisMonthDate.removeChild(thisMonthDate.firstChild);
    }
    while (nextMonthDate.hasChildNodes()) {
        nextMonthDate.removeChild(nextMonthDate.firstChild);
    }
}

const init = () => {
    cleanData();
    const currCalendar = new Calendar(yearCount, monthCount)
    const nextCalendar = new Calendar(yearCount, monthCount + 1)

    document.querySelector("#thisMonth--month").innerHTML = `${yearCount}년 ${monthCount + 1}월`;
    document.querySelector("#nextMonth--month").innerHTML = `${yearCount}년 ${monthCount + 2}월`;
    thisMonthDate.insertAdjacentHTML("beforeend", currCalendar.makeCalendarData());
    nextMonthDate.insertAdjacentHTML("beforeend", nextCalendar.makeCalendarData());
}
init();



