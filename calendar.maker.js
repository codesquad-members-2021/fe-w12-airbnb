import {
   readCalendarJS,
   dateBtn
} from './play.js';
import {
   _
} from './util.js';
import {
   calendarTpl
} from './calendar.tpl.js';
import {
   CalendarCtrl
} from './calendar.ctrl.js';

export class CalendarMaker extends CalendarCtrl {
   constructor(date, calendarArea) {
      super()
      this.date = date;
      this.calendar_area = calendarArea;
      this.month_day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.current_month;
      this.current_year;
      this.next_month;
      this.next_year;
      this.last_month;
      this.last_year;
      this.firstday_curr_month;
      this.lastday_curr_month;
      this.firstday_next_month;
      this.lastday_next_month;
      this.firstday_last_month;
      this.lastday_last_month;

      this.startDay = 0;
      this.spare = 0;
      this.judgement = 0;
      this.week1 = '';
      this.week2 = '';
      this.getDateInfo();
   }

   getDateInfo() {
      this.current_year = this.date.getFullYear(); //당해
      if (this.current_year % 4 === 0) this.month_day_count[1] = 29; //윤년이면 2월 29일 마지막날

      this.current_month = this.date.getMonth() + 1; //당월

      switch (this.current_month) {
         case 12:
            this.next_month = 1;
            this.next_year = this.current_year + 1;
            this.last_month = this.current_month - 1;
            this.last_year = this.current_year;
            break;
         case 1:
            this.last_month = 12;
            this.last_year = this.current_year - 1;
            this.next_month = this.current_month + 1;
            this.next_year = this.current_year;
            break;
         default:
            this.next_month = this.current_month + 1;
            this.last_month = this.current_month - 1;
            this.next_year = this.current_year;
            this.last_year = this.current_year;
      }

      this.firstday_curr_month = new Date(`${this.current_year}-${this.current_month}-01`).getDay(); //당월첫요일(1일이 무슨요일인가)
      this.lastday_curr_month = this.month_day_count[this.current_month - 1]; //당월마지막일자는?(30/31)

      this.firstday_next_month = new Date(`${this.current_year}-${this.current_month}-${this.lastday_curr_month}`).getDay() + 1; //당월 마지막날 +1 요일
      this.lastday_next_month = this.month_day_count[this.next_month - 1]; //당월일자수*30.31

      this.firstday_last_month = new Date(`${this.last_year}-${this.last_month}-01`).getDay() + 1; //지난달의 1일이 무슨요일?
      this.lastday_last_month = this.month_day_count[this.last_month - 1]; //당월일자수*30.31
      this.makeCalendarLayout(calendarTpl(this.current_year, this.current_month, this.next_year, this.next_month));
   }

   makeCalendarLayout(calendarTpl) {
      let calendarBar = document.createElement("div");
      calendarBar.className = "calendar_box";
      calendarBar.innerHTML = calendarTpl;
      this.calendar_area.insertAdjacentElement("afterBegin", calendarBar);

      const prevBtn = _.$('.prev_btn');
      const nextBtn = _.$('.next_btn');

      const btn_p_n = new CalendarCtrl();
      prevBtn.addEventListener("click", btn_p_n.prevBtnEvent.bind(this));
      nextBtn.addEventListener("click", btn_p_n.nextBtnEvent.bind(this));
      this.getDateHTML();
   }

   getDateHTML() {
      for (let i = 0; i < this.lastday_curr_month + this.firstday_curr_month; i++) {
         if (i >= this.firstday_curr_month) {
            this.week1 += `<div>${this.startDay+=1}</div>`;
         } else {
            this.week1 += `<div>&nbsp</div>`;
         }
      }
      this.startDay = 0;

      for (let i = 0; i < this.lastday_next_month + this.firstday_next_month; i++) {
         if (i >= this.firstday_next_month) {
            this.week2 += `<div>${this.startDay+=1}</div>`;
         } else {
            this.week2 += `<div>&nbsp</div>`;
         }
      }
      this.startDay = 0;
      this.insertHTML();
   }

   insertHTML() {
      let section1 = _.$(".calendar_current .calendar_date");
      let section2 = _.$(".calendar_next_month .calendar_date");

      section1.insertAdjacentHTML("afterBegin", this.week1);
      section2.insertAdjacentHTML("afterBegin", this.week2);
      this.blurBeforeToday();
   }

   blurBeforeToday() {
      _.$All(".calendar_date div").forEach(el => {
         let today = new Date();
         let beforeToday = new Date(`${this.targetYearMonth(el)[0]}-${this.targetYearMonth(el)[1]}-${el.innerText}`);

         if ((today - beforeToday >= 0) || el.innerHTML === '&nbsp;') {
            el.classList.add("non_clickable");
         } else {
            el.classList.add("clickable");
            el.addEventListener("click", () => {
               this.clickEventCtrl(el)
            })
         };

         if (beforeToday.getMonth() === today.getMonth() && el.innerText === String(today.getDate())) {
            el.classList.remove("non_clickable")
            el.classList.add("clickable");
            el.addEventListener("click", () => {
               this.clickEventCtrl(el)
            })
         };
      })
      this.closeCalendar();
   }

   targetYearMonth(el) {
      let year_month = _.$All('span', el.closest('.calendar_d_d').previousElementSibling);
      year_month = [...year_month].map(e => {
         let arr = e.innerText.split('');
         arr.pop();
         return e = arr.join('');
      });
      return [year_month[0], year_month[1]];
   }

   closeCalendar() {
      document.body.addEventListener("click", ({
         target
      }) => {
         const calendarBox = _.$('.calendar_box');
         if (target.closest('.call_calendar') === dateBtn) {
            dateBtn.removeEventListener("click", readCalendarJS, false)
            calendarBox.classList.toggle('hide_show')
         } else if (!calendarBox.classList.contains('.hide_show') && !target.closest(".calendar_area")) {
            calendarBox.classList.add('hide_show')
         }
      }, true);
   }
}