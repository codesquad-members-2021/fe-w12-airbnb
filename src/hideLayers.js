import { accountButton, accountLayer } from "./accounts.js";
import { initSelectedDateState } from "./calendars/functions/calendarDateStates.js";
import { calendarCheckIn, checkInButton } from "./calendars/checkInCalendar.js";
import { calendarCheckOut, checkOutButton } from "./calendars/checkOutCalendar.js";
import { calendarExperienceDate, experienceDateButton, experienceDateStart, experienceDateEnd, placeholder } from "./calendars/experienceDateCalendar.js";

const isContain = (node, target) => node.contains(target);

const hideLayers = () => {
  document.addEventListener("click", ({ target }) => {
    // 외부 클릭 시 레이어 숨기는 이벤트

    if (!isContain(accountLayer.element, target) && !isContain(accountButton, target)) {
      // 계정 버튼 클릭시 나오는 레이어의 외부를 클릭했을 때

      if (!isContain(checkInButton, target) && !isContain(calendarCheckIn.element, target)) {
        // 체크인 버튼과 체크인 달력의 외부를 클릭했을 때
        calendarCheckIn.hide();
        checkInButton.classList.remove("checked");
      }
      if (!isContain(checkOutButton, target) && !isContain(calendarCheckOut.element, target)) {
        // 체크아웃 버튼과 체크아웃 달력의 외부를 클릭했을 때
        calendarCheckOut.hide();
        checkOutButton.classList.remove("checked");
      }
      if (!isContain(experienceDateButton, target) && !isContain(calendarExperienceDate.element, target)) {
        calendarExperienceDate.hide();
        placeholder.classList.remove("none"); // 외부클릭 했으니까 원래 placeholder 글자 나오도록
        experienceDateStart.innerText = ``;
        experienceDateEnd.innerText = ``;
        experienceDateButton.classList.remove("checked");
        initSelectedDateState(); // startDate, endDate 값을 모두 초기화
      }
      accountLayer.hide();
    }
  });
};

export { hideLayers };
