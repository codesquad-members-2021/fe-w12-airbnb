import {
   _
} from './util.js';
export class CalendarCtrl {

   constructor() {
      this.savedData;
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

   clickEventCtrl(el) {
      this.judgement += 1;
      el.classList.add("clicked");
      let clickedDate = el.innerText;
      let clickedDivArr = Array.from(_.$All('.clicked'));

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
            checkOut.innerText = `- ${stampMonth}월 ${clickedDivArr[1].innerText}일`;
         }
      }
   }
}