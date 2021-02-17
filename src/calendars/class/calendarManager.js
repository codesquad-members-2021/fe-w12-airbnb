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

  todayCalendar(calendar) {
    this.tab.addEventListener("click", () => {
      calendar.init();
      this.createTwoCalendars();
    });
  }

  prevCalendar() {
    this.prevButton.addEventListener("click", () => {
      --this.currentMonth;
      this.createTwoCalendars();
    });
  }

  nextCalendar() {
    this.nextButton.addEventListener("click", () => {
      ++this.currentMonth;
      this.createTwoCalendars();
    });
  }
}
