import {
   readCalendarJS,
   dateBtn
} from './play.js';

export class CalendarMaker {
   constructor(date, calendarArea) {
      this.date = date;
      this.calendar_area = calendarArea;
      this.month_day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.dayList = ['일', '월', '화', '수', '목', '금', '토'];
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
      if (this.current_month === 12) { //다음달,해
         this.next_month = 1;
         this.next_year = this.current_year + 1;
         this.last_month = this.current_month - 1;
         this.last_year = this.current_year;
      } else if (this.current_month === 1) {
         this.last_month = 12;
         this.last_year = this.current_year - 1;
         this.next_month = this.current_month + 1;
         this.next_year = this.current_year;
      } else {
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
      this.makeCalendarLayout();
   }

   makeCalendarLayout() {
      let calendarBar = document.createElement("div");
      calendarBar.className = "calendar_box";
      calendarBar.innerHTML =
         `<div class="prev_btn">
               <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
            </div>

            <div class="calendar_current">
               <div class="calendar_y_m">
               <span class="year">${this.current_year}년</span>
               &nbsp;
               <span class="month">${this.current_month}월</span>
               </div>
               <div class="calendar_d_d">
                  <div class="calendar_day">
                     <div>${this.dayList[0]}</div>
                     <div>${this.dayList[1]}</div>
                     <div>${this.dayList[2]}</div>
                     <div>${this.dayList[3]}</div>
                     <div>${this.dayList[4]}</div>
                     <div>${this.dayList[5]}</div>
                     <div>${this.dayList[6]}</div>
                  </div>
                  <div class="calendar_date"></div>
               </div>   
            </div>

            <div class="calendar_next_month">
            <div class="calendar_y_m">
               <span class="year">${this.next_year}년</span>
               &nbsp;
               <span class="month">${this.next_month}월</span>
            </div>
            <div class="calendar_d_d">
               <div class="calendar_day">
                  <div>${this.dayList[0]}</div>
                  <div>${this.dayList[1]}</div>
                  <div>${this.dayList[2]}</div>
                  <div>${this.dayList[3]}</div>
                  <div>${this.dayList[4]}</div>
                  <div>${this.dayList[5]}</div>
                  <div>${this.dayList[6]}</div>
               </div>
               <div class="calendar_date"></div>
            </div>   
            </div>

            <div class="next_btn">
               <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
            </div>`;

      this.calendar_area.insertAdjacentElement("afterBegin", calendarBar);
      const prevBtn = document.querySelector('.prev_btn');
      const nextBtn = document.querySelector('.next_btn');

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
      let section1 = document.querySelector(".calendar_current .calendar_date");
      let section2 = document.querySelector(".calendar_next_month .calendar_date");

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
      return Array.from(document.querySelectorAll(".clicked"));
   }

   blurBeforeToday() {
      document.querySelectorAll(".calendar_date div").forEach(el => {
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
      let year_month = el.closest('.calendar_d_d').previousElementSibling.querySelectorAll('span');
      year_month = Array.prototype.slice.call(year_month);

      year_month = year_month.map(e => {
         let arr = e.innerText.split('');
         arr.pop();
         return e = arr.join('');
      });

      let target_year = year_month[0];
      let target_month = year_month[1];
      let targetYearMonth = [target_year, target_month];

      return targetYearMonth;
   }

   clickEventCtrl(el) {
      this.judgement += 1;
      el.classList.add("clicked");
      let clickedDate = el.innerText;
      let clickedDivNode = document.querySelectorAll('.clicked');
      let clickedDivArr = Array.from(clickedDivNode);

      if (this.judgement === 2) {
         if (this.savedData) {
            clickedDivArr = this.savedData.concat(clickedDivArr)
         }

         //클릭역행한경우
         if (clickedDate < clickedDivArr[1].innerText) {
            clickedDivArr[1].classList.remove('clicked');
            this.judgement = 1;
         }
      }

      if (this.judgement === 3) {
         if (this.savedData) {
            clickedDivArr = this.savedData.concat(clickedDivArr)
         }
         //todo:클릭오류-> 2월 -> next -> 4월 1일 -> 2일 -> 3일-> 4일(error!!!)
         if (clickedDate === clickedDivArr[clickedDivArr.length - 1].innerText) {
            for (let i = 0; i < clickedDivArr.length - 2; i++) {
               console.log(clickedDivArr)
               clickedDivArr[i].classList.remove('clicked');
            }
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
      }

      this.stampDate(clickedDivArr);
   }

   stampDate(clickedDivArr) {
      //todo: .clikedArr재정리하기.
      console.log(clickedDivArr);
      let checkIn = document.querySelector(".check_in");
      let checkOut = document.querySelector(".check_out");

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
      document.body.addEventListener("click", (evt) => {
         if (!evt.target.closest(".calendar_area")) {
            dateBtn.removeEventListener("click", readCalendarJS, false)
            document.querySelector('.calendar_box').classList.toggle('hide_show')
         }
      }, true)
   }
}