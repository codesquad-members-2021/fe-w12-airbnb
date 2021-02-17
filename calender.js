class MakeCalender {
   constructor() {
      this.week = '';
      this.startDay = 0;
      this.spare = 0;
   }

   getDateInfo() {
      let calenderArea = document.querySelector(".search_bar");
      let dayList = ['일', '월', '화', '수', '목', '금', '토'];
      let month_day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let today = new Date();

      let current_year = today.getFullYear(); //당해
      if (current_year % 4 === 0) month_day_count[1] = 29; //윤년이면 2월 29일 마지막날

      let next_month, next_year;
      let current_month = today.getMonth() + 1; //당월
      if (current_month === 12) { //다음달,해
         next_month = 1;
         next_year = current_year + 1;
      } else {
         next_month = current_month + 1;
         next_year = current_year;
      }

      let firstday_curr_month = new Date(`${current_year}-${current_month}-01`).getDay(); //당월첫요일(1일이 무슨요일인가)
      let lastday_curr_month = month_day_count[current_month - 1]; //당월마지막일자는?(30/31)
      // let current_date = today.getDate(); //오늘날짜
      // let day = dayList[today.getDay()]; //오늘요일 일(0)부터 시작

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
         <th>${dayList[0]}</th>
         <th>${dayList[1]}</th>
         <th>${dayList[2]}</th>
         <th>${dayList[3]}</th>
         <th>${dayList[4]}</th>
         <th>${dayList[5]}</th>
         <th>${dayList[6]}</th>
      </div>
      <div class="calender_date"></div>
   </div>   
 </div>

 <div class="calender_next_month">
 <div class="calender_y_m">
   <span class="year">${next_year}년</span>
   &nbsp;
   <span class="month">${next_month}월</span>
 </div>
 <div class="calender_d_d">
    <div class="calender_day">
       <th>${dayList[0]}</th>
       <th>${dayList[1]}</th>
       <th>${dayList[2]}</th>
       <th>${dayList[3]}</th>
       <th>${dayList[4]}</th>
       <th>${dayList[5]}</th>
       <th>${dayList[6]}</th>
    </div>
    <div class="calender_date"></div>
 </div>   
</div>

 <div class="next_btn">
   <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
 </div>`;

      calenderArea.insertAdjacentElement("afterend", calenderBar);
      this.getDateHTML(lastday_curr_month, firstday_curr_month);
   }

   getDateHTML(lastday_curr_month, firstday_curr_month) {
      for (let i = 0; i < lastday_curr_month + firstday_curr_month; i++) { //->sun to sat
         if (i >= firstday_curr_month) {
            this.week += `<div>${this.startDay+=1}</div>`;
         } else {
            this.week += `<div>&nbsp</div>`;
         }
      }
      this.insertHTML();
   }

   insertHTML() {
      let section1 = document.querySelector(".calender_current .calender_date");
      let section2 = document.querySelector(".calender_next_month .calender_date");

      section1.insertAdjacentHTML("afterBegin", this.week);
      section2.insertAdjacentHTML("afterBegin", this.week);
   }
}

const curr_calenderDateArea = new MakeCalender();
curr_calenderDateArea.getDateInfo();