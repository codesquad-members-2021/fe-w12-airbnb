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

export class CalendarMaker {
   constructor(date, calendarArea) {
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
      this.week1 = '';
      this.week2 = '';
      this.startDay = 0;
      this.spare = 0;
      this.judgement = 0;
      this.savedData;
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

      prevBtn.addEventListener("click", this.prevBtnEvent.bind(this));
      nextBtn.addEventListener("click", this.nextBtnEvent.bind(this));
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

   prevBtnEvent() {
      this.savedData = this.saveClickedData();
      this.week1 = '';
      this.week2 = '';
      this.current_year = this.last_year;
      this.current_month = this.last_month;
      this.date = new Date(`${this.current_year}-${this.current_month}-01`);
      this.calendar_area.removeChild(this.calendar_area.firstChild);
      this.getDateInfo()
   }

   nextBtnEvent() {
      this.savedData = this.saveClickedData();
      this.week1 = '';
      this.week2 = '';
      this.current_year = this.next_year;
      this.current_month = this.next_month;
      this.date = new Date(`${this.current_year}-${this.current_month}-01`);
      this.calendar_area.removeChild(this.calendar_area.firstChild);
      this.getDateInfo()
   }

   saveClickedData() {
      return Array.from(_.$All(".clicked"));
   }

   blurBeforeToday() {
      _.$All(".calendar_date div").forEach(el => {
         const today = new Date();
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

   clickEventCtrl(el) {
      this.judgement += 1;
      el.classList.add("clicked");
      let clickedDate = el.innerText;
      let clickedDivNode = _.$All('.clicked');
      let clickedDivArr = Array.from(clickedDivNode);

      switch (this.judgement) {
         case 2:
            if (this.savedData) {
               clickedDivArr = this.savedData.concat(clickedDivArr)
            }
            //클릭역행한경우
            if (clickedDate < clickedDivArr[1].innerText) {
               clickedDivArr[1].classList.remove('clicked');
               this.judgement = 1;
            }
            break;

         case 3:
            if (this.savedData) {
               clickedDivArr = this.savedData.concat(clickedDivArr)
            }
            if (clickedDate === clickedDivArr[clickedDivArr.length - 1].innerText) {
               clickedDivArr.pop();
               clickedDivArr.forEach(e => {
                  e.classList.remove('clicked')
               });
               this.judgement = 1;
            }
            if ((clickedDate !== clickedDivArr[clickedDivArr.length - 1].innerText) && (clickedDate !== clickedDivArr[0].innerText)) {
               clickedDivArr[0].classList.remove('clicked');
               this.judgement = 2;
            }
            if (clickedDate === clickedDivArr[0].innerText) {
               clickedDivArr.shift();
               clickedDivArr.forEach(el => {
                  el.classList.remove('clicked')
               });
               this.judgement = 1;
            }
            break;
      }
      this.stampDate(clickedDivArr);
   }

   stampDate(clickedDivArr) {
      let checkIn = _.$(".check_in");
      let checkOut = _.$(".check_out");

      if (clickedDivArr.length === 1) checkOut.innerText = '';
      for (let i = 0; i < clickedDivArr.length; i++) {
         let stampMonth = this.targetYearMonth(clickedDivArr[i])[1];
         if (i === 0) {
            checkIn.innerText = `${stampMonth}월 ${clickedDivArr[0].innerText}일`;
            checkIn.classList.remove("placeholder");
         } else {
            checkOut.innerText = `${stampMonth}월 ${clickedDivArr[1].innerText}일`;
         }
      }
   }

   closeCalendar() {
      document.body.addEventListener("click", ({
         target
      }) => {
         if (!target.closest(".calendar_area")) {
            dateBtn.removeEventListener("click", readCalendarJS, false)
            _.$('.calendar_box').classList.toggle('hide_show')
         }
      }, true)
   }
}