import { CalendarController } from './calendar.js';

class ComponentUI {
  constructor(targetEl) {
    this.targetEl = targetEl;
  }

  onEvents() { throw new Error('Abstract function!'); }
}

class ContainerUI extends ComponentUI {
}

class ChildUI extends ComponentUI {
}

class CenterMenuChildUI extends ChildUI {
  onEvents() {
    this.targetEl.addEventListener('mouseover', this._onMouseOver);
    this.targetEl.addEventListener('mouseout', this._onMouseOut);
    this.targetEl.addEventListener('click', this._onClick);
  }

  _onMouseOver(evt) {
    evt.preventDefault();

    if (evt.target.previousElementSibling.checked)
      return;

    evt.target.classList.remove('cursor-default');
    evt.target.classList.add('color-gray');
  }

  _onMouseOut(evt) {
    evt.preventDefault();

    if (evt.target.previousElementSibling.checked)
      return;

    evt.target.classList.remove('cursor-default');
    evt.target.classList.remove('color-gray');
  }

  _onClick(evt) {
    evt.preventDefault();

    if (evt.target.previousElementSibling.checked)
      return;

    evt.target.previousElementSibling.checked = true;
    evt.target.classList.add('cursor-default');
    evt.target.classList.remove('color-gray');

    document.querySelector('#search-bar').dispatchEvent(
      new CustomEvent('change', {
        detail: {
          text: evt.target.innerText
        },
        bubbles: true,
        cancelable: true
      })
    );
  }
}

class SearchBarUI extends ContainerUI {
  onEvents() {
    this.targetEl.addEventListener('change', this._onChange.bind(this));
    this.backupInnerHTML;
  }

  _onChange(evt) {
    const searchBar = document.querySelector('#search-bar')

    // tmp
    if (this.backupInnerHTML) {
      searchBar.innerHTML = this.backupInnerHTML;
      searchBar.classList.remove('not-supported');
      this.backupInnerHTML = null;
    }

    const removable = document.querySelector('#search-bar > .removable');

    switch (evt.detail.text) {
      case '숙소':
        removable.hidden = false;
        document.querySelectorAll('#search-bar > .solid-rounded').forEach(el => el.classList.remove('search-bar-ver2'));
        break;
      case '체험':
        removable.hidden = true;
        document.querySelectorAll('#search-bar > .solid-rounded').forEach(el => el.classList.add('search-bar-ver2'));
        break;
      case '온라인 체험':
        this.backupInnerHTML = searchBar.innerHTML;
        searchBar.innerHTML = '지원안함';
        searchBar.classList.add('not-supported');
        break;
      default:
        throw new Error('Not reached!');
    }
  }
}

class SearchBarChildUI extends ChildUI {
  onEvents() {
    // this.targetEl.addEventListener('mouseover', this.targetEl._onMouseOver);
    // this.targetEl.addEventListener('mouseout', this.targetEl._onMouseOut);
  }

  // _onMouseOver(evt) {
  //   evt.target.classList.add('background-color-gray');
  // }

  // _onMouseOut(evt) {
  //   evt.target.classList.remove('background-color-gray');
  // }
}

class RightMenuChildWithPopupUI extends ChildUI {
  constructor(targetEl, popupMenu) {
    super(targetEl);
    this.popupMenu = popupMenu;
  }

  onEvents() {
    this.targetEl.addEventListener('click', this._onClick.bind(this));
  }

  _onClick() {
    if (this.popupMenu.isShown()) {
      this.popupMenu.hide();
    } else {
      this.popupMenu.show();
      this.popupMenu.focus();
    }
  }
}

class PopupMenuUI {
  constructor(targetEl) {
    this.targetEl = targetEl;
  }

  isShown() { return !this.targetEl.hidden; }
  show() { this.targetEl.hidden = false; }
  hide() { this.targetEl.hidden = true; }
  focus() { this.targetEl.focus(); }

  onEvents() {
    this.targetEl.addEventListener('blur', this._onBlur);
  }

  _onBlur({ target, relatedTarget }) {
    if (relatedTarget === target.parentElement)
      return;

    target.hidden = true;
  }
}

