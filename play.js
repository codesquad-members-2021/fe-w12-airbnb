console.log("linked")

//* tabUI
class TabUI {
   constructor(targetEl) {
      this.targetEl = targetEl;
      this.body = document.querySelector("body");
   }

   onClickEvents() {
      console.log("on")
      this.targetEl.addEventListener("click", () => {

         if (this.targetEl.classList.contains("toggleBtn1")) {
            this.showClickHandler(toggleMenu[1]);
            this.body.addEventListener("mouseup", this.hideClickHandler1)
            console.log(this.targetEl)
         }
         if (this.targetEl.classList.contains("toggleBtn2")) {
            this.showClickHandler(toggleMenu[0]);
            this.body.addEventListener("mouseup", this.hideClickHandler2)
         }
      })
   }

   showClickHandler(target) {
      target.classList.remove("hide_show");
   }

   hideClickHandler1() {
      toggleMenu[1].classList.add("hide_show");
   }

   hideClickHandler2() {
      toggleMenu[0].classList.add("hide_show");
   }

}
const toggleBtn1 = new TabUI(document.querySelector(".toggleBtn1"));
const toggleBtn2 = new TabUI(document.querySelector(".toggleBtn2"));
const toggleMenu = document.querySelectorAll(".toggleMenu");
toggleBtn1.onClickEvents();
toggleBtn2.onClickEvents();

//* scrollUI
const header1 = document.getElementsByClassName("header1");
const header2 = document.getElementsByClassName("header2");

document.addEventListener('scroll', function (event) {
   let currentScrollValue = document.documentElement.scrollTop;
   console.log('currentScrollValue is ' + currentScrollValue);
   let screenStatus;
   if (currentScrollValue >= 60) {
      event.preventDefault();
      screenStatus = false;
   } else {
      screenStatus = true;
   }
   if (screenStatus === true) {
      header1[0].classList.remove("hide_show");
      header2[0].classList.add("hide_show");
   } else {
      header1[0].classList.add("hide_show");
      header2[0].classList.remove("hide_show");
   }
})

//// console.log(toggleMenu[1].classList.contains("hide_show"))
//// this.targetEl.addEventListener("click", (evt) => {
////    if (toggleMenu[1].classList.contains("hide_show") === false) {
////       if (evt.target.parentNode.className !== "toggleList") {
////          console.log(toggleMenu)