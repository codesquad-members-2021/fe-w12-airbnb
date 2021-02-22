import { CalendarController } from './calendar.js';

class ComponentUI {
  constructor(targetEl, parentEl = null) {
    this.targetEl = targetEl;
    this.parentEl = parentEl;
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
    this.parentEl;
    this.calendar = new CalendarController(this.targetEl, calendarCount, new Date());
  }

  init() {
    this.calendar.init();
    this.calendar.insertViewBefore(this.targetEl.lastElementChild);
    this._onEvents();
  }

  show() { this.targetEl.hidden = false; }
  hide() { this.targetEl.hidden = true; }

  /*
    COMMANT:
    It seems that I have designed wrong, because there are many methods same as 'CalendarController'
  */  
  setPickMode(pickMode) { this.calendar.setPickMode(pickMode); }
  isPickedBeginDate() { return this.calendar.isPickedBeginDate(); }
  isPickedEndDate() { return this.calendar.isPickedEndDate(); }
  registerCustomEventHandler(eventName, handler) { this.calendar.registerCustomEventHandler(eventName, handler); }

  _onEvents() {
    this.targetEl.firstElementChild.addEventListener('click', this._onLeftArrowClick.bind(this));
    this.targetEl.lastElementChild.addEventListener('click', this._onRightArrowClick.bind(this));
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
    this.reservationCalendar.parentEl = this;
    this.reservationCalendar.init();
    this._onEvents();
    this._registerCustomEventHandlers();
  }

  _onEvents() {
    document.addEventListener('mouseup', this._onMouseUpOutside.bind(this));
    this.checkInEl.addEventListener('click', this._onClickCheckIn.bind(this), true);
    this.checkOutEl.addEventListener('click', this._onClickCheckOut.bind(this), true);
  }

  _registerCustomEventHandlers() {
    this.reservationCalendar.registerCustomEventHandler('pickbegin', this._onPickBegin.bind(this));
    this.reservationCalendar.registerCustomEventHandler('pickend', this._onPickEnd.bind(this));
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
      this.reservationCalendar.setPickMode('beginPick');
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
      this.reservationCalendar.setPickMode('endPick');
      this.reservationCalendar.show();
      this.targetEl.focus();
    }
  }

  _onPickBegin(date) {
    const parsedDate = date.toString().split(' ');
    this.checkInEl.lastElementChild.classList.add('bold-text');
    this.checkInEl.lastElementChild.classList.add('color-black');
    this.checkInEl.lastElementChild.innerText = `${parsedDate[1]} ${parsedDate[2]}`;

    if (!this.reservationCalendar.isPickedEndDate()) {
      this._selectCheckOut();
      this.checkOutEl.lastElementChild.classList.remove('bold-text');
      this.checkOutEl.lastElementChild.classList.remove('color-black');
      this.checkOutEl.lastElementChild.innerText = `Select Date`;
    }
  }

  _onPickEnd(date) {
    const parsedDate = date.toString().split(' ');
    this.checkOutEl.lastElementChild.classList.add('bold-text');
    this.checkOutEl.lastElementChild.classList.add('color-black');
    this.checkOutEl.lastElementChild.innerText = `${parsedDate[1]} ${parsedDate[2]}`;

    if (!this.reservationCalendar.isPickedBeginDate()) {
      this._selectCheckIn();
      this.checkInEl.lastElementChild.classList.remove('bold-text');
      this.checkInEl.lastElementChild.classList.remove('color-black');
      this.checkInEl.lastElementChild.innerText = `Select Date`;
    }
  }

  _addCancelButton() {
    // TODO
  }

  _selectCheckIn() {
    this.checkOutEl.classList.remove('selected');
    this.checkInEl.classList.add('selected');
    this.reservationCalendar.setPickMode('beginPick');
  }

  _selectCheckOut() {
    this.checkInEl.classList.remove('selected');
    this.checkOutEl.classList.add('selected');
    this.reservationCalendar.setPickMode('endPick');
  }

  _
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