class ReservationCalendarUI extends ContainerUI {
  constructor(targetEl, calendarCount) {
    super(targetEl);
    this.calendar = new CalendarController(this.targetEl, calendarCount, new Date());
  }

  init() {
    this.calendar.init();
    this.calendar.insertViewBefore(this.targetEl.lastElementChild);
    this._onEvents();
  }

  show() { this.targetEl.hidden = false; }
  hide() { this.targetEl.hidden = true; }

  _onEvents() {
    this.targetEl.addEventListener('focus', this._onFocus.bind(this), true);
    this.targetEl.addEventListener('blur', this._onBlur.bind(this), true);
    this.targetEl.firstElementChild.addEventListener('click', this._onLeftArrowClick.bind(this));
    this.targetEl.lastElementChild.addEventListener('click', this._onRightArrowClick.bind(this));
  }

  _onFocus(evt) {
    evt.stopPropagation();
  }

  _onBlur(evt) {
    evt.stopPropagation();
  }

  _onLeftArrowClick() {
    this.calendar.changeToPrevMonth();
  }

  _onRightArrowClick() {
    this.calendar.changeToNextMonth();
  }
}

class AccommodationReservationCheckContainer {
  constructor(targetEl, reservationCalendar) {
    this.targetEl = targetEl;
    this.checkInEl = targetEl.querySelector('#check-in');
    this.checkOutEl = targetEl.querySelector('#check-out');
    this.reservationCalendar = reservationCalendar;
  }

  init() {
    this.reservationCalendar.init();
    this._onEvents();
  }

  _onEvents() {
    document.addEventListener('mouseup', this._onMouseUpOutside.bind(this));
    this.checkInEl.addEventListener('click', this._onClickCheckIn.bind(this), true);
    this.checkOutEl.addEventListener('click', this._onClickCheckOut.bind(this), true);
  }
  
  _onMouseUpOutside({ target }) {
    if (this.targetEl.contains(target) || this.checkInEl.contains(target) || this.checkOutEl.contains(target))
      return;

    this.reservationCalendar.hide();
    this.checkInEl.classList.remove('selected');
    this.checkOutEl.classList.remove('selected');
  }

  _onClickCheckIn() {
    this.checkOutEl.classList.remove('selected');
    
    if (this.checkInEl.classList.contains('selected')) {
      this.checkInEl.classList.remove('selected');
      this.reservationCalendar.hide();
    } else {
      this.checkInEl.classList.add('selected');
      this.reservationCalendar.show();
      this.targetEl.focus();
    }
  }

  _onClickCheckOut() {
    this.checkInEl.classList.remove('selected');
    
    if (this.checkOutEl.classList.contains('selected')) {
      this.checkOutEl.classList.remove('selected');
      this.reservationCalendar.hide();
    } else {
      this.checkOutEl.classList.add('selected');
      this.reservationCalendar.show();
      this.targetEl.focus();
    }
  }

  _addCancelButton() {
    // TODO
  }
}

function main() {
  const searchBar = new SearchBarUI(document.querySelector('#search-bar'));
  searchBar.onEvents();

  const searchBarChild = [...document.querySelectorAll('#search-bar > .pointable')].map(el => new SearchBarChildUI(el));
  searchBarChild.forEach(el => el.onEvents());

  const centerMenuChild = [...document.querySelectorAll('#center-menu > span')].map(el => new CenterMenuChildUI(el));
  centerMenuChild.forEach(el => el.onEvents());

  const popupMenu = new PopupMenuUI(document.querySelector('#popup-menu'));
  popupMenu.onEvents();

  const rightMenuChildWithPopup = new RightMenuChildWithPopupUI(document.querySelector('#right-menu > .solid-rounded:first-child'), popupMenu);
  rightMenuChildWithPopup.onEvents();

  const reservationCalendar = new ReservationCalendarUI(document.querySelector('#accommodation-reservation-calendar'), 2);
  const accommodationReservationCheckContainer = new AccommodationReservationCheckContainer(document.querySelector('#accommodation-reservation-check-container'), reservationCalendar);
  accommodationReservationCheckContainer.init();
}

main();