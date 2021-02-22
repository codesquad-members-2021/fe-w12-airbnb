import {
   ClassCtrl
} from './class.ctrl.js';

export class UserBtnCtrl extends ClassCtrl {
   constructor(el) {
      super()
      this.el = el;
      this.makeMenu();
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