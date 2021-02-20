console.log("linked")
import {
   CalendarMaker
} from './calendar.maker.js';
import {
   _
} from './util.js';

class ClassCtrl {
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


//* ScrollCtrl
class Scroll extends ClassCtrl {
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

         if (currentScrollValue >= 60) {
            evt.preventDefault();
            screenStatus = false;
         } else {
            screenStatus = true;
         }

         if (screenStatus === true) {
            this.header1.show();
            this.header2.hide();
         } else {
            this.header1.hide();
            this.header2.show();
         }
      })
   }
}

const loadedWindow = new Scroll();
loadedWindow.onScrollEvents();

//* SearchBar_Ctrl
//TODO: replaceChild로 바꿔보기.
function getValue({
   target
}) {
   const searchWrapper1 = new ClassCtrl(_.$All('.search_wrapper')[0]);
   const searchWrapper2 = new ClassCtrl(_.$All('.search_wrapper')[1]);
   const targetStr = _.$All('.menu_center label span');

   let targetMenu = target.innerText;
   if (targetMenu === targetStr[0].textContent) {
      searchWrapper1.show();
      searchWrapper2.hide();
   }
   if (targetMenu === targetStr[1].textContent) {
      searchWrapper1.hide();
      searchWrapper2.show();
   }
   if (targetMenu === targetStr[2].textContent) {
      location.href = "https://www.airbnb.co.kr/s/experiences/online";
   }
}

const centerMenu = _.$All(".menu_center>label>span");
for (let i = 0; i < centerMenu.length; i++) {
   centerMenu[i].addEventListener('click', (evt) => getValue(evt));
}


//* BtnCtrl
class BtnUI {
   constructor(el) {
      this.el = el;
   }

   makeMenu() {
      const menuBox = document.createElement('div');
      menuBox.id = "menuBox";
      menuBox.classList.add('toggleMenu', 'hide_show');
      menuBox.innerHTML = `<ul>
      <li><a id="sign_up" href="#">회원 가입</a></li>
      <li><a href="#">로그인</a></li>
      <hr>
      <li><a href="#">숙소 호스트 되기</a></li>
      <li><a href="#">체험 호스팅하기</a></li>
      <li><a href="#">도움말</a></li>
      </ul>`;

      this.el.insertAdjacentElement("afterend", menuBox);

      document.body.addEventListener("click", ({
         target
      }) => {
         let toggleMenuArea = target.closest('.toggleMenu');
         let toggleBtnArea = target.closest('.toggleBtn');
         const menuBoxShowingCtrl = new ClassCtrl(menuBox);
         const classExistence = menuBox.matches('.hide_show');

         if (toggleBtnArea && classExistence) {
            menuBoxShowingCtrl.show();
         } else if (toggleBtnArea && !classExistence) {
            menuBoxShowingCtrl.hide();
         } else if (!toggleBtnArea && !toggleMenuArea && !classExistence) {
            menuBoxShowingCtrl.hide();
         }
      })
   }
}

const btnCtrl_1 = new BtnUI(_.$(".toggleBtn1"));
const btnCtrl_2 = new BtnUI(_.$(".toggleBtn2"));
btnCtrl_1.makeMenu();
btnCtrl_2.makeMenu();

export function readCalendarJS() {
   const calendarArea = _.$(".calendar_area");
   const now = new Date();
   const calendar_ctrl = new CalendarMaker(now, calendarArea);
   calendar_ctrl.getDateInfo();
}

export const dateBtn = _.$('.call_calendar');

dateBtn.addEventListener('click',
   readCalendarJS
);