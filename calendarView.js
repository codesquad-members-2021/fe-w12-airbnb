/*======= CalendarIndicator =======
[✔] 체험 탭의 '날짜' 버튼 누르면 → 밑에 달력 요소 생김
[✔] '날짜'버튼 재클릭하면 → 사라짐 (toggle)
[ ] 달력 이전 버튼 클릭하면 이전달 보여주기
[ ] 달력 다음 버튼 클릭하면 다음달 보여주기
[ ] 달력 날짜 버튼 클릭하면 스타일 적용 + 검색창에 날짜 표시 */

export default class CalendarView {
    constructor({activityDate, calendarDiv, calendarTitle, calendarDate, calendarBtn}, calendarMaker) {
        this.activityDate = activityDate;
        this.calendarDiv = calendarDiv;
        this.calendarPrev = calendarBtn[0];
        this.calendarNext = calendarBtn[1];
        this.calendarTitle = calendarTitle;
        this.calendarDate = calendarDate;
        this.maker = calendarMaker;
        this.setEvent();
    }
    setEvent() {
        this.activityDate.addEventListener("click", this.toggleCalendar.bind(this));
        // this.calendarPrev.addEventListener("click", );
        // this.calendarNext.addEventListener("click", );
    }

    // 년, 월이 어떻게 바뀌는지 로직을 짜야함. 
    // 1) 날짜 지정이 안 됐다면 현재 기준으로 달력 표시
    // 2) 날짜 지정후에 다시 달력을 켠다면 지정한 날짜가 있는 달력을 보여줘야 하고,
    //    지정한 날짜 스타일 유지해야함.
    // 3) 버튼을 누르면 현재달에 +, -
    toggleCalendar() {
        if(this.calendarDiv.classList.contains('hidden')) {
            // if ( 날짜 선택 X )
            this.renderCalendar('current');
            // else ( 날짜 선택 O )
            // this.renderCalendar('chosen')
            this.calendarDiv.classList.remove('hidden');
        } else {
            this.calendarDiv.classList.add('hidden');
        }
    }
    renderCalendar(when) {
        const {year, month, html} = this.maker.getCalendarData(when);
        this.calendarTitle.innerText = `${year}년 ${month}월`;
        this.calendarDate.innerHTML = html;

    }
}