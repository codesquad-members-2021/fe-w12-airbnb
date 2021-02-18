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
    const calendarTitle = document.querySelector('.calendar-title');
    calendarTitle.textContent = `${this.year}년 ${this.month}월`;
  }

  showCalendarWeeks() {
    const daysofWeekList = '일월화수목금토'.split('');
    const calendarWeek = document.querySelector('.calendar-weeks');
    const dayName = daysofWeekList.reduce((prev, day) => {
      return prev + `<li>${day}</li>\n`;
    }, '');
    calendarWeek.insertAdjacentHTML('beforeend', dayName);
  }

  showCalendarDays() {
    const calendarDays = document.querySelector('.calendar-days');
    const daysNum = new Date(this.year, this.month, 0).getDate();
    for (let i = 1; i <= daysNum; i += 1) {
      const span = document.createElement('span');
      const day = document.createTextNode(i);
      span.appendChild(day);
      calendarDays.appendChild(span);
    }
  }

  render() {
    this.showCalendarTitle();
    this.showCalendarWeeks();
    this.showCalendarDays();
  }
}
