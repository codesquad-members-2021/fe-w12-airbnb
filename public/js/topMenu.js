export class TopMenu {
  constructor(targetEl) {
    this.targetEl = targetEl;
    [this.accommodations, this.activity] = targetEl;
  }

  onEvents() {
    this.activity.addEventListener('click', this.activityHandler);
    this.accommodations.addEventListener('click', this.accommodationHandler);
  }

  accommodationHandler() {
    const detailsForRooms = document.querySelectorAll('.input-for-rooms');
    detailsForRooms.forEach((input) => input.classList.remove('input-hidden'));

    const dateInput = document.querySelector('.input-date');
    dateInput.classList.add('input-hidden');
  }

  activityHandler() {
    const detailsForRooms = document.querySelectorAll('.input-for-rooms');
    detailsForRooms.forEach((input) => input.classList.add('input-hidden'));

    const dateInput = document.querySelector('.input-date');
    dateInput.classList.remove('input-hidden');
  }
}
