import Component from "../../core/Component.js";
import Menu from "./menu.js";
import Search from "./Search.js";

export default class Header extends Component {
  template() {
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
  mounted(){
      const $search = this.$target.querySelector('.search')
      const $menu = this.$target.querySelector('.menu')
      new Search($search)
      new Menu($menu)
  }

}
