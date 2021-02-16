// const _ = { $: (selector, base = document) => base.querySelector(selector) };

class PopupLayer {
  constructor($roomsBox, $experienceBox, $nav) {
    this.$roomsBox = $roomsBox;
    this.$experienceBox = $experienceBox;
    this.$nav = $nav;
  }

  initEvent() {
    this.$nav.addEventListener('click', this.changeRadioButtonHandler.bind(this));
    this.$nav.addEventListener('click', this.changeTemplateHandler.bind(this));
  }

  changeRadioButtonHandler({ target }) {
    target.previousElementSibling.checked = true;
  }

  changeTemplateHandler({ target }) {
    switch (target.className) {
      case 'rooms':
        this.$roomsBox.classList.remove('display_none');
        this.$experienceBox.classList.add('display_none');
        break;
      case 'experience':
        this.$roomsBox.classList.add('display_none');
        this.$experienceBox.classList.remove('display_none');
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const $roomsBox = document.querySelector('.rooms_box');
  const $experienceBox = document.querySelector('.experience_box');
  const $nav = document.querySelector('.nav');
  const popupLayer = new PopupLayer($roomsBox, $experienceBox, $nav);
  popupLayer.initEvent();
})