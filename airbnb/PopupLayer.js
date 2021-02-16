// const _ = { $: (selector, base = document) => base.querySelector(selector) };

class PopupLayer {
  constructor($searchInput, $nav) {
    this.$searchInput = $searchInput;
    this.$nav = $nav;
  }

  initEvent() {
    this.$nav.addEventListener('click', this.changeRadioButtonHandler.bind(this));
    this.$nav.addEventListener('click', this.changeTemplateHandler.bind(this));
  }

  roomsTemplate() {
    return `<div><a href="#">
               <div>위치</div> <input type="text" placeholder="어디로 여행가세요?">
            </a></div>
            <div><a href="#">
              <div>체크인</div> <input type="datetime" placeholder="날짜 추가">
            </a></div>
            <div><a href="#">
              <div>체크아웃</div> <input type="datetime" placeholder="날짜 추가">
            </a></div>
            <div><a href="#">
              <div>인원</div> <input type="number" placeholder="게스트 추가">
            </a></div>
           <div>
             <button class="search_button" style="text-align: center;">
               <img src="./images/magnifyingGlass.svg" class="magnifying_glass">
             </button>
           </div>`;
  }

  experienceTemplate() {
    return `<div style="width:52%"><a href="#">
                <div style="margin:0 39px">위치</div> <input type="text" placeholder="어디로 여행가세요?" style="width:80.5%">
            </a></div>
            <div style="width:52%"><a href="#">
              <div style="margin:0 39px">날짜</div> <input type="datetime" placeholder="날짜 추가" style="width:80.5%">
            </a></div>
            <div>
              <button class="search_button" style="text-align: center;">
                <img src="./images/magnifyingGlass.svg" class="magnifying_glass">
              </button>
            </div>`;
  }

  changeRadioButtonHandler({ target }) {
    target.previousElementSibling.checked = true;
  }

  changeTemplateHandler({ target }) {
    switch (target.className) {
      case 'rooms':
        this.$searchInput.innerHTML = this.roomsTemplate();
        break;
      case 'experience':
        this.$searchInput.innerHTML = this.experienceTemplate();
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const $searchInput = document.querySelector('.search_input');
  const $nav = document.querySelector('.nav');
  const popupLayer = new PopupLayer($searchInput, $nav);
  popupLayer.initEvent();
})