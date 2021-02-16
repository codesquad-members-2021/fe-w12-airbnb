console.log("linked")
//matches를 iE9에서도 에러없이 사용하기 위한 코드.
if (!Element.prototype.matches) {
   Element.prototype.matches = Element.prototype.msMatchesSelector;
}

//* tabUI
class TabUI {
   constructor(targetEl) {
      this.targetEl = targetEl;
      this.body = document.querySelector("body");
   }

   onClickEvents() {
      this.targetEl.addEventListener("click", () => {
         console.log(!this.targetEl.matches(".hide_show"))
         if (this.targetEl.matches(".toggleBtn1") && (!this.targetEl.matches(".hide_show"))) {
            this.showClickHandler(toggleMenu[1]);
            this.body.addEventListener("mouseup", this.hideClickHandler1)
         }
         if (this.targetEl.matches(".toggleBtn1") && this.targetEl.matches(".hide_show")) {
            this.targetEl.addEventListener("mouseup", this.hideClickHandler1)
         }
         if (this.targetEl.matches("toggleBtn2")) {
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
class Scroll {
   constructor() {
      this.targetEl = document;
      this.header1 = document.querySelector(".header1");
      this.header2 = document.querySelector(".header2");
   }

   onScrollEvents() {
      this.targetEl.addEventListener('scroll', (evt) => {
         let currentScrollValue = this.targetEl.documentElement.scrollTop;
         let screenStatus;
         console.log('currentScrollValue is ' + currentScrollValue);

         if (currentScrollValue >= 60) {
            evt.preventDefault();
            screenStatus = false;
         } else {
            screenStatus = true;
         }

         if (screenStatus === true) {
            this.header1.classList.remove("hide_show");
            this.header2.classList.add("hide_show");
         } else {
            this.header1.classList.add("hide_show");
            this.header2.classList.remove("hide_show");
         }
      })
   }
}


const loadedWindow = new Scroll();
loadedWindow.onScrollEvents();



function getValue(evt) {
   const searchWrapper = document.querySelectorAll('.search_wrapper');
   let targetMenu = evt.target.innerText;
   if (targetMenu === '체험') {
      searchWrapper[0].classList.add('hide_show');
      searchWrapper[1].classList.remove('hide_show');
   }
   if (targetMenu === "숙소") {
      searchWrapper[0].classList.remove('hide_show');
      searchWrapper[1].classList.add('hide_show');
   }
}

const centerMenu = document.querySelectorAll(".menu_center>label>span");
for (let i = 0; i < centerMenu.length; i++) {
   centerMenu[i].addEventListener('click', (evt) => getValue(evt));
}





// console.log(toggleMenu[1].classList.contains("hide_show"))
// this.targetEl.addEventListener("click", (evt) => {
//    if (toggleMenu[1].classList.contains("hide_show") === false) {
//       if (evt.target.parentNode.className !== "toggleList") {
//          console.log(toggleMenu)