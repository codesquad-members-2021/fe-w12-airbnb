/*======= CalendarIndicator =======
[ ] 체험 탭의 '날짜' 버튼 누르면 → 밑에 달력 요소 생김
[ ] '날짜'버튼 재클릭하면 → 사라짐 (toggle)

========= CalendarMaker =========
[✔] 이번달 1일 날짜의 Date 객체 만들기
    → new Date(year, month, 1)
    → Mon Feb 01 2021 00:00:00 GMT+0900
[✔] 이번달 1일 요일 구하기 〰 firstDayName
    → (요일 = 1일 앞 빈 요소 개수)
[✔] 이번달 마지막 날짜 구하기 〰 lastDay
[ ] 날짜 요소 그리기 (7열 5~6행)
    → (빈 요소 ~ 이번달 1일 ~ 이번달 마지막 날짜)*/


// 연습 코드
const today = new Date();
const year = today.getFullYear(); // 2021
const month = today.getMonth();   // 1

const setCalendarData = (year, month) => {
    const firstDayName = new Date(year, month, 1).getDay(); // 1(월)
    const lastDay = new Date(year, month + 1, 0).getDate(); // 28
};


export default class CalendarMaker {
    constructor() {

    }
}