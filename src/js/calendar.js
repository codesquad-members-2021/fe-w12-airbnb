// 달력 토글 이벤트

const checkinButton = document.querySelector('.search-bar__checkin');
const checkoutButton = document.querySelector('.search-bar__checkout');
const calendrUI = document.querySelector('.header__calendar-container');

checkinButton.addEventListener('click', (e) => {
  calendrUI.classList.toggle('display-none');
  e.stopPropagation()
});

checkoutButton.addEventListener('click', (e) => {
  calendrUI.classList.toggle('display-none');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if(e.target !== calendrUI) {
    calendrUI.classList.add('display-none')
  }
})

// 달력 데이터 관리
class CalendarModel {
  constructor() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.currMonth = this.today.getMonth();
    this.changedMonth = this.today.getMonth();
    this.nextMonth = this.changedMonth + 1;
  }

  init() {
    this.makeCalendarArr(this.year, this.currMonth); // month값이 버튼 클릭할 때마다 바뀌어야 하는데..
  }

  getFirstDay(year, month) {
    let firstDay = new Date(year, month, 1);
    const whatDayOfFirst = firstDay.getDay();
    return whatDayOfFirst;
  }

  getLastDate(year, month) {
    let lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();
    return lastDate;
  }

  makeCalendarArr(year, month) {
    const dayOfFirst = this.getFirstDay(year, month);
    const lastDate = this.getLastDate(year, month);
    const calendarArr = Array.from({ length: 6 }, () => new Array(7).fill(null));
    let num = 1;
    // 1. 1주차 채우기
    for(let i = dayOfFirst; i <= 6; i++) {
      calendarArr[0][i] = num;
      num++;
    }
    // 2. 2주차 ~ 마지막주차 채우기
    for(let i = 1; i <= 5; i++) {
      for(let j = 0; j <= 6; j++) {
        if(num > lastDate) break;
        calendarArr[i][j] = num;
        num++;
      }
    }
    if(!calendarArr[5][0]) calendarArr.pop(); // 6주차 날짜가 없으면 삭제
    console.log(calendarArr);
    return calendarArr;
  }
}

// 사용자의 조작 - 이벤트 핸들러는 여기에
class CalendarController {

}

// 화면에 달력 데이터 뿌려줌
class CalendarView {

}



// calendarArr 데이터를 이용하여 화면에 표시하기
function renderCalendar(dayOfFirst, lastDate) { // 파라미터 calendarArr을 받아오도록 수정하기
  const calendarArr = makeMonthData(dayOfFirst, lastDate);
  const tbody = document.querySelector('tbody');
  const daysTemplete = `
    <tr>
      <th scope="col">일</th>
      <th scope="col">월</th>
      <th scope="col">화</th>
      <th scope="col">수</th>
      <th scope="col">목</th>
      <th scope="col">금</th>
      <th scope="col">토</th>
    </tr>
  `
  
  let finalResult = calendarArr.reduce((prev, week) => {
    let result = week.reduce((prev, day) => {
      if(!day) day = '';
      return prev + `<td>${day}</td>`;
    }, '<tr>')
    result += '</tr>';
    
    return prev + result;
  }, daysTemplete);
  
  console.log(finalResult);
  tbody.innerHTML = finalResult;
}


// ------------------------------------- 테스트 -------------------------------------
const model = new CalendarModel();
model.init();