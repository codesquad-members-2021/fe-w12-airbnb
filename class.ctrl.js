export class ClassCtrl {
   constructor(el) {
      this.el = el;
   }
   show() {
      this.el.classList.remove("hide_show");
   }
   hide() {
      this.el.classList.add("hide_show");
   }
}