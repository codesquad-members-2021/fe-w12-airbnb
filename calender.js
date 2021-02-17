export class CalenderController {
  constructor(calenderCount, parentEl) {
    this.parentEl = parentEl;
    this.calenderCount = calenderCount;
    this.views = [];
    this.model = new CalenderModel(this.calenderCount, this.views);
  }

  init(date) {
    this._initView();
    this._initModel(date);
  }

  _initView() {
    for (let i = 0; i < this.calenderCount; i++)
      this.views.push(new CalenderView(this));

    this.views.forEach(view => view.init());
  }

  _initModel(date) {
    this.model.init(date);
    const tmpDate = new Date(date.getFullYear(), date.getMonth() - 1);

    for (let i = 0; i < this.calenderCount + 2; i++) {
      this.model.pushBackWeeks(this.createWeeksFrom(tmpDate));
      tmpDate.setMonth(tmpDate.getMonth() + 1)
    }
  }

  insertViewBefore(el) { 
    this.views.forEach(view => this.parentEl.insertBefore(view.targetEl, el));
  }

  changeToPrevMonth() {
    const weeks = this.createWeeksFrom(new Date(this.model.date.getFullYear(), this.model.date.getMonth() - this.calenderCount));
    this.model.pushFrontWeeks(weeks);
    this.model.popBackWeeks();
  }

  changeToNextMonth() {
    const weeks = this.createWeeksFrom(new Date(this.model.date.getFullYear(), this.model.date.getMonth() + this.calenderCount + 1));
    this.model.popFrontWeeks();
    this.model.pushBackWeeks(weeks);
  }

  createWeeksFrom(date) {
    const weeks = [];
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    for (let currDate = firstDate;
        currDate <= lastDate;
        currDate.setDate(currDate.getDate() + 1)) {
          
      if (weeks.length === 0 || currDate.getDay() === 0)
        weeks.push(Array(7).fill(null));

      weeks[weeks.length - 1][currDate.getDay()] = currDate.getDate();
    }

    return weeks;
  }
}

class CalenderView {
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
    this.targetEl.setAttribute('class', 'search-bar-calender');

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

  _createCellElement(data) {
    const cellEl = document.createElement('TD');
    const dataContainerEl = document.createElement('DIV');

    if (data)
      dataContainerEl.innerText = `${data}`;

    cellEl.appendChild(dataContainerEl);
    cellEl.addEventListener('click', this._onCellClick);
    return cellEl;
  }

  _onCellClick(evt) {
    console.log('cellClick!');
  }
}

class CalenderModel {
  constructor(calenderCount, views) {
    this.calenderCount = calenderCount;
    this.views = views;
    this.date;
    this.weeksList = [];
    this.beginDate;
    this.endDate;
  }

  init(date) {
    this.date = new Date(date);
  }

  pushFrontWeeks(weeks) {
    this.date.setMonth(this.date.getMonth() - 1);
    this.weeksList.unshift(weeks);
    this._updateViews()
  }

  popFrontWeeks() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.weeksList.shift();
    this._updateViews()
  }

  pushBackWeeks(weeks) { 
    this.weeksList.push(weeks);

    if (this.weeksList.length >= 2 && this.weeksList.length <= this.calenderCount + 1)
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
    for (let i = 0; i < this.calenderCount; i++)
      this._updateView(i);
  }

  _updateView(viewIdx) {
    const tmpDate = new Date(this.date.getFullYear(), this.date.getMonth() + viewIdx);
    this.views[viewIdx].updateWeeks(this.weeksList[viewIdx + 1]);
    this.views[viewIdx].updateYearMonth(tmpDate.getFullYear(), tmpDate.getMonth() + 1);
  }
}