import Toggle from "./toggle.js";
import NavTab from "./nav.js";
import { calendarCheckIn, checkInButton } from "./calendars/checkInCalendar.js";
import { calendarCheckOut, checkOutButton } from "./calendars/checkOutCalendar.js";
import { calendarExperienceDate, experienceDateButton } from "./calendars/experienceDateCalendar.js";

// 검색바 위에 위치한 탭
const stay = new NavTab("stay", "experiences", "search-bar__stay", "search-bar__experiences");
stay.eventListen();
const experiences = new NavTab("experiences", "stay", "search-bar__experiences", "search-bar__stay");
experiences.eventListen();

// 계정 버튼
const accountButton = document.querySelector("#account");
const accountLayer = new Toggle("account__layer");

accountButton.addEventListener("click", () => {
  accountLayer.init();
});

// // 검섹바 - 달력
// const calendarCheckIn = new Toggle("calendar__background_check-in");
// const checkInButton = document.querySelector(".check-in");
// // 체크아웃 버튼 - 체크아웃용 달력
// const checkOutButton = document.querySelector(".check-out");
// const calendarCheckOut = new Toggle("calendar__background_check-out");
// // 체험 > 날짜 버튼 - 체험 날짜용 달력
// const experienceDateButton = document.querySelector(".experience-date");
// const calendarExperienceDate = new Toggle("calendar__background_experience-date");

// const isChecked = (button) => {
//   return button.classList.contains("checked");
// };

// checkInButton.addEventListener("click", () => {
//   if (calendarCheckOut.has("visible")) calendarCheckOut.rename("visible", "hidden");
//   // 현재 탭 클릭 시 그림자 효과 주기 위한 checked 클래스 추가
//   isChecked(checkInButton) ? checkInButton.classList.remove("checked") : checkInButton.classList.add("checked");
//   // calendarEvent(calendarCheckIn);
// });

// checkOutButton.addEventListener("click", () => {
//   if (calendarCheckIn.has("visible")) calendarCheckIn.rename("visible", "hidden");
//   // 현재 탭 클릭 시 그림자 효과 주기 위한 checked 클래스 추가
//   isChecked(checkOutButton) ? checkOutButton.classList.remove("checked") : checkOutButton.classList.add("checked");
//   // calendarEvent(calendarCheckOut);
// });

// experienceDateButton.addEventListener("click", () => {
//   isChecked(experienceDateButton) ? experienceDateButton.classList.remove("checked") : experienceDateButton.classList.add("checked");
//   // calendarEvent(calendarExperienceDate);
// });

const isContain = (node, target) => {
  return node.contains(target);
};

document.addEventListener("click", (e) => {
  // 외부 클릭 시 레이어 숨기는 이벤트
  const { target } = e;

  if (!isContain(accountLayer.element, target) && !isContain(accountButton, target)) {
    // 계정 버튼 클릭시 나오는 레이어의 외부를 클릭했을 때

    if (!isContain(checkInButton, target) && !isContain(calendarCheckIn.element, target)) {
      // 체크인 버튼과 체크인 달력의 외부를 클릭했을 때
      //   console.log("outside of calendarCheckIn");
      calendarCheckIn.hide();
      checkInButton.classList.remove("checked");
    }
    if (!isContain(checkOutButton, target) && !isContain(calendarCheckOut.element, target)) {
      // 체크아웃 버튼과 체크아웃 달력의 외부를 클릭했을 때
      //   console.log("outside of calendarCheckOut");
      calendarCheckOut.hide();
      checkOutButton.classList.remove("checked");
    }
    if (!isContain(experienceDateButton, target) && !isContain(calendarExperienceDate.element, target)) {
      //   console.log(`outside of calendarExperienceDate`);
      calendarExperienceDate.hide();
      experienceDateButton.classList.remove("checked");
    }

    accountLayer.hide();
  }
});
