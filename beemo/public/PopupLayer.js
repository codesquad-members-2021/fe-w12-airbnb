const _ = require('./util.js');

class PopupLayer {
  constructor({ calenderModel, $roomsBox, $experienceBox, $nav, $fullDate, $startDate, $endDate }) {
    this.calenderModel = calenderModel;
    this.$roomsBox = $roomsBox;
    this.$experienceBox = $experienceBox;
    this.$nav = $nav;
    this.$fullDateInput = _.$('input', $fullDate);
    this.$startDateInput = _.$('input', $startDate);
    this.$endDateInput = _.$('input', $endDate);
    this.initEvent();
  }

  initEvent() {
    this.$nav.addEventListener('click', this.changeRadioButtonHandler.bind(this));
    this.$nav.addEventListener('click', this.changeTemplateHandler.bind(this));
    this.$nav.addEventListener('click', this.moveCalenderDataHandler.bind(this));
  }

  changeRadioButtonHandler({ target }) {
    target.previousElementSibling.checked = true;
  }

  changeTemplateHandler({ target }) {
    if (!(target.className === 'rooms' || target.className === 'experience')) return;
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

  moveCalenderDataHandler({ target }) {
    if (!(target.className === 'rooms' || target.className === 'experience')) return;
    switch (target.className) {
      case 'rooms':
        const [startDate, endDate] = this.calenderModel.formatDateArrayToString().split(' - ');
        this.$startDateInput.value = startDate || '';
        this.$endDateInput.value = endDate || '';
        break;
      case 'experience':
        const fullDate = this.calenderModel.formatDateArrayToString();
        this.$fullDateInput.value = fullDate || '';
        break;
    }
  }
}

module.exports = PopupLayer;