import Toggle from "./toggle.js";
import { calendarEvent } from "./calendar.js";

// 계정 버튼
const accountButton = document.querySelector("#account");
const accountLayer = new Toggle("account__layer");

accountButton.addEventListener("click", () => {
  accountLayer.init();
});

// 검섹바 - 달력
// 체크인 버튼 - 체크인용 달력
const checkInButton = document.querySelector(".check-in");
const calendarCheckIn = new Toggle("calendar__check-in");
// 체크아웃 버튼 - 체크아웃용 달력
const checkOutButton = document.querySelector(".check-out");
const calendarCheckOut = new Toggle("calendar__check-out");
// 체험 > 날짜 버튼 - 체험 날짜용 달력
const experienceDateButton = document.querySelector(".experience-date");
const calendarExperienceDate = new Toggle("calendar__experience-date");

const isChecked = (button) => {
  return button.classList.contains("checked") ? true : false;
};

// const createCalendar = (calendarElement) => {
//   const today = new Date();
//   for (let i = 0; i < 2; i++) {
//     const calendar = new Calendar([today.getFullYear(), today.getMonth() + i], calendarElement);
//     calendar.setCalendarData(calendar.day.getFullYear(), calendar.day.getMonth() + 1);
//   }
// };

// const calendarEvent = (item) => {
//   item.element.innerHTML = ``;
//   createCalendar(item.element);
//   item.init();
// };

checkInButton.addEventListener("click", () => {
  if (calendarCheckOut.has("visible")) calendarCheckOut.rename("visible", "hidden");
  // 현재 탭 클릭 시 그림자 효과 주기 위한 checked 클래스 추가
  isChecked(checkInButton) ? checkInButton.classList.remove("checked") : checkInButton.classList.add("checked");
  calendarEvent(calendarCheckIn);
});

checkOutButton.addEventListener("click", () => {
  if (calendarCheckIn.has("visible")) calendarCheckIn.rename("visible", "hidden");
  // 현재 탭 클릭 시 그림자 효과 주기 위한 checked 클래스 추가
  isChecked(checkOutButton) ? checkOutButton.classList.remove("checked") : checkOutButton.classList.add("checked");
  calendarEvent(calendarCheckOut);
});

experienceDateButton.addEventListener("click", () => {
  console.log(`experienceDateButton`);
  isChecked(experienceDateButton) ? experienceDateButton.classList.remove("checked") : experienceDateButton.classList.add("checked");
  calendarEvent(calendarExperienceDate);
});

const isContain = (node, target) => {
  return node.contains(target) ? true : false;
};

document.addEventListener("click", (e) => {
  // 외부 클릭 시 레이어 숨기는 이벤트

  if (!isContain(accountLayer.element, e.target) && !isContain(accountButton, e.target)) {
    // 계정 버튼 클릭시 나오는 레이어의 외부를 클릭했을 때

    if (!isContain(checkInButton, e.target) && !isContain(calendarCheckIn.element, e.target)) {
      // 체크인 버튼과 체크인 달력의 외부를 클릭했을 때
      console.log("outside of calendarCheckIn");
      calendarCheckIn.hide();
      checkInButton.classList.remove("checked");
    }
    if (!isContain(checkOutButton, e.target) && !isContain(calendarCheckOut.element, e.target)) {
      // 체크아웃 버튼과 체크아웃 달력의 외부를 클릭했을 때
      console.log("outside of calendarCheckOut");
      calendarCheckOut.hide();
      checkOutButton.classList.remove("checked");
    }
    if (!isContain(experienceDateButton, e.target) && !isContain(calendarExperienceDate.element, e.target)) {
      console.log(`outside of calendarExperienceDate`);
      calendarExperienceDate.hide();
      experienceDateButton.classList.remove("checked");
    }

    accountLayer.hide();
  }
});

// 숙소, 체험 탭 테스트
const stay = document.querySelector(".stay");
const experiences = document.querySelector(".experiences");
const searchBarForStay = document.querySelector(".search-bar__stay");
const searchBarForExperiences = document.querySelector(".search-bar__experiences");

stay.addEventListener("click", () => {
  console.log("stay");

  experiences.childNodes[3].classList.remove("set__underBar");
  stay.childNodes[3].classList.add("set__underBar");

  searchBarForStay.classList.remove("none");
  searchBarForExperiences.classList.add("none");
});

experiences.addEventListener("click", () => {
  console.log("experiences");

  stay.childNodes[3].classList.remove("set__underBar");
  experiences.childNodes[3].classList.add("set__underBar");

  searchBarForExperiences.classList.remove("none");
  searchBarForStay.classList.add("none");
});
