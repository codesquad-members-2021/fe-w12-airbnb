import Component from "../../core/Component.js";
import SearchBox from "./SearchBox.js";
export default class Search extends Component {
  setup() {
    this.state = { searchType: "STAYS" };
  }
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
            <div class="search-floatBox">
              <div class="searchBox"></div>
            </div>
        </form>
        `;
  }
  mounted() {
    const { searchType } = this.state;
    const $searchBox = this.$target.querySelector(".searchBox");
    new SearchBox($searchBox, {
      searchType,
    });
  }
  setEvent() {
    this.addEvent("click", ".search-type", ({ target }) => {
      if (target.tagName === "INPUT") {
        this.changeSearchType(target.id);
      }
    });
  }
  changeSearchType(searchType) {
    this.setState({ searchType });
  }
}
