class CalenderModel {
  currentDate = new Date();
  monthIndex = 0;

  getToday() {
    return this.currentDate;
  }

  getPrevMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + --this.monthIndex, 1);
  }

  getNextMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + ++this.monthIndex, 1);
  }

  getLastDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getFirstDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  getYearAndMonth(date) {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  }
}

class CalenderView {
  constructor(model, $fullDate, $startDate, $endDate, $searchInputBox) {
    this.model = model;
    this.$fullDate = $fullDate;
    this.$startDate = $startDate;
    this.$endDate = $endDate;
    this.$searchInputBox = $searchInputBox;
    this.makeTemplate();
    document.querySelector('.calender_box').classList.add('display_none');
  }

  initEvent() {
    this.$fullDate.addEventListener('click', this.toggleButtonHandler.bind(this));
    document.addEventListener('click', this.trClickColorHandler.bind(this));
    document.addEventListener('click', this.leftButtonHandler.bind(this));
    document.addEventListener('click', this.rightButtonHandler.bind(this));
  }

  dateTemplate(model, date) {
    const lastDate = model.getLastDate(date);
    const firstDay = model.getFirstDay(date);
    let dayCount = 0;
    const firstLine = `<tr class="calender_box__table__tr">
    ${Array.from({ length: 7 }, (_, i) => i >= firstDay ? ++dayCount : '')
        .reduce((acc, cur) => acc + `<td>${cur}</td>`, '')}
      </tr>`;

    let nextLine = '';
    while (dayCount < lastDate) {
      nextLine += `<tr class="calender_box__table__tr">
      ${Array.from({ length: 7 }, () => ++dayCount <= lastDate ? dayCount : '')
          .reduce((acc, cur) => acc + `<td>${cur}</td>`, '')}
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

  makeTemplate() {
    this.$searchInputBox.insertAdjacentHTML('beforeend', this.dateTemplate(this.model, this.model.getToday()));
  }

  toggleButtonHandler() {
    document.querySelector('.calender_box').classList.toggle('display_none');
  }

  trClickColorHandler({ target }) {
    if (target.parentElement.className === 'calender_box__table__tr' && target.innerText) {
      target.classList.toggle('calender_box__table__td-clicked');
    }
  }

  leftButtonHandler({ target }) {
    if (target.closest('.calender_box--left_button')) {
      this.$searchInputBox.insertAdjacentHTML('beforeend', this.dateTemplate(this.model, this.model.getPrevMonthDate(this.model.getToday())));
      target.closest('.calender_box').remove();
    }
  }

  rightButtonHandler({ target }) {
    if (target.closest('.calender_box--right_button')) {
      this.$searchInputBox.insertAdjacentHTML('beforeend', this.dateTemplate(this.model, this.model.getNextMonthDate(this.model.getToday())));
      target.closest('.calender_box').remove();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const $fullDate = document.querySelector('.search_input__full_date');
  const $startDate = document.querySelector('.search_input__start_date');
  const $endDate = document.querySelector('.search_input__end_date');
  const $searchInputBox = document.querySelector('.search_input_box');

  const calendarModel = new CalenderModel();
  const calendarView = new CalenderView(calendarModel, $fullDate, $startDate, $endDate, $searchInputBox);
  calendarView.initEvent();
})