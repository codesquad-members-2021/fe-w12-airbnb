import Component from "../../core/Component.js";
export default class SearchBox extends Component {
  template() {
    const { searchType } = this.props;
    return `
    <div class="searchBox-location">
        <label class="searchBox-section" for="search-location">
            <div>위치</div>
            <input
            type="text"
            placeholder="어디로 여행가세요?"
            id="search-location"
            />
        </label>
    </div>
    <div class="verticalBar"></div>
    ${
      searchType === "STAYS"
        ? `
    <div class="searchBox-date">
        <div class="searchBox-section">
            <div>체크인</div>
            <div>날짜 추가</div>
        </div>
        <div class="verticalBar"></div>
        <div class="searchBox-section">
            <div>체크아웃</div>
            <div>날짜 추가</div>
        </div>
    </div>
    <div class="verticalBar"></div>
    <div class="searchBox-person">
        <div class="searchBox-section">
            <div>인원</div>
            <div>게스트 추가</div>
        </div>
    </div>
    `
        : `
    <div class="searchBox-date">
        <div class="searchBox-section">
            <div>날짜</div>
            <div>원하는 날짜를 입력하세요.</div>
        </div>
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
    `;
  }
}
