export class CalenderController {
  constructor(parentEl, ...triggerEls) {
    this.parentEl = parentEl;
    this.view = new CalenderView(this, parentEl, triggerEls);
    this.model = new CalenderModel(this.view);
  }

  init() {
    this.view.init();
  }

  insertViewBefore(el) { this.parentEl.insertBefore(this.view.targetEl, el); }

  changeToPrevMonth() {
    this.model.date = new Date(this.model.date.getFullYear(), this.model.date.getMonth() - 1);
    this.changeWeeksTo(this.model.date);
  }

  changeToNextMonth() {
    this.model.date = new Date(this.model.date.getFullYear(), this.model.date.getMonth() + 1);
    this.changeWeeksTo(this.model.date);
  }
  
  changeYearMonthTo(date) {
    this.model.date = new Date(date);
    this.changeWeeksTo(date);
  }

  changeWeeksTo(date) {
    const weeks = [];
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    for (let currDate = firstDate, currWeek = -1;
        currDate <= lastDate;
        currDate.setDate(currDate.getDate() + 1)) {
          
      if (weeks.length === 0 || currDate.getDay() === 0) {
        weeks.push(Array(7).fill(null));
        currWeek++;
      }

      weeks[currWeek][currDate.getDay()] = currDate.getDate();
    }

    this.model.weeks = weeks;
  }
}

class CalenderView {
  constructor(controller, ...triggerEls) {
    this.controller = controller;
    this.triggerEls = triggerEls;
    this.targetEl;
  }

  init() {
    this._createElement();
  }

  onEvents() {
    this.triggerEls.forEach(el => el.addEventListener('click', this._onClick));
  }

  updateYearMonth(year, month) {
    this.targetEl.firstElementChild.innerHTML = `${year}년 ${month}월`;
  }
  
  updateWeeks(weeks) {
    this.targetEl.lastElementChild.lastElementChild.innerHTML = '';

    weeks.forEach(week => {
      const rowEl = document.createElement('TR');
      let rowHTML = '';

      week.forEach(date => date ? rowHTML += `<td>${date}</td>` : rowHTML += `<td></td>`);

      rowEl.innerHTML = rowHTML;

      this.targetEl.lastElementChild.lastElementChild.appendChild(rowEl);
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

  _onClick(evt) {
    
  }
}

class CalenderModel {
  constructor(view) {
    this.view = view;
  }

  get weeks() { return this._weeks;}

  set weeks(newWeeks) {
    this.view.updateWeeks(newWeeks);
    this._weeks = newWeeks;
  }

  get date() { return this._date; }

  set date(newDate) {
    this.view.updateYearMonth(newDate.getFullYear(), newDate.getMonth() + 1);
    this._date = newDate;
  }
}