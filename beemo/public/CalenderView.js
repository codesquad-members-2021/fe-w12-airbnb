const _ = require('./util.js');

class CalenderView {
  constructor({ calenderModel, $fullDate, $startDate, $endDate, $searchInputBox }) {
    this.model = calenderModel;
    this.$fullDate = $fullDate;
    this.$startDate = $startDate;
    this.$endDate = $endDate;
    this.$searchInputBox = $searchInputBox;
    this.$fullDateInput = _.$('input', $fullDate);
    this.$startDateInput = _.$('input', $startDate);
    this.$endDateInput = _.$('input', $endDate);
    this.makeTemplate(calenderModel, calenderModel.getToday());
    _.$('.calender_box').classList.add("display_none");
    this.initEvent();
  }

  initEvent() {
    this.$fullDate.addEventListener('click', this.toggleButtonHandler.bind(this));
    this.$startDate.addEventListener('click', this.toggleButtonHandler.bind(this));
    this.$endDate.addEventListener('click', this.toggleButtonHandler.bind(this));
    document.addEventListener('click', this.hideCalenderHandler.bind(this));
    document.addEventListener('click', (event) => {
      this.trClickPutDataHandler(event); //순차적으로 실행하기 위해..
      this.tableClickColorHandler();
    });
    document.addEventListener('click', (event) => {
      this.leftButtonHandler(event);
      this.tableClickColorHandler();
    });
    document.addEventListener('click', (event) => {
      this.rightButtonHandler(event);
      this.tableClickColorHandler();
    });
  }



  makeTemplate(model, date) {
    this.$searchInputBox.insertAdjacentHTML('beforeend', this.dateTemplate(model, date));
  }

  toggleButtonHandler() {
    _.$('.calender_box').classList.toggle('display_none');
  }

  tableClickColorHandler() {
    const calenderTables = _.$All('.calender_box__inside_box');
    calenderTables.forEach((table, i) => {
      if (i === 0) return;
      const year = _.$('tr:nth-child(1)>th', table).innerText.slice(0, 4);
      const month = _.$('tr:nth-child(1)>th', table).innerText.slice(6, -1);
      _.$All('tr:nth-child(n+3) td', table).forEach(td => {
        td.classList.remove('gray-background');
        const day = td.innerText;
        const selectedDateCheck = this.model.getDatesArray().includes(`${year}.${month}.${day}`);
        const clickedClassName = 'calender_box__table__td-clicked';
        selectedDateCheck ? td.classList.add(clickedClassName) : td.classList.remove(clickedClassName);

        const monthNumber = this.formatNumbersLessThan10(month);
        const dayNumber = this.formatNumbersLessThan10(day);
        if (this.model.getDatesArray().length === 2 && td.innerText) {
          const currentDate = `${year}${monthNumber}${dayNumber}`;
          const startDate = this.model.getDatesArray()[0].split('.').map(this.formatNumbersLessThan10).join('');
          const endDate = this.model.getDatesArray()[1].split('.').map(this.formatNumbersLessThan10).join('');
          if (currentDate > startDate && currentDate < endDate) td.classList.add('gray-background');
        }
      });
    })
  }

  trClickPutDataHandler({ target }) {
    if (!(target.innerText > 0) || target.classList.contains('calender_box__table__past_date')) return;
    const year = target.closest('tbody').querySelector('th').innerText.slice(0, 4);
    const month = target.closest('tbody').querySelector('th').innerText.slice(6, -1);
    const day = target.innerText;
    this.model.addDatesArray(`${year}.${month}.${day}`);
    this.model.changeDatesArrayFromMoreData();
    this.model.sortDateArray();
    const inputDateValue = this.model.formatDateArrayToString();
    const [startDate, endDate] = inputDateValue.split(' - ');
    this.$startDateInput.value = startDate;
    this.$endDateInput.value = endDate;
    console.log(startDate)
    console.warn(this.$startDateInput)
    console.log(endDate)
    console.warn(this.$endDateInput)
    this.$fullDateInput.value = inputDateValue;
  }

  leftButtonHandler({ target }) {
    if (target.closest('.calender_box--left_button')) {
      this.makeTemplate(this.model, this.model.getPrevMonthDate(this.model.getToday()));
      target.closest('.calender_box').remove();
    }
  }

  rightButtonHandler({ target }) {
    if (target.closest('.calender_box--right_button')) {
      this.makeTemplate(this.model, this.model.getNextMonthDate(this.model.getToday()));
      target.closest('.calender_box').remove();
    }
  }

  formatNumbersLessThan10(number) {
    return number < 10 ? '0' + number : number;
  }

  hideCalenderHandler({ target }) {
    if (target.closest('.calender_box')) return;
    const isStartDate = !!target.closest(`.${this.$startDate.className}`);
    const isEndDate = !!target.closest(`.${this.$endDate.className}`);
    const isFullDate = !!target.closest(`.${this.$fullDate.className}`);
    if (!(isStartDate || isEndDate || isFullDate)) {
      _.$('.calender_box').classList.add('display_none');
    }
  }

  dateTemplate(model, date) {
    const lastDate = model.getLastDate(date);
    const firstDay = model.getFirstDay(date);
    let dayCount = 0;
    const firstLine = `<tr class="calender_box__table__tr">
    ${Array.from({ length: 7 }, (_, i) => i >= firstDay ? ++dayCount : '')
        .reduce((acc, cur) => {
          const checkPastDate = new Date(date.getFullYear(), date.getMonth(), cur + 1).getTime() < model.getToday().getTime();
          return acc + `<td class="${checkPastDate ? 'calender_box__table__past_date' : ''}">${cur}</td>`
        }, '')}
      </tr>`;

    let nextLine = '';
    while (dayCount < lastDate) {
      nextLine += `<tr class="calender_box__table__tr">
      ${Array.from({ length: 7 }, () => ++dayCount <= lastDate ? dayCount : '')
          .reduce((acc, cur) => {
            const checkPastDate = new Date(date.getFullYear(), date.getMonth(), cur + 1).getTime() < model.getToday().getTime();
            return acc + `<td class="${checkPastDate ? 'calender_box__table__past_date' : ''}">${cur}</td>`
          }, '')}
        </tr>`;
    }

    return `<div class="calender_box font14">
              <div class="width50per border-radius32 text_center calender_box__inside_box">
              </div>
              <div class="width50per white_background border-radius32 text_center calender_box__inside_box">
              <button class="calender_box--left_button"><img src="./images/leftCalenderButton.svg" alt="" style="width:10px;"></button>
              <button class="calender_box--right_button"><img src="./images/rightCalenderButton.svg" alt="" style="width:10px;"></button>
                <table class="calender_box__table">
                  <tr class="font16">
                    <th class="calender_box__inside_box--month" colspan="7">${model.getYearAndMonth(date)}</th>
                  </tr>
                  <tr class="font12 font_gray">
                    <td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td>
                  </tr>
                  ${firstLine}
                  ${nextLine}
                  </table>
              </div>  
            </div>`;
  }
}

module.exports = CalenderView;