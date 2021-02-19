/*======= CalendarIndicator =======
[✔] 체험 탭의 '날짜' 버튼 누르면 → 밑에 달력 요소 생김
[✔] '날짜'버튼 재클릭하면 → 사라짐 (toggle)
[ ] 달력 이전 버튼 클릭하면 이전달 보여주기
[ ] 달력 다음 버튼 클릭하면 다음달 보여주기
[ ] 달력 날짜 버튼 클릭하면 스타일 적용 + 검색창에 날짜 표시 */

export default class CalendarIndicator {
    constructor({activityDate, calendarDiv, calendarTitle, calendarDate, calendarBtn}, calendarMaker) {
        this.activityDate = activityDate;
        this.calendarDiv = calendarDiv;
        this.calendarPrev = calendarBtn[0];
        this.calendarNext = calendarBtn[1];
        this.calendarTitle = calendarTitle;
        this.calendarDate = calendarDate;
        this.maker = calendarMaker;
    }
    setEvent() {
        this.activityDate.addEventListener("click", this.toggleCalendar);
        this.calendarPrev.addEventListener("click", );
        this.calendarNext.addEventListener("click", );
    }
    toggleCalendar() {
        if(this.calendarDiv.classList.contains('hidden')) {
            // 어떤 달의 달력을 보여줘야 하는지 인자로 전달?
            this.drawCalendar();
            this.calendarDiv.classList.remove('hidden');
        } else {
            this.calendarDiv.classList.add('hidden');
        }
    }
    drawCalendar() {
        // 년, 월이 어떻게 바뀌는지 로직을 짜야함. 
        // 1) 버튼을 누르면 현재달에 +, -
        // 2) 날짜 지정후에 다시 달력을 켠다면 지정한 날짜가 있는 달력을 보여줘야 하고,
        //    지정한 날짜 스타일 유지해야함.
        this.calendarTitle.innerText = `${year}년 ${month}월`;
        this.calendarDate.innerHTML = this.maker.getCalendarHtml();
    }
}