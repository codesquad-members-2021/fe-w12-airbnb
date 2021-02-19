export class CalendarController {
  constructor(parentEl, calendarCount, date) {
    this.parentEl = parentEl;
    this.calendarCount = calendarCount;
    this.views = [];
    this.model = new CalendarModel(this.calendarCount, this.views, date);
  }

  init() {
    this._initView();
    this._initModel();
  }

  isShown() {
    return !this.views[0].targetEl.hidden;
  }

  setPickMode(pickMode) {
    if (pickMode !== 'beginPick' && pickMode !== 'endPick')
      throw new Error("Unsupported pick mode!");

    this.model.pickMode = pickMode;
  }

  insertViewBefore(el) { 
    this.views.forEach(view => this.parentEl.insertBefore(view.targetEl, el));
  }

  changeToPrevMonth() {
    const weeks = this._createWeeksFrom(new Date(this.model.currDate.getFullYear(), this.model.currDate.getMonth() - this.calendarCount));
    this.model.pushFrontWeeks(weeks);
    this.model.popBackWeeks();
  }

  changeToNextMonth() {
    const weeks = this._createWeeksFrom(new Date(this.model.currDate.getFullYear(), this.model.currDate.getMonth() + this.calendarCount + 1));
    this.model.popFrontWeeks();
    this.model.pushBackWeeks(weeks);
  }

  datePick(rawDate) {
    this.model.beginDate = this.model.beginDate ?? new Date(rawDate);
  }

  _initView() {
    for (let i = 0; i < this.calendarCount; i++)
      this.views.push(new CalendarView(this));

    this.views.forEach(view => view.init());
  }

  _initModel() {
    const tmpDate = new Date(this.model.currDate.getFullYear(), this.model.currDate.getMonth() - 1);

    for (let i = 0; i < this.calendarCount + 2; i++) {
      this.model.pushBackWeeks(this._createWeeksFrom(tmpDate));
      tmpDate.setMonth(tmpDate.getMonth() + 1)
    }
  }

  _createWeeksFrom(date) {
    const weeks = [];
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    for (let currDate = firstDate;
        currDate <= lastDate;
        currDate.setDate(currDate.getDate() + 1)) {
          
      if (weeks.length === 0 || currDate.getDay() === 0)
        weeks.push(Array(7).fill(null));

      weeks[weeks.length - 1][currDate.getDay()] = new Date(date.getFullYear(), date.getMonth(), currDate.getDate());
    }

    return weeks;
  }

}

class CalendarView {
  constructor(controller) {
    this.controller = controller;
    this.targetEl;
  }

  init() {
    this._createElement();
  }

  onEvents() {
  }

  updateYearMonth(year, month) {
    this.targetEl.firstElementChild.innerHTML = `${year}년 ${month}월`;
  }
  
  updateWeeks(weeks) {
    const tbody = this.targetEl.querySelector('tbody');
    tbody.innerHTML = '';

    weeks.forEach(week => {
      const rowEl = document.createElement('TR');
      week.forEach(date => rowEl.appendChild(this._createCellElement(date)) );
      tbody.appendChild(rowEl);
    });
  }

  _createElement() {
    this.targetEl = document.createElement('DIV');
    this.targetEl.classList.add('calendar');

    this.targetEl.innerHTML =
      `<div id="year-month"></div>
      <table>
        <thead>
          <tr id="day">
            <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>`
  }

  _createCellElement(date) {
    const cellEl = document.createElement('TD');
    const dateEl = document.createElement('DIV');

    if (date) {
      cellEl.setAttribute('data-text', `${date.valueOf()}`);

      dateEl.classList.add('solid-rounded');
      dateEl.classList.add('pointable');
      dateEl.innerText = `${date.getDate()}`;
    }

    cellEl.appendChild(dateEl);
    cellEl.addEventListener('click', this._onCellClick.bind(this), true);
    return cellEl;
  }

  _onCellClick({ currentTarget: cellEl }) {
    // cellEl.classList.add('picked');
    cellEl.firstElementChild.classList.add('picked');
    this.controller.datePick(cellEl.dataset.text);
  }
}

class CalendarModel {
  constructor(calendarCount, views, date) {
    this.calendarCount = calendarCount;
    this.views = views;
    this.currDate = date;
    this.todayDate = date;
    this.weeksList = [];
    this.pickMode;
    this.pickedBeginDate;
    this.pickedEndDate;
  }

  pushFrontWeeks(weeks) {
    this.currDate.setMonth(this.currDate.getMonth() - 1);
    this.weeksList.unshift(weeks);
    this._updateViews()
  }

  popFrontWeeks() {
    this.currDate.setMonth(this.currDate.getMonth() + 1);
    this.weeksList.shift();
    this._updateViews()
  }

  pushBackWeeks(weeks) { 
    this.weeksList.push(weeks);

    if (this.weeksList.length >= 2 && this.weeksList.length <= this.calendarCount + 1)
      this._updateView(this.weeksList.length - 2);
  }

  popBackWeeks() {
    this.weeksList.pop();
  }
  
  setBeginDate(date) {
    
  }

  setEndDate(data) {
    
  }

  _updateViews() {
    for (let i = 0; i < this.calendarCount; i++)
      this._updateView(i);
  }

  _updateView(viewIdx) {
    const tmpDate = new Date(this.currDate.getFullYear(), this.currDate.getMonth() + viewIdx);
    this.views[viewIdx].updateWeeks(this.weeksList[viewIdx + 1]);
    this.views[viewIdx].updateYearMonth(tmpDate.getFullYear(), tmpDate.getMonth() + 1);
  }
}