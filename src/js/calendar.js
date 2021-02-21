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

// 달력 데이터
// 일단 이번 달부터 출력해보자.

// 1. 이번 달의 1일이 무슨 요일인지 알아내기
const today = new Date();
const year = today.getFullYear();
const currMonth = today.getMonth();
let changedMonth = today.getMonth();
let nextMonth = changedMonth + 1;

function getFirstDay(year, month) {
  let firstDay = new Date(year, month, 1);
  const whatDayOfFirst = firstDay.getDay(); // 1, 즉 월요일
  return whatDayOfFirst;
}

// 2. 이번 달의 마지막 날짜가 며칠인지 알아내기
function getLastDate(year, month) {
  let lastDay = new Date(year, month + 1, 0);
  const lastDate = lastDay.getDate(); // 28
  return lastDate;
}

// 3. monthArr에 숫자 채우기
function makeMonthData(dayOfFirst, lastDate) {
  const monthArr = Array.from({ length: 6 }, () => new Array(7).fill(null));
  let num = 1;
  // 3-1. 1주차 채우기
  for(let i = dayOfFirst; i <= 6; i++) {
    monthArr[0][i] = num;
    num ++;
  }
  // 3-2. 2주차 ~ 마지막주차 채우기
  for(let i = 1; i <= 5; i++) {
    for(let j = 0; j <= 6; j++) {
      if(num > lastDate) break;
      monthArr[i][j] = num;
      num++;
    }
  }
  if(!monthArr[5][0]) monthArr.pop(); // 6주차 날짜가 없으면 삭제
  return monthArr;
}

// 4. monthArr 데이터를 이용하여 화면에 표시하기
// monthArr의 요소를 반복문으로 돌면서 태그 안에 넣을거다.
function renderCalendar(dayOfFirst, lastDate) {
  const monthArr = makeMonthData(dayOfFirst, lastDate);
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
  
  let finalResult = monthArr.reduce((prev, week) => {
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

function init() {
  const dayOfFirst = getFirstDay();
  const lastDate = getLastDate();

  renderCalendar(dayOfFirst, lastDate);
}

init();