const html = (s, ...args) => s.map((ss, i) => `${ss}${args[i] || ""}`).join("");

const NUMBER_OF_DAYS_IN_WEEK = 7;
const NAME_OF_DAYS = [
  { e: "sun", k: "일" },
  { e: "mon", k: "월" },
  { e: "tue", k: "화" },
  { e: "wed", k: "수" },
  { e: "thu", k: "목" },
  { e: "fri", k: "금" },
  { e: "sat", k: "토" },
];

const renderCalendar = ($target) => {
  $target.innerHTML = getCalendarHTML();
};

const processDate = (day) => {
  const date = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();
  return {
    lastMonthLastDate: new Date(year, month, 0),
    thisMonthFirstDate: new Date(year, month, 1),
    thisMonthLastDate: new Date(year, month + 1, 0),
    nextMonthFirstDate: new Date(year, month + 1, 1),
  };
};

const getCalendarHTML = () => {
  let today = new Date();
  let { lastMonthLastDate, thisMonthFirstDate, thisMonthLastDate, nextMonthFirstDate } = processDate(today);
  let calendarContents = [];

  for (let d = 0; d < NUMBER_OF_DAYS_IN_WEEK; d++) {
    calendarContents.push(html`<div class="${NAME_OF_DAYS[d].e} day calendar-cell">${NAME_OF_DAYS[d].k}</div>`);
  }

  for (let d = 0; d < thisMonthFirstDate.getDay(); d++) {
    calendarContents.push(html`<div class="${d % 7 === 0 ? "sun" : ""} calendar-cell past-month">${lastMonthLastDate.getMonth() + 1}/${lastMonthLastDate.getDate() - thisMonthFirstDate.getDay() + d + 1}</div>`);
  }

  for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
    calendarContents.push(html`<div class="${today.getDate() === d + 1 ? "today" : today.getDate() > d + 1 ? "yesterday" : ""} ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? "sun" : ""}${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? "sat" : ""} calendar-cell this-month">${d + 1}</div>`);
  }

  let nextMonthDaysToRender = 7 - (calendarContents.length % 7);
  for (let d = 0; d < nextMonthDaysToRender; d++) {
    calendarContents.push(html`<div class="${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? "sat" : ""} calendar-cell next-month">${nextMonthFirstDate.getMonth() + 1}/${d + 1}</div>`);
  }

  return calendarContents.join("");
};

const date = document.querySelector(".search-check__date");
const calendar = document.querySelector("#calendar");
date.addEventListener("click", () => {
  if (calendar.style.visibility === "hidden") {
    calendar.style.visibility = "visible";
    renderCalendar(calendar);
  } else {
    calendar.style.visibility = "hidden";
  }
});
