import Component from "../../../../core/Component.js";

export default class Location extends Component {
  setup() {
    this.$target.classList.add("item-location");
  }
  getTemplate() {
    return `
    <div class="searchItem-location">
        <ul class="location-list">
          <li >
            <img src="./img/map.webp" alt="map" />
            <span>가까운 여행지 둘러보기</span>
          </li>
        </ul>
    </div>
        `;
  }
}
