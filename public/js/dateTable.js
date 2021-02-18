//날짜 테이블 만들기
class Calandar {
  constructor() {}

  showCalendar() {}
}

window.addEventListener("DOMContentLoaded", () => {
  const calendarDiv = document.querySelector(".calendar");
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), 1);

  const thisDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const nextDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0
  ).getDate();
  const currentCalendar = Array.from({ length: thisDate }, (_, i) => i + 1);
  const nextCalendar = Array.from({ length: nextDate }, (_, i) => i + 1);
});
