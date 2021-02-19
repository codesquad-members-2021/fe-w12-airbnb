import { stayNavTab, experiencesNavTab } from "./navTab/navMain.js";
import { checkInTab, checkOutTab, experienceDateTab } from "./searchBar/searchBarMain.js";
import { hideLayers } from "./hideLayers.js";
import { executeToggle } from "./account.js";
import { calendarExperienceDate, experienceDateStart, experienceDateEnd, placeholder, CM_experienceDate } from "./calendars/experienceDateCalendar.js";
import { calendarCheckIn, CM_checkIn } from "./calendars/checkInCalendar.js";
import { calendarCheckOut, CM_checkOut } from "./calendars/checkOutCalendar.js";

// 검색바 위에 위치한 탭
stayNavTab.eventListen();
experiencesNavTab.eventListen();

// searchBar - 탭 클릭 시 그림자효과
checkOutTab.focusEvent(calendarCheckIn);
checkInTab.focusEvent(calendarCheckOut);
experienceDateTab.focusEvent();

// 계정 버튼 클릭시 레이어 동작
executeToggle();

// 달력
// 체험 -> 날짜
CM_experienceDate.showPresentCalendar(calendarExperienceDate, experienceDateStart, experienceDateEnd, placeholder);
CM_experienceDate.showPrevCalendar(experienceDateStart, experienceDateEnd, placeholder);
CM_experienceDate.showNextCalendar(experienceDateStart, experienceDateEnd, placeholder);

// 아래 달력은 띄우기 동작만
// 숙소 -> 체크인
CM_checkIn.showPresentCalendar(calendarCheckIn);
CM_checkIn.showPrevCalendar();
CM_checkIn.showNextCalendar();
// 숙소 -> 체크아웃
CM_checkOut.showPresentCalendar(calendarCheckOut);
CM_checkOut.showPrevCalendar();
CM_checkOut.showNextCalendar();

// 외부 클릭시 레이어 숨기기
hideLayers();
