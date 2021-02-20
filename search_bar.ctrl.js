import {
   ClassCtrl
} from './class.ctrl.js';

export const getValue = function (val) {
   const searchWrapper1 = new ClassCtrl(document.querySelectorAll('.search_wrapper')[0]);
   const searchWrapper2 = new ClassCtrl(document.querySelectorAll('.search_wrapper')[1]);
   const targetStr = document.querySelectorAll('.menu_center label span');

   if (val === targetStr[0].textContent) {
      searchWrapper1.show();
      searchWrapper2.hide();
   }
   if (val === targetStr[1].textContent) {
      searchWrapper1.hide();
      searchWrapper2.show();
   }
   if (val === targetStr[2].textContent) {
      location.href = "https://www.airbnb.co.kr/s/experiences/online";
   }
}