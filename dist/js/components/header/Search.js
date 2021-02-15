import Component from "../../core/Component.js";
export default class Search extends Component {
  template() {
    return `
        <form>
            <fieldset>
                <div class="search-type">
                  <label for="STAYS">
                    <input type="radio" id="STAYS"/ name="searchType">
                    <span>숙소</span>
                  </label>
                  <label for="EXPERIENCES">
                    <input type="radio" id="EXPERIENCES" name="searchType" />
                    <span>체험</span>
                  </label>
                  <a href="">온라인 체험</a>
                </div>
              </fieldset>
              <div class="floatBox">
                <div class="searchBox">
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
                  <div class="searchBox-button">
                    <button>
                      <object
                        data="./img/search.svg"
                        type="image/svg+xml"
                        aria-label="searchBtn"
                      ></object>
                    </button>
                  </div>
                </div>
            </div>
        </form>
        `;
  }
}
