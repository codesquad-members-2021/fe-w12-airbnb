import Component from "../../core/Component.js";

export default class Menu extends Component {
  getTemplate() {
    return `
        <nav>
            <ul class="menuBox">
                <li><a href="#">호스트되기</a></li>
                <li>
                  <object
                    data="./img/icon.svg"
                    type="image/svg+xml"
                    aria-label="icon"
                  ></object>
                </li>
                <li class="menu-mypage">
                  <object
                    data="./img/menu.svg"
                    type="image/svg+xml"
                    aria-label="menu"
                  ></object>
                  <object
                    data="./img/me.svg"
                    type="image/svg+xml"
                    aria-label="me"
                  ></object>
                </li>
                <li class="menu-floatbox">
                    <ul>
                        <li>메세지</li>
                        <li>여행</li>
                        <li>저장 목록</li>
                    </ul>
                    <ul>
                        <li>숙소 호스트 되기</li>
                        <li>체험 호스팅하기</li>
                        <li>계정</li>
                    </ul>
                    <ul>
                        <li>도움말</li>
                        <li>로그아웃</li>
                    </ul>
                  </li>
            </ul>
        </nav>
        
        `;
  }
  setEvent() {
    const $menuMypage = this.$target.querySelector(".menu-mypage");
    const $menuFloatBox = this.$target.querySelector(".menu-floatbox");

    $menuMypage.addEventListener("click", () => {
      $menuFloatBox.classList.toggle("show");
    });
    window.addEventListener("click", ({ target }) => {
      if (target === $menuMypage || $menuFloatBox.contains(target)) return;
      $menuFloatBox.classList.remove("show");
    });
  }
}
