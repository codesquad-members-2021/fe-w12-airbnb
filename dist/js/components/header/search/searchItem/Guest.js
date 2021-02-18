import Component from "../../../../core/Component.js";

export default class Guest extends Component {
  setup() {
    this.$target.classList.add("item-guest");
  }
  getTemplate() {
    return `
        <div>guest</div>
        `;
  }
  setEvent() {}
}
