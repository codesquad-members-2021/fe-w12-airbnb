class MakeCalender {
   constructor(date) {
      this.date = date;
      this.month_day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.dayList = ['일', '월', '화', '수', '목', '금', '토'];
      this.next_month;
      this.next_year;
      this.firstday_curr_month;
      this.lastday_curr_month;
      this.firstday_next_month;
      this.lastday_next_month;
      this.week1 = '';
      this.week2 = '';
      this.startDay = 0;
      this.spare = 0;
   }

   getDateInfo() {
      let current_year = this.date.getFullYear(); //당해
      if (current_year % 4 === 0) this.month_day_count[1] = 29; //윤년이면 2월 29일 마지막날

      let current_month = this.date.getMonth() + 1; //당월
      if (current_month === 12) { //다음달,해
         this.next_month = 1;
         this.next_year = current_year + 1;
      } else {
         this.next_month = current_month + 1;
         this.next_year = current_year;
      }

      this.firstday_curr_month = new Date(`${current_year}-${current_month}-01`).getDay(); //당월첫요일(1일이 무슨요일인가)
      this.lastday_curr_month = this.month_day_count[current_month - 1]; //당월마지막일자는?(30/31)
      // let current_date = this.date.getDate(); //오늘날짜
      // let day = dayList[this.date.getDay()]; //오늘요일 일(0)부터 시작

      this.firstday_next_month = this.firstday_curr_month + 1;
      this.lastday_next_month = this.month_day_count[this.next_month - 1];

      this.makeCalenderLayout(current_year, current_month);
   }

   makeCalenderLayout(current_year, current_month) {
      let calenderBar = document.createElement("div");
      calenderBar.className = "calender_box";
      calenderBar.innerHTML =
         `<div class="prev_btn">
   <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
 </div>

 <div class="calender_current">
   <div class="calender_y_m">
     <span class="year">${current_year}년</span>
     &nbsp;
     <span class="month">${current_month}월</span>
   </div>
   <div class="calender_d_d">
      <div class="calender_day">
         <th>${this.dayList[0]}</th>
         <th>${this.dayList[1]}</th>
         <th>${this.dayList[2]}</th>
         <th>${this.dayList[3]}</th>
         <th>${this.dayList[4]}</th>
         <th>${this.dayList[5]}</th>
         <th>${this.dayList[6]}</th>
      </div>
      <div class="calender_date"></div>
   </div>   
 </div>

 <div class="calender_next_month">
 <div class="calender_y_m">
   <span class="year">${this.next_year}년</span>
   &nbsp;
   <span class="month">${this.next_month}월</span>
 </div>
 <div class="calender_d_d">
    <div class="calender_day">
       <th>${this.dayList[0]}</th>
       <th>${this.dayList[1]}</th>
       <th>${this.dayList[2]}</th>
       <th>${this.dayList[3]}</th>
       <th>${this.dayList[4]}</th>
       <th>${this.dayList[5]}</th>
       <th>${this.dayList[6]}</th>
    </div>
    <div class="calender_date"></div>
 </div>   
</div>

 <div class="next_btn">
   <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
 </div>`;

      const calenderArea = document.querySelector(".search_bar");
      calenderArea.insertAdjacentElement("afterend", calenderBar);
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
      this.insertHTML();
   }

   insertHTML() {
      let section1 = document.querySelector(".calender_current .calender_date");
      let section2 = document.querySelector(".calender_next_month .calender_date");

      section1.insertAdjacentHTML("afterBegin", this.week1);
      section2.insertAdjacentHTML("afterBegin", this.week2);
   }
}

const now = new Date();
const curr_calenderDateArea = new MakeCalender(now);
curr_calenderDateArea.getDateInfo();