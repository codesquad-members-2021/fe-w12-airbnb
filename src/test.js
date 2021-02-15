// 계정 토글 클래스 테스트
class Toggle {
  constructor(className) {
    this.element = document.querySelector(`.${className}`);
  }

  init() {
    this.element.classList.contains("visible") ? this.hide() : this.show();
  }

  show() {
    this.element.classList.remove("hidden");
    this.element.classList.add("visible");
  }

  hide() {
    this.element.classList.remove("visible");
    this.element.classList.add("hidden");
  }
}

const accountButton = document.querySelector("#account");
const accountLayer = new Toggle("account__layer");

// 계정 버튼 클릭 시 레이어 나오는 이벤트 등록
accountButton.addEventListener("click", () => {
  accountLayer.init();
});

// 계정 레이어의 외부 클릭 시 레이어 숨김
document.addEventListener("click", (e) => {
  if (!(accountLayer.element.contains(e.target) || accountButton.contains(e.target))) {
    accountLayer.hide();
    // 외부
    // console.log("account-layer outside");
  }
});

// 숙소, 체험 탭 테스트
const stay = document.querySelector(".stay");
const experiences = document.querySelector(".experiences");
const searchBarForStay = document.querySelector(".search-bar__stay");
const searchBarForExperiences = document.querySelector(".search-bar__experiences");

stay.addEventListener("click", () => {
  console.log("stay");

  experiences.childNodes[3].classList.remove("set__underBar");
  stay.childNodes[3].classList.add("set__underBar");

  searchBarForStay.classList.remove("none");
  searchBarForExperiences.classList.add("none");
});

experiences.addEventListener("click", () => {
  console.log("experiences");

  stay.childNodes[3].classList.remove("set__underBar");
  experiences.childNodes[3].classList.add("set__underBar");

  searchBarForExperiences.classList.remove("none");
  searchBarForStay.classList.add("none");
});
