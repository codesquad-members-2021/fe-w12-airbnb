import Component from "../../core/Component.js";

export default class Menu extends Component {
  template() {
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
            </ul>
        </nav>
        `;
  }
}
