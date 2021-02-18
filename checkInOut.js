export class CheckInOut {
   constructor(date = new Date()) {
      this.date = date;
   }
   init() {
      document.querySelectorAll(".calendar_current .calendar_date div").forEach(el => {
         if (el.innerText < this.date.getDate()) {
            console.log("small");
         }
      })
   }
}