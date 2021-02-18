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
   }

   getDateInfo() {
      console.log('getDateInfo')
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
      console.log('makeCalendarLayout')
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
      console.log(' getDateHTML')
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
      console.log('insertHTML');
      let section1 = document.querySelector(".calendar_current .calendar_date");
      let section2 = document.querySelector(".calendar_next_month .calendar_date");

      section1.insertAdjacentHTML("afterBegin", this.week1);
      section2.insertAdjacentHTML("afterBegin", this.week2);
   }

   prevBtnEvent() {
      this.week1 = '';
      this.week2 = '';
      this.current_year = this.last_year;
      this.current_month = this.last_month;
      this.date = new Date(`${this.current_year}-${this.current_month}-01`);
      this.calendar_area.removeChild(this.calendar_area.firstChild);
      this.getDateInfo()
   }

   nextBtnEvent() {
      this.week1 = '';
      this.week2 = '';
      this.current_year = this.next_year;
      this.current_month = this.next_month;
      this.date = new Date(`${this.current_year}-${this.current_month}-01`);
      this.calendar_area.removeChild(this.calendar_area.firstChild);
      this.getDateInfo()
   }
}