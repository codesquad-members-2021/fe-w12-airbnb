export class CalendarController {
  constructor(parentEl, calendarCount, date) {
    this.parentEl = parentEl;
    this.calendarCount = calendarCount;
    this.views = [];
    this.model = new CalendarModel(this.calendarCount, this.views, date);
    this.pickMode;
    this.eventHandlers = new Map([
      ['pickbegin', []],
      ['pickend', []],
      ['pickcomplete', []]
    ]);
  }

  init() {
    this._initView();
    this._initModel();
  }

  isShown() { return !this.views[0].targetEl.hidden; }
  isPickedBeginDate() { return this.model.isPickedBeginDate(); }
  isPickedEndDate() { return this.model.isPickedEndDate(); }
  isPickComplete() { return this.model.isPickComplete(); }

  registerCustomEventHandler(eventName, eventHandler) {
    if (eventName !== 'pickbegin' && eventName !== 'pickend')
      throw new Error(`Unsupported event: ${eventName}`);

    this.eventHandlers.get(eventName).push(eventHandler);
  }

  setPickMode(pickMode) {
    if (pickMode !== 'beginPick' && pickMode !== 'endPick')
      throw new Error(`Unsupported pick mode: ${pickMode}`);

    this.pickMode = pickMode;
  }

  datePick({ target, rawDate }) {
    const _executeCustomEventHandlersFor = (eventName, date = null) => {
      this.eventHandlers.get(eventName).forEach(handler => handler(date));
    };

    switch (this.pickMode) {
      case 'beginPick': {
        if (!this.model.beginDate) {
          if (rawDate > this.model.endDate) {
            this.model.unsetEndDate();
            this.model.setBeginDate(target, new Date(rawDate));
            _executeCustomEventHandlersFor('pickbegin', new Date(rawDate));
            // TODO: execute 'pickcomplete' handler..

            return;
          }

          this.model.setBeginDate(target, new Date(rawDate));
          _executeCustomEventHandlersFor('pickbegin', new Date(rawDate));

          return;
        }
      }
      
      case 'endPick': {
        if (!this.model.endDate) {
          if (this.model.beginDate && rawDate < this.model.beginDate.valueOf()) {
            this.model.unsetBeginDate();
            this.model.unsetEndDate();
            this.model.setBeginDate(target, new Date(rawDate));
            _executeCustomEventHandlersFor('pickbegin', new Date(rawDate));

            return;
          }

          this.model.setEndDate(target, new Date(rawDate));
          _executeCustomEventHandlersFor('pickend', new Date(rawDate));

          return;
        } else {
          if (rawDate > this.model.beginDate.valueOf() && rawDate < this.model.endDate.valueOf()) {
            this.model.unsetEndDate();
            this.model.setEndDate(target, new Date(rawDate));
            _executeCustomEventHandlersFor('pickend', new Date(rawDate));

            return;
          }

          if (rawDate < this.model.beginDate.valueOf()) {
            this.model.unsetBeginDate();
            this.model.unsetEndDate();
            this.model.setBeginDate(target, new Date(rawDate));
            _executeCustomEventHandlersFor('pickbegin', new Date(rawDate));

            return;
          }

          if (rawDate < this.model.beginDate.valueOf()) {
            this.model.unsetEndDate();
            this.model.setBeginDate(target, new Date(rawDate));
            _executeCustomEventHandlersFor('pickbegin', new Date(rawDate));

            return;
          }

          this.model.unsetEndDate();
          this.model.setEndDate(target, new Date(rawDate));
          _executeCustomEventHandlersFor('pickend', new Date(rawDate));

          return;
        }
      }

      default:
        throw new Error('Not reached!');
    }
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

    for (let currDate = firstDate; currDate <= lastDate; currDate.setDate(currDate.getDate() + 1)) {
      if (weeks.length === 0 || currDate.getDay() === 0)
        weeks.push(Array(7).fill(null));

      weeks[weeks.length - 1][currDate.getDay()] = new Date(date.getFullYear(), date.getMonth(), currDate.getDate(), 0, 0, 0, 0);
    }

    return weeks;
  }
}

