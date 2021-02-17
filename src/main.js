import Toggle from "./toggle.js";
import NavTab from "./nav.js";
import { calendarCheckIn, checkInButton } from "./calendars/checkInCalendar.js";
import { calendarCheckOut, checkOutButton } from "./calendars/checkOutCalendar.js";
import { calendarExperienceDate, experienceDateButton, experienceDateStart, experienceDateEnd, placeholder } from "./calendars/experienceDateCalendar.js";

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

const isContain = (node, target) => {
  return node.contains(target);
};

// calendar 날짜 선택

const calendarDate = document.querySelectorAll(".calendar__date");
calendarDate.forEach((date) => {
  date.addEventListener("click", () => {
    console.log("clicked");
  });
});

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
      placeholder.classList.remove("none"); // 외부클릭 했으니까 원래 placeholder 글자 나오도록
      experienceDateStart.innerText = ``;
      experienceDateEnd.innerText = ``;
      experienceDateButton.classList.remove("checked");
    }

    accountLayer.hide();
  }
});
