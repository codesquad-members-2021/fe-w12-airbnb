class Calendar {
  constructor(target = null, date = new Date(), startTarget, endTarget) {
    this.initDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.date = date;
    if(target) {
      this.target = target;
      this.render();
    }
    this.target.addEventListener('click', ({ target }) => this.selectDate(target));
    this.startDate = null;
    this.startDateTarget = startTarget;
    this.endDate = null;
    this.endDateTarget = endTarget;
  }
  render() {
    let tmpStart = null;
    let tmpEnd = null;
    if(this.startDate) {
      tmpStart = this.startDate.dataset.date;
    }
    if(this.endDate) {
      tmpEnd = this.endDate.dataset.date;
    }
    const nowDate = new Date();
    this.target.innerHTML = '';
    for(let i = 0; i < 2; i++) {
      const tmpDate = new Date(this.date);
      const date = new Date(tmpDate.setMonth(tmpDate.getMonth() + i));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const startWeek = this.getStartWeek(date);
      const lastDay = this.getLastDay(date);
      let dateBlocks = [];
      if(startWeek) {
        dateBlocks = new Array(startWeek).fill('');
      }
      const calendarLabel = `<div class="js-calendar__label"><p>${year}년 ${month}월<p></div>`;
      const calendarHead = ['일', '월', '화', '수', '목', '금', '토'].reduce((acc, v) => acc += `<div class="js-calendar__head__block">${v}</div>`, '<div class="js-calendar__head">') + '</div>';
      dateBlocks = dateBlocks.concat(new Array(lastDay).fill(1).map((v, i) => v + i));
      const calendarBody = dateBlocks.reduce((acc, v, i) => {
        let prefix = '';
        let suffix = '';
        if(i % 7 === 0) {
          prefix = '<div class="js-calendar__line">';
        } else if(i % 7 === 6 || i + 1 === dateBlocks.length) {
          suffix = '</div>';
        }
        const blockDate = new Date(year + '-' + month + '-' + v);
        const blockClass = (nowDate.getMonth() + 1 === month && nowDate.getDate() > v) || v === '' ? 'previous-days' : 'able';
        return acc += `${prefix} <div class="${blockClass} ${blockDate == tmpStart ? 'start-date' : blockDate == tmpEnd ? 'end-date' : ''}" data-date="${blockDate}">${v}</div> ${suffix}`
      }, '<div class="js-calendar__body">') + '</div>';
      const calendarWrap = '<div class="js-calendar__wrap">' + calendarLabel + calendarHead + calendarBody + '</div>';
      this.target.innerHTML += calendarWrap;
    }
    const leftArrow = document.createElement('div');
    leftArrow.classList = 'js-calendar__arrow arrow-left';
    leftArrow.textContent = '\<';
    const rightArrow = document.createElement('div');
    rightArrow.textContent = '\>';
    rightArrow.classList = 'js-calendar__arrow arrow-right';
    this.target.append(leftArrow);
    this.target.append(rightArrow);
    leftArrow.addEventListener('click', () => { 
      if(this.date.getMonth() === 0) {
        this.date.setMonth(11);
        this.date.setFullYear(this.date.getFullYear() - 1);
      } else {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      this.render();
    });
    rightArrow.addEventListener('click', () => {
      if(this.date.getMonth() === 11) {
        this.date.setMonth(0);
        this.date.setFullYear(this.date.getFullYear() + 1);
      } else {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      this.render();
    });
    if(tmpStart) {
      this.startDate.classList.add('start-date');
      if(this.endDate) {
        this.endDate.classList.add('end-date');
        this.createPeriod();
      }
    }
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
  selectDate(target) {
    if(target.classList.contains('able') && target.textContent !== '') {
      const tmpDate = new Date(target.dataset.date);
      if(!this.startDate) {
        this.startDate = target;
        target.classList.add('start-date');
        this.startDateTarget.value = `${tmpDate.getMonth() + 1}월 ${tmpDate.getDate()}일`;
        return;
      }
      if(new Date(this.startDate.dataset.date) >= tmpDate) {
        this.removeSelect('start');
        this.startDate = target;
        target.classList.add('start-date');
        this.startDateTarget.value = `${tmpDate.getMonth() + 1}월 ${tmpDate.getDate()}일`;
        return;
      }
      if(this.endDate) {
        this.removeSelect('end');
      }
      this.endDate = target;
      target.classList.add('end-date');
      this.endDateTarget.value = `${tmpDate.getMonth() + 1}월 ${tmpDate.getDate()}일`;
      this.createPeriod();
    }
  }
  removeSelect(type) {
    if(type === 'start') {
      this.startDate.classList.remove('start-date');
    } else {
      this.endDate.classList.remove('end-date');
    }
  }
  createPeriod() {
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
}

module.exports = Calendar;