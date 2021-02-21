/*======= CalendarIndicator =======
[✔] 체험 탭의 '날짜' 버튼 누르면 → 밑에 달력 요소 생김
[✔] '날짜'버튼 재클릭하면 → 사라짐 (toggle)
[✔] 달력 이전 버튼 클릭하면 이전달 보여주기
[✔] 달력 다음 버튼 클릭하면 다음달 보여주기
[ ] 달력 날짜 버튼 클릭하면 스타일 적용 + 검색창에 날짜 표시 */

// 년, 월이 어떻게 바뀌는지 로직을 짜야함. 
// 1) 날짜 지정이 안 됐다면 현재 기준으로 달력 표시
// 2) 날짜 지정후에 다시 달력을 켠다면 지정한 날짜가 있는 달력을 보여줘야 하고,
//    지정한 날짜 스타일 유지해야함.
// 3) 버튼을 누르면 현재달에 +, -

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
            } 
            // else {
            //     // 날짜를 선택했었다면, 창을 닫았다가 다시 켤 때 선택한 날짜의 달력이 나타나도록!
            //     this.renderCalendar(yearSelected, monthSelected);
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