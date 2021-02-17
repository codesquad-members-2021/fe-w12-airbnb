import Component from "../../core/Component.js";
import Menu from "./Menu.js";
import Search from "./search/Search.js";

export default class Header extends Component {
  getTemplate() {
    return `
        <div class="contents_wrapper">
          <div class="logo">
            <a href="#">
              <object
                data="./img/logo.svg"
                type="image/svg+xml"
                aria-label="LOGO"
              ></object
            ></a>
          </div>
          <div class="search"></div>
          <div class="menu"></div>
        </div>
        `;
  }
  mounted() {
    const $search = this.$target.querySelector(".search");
    const $menu = this.$target.querySelector(".menu");
    new Search($search);
    new Menu($menu);
  }
}
