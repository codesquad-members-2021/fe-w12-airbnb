import {
   ClassCtrl
} from './class.ctrl.js';
import {
   _
} from './util.js';

export class ScrollCtrl extends ClassCtrl {
   constructor() {
      super()
      this.targetEl = document;
      this.header1 = new ClassCtrl(_.$(".header1"));
      this.header2 = new ClassCtrl(_.$(".header2"));
   }

   onScrollEvents() {

      this.targetEl.addEventListener('scroll', (evt) => {
         let currentScrollValue = this.targetEl.documentElement.scrollTop;
         let screenStatus;
         console.log('currentScrollValue is ' + currentScrollValue);
         (currentScrollValue >= 100) ? screenStatus = false: screenStatus = true;

         if (screenStatus === true) {
            this.header1.show();
            this.header2.hide();
            s
         } else {
            this.header1.hide();
            this.header2.show();
            _.$('.background').classList.add('disappear');
         }
      })
   }
}