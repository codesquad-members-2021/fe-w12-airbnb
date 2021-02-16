export class TopMenu {
  constructor(targetEl) {
    this.targetEl = targetEl;
    this.accommodations = targetEl[0];
    this.activity = targetEl[1];
  }

  onEvents() {
    this.activity.addEventListener('click', this.activityHandler);
    this.accommodations.addEventListener('click', this.accommodationHandler);
  }

  accommodationHandler() {
    const detailsForRooms = document.querySelectorAll('.input-for-rooms');
    detailsForRooms.forEach((input) =>
      input.classList.remove('check-inout-hidden')
    );

    const dateInput = document.querySelector('.input-date');
    if (dateInput) {
      dateInput.classList.remove('input-date');
      dateInput.classList.add('input-date-hidden');
    }
  }

  activityHandler() {
    const detailsForRooms = document.querySelectorAll('.input-for-rooms');
    detailsForRooms.forEach((input) =>
      input.classList.add('check-inout-hidden')
    );

    const dateInputHidden = document.querySelector('.input-date-hidden');
    if (dateInputHidden) {
      dateInputHidden.classList.remove('input-date-hidden');
      dateInputHidden.classList.add('input-date');
    }
  }
}
