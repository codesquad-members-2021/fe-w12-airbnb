import Component from "../../../../core/Component.js";

export default class Calendar extends Component {
  setup() {
    this.$target.classList.add("calendar");
  }
  getTemplate() {
    return `
        <div>hi~</div>
        `;
  }
  setEvent() {}
}
