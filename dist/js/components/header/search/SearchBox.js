import Component from "../../../core/Component.js";
import Location from "./searchItem/Location.js";
import Calendar from "./searchItem/Calendar.js";
import Guest from "./searchItem/Guest.js";
export default class SearchBox extends Component {
  setup() {
    this.state = {
      searchItem: "",
    };
  }
  getTemplate() {
    const { searchType } = this.props;
    return `
    <div class="searchBox-location">
        <label class="searchBoxItem" for="searchLocation">
            <div>위치</div>
            <input
            type="text"
            placeholder="어디로 여행가세요?"
            id="searchLocation"
            />
        </label>
    </div>
    <div class="verticalBar"></div>
    ${
      searchType === "STAYS"
        ? `
    <div class="searchBox-date">
        <label class="searchBoxItem" for="stayCheckIn">
            <div>체크인</div>
            <input
            type="text"
            placeholder="날짜 추가"
            id="stayCheckIn"
            />
        </label>
        <div class="verticalBar"></div>
        <label class="searchBoxItem" for="stayCheckOut">
            <div>체크아웃</div>
            <input
            type="text"
            placeholder="날짜 추가"
            id="stayCheckOut"
            />
        </label>
    </div>
    <div class="verticalBar"></div>
    <div class="searchBox-person">
        <label class="searchBoxItem" for="stayGuest">
            <div>인원</div>
            <input
            type="text"
            placeholder="게스트 추가"
            id="stayGuest"
            />
        </label>
    </div>
    `
        : `
    <div class="searchBox-date">
            <label class="searchBoxItem" for="experienceDate">
            <div>날짜</div>
            <input
            type="text"
            placeholder="원하는 날짜를 입력하세요."
            id="experienceDate"
            />
        </label>
    </div>
    `
    }
    
    <div class="searchBox-button">
        <button>
            <object
            data="./img/search.svg"
            type="image/svg+xml"
            aria-label="searchBtn"
            ></object>
        </button>
    </div>
    <div class="searchItem-floatBox"></div>
    `;
  }
  mounted() {
    
    const searchItems = {
      "": () => {},
      searchLocation: ($target, props) => new Location($target, props),
      stayCheckIn: ($target, props) => new Calendar($target, props),
      stayCheckOut: ($target, props) => new Calendar($target, props),
      stayGuest: ($target, props) => new Guest($target, props),
      experienceDate: ($target, props) => new Calendar($target, props),
    };
    const $searchItemFloatBox = this.$target.querySelector(
        ".searchItem-floatBox"
      );
    const { searchItem } = this.state;
    const createFloatBox = searchItems[searchItem];
    createFloatBox($searchItemFloatBox);
  }
  setEvent() {
    this.addEvent("click", ".searchBoxItem", ({ target }) => {
      if (target.tagName !== "INPUT") return;
      const searchItem = target.id;
      this.setState({ searchItem });
    });
  }
}
