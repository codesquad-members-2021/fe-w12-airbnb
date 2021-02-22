import Calendar from "./calendar.js";

const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

class CalendarManager {
    constructor() {
        this.thisMonthDate = document.querySelector("#thisMonth--date");
        this.nextMonthDate = document.querySelector("#nextMonth--date");
        this.currYearCount = new Date().getFullYear();
        this.currMonthCount = new Date().getMonth();
        this.nextYearCount = new Date().getFullYear();
        this.nextMonthCount = new Date().getMonth() + 1;
    }

    cleanData() {
        while (this.thisMonthDate.hasChildNodes() || this.nextMonthDate.hasChildNodes()) {
            this.thisMonthDate.removeChild(this.thisMonthDate.firstChild);
            this.nextMonthDate.removeChild(this.nextMonthDate.firstChild);
        }
    }

    init() {
        this.cleanData();
        const currCalendar = new Calendar(this.currYearCount, this.currMonthCount)
        const nextCalendar = new Calendar(this.nextYearCount, this.nextMonthCount)

        document.querySelector("#thisMonth--month").innerHTML = `${this.currYearCount}년 ${this.currMonthCount + 1}월`;
        document.querySelector("#nextMonth--month").innerHTML = `${this.nextYearCount}년 ${this.nextMonthCount + 1}월`;
        this.thisMonthDate.insertAdjacentHTML("beforeend", currCalendar.makeCalendarData());
        this.nextMonthDate.insertAdjacentHTML("beforeend", nextCalendar.makeCalendarData());
    }

    currCalendarDataHandler() {
        if (this.currMonthCount == 0) {
            this.currYearCount--;
            this.currMonthCount = 11;
            this.nextMonthCount--;
        }
        else if (this.nextMonthCount == 0) {
            this.nextYearCount--;
            this.nextMonthCount = 11;
            this.currMonthCount--;
        }
        else {
            this.currMonthCount--;
            this.nextMonthCount--;
        }
        this.init();
    }

    nextCalendarDataHandler() {
        if (this.currMonthCount == 11) {
            this.currYearCount++;
            this.currMonthCount = 0;
            this.nextMonthCount++;
        }
        else if (this.nextMonthCount == 11) {
            this.nextYearCount++;
            this.nextMonthCount = 0;
            this.currMonthCount++;
        }
        else {
            this.currMonthCount++;
            this.nextMonthCount++;
        }
        this.init();
    }
}

const calendarManager = new CalendarManager();
calendarManager.init();
prevButton.addEventListener('click', calendarManager.currCalendarDataHandler.bind(calendarManager));
nextButton.addEventListener('click', calendarManager.nextCalendarDataHandler.bind(calendarManager));