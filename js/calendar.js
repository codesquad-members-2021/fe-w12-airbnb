class Calendar {
  constructor(target = null, date = new Date(), startTarget = null, endTarget = null) {
    this.initDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.startDate = null;
    this.endDate = null;
    this.target = target;
    this.date = date;
    this.startDateTarget = startTarget;
    this.endDateTarget = endTarget;
  }
  
  setTarget(target) {
    this.target = target;
  }

  setStartDateTarget(target) {
    this.startDateTarget = target;
  }

  setEndDateTarget(target) {
    this.endDateTarget = target;
  }

  setDate(date) {
    this.date = date;
    if(!this.target) return;
    this.render();
  }

  init() {
    if(!this.target) return;
    this.render();
    this.target.addEventListener('click', ({ target }) => this.handleSelect(target));
  }

  render() {
    if(!this.target) return;
    this.renderCalendar();
  }

  renderCalendar() {
    if(!this.target) return;
    this.target.innerHTML = '';
    for(let i = 0; i < 2; i++) {
      const tmpDate = new Date(this.date);
      const date = new Date(tmpDate.setMonth(tmpDate.getMonth() + i));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const startWeek = this.getStartWeek(date);
      const lastDay = this.getLastDay(date);
      const calendarLabel = this.createCalendarLabel(year, month);
      const calendarHead = this.createCalendarHead();
      const dateBlocks = this.createDateBlocks(lastDay, startWeek);
      const calendarBody = this.createCalendarBody(dateBlocks, year, month);
      const calendarWrap = this.createCalendarWrap(calendarLabel, calendarHead, calendarBody);
      this.target.innerHTML += calendarWrap;
    }
    this.renderCalendarArrow();
    this.startDate = document.querySelector('.start-date');
    this.endDate = document.querySelector('.end-date');
    this.handlePeriod();
  }

  createCalendarLabel(year = 0, month = 0) {
    return `<div class="js-calendar__label"><p>${year}년 ${month}월<p></div>`;
  }

  createCalendarHead() {
    return ['일', '월', '화', '수', '목', '금', '토'].reduce((acc, v) => acc += `<div class="js-calendar__head__block">${v}</div>`, '<div class="js-calendar__head">') + '</div>';
  }

  createDateBlocks(lastDay = 30, startWeek = 0) {
    return new Array(startWeek).fill('').concat(new Array(lastDay).fill(1).map((v, i) => v + i));
  }

  createCalendarBody(dateBlocks = [], year, month) {
    if(dateBlocks.length === 0 || !year || !month) return;
    const nowDate = new Date();
    let tmpStart = null;
    let tmpEnd = null;
    if(this.startDate) {
      tmpStart = this.startDate.dataset.date;
    }
    if(this.endDate) {
      tmpEnd = this.endDate.dataset.date;
    }
    return dateBlocks.reduce((acc, v, i) => {
      let prefix = '';
      let suffix = '';
      if(i % 7 === 0) {
        prefix = '<div class="js-calendar__line">';
      } else if(i % 7 === 6 || i + 1 === dateBlocks.length) {
        suffix = '</div>';
      }
      const blockDate = new Date(year + '-' + month + '-' + v);
      const blockClass = [];
      blockClass.push(nowDate.getDate() > v || v === '' ? 'previous-days' : 'able');
      blockClass.push(blockDate == tmpStart ? 'start-date' : blockDate == tmpEnd ? 'end-date' : '');
      return acc += `${prefix} <div class="${blockClass.join(' ')}" data-date="${blockDate}">${v}</div> ${suffix}`
    }, '<div class="js-calendar__body">') + '</div>';
  }

  createCalendarWrap(calendarLabel, calendarHead, calendarBody) {
    return '<div class="js-calendar__wrap">' + calendarLabel + calendarHead + calendarBody + '</div>';
  }

  renderCalendarArrow() {
    if(!this.target || !this.date) return;
    const prevDate = new Date(new Date(this.date).setDate(0));
    const leftArrow = document.createElement('div');
    leftArrow.classList = 'js-calendar__arrow arrow-left';
    leftArrow.textContent = '\<';
    const rightArrow = document.createElement('div');
    rightArrow.textContent = '\>';
    rightArrow.classList = 'js-calendar__arrow arrow-right';
    this.target.append(leftArrow);
    this.target.append(rightArrow);
    if(prevDate < new Date()) {
      leftArrow.classList.add('not-used');
    } else {
      leftArrow.addEventListener('click', () => this.handleMonth(-1));
    }
    rightArrow.addEventListener('click', () => this.handleMonth(1));
  }

  handleMonth(number) {
    if(!number || (number !== -1 && number !== 1)) return;
    let month = this.date.getMonth() + number;
    if(month < 0) {
      month = 11;
      this.date.setFullYear(this.date.getFullYear() - 1);
    }
    if(month > 11) {
      month = 0;
      this.date.setFullYear(this.date.getFullYear() + 1);
    }
    this.date.setMonth(month);
    this.render();
  }

  getStartWeek(date) {
    const tmp = new Date(date);
    tmp.setDate(1);
    return tmp.getDay();
  }

  getLastDay(date) {
    let lastDay = this.initDate[date.getMonth()];
    if(date.getMonth() === 1) {
      const year = date.getFullYear();
      lastDay += !(year % 400) || (year % 100 && !(year % 4)) ? 1 : 0;
    }
    return lastDay;
  }

  handleSelect(target) {
    if(!target) return;
    if(!target.classList.contains('able') || target.textContent === '') return;
    this.removeSelectDateClass();
    const tmpDate = new Date(target.dataset.date);
    if(!this.startDate || this.endDate) {
      this.startDate = target;
      this.endDate = null;
    } else {
      this.endDate = target;
    }
    this.createSelectDateClass();
    this.handlePeriod();
  }

  createSelectDateClass() {
    if(this.startDate){
      const targetDate = new Date(this.startDate.dataset.date);
      this.startDate.classList.add('start-date');
      this.startDateTarget.value = `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;
    }
    if(this.endDate) {
      const targetDate = new Date(this.endDate.dataset.date);
      this.endDate.classList.add('end-date');
      this.endDateTarget.value = `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;
    }
  }

  removeSelectDateClass() {
    if(this.startDate) {
      this.startDate.classList.remove('start-date');
    }
    if(this.endDate) {
      this.endDate.classList.remove('end-date');
    }
  }
  handlePeriod() {
    if(!this.startDate) return;
    if(this.endDate) {
      this.createPeriodClass();
    } else {
      this.removePeriodClass();
    }
  }

  createPeriodClass() {
    if(!this.startDate || !this.endDate) return;
    const startDate = new Date(this.startDate.dataset.date);
    const endDate   = new Date(this.endDate.dataset.date);
    const target    = document.querySelectorAll('.js-calendar__line div:not(.previous-days)');
    target.forEach(v => {
      const tmpDate = new Date(v.dataset.date);
      if(tmpDate < startDate || tmpDate > endDate) {
        v.classList.remove('period');
      } else {
        v.classList.add('period');
      }
    });
  }

  removePeriodClass() {
    if(!this.target) return;
    const target = document.querySelectorAll('.js-calendar__line div:not(.previous-days)');
    target.forEach(v => {
      v.classList.remove('period');
    });
  }
}

module.exports = Calendar;