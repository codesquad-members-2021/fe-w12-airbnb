export default class Calendar {
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