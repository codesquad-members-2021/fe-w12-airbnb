const calendarWrapper = document.querySelector('.calendars-wrapper');

export class Calendar {
  constructor(target) {
    this.target = target;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
  }

  init() {
    const weeks = document.querySelectorAll('.calendar-weeks');
    const days = document.querySelectorAll('.calendar-days');
    weeks.forEach((week) => (week.innerHTML = ''));
    days.forEach((day) => (day.innerHTML = ''));
  }

  onFocusOut({ target }) {
    if (
      !target.closest('.input-date') &&
      !target.closest('.calendars-wrapper')
    ) {
      calendarWrapper.classList.add('calendars-wrapper-hidden');
    } else return;
  }

  onEvents() {
    this.target.addEventListener('click', this.dateClickHandler);
    document.body.addEventListener('click', this.onFocusOut);
    this.render();
    this.onClickArrowBtn();
  }

  onClickArrowBtn() {
    const [leftBtn, rightBtn] = document.querySelectorAll('.calendar-btn');
    leftBtn.addEventListener('click', this.leftBtnClickHandler.bind(this));
    rightBtn.addEventListener('click', this.rightBtnClickHandler.bind(this));
  }

  rightBtnClickHandler({ target }) {
    if (!target.closest('.right-arrow')) return;
    this.month += 1;
    this.init();
    this.render();
  }

  leftBtnClickHandler({ target }) {
    if (!target.closest('.left-arrow')) return;
    this.month -= 1;
    this.init();
    this.render();
  }

  dateClickHandler() {
    calendarWrapper?.classList.toggle('calendars-wrapper-hidden');
  }

  showCalendarTitle() {
    const calendarTitles = document.querySelectorAll('.calendar-title');
    calendarTitles.forEach((title, i) => {
      if (this.month === 12) this.month = 1;
      else if (this.month === 1) this.month = 12;
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
      let daysEmpty = new Date(`'${this.year}, ${this.month + i}, 1'`).getDay();
      const daysByOrder = Array.from(
        { length: daysLen + daysEmpty },
        (_, i) => i + 1 - daysEmpty
      );
      console.log(daysEmpty);
      const days = daysByOrder.reduce((prev, day) => {
        if (daysEmpty) {
          daysEmpty -= 1;
          return prev + `<span></span>`;
        }
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
