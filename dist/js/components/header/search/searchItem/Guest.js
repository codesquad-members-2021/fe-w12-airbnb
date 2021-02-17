import Component from "../../../../core/Component.js";

export default class Guest extends Component {
  setup() {
    this.$target.classList.add("guest");
  }
  getTemplate() {
    return `
        <div>guest</div>
        `;
  }
  setEvent() {}
}