class CalendarView {
  static GivePickEffectTo(cellEl) { cellEl.firstElementChild.classList.add('picked'); }
  static EliminatePickEffectTo(cellEl) { cellEl.firstElementChild.classList.remove('picked'); }

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

  updateWeeks(weeks, todayDate) {
    const tbody = this.targetEl.querySelector('tbody');
    tbody.innerHTML = '';

    weeks.forEach(week => {
      const rowEl = document.createElement('TR');

      week.forEach(date => {
        rowEl.appendChild(this._createCellElement(date, { isValid: date && (date.valueOf() >= todayDate.valueOf()) }))
      });

      tbody.appendChild(rowEl);
    });
  }

  updatePickedRange(from, to) { // FIXME
    const cellEls = this.targetEl.querySelectorAll(`td`);

    cellEls.forEach((cellEl, currIdx) => {
      if (!cellEl.firstElementChild.classList.contains('pointable'));
      else if (currIdx > from && currIdx < to) cellEl.classList.add('picked-range');
      else if (currIdx === from && currIdx === to);
      else if (currIdx === from) cellEl.classList.add('picked-range-begin');
      else if (currIdx === to) cellEl.classList.add('picked-range-end');
    });
  }

  resetPickedRange(from, to) { // FIXME
    const cellEls = document.querySelectorAll(`td`);
    
    cellEls.forEach((cellEl, currIdx) => {
      // if (!cellEl.firstElementChild.classList.contains('pointable'));
      // else if (currIdx > from && currIdx < to) cellEl.classList.remove('picked-range');
      // else if (currIdx === from && currIdx === to);
      // else if (currIdx === from) cellEl.classList.remove('picked-range-begin');
      // else if (currIdx === to) cellEl.classList.remove('picked-range-end');

      if (cellEl.classList.contains('picked-range')) cellEl.classList.remove('picked-range');
      if (cellEl.classList.contains('picked-range-begin')) cellEl.classList.remove('picked-range-begin');
      if (cellEl.classList.contains('picked-range-end')) cellEl.classList.remove('picked-range-end');
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

  _createCellElement(date, { isValid }) {
    const cellEl = document.createElement('TD');
    const dateEl = document.createElement('DIV');

    if (date) {
      cellEl.setAttribute('data-text', `${date.valueOf()}`);

      if (isValid) {
        dateEl.classList.add('solid-rounded');
        dateEl.classList.add('pointable');
      } else {
        dateEl.classList.add('none-pointable');
      }

      dateEl.innerText = `${date.getDate()}`;
    }

    cellEl.appendChild(dateEl);
    cellEl.addEventListener('click', this._onCellClick.bind(this), true);
    return cellEl;
  }

  _onCellClick({ currentTarget: cellEl }) {
    this.controller.datePick({
      target: cellEl,
      rawDate: Number(cellEl.dataset.text)
    });
  }
}

class CalendarModel {
  /*
    COMMANT:
    As I have thought of these..,
    It seems that the properties for HTML Element should be moved to 'CalendarView'.
  */
  constructor(calendarCount, views, date) {
    this.calendarCount = calendarCount;
    this.views = views;
    this.currDate = date;
    this.todayDate = new Date(date);
    this.weeksList = [];
    this.beginDate;
    this.endDate;
    this.beginCellEl;
    this.endCellEl;

    this.beginViewIdx;
    this.endViewIdx;
    this.beginCellIdx;
    this.endCellIdx;
  }

  isPickedBeginDate() { return Boolean(this.beginDate); }
  isPickedEndDate() { return Boolean(this.endDate); }
  isPickComplete() { return this.isPickedBeginDate() && this.isPickedEndDate(); }

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

  setBeginDate(cellEl, date) {
    CalendarView.GivePickEffectTo(cellEl);

    this.beginCellEl = cellEl;
    this.beginDate = date;

    if (this.isPickComplete())
      this._updatePickedRange();
  }

  unsetBeginDate() {
    if (this.beginCellEl !== this.endCellEl)
      CalendarView.EliminatePickEffectTo(this.beginCellEl);

    if (this.isPickComplete())
      this._resetPickedRange();
    
    this.beginCellEl = null;
    this.beginDate = null;
  }

  setEndDate(cellEl, date) {
    CalendarView.GivePickEffectTo(cellEl);

    this.endCellEl = cellEl;
    this.endDate = date;

    if (this.isPickComplete())
      this._updatePickedRange();
  }

  unsetEndDate() {
    if (this.beginCellEl !== this.endCellEl)
      CalendarView.EliminatePickEffectTo(this.endCellEl);

    if (this.isPickComplete())
      this._resetPickedRange();

    this.endCellEl = null;
    this.endDate = null;
  }

  _updateViews() {
    for (let i = 0; i < this.calendarCount; i++)
      this._updateView(i);
  }

  _updateView(viewIdx) {
    const tmpDate = new Date(this.currDate.getFullYear(), this.currDate.getMonth() + viewIdx);
    this.views[viewIdx].updateWeeks(this.weeksList[viewIdx + 1], this.todayDate);
    this.views[viewIdx].updateYearMonth(tmpDate.getFullYear(), tmpDate.getMonth() + 1);
  }

  _updatePickedRange() {
    this.beginDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);

    const [beginViewIdx, endViewIdx, beginCellIdx, endCellIdx] = this._getIndicesForPickedRange();

    if (beginViewIdx === endViewIdx) {
      this.views[beginViewIdx].updatePickedRange(beginCellIdx, endCellIdx);
    } else {
      this.views[beginViewIdx].updatePickedRange(beginCellIdx, 99999); // FIXME
      this.views[endViewIdx].updatePickedRange(-1, endCellIdx); // FIXME

      for (let viewIdx = beginViewIdx + 1; viewIdx < endViewIdx; viewIdx++)
        this.views[viewIdx].updatePickedRange(-1, 99999); // FIXME
    }
  }

  _resetPickedRange() {
    this.beginDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);

    const [beginViewIdx, endViewIdx, beginCellIdx, endCellIdx] = this._getIndicesForPickedRange();

    if (beginViewIdx === endViewIdx) {
      this.views[beginViewIdx].resetPickedRange(beginCellIdx, endCellIdx);
    } else {
      this.views[beginViewIdx].resetPickedRange(beginCellIdx, 99999); // FIXME
      this.views[endViewIdx].resetPickedRange(-1, endCellIdx); // FIXME

      for (let viewIdx = beginViewIdx + 1; viewIdx < endViewIdx; viewIdx++)
        this.views[viewIdx].resetPickedRange(-1, 99999); // FIXME
    }
  }

  _getIndicesForPickedRange() {
    let beginViewIdx;
    let endViewIdx;
    let beginCellIdx;
    let endCellIdx;

    this.weeksList.some((weeks, weeksIdx) => {
      beginCellIdx = -1;

      return (weeksIdx > 0 && weeksIdx < weeks.length - 2 &&
        weeks.some(week => { 
          return week.some(date => {
            beginCellIdx++;
            return Boolean(date && date.valueOf() === this.beginDate.valueOf());
          });
        }) &&
        ((beginViewIdx = weeksIdx - 1) || true));
    });

    this.weeksList.some((weeks, weeksIdx) => {
      endCellIdx = -1;

      return (weeksIdx > 0 && weeksIdx < weeks.length - 1 &&
        weeks.some(week => { 
          return week.some(date => {
            endCellIdx++;
            return Boolean(date && date.valueOf() === this.endDate.valueOf());
          });
        }) &&
        ((endViewIdx = weeksIdx - 1) || true));
    });

    return [beginViewIdx, endViewIdx, beginCellIdx, endCellIdx];
  }
}