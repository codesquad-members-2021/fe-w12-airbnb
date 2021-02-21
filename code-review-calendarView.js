export default class CalendarView {
    constructor({activityDate, calendarDiv, calendarTitles, calendarDates, calendarBtns}, calendarMaker) {
        this.activityDate = activityDate;
        this.calendarDiv = calendarDiv;
        this.calPrev = calendarBtns[0];
        this.calNext = calendarBtns[1];
        this.calTitle1 = calendarTitles[0];
        this.calTitle2 = calendarTitles[1];
        this.calDate1 = calendarDates[0];
        this.calDate2 = calendarDates[1];
        this.maker = calendarMaker;
        this.currYear = 0;
        this.currMonth = 0;
        this.isSelected = false;
        // this.yearSelected;
        // this.monthSelected;
        this.setEvent();
    }
    setEvent() {
        this.activityDate.addEventListener("click", this.toggleCalendar.bind(this));
        this.calPrev.addEventListener("click", this.renderByBtn.bind(this, 'prev'));
        this.calNext.addEventListener("click", this.renderByBtn.bind(this));
    }
    toggleCalendar() {
        if(this.calendarDiv.classList.contains('hidden')) {
            const today = new Date();
            [this.maker.year, this.maker.month, this.maker.today] = [today.getFullYear(), today.getMonth(), today.getDate()]
            if(!this.isSelected) {
                this.renderCalendar(this.maker.year, this.maker.month);
            } // else {
            //     // 날짜를 선택했었다면, 창을 닫았다가 다시 켤 때 선택한 날짜의 달력이 나타나도록!
            //     this.renderCalendar(this.yearSelected, this.monthSelected);
            // }
            this.calendarDiv.classList.remove('hidden');
        } else {
            this.calendarDiv.classList.add('hidden');
        }
    }
    renderByBtn(button) {
        if(button === 'prev') this.renderCalendar(this.currYear, this.currMonth - 1)
        else this.renderCalendar(this.currYear, this.currMonth + 1)
    }
    renderCalendar(y, m) {
        let [year, month] = this.checkMonth(y, m);
        this.saveCurr(year, month);
        let calHtml = this.maker.getCalendar(year, month);
        this.calTitle1.innerText = `${year}년 ${month + 1}월`;
        this.calDate1.innerHTML = calHtml;

        [year, month] = this.checkMonth(year, month + 1);
        calHtml = this.maker.getCalendar(year, month);
        this.calTitle2.innerText = `${year}년 ${month + 1}월`;
        this.calDate2.innerHTML = calHtml;
    }
    checkMonth(year, month) {
        if(month === 12) return [year+1, 0];
        else if(month === -1) return [year-1, 11];
        else return [year, month];
    }
    saveCurr(year, month) {
        this.currYear = year
        this.currMonth = month;
    }
}