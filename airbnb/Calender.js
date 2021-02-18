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
  dateToShowArray = [];
  dateClickCheck = true;
  constructor(model, $fullDate, $startDate, $endDate, $searchInputBox) {
    this.model = model;
    this.$fullDate = $fullDate;
    this.$startDate = $startDate;
    this.$endDate = $endDate;
    this.$searchInputBox = $searchInputBox;
    this.$fullDateInput = $fullDate.querySelector('input');
    this.$startDateInput = $fullDate.querySelector('input');
    this.$endDateInput = $fullDate.querySelector('input');
    this.makeTemplate(model, model.getToday());
    document.querySelector('.calender_box').classList.add('display_none');
  }

  initEvent() {
    this.$fullDate.addEventListener('click', this.toggleButtonHandler.bind(this));
    document.addEventListener('click', (event) => {
      this.trClickPutDataHandler(event); //순차적으로 실행하기 위해..
      this.trClickColorHandler();
    });
    document.addEventListener('click', (event) => {
      this.leftButtonHandler(event);
      this.trClickColorHandler();
    });
    document.addEventListener('click', (event) => {
      this.rightButtonHandler(event);
      this.trClickColorHandler();
    });
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

  makeTemplate(model, date) {
    this.$searchInputBox.insertAdjacentHTML('beforeend', this.dateTemplate(model, date));
  }

  toggleButtonHandler() {
    document.querySelector('.calender_box').classList.toggle('display_none');
  }

  trClickColorHandler() {
    const calenderTables = document.querySelectorAll('.calender_box__inside_box');
    calenderTables.forEach((table, i) => {
      if (i === 0) return;
      const year = table.querySelector('tr:nth-child(1)>th').innerText.slice(0, 4);
      const month = table.querySelector('tr:nth-child(1)>th').innerText.slice(6, -1);
      table.querySelectorAll('tr:nth-child(n+3) td').forEach(td => {
        const day = td.innerText;
        const monthNumber = this.formatNumbersLessThan10(month);
        const dayNumber = this.formatNumbersLessThan10(day);
        td.classList.remove('gray-background');
        const selectedDateCheck = this.dateToShowArray.includes(`${year}.${month}.${day}`);
        const clickedClassName = 'calender_box__table__td-clicked';
        selectedDateCheck ? td.classList.add(clickedClassName) : td.classList.remove(clickedClassName);

        if (this.dateToShowArray.length === 2 && td.innerText) {
          const currentDate = `${year}${monthNumber}${dayNumber}`;
          const startDate = this.dateToShowArray[0].split('.').map(this.formatNumbersLessThan10).join('');
          const endDate = this.dateToShowArray[1].split('.').map(this.formatNumbersLessThan10).join('');
          console.log(startDate)
          console.warn(endDate)
          if (currentDate > startDate && currentDate < endDate) td.classList.add('gray-background');
        };
      });
    })
  }

  trClickPutDataHandler({ target }) {
    if (!(target.innerText > 0)) return;
    const year = target.closest('tbody').querySelector('th').innerText.slice(0, 4);
    const month = target.closest('tbody').querySelector('th').innerText.slice(6, -1);
    const day = target.innerText;
    this.dateToShowArray.push(`${year}.${month}.${day}`);
    this.changeDateArrayFromMoreClick();
    this.dateToShowArray = this.sortDateArray(this.dateToShowArray);
    const inputDateValue = this.formatDateArrayToString(this.dateToShowArray);
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

  changeDateArrayFromMoreClick() { //날짜를 3번이상 클릭했을 때 배열에 2개로 거르기
    if (this.dateToShowArray.length === 3) {
      const newDate = this.dateToShowArray.splice(2, 1).join('');
      this.dateClickCheck ? this.dateToShowArray[0] = newDate : this.dateToShowArray[1] = newDate;
      this.dateClickCheck = !this.dateClickCheck;
    }
  }

  sortDateArray(dateArray) {
    return [...dateArray].sort((a, b) => {
      const [aYear, aMonth, aDay] = a.split('.');
      const [bYear, bMonth, bDay] = b.split('.');
      return aYear - bYear || aMonth - bMonth || aDay - bDay;
    });
  }

  formatDateArrayToString(dateArray) {
    return dateArray.map(dateWord => {
      const [year, month, day] = dateWord.split('.');
      return `${year}년 ${month}월 ${day}일`;
    }).join(' - ');
  }


  formatNumbersLessThan10(number) {
    return number < 10 ? '0' + number : number;
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