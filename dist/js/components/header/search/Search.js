import Component from "../../../core/Component.js";
import SearchBox from "./SearchBox.js";
export default class Search extends Component {
  setup() {
    this.state = { searchType: "STAYS" };
  }
  getTemplate() {
    const { searchType } = this.state;
    return `
        <form>
            <fieldset>
                <div class="search-type">
                  <div class="typeBox">
                    <label for="STAYS">
                      <input type="radio" id="STAYS"/ name="searchType">
                      <span>숙소</span>
                    </label>
                  </div>
                  <div class="typeBox ">
                    <label for="EXPERIENCES">
                      <input type="radio" id="EXPERIENCES" name="searchType" />
                      <span>체험</span>
                    </label>
                  </div>
                  <div class="typeBox">
                    <a href=""><span>온라인 체험</span></a>
                  </div>
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
      if (target.tagName !== "INPUT") return;
      this.changeSearchType(target.id);
      setTimeout(() => {
        const { searchType } = this.state;
        const afterTarget = document.querySelector(`#${searchType}`);
        const typeBox = afterTarget.closest(".typeBox");
        typeBox.classList.add("selected");
      }, 100);
    });
  }
  changeSearchType(searchType) {
    console.log("before in change", this.state);
    this.setState({ searchType });
  }
}
