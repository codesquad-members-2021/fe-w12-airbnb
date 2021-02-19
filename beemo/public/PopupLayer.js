const _ = require('./util.js');

class PopupLayer {
  constructor(calenderModel, $roomsBox, $experienceBox, $nav) {
    this.calenderModel = calenderModel;
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

module.exports = PopupLayer;