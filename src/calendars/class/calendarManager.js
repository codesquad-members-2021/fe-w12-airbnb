import Calendar from "./calendar.js";

export default class CalendarManager {
  constructor(tab, prevButton, nextButton, calendarHtml) {
    this.tab = tab;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.calendarHtml = calendarHtml;
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
  }

  createTwoCalendars() {
    this.calendarHtml.innerHTML = ``;
    for (let i = 0; i < 2; i++) {
      const day = [this.today.getFullYear(), this.currentMonth + i];
      const calendar = new Calendar(day, this.calendarHtml);
      calendar.setCalendarData(calendar.day.getFullYear(), calendar.day.getMonth() + 1, i);
    }
  }

  createCalendarDateEvent(dateCheckIn, dateCheckOut, placeholder) {
    const calendarDate = document.querySelectorAll(".calendar__date");
    for (const date of calendarDate) {
      if (date.classList.contains("yesterday")) continue;
      // 각 날짜별로 이벤트 걸어주기
      date.addEventListener("click", () => {
        placeholder.classList.add("none");
        const [year, month, day] = date.id.split("-").map((e) => +e);
        if (!dateCheckIn.innerText) {
          dateCheckIn.innerText = `${year}-${month}-${day + 1}`;
          date.classList.add("selected");
        } else {
          const [in_year, in_month, in_day] = dateCheckIn.innerText.split("-").map((e) => +e);
          if (year * 365 + month * 30 + day >= in_year * 365 + in_month * 30 + in_day) {
            // checkOut 날짜가 checkIn 날짜보다 늦어야 하는 조건 계산
            date.classList.add("selected");
            dateCheckOut.innerText = `${year}-${month}-${day + 1}`;
          } else alert("잘못된 날짜를 선택하셨습니다.");
        }
      });
    }
    // filter로는 걸리지지 않음 - iterator일 뿐 배열은 아닌건가..
    // forEach로 하려고 했는데 continue 쓰고 싶어서 for문으로 고침
  }

  todayCalendar(calendar, dateCheckIn, dateCheckOut, placeholder) {
    this.tab.addEventListener("click", () => {
      calendar.init();
      this.createTwoCalendars();
      this.createCalendarDateEvent(dateCheckIn, dateCheckOut, placeholder);
    });
  }

  prevCalendar(dateCheckIn, dateCheckOut, placeholder) {
    this.prevButton.addEventListener("click", () => {
      --this.currentMonth;
      this.createTwoCalendars();
      this.createCalendarDateEvent(dateCheckIn, dateCheckOut, placeholder);
    });
  }

  nextCalendar(dateCheckIn, dateCheckOut, placeholder) {
    this.nextButton.addEventListener("click", () => {
      ++this.currentMonth;
      this.createTwoCalendars();
      this.createCalendarDateEvent(dateCheckIn, dateCheckOut, placeholder);
    });
  }
}
