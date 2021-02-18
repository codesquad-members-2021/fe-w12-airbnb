const calendarWrapper = document.querySelector('.calendars-wrapper');

export class Calendar {
  constructor(target) {
    this.target = target;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
  }

  init(e) {
    if (
      !e.target.closest('.input-date') &&
      !e.target.closest('.calendars-wrapper')
    ) {
      calendarWrapper.classList.add('calendars-wrapper-hidden');
    } else return;
  }

  onEvents() {
    this.target.addEventListener('click', this.dateClickHandler);
    document.body.addEventListener('click', (e) => this.init(e));
    this.render();
  }

  dateClickHandler() {
    calendarWrapper?.classList.toggle('calendars-wrapper-hidden');
  }

  showCalendarTitle() {
    const calendarTitles = document.querySelectorAll('.calendar-title');
    calendarTitles.forEach((title, i) => {
      title.textContent = `${this.year}년 ${this.month + i}월`;
    });
  }

  showCalendarWeeks() {
    const daysofWeekList = '일월화수목금토'.split('');
    const calendarWeek = document.querySelectorAll('.calendar-weeks');
    const daysOfWeeks = daysofWeekList.reduce((prev, dayOfWeek) => {
      return prev + `<li>${dayOfWeek}</li>`;
    }, '');
    calendarWeek.forEach((week) =>
      week.insertAdjacentHTML('beforeend', daysOfWeeks)
    );
  }

  showCalendarDays() {
    const calendarDays = document.querySelectorAll('.calendar-days');
    calendarDays.forEach((day, i) => {
      const daysLen = new Date(this.year, this.month + i, 0).getDate();
      const daysByOrder = Array.from({ length: daysLen }, (_, i) => i + 1);
      const days = daysByOrder.reduce((prev, day) => {
        return prev + `<span>${day}</span>`;
      }, '');

      day.insertAdjacentHTML('beforeend', days);
    });
  }

  render() {
    this.showCalendarTitle();
    this.showCalendarWeeks();
    this.showCalendarDays();
  }
}
