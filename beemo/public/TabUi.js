const _ = require('./util.js');

class TabUI {
  constructor({ $tabButton }) {
    this.$tabButton = $tabButton;
    this.makeTemplate();
    this.initEvent();
  }

  initEvent() {
    this.$tabButton.addEventListener('click', this.toggleButtonHandler.bind(this));
    document.addEventListener('click', this.hideTemplateHandler.bind(this));
  }

  makeTemplate() {
    this.$tabButton.insertAdjacentHTML('afterend', this.template());
  }

  hideTemplateHandler({ target }) {
    if (!target.closest(`#${this.$tabButton.id}`) && !target.closest('.tap_ui')) {
      _.$('.tap_ui').classList.add('display_none');
    }
  }

  toggleButtonHandler() {
    _.$('.tap_ui').classList.toggle('display_none');
  }

  template() {
    return `<div class="tap_ui display_none">
                <a href="#" class="tap_ui__anchor"><div>메시지</div></a>
                <a href="#" class="tap_ui__anchor"><div>여행</div></a>
                <a href="#" class="tap_ui__anchor"><div>저장 목록</div></a>
                <div class="margin8 dark-gray_background height1"></div>
                <a href="#" class="tap_ui__anchor"><div>숙소 호스트 되기</div></a>
                <a href="#" class="tap_ui__anchor"><div>체험 호스팅하기</div></a>
                <a href="#" class="tap_ui__anchor"><div>계정</div></a>
                <div class="margin8 dark-gray_background height1"></div>
                <a href="#" class="tap_ui__anchor"><div>도움말</div></a>
                <a href="#" class="tap_ui__anchor"><div>로그아웃</div></a>
            </div>`;
  }
}

module.exports = TabUI;