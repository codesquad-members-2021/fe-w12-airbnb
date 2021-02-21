const today = new Date();
// console.log(today);
// console.log(typeof(today.getFullYear()));//연도
// console.log(today.getMonth());//월-1 (0~11)
// console.log(today.getDate());//날짜
// console.log(today.getDay()); // 요일

const setcalendarData = (year,month) =>{
    console.log("함수 결과 무슨달",month);
    console.log("함수결과 무슨연도",year);
    let calHtml="";
    //오늘날 날짜 객체  / 이번달 1째날짜 / 이번달 1째요일 / 이번달 막 날짜 / 지난달 막 날짜
    const setDate = new Date(year,month-1,1);
    //이번달 1째날짜 
    const firstDay = setDate.getDate();
    //이번달 1째요일 
    const firstDayName = setDate.getDay();
    //이번달 막 날짜 
    const lastDay = new Date(year,month,0).getDate();
    //지난달 막 날짜
    const prevLastDay = new Date(year,month-1,0).getDate();
    //이번달의 일수 구하기
    let startDayCount = 1;
    let lastDayCount = 1;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          //이번달 시작요일 이전
          if (i == 0 && j < firstDayName) {
            calHtml +=
              `<div class='calendar__day borderHidden'>&nbsp;</div>`;
          }
          //이번달 시작 요일일 때
          else if (i == 0 && j == firstDayName) {
            if (j == 0) {

              calHtml +=
                `<div class='calendar__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calendar__day'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else {

              calHtml +=
                `<div class='calendar__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            }
          }
          //이번달 시작요일 이후일 때
          else if (i == 0 && j > firstDayName) {
            if (j == 0) {

              calHtml +=
                `<div class='calendar__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calendar__day'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else {

              calHtml +=
                `<div class='calendar__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            }
          }
          //이번달의 마지막날, 혹은 그 이전일 때
          else if (i > 0 && startDayCount <= lastDay) {
            if (j == 0) {

              calHtml +=
                `<div class='calendar__day horizontalGutter verticalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calendar__day verticalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else {

              calHtml +=
                `<div class='calendar__day horizontalGutter verticalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            }
          }
          //이번달의 마지막날 이후일 때
          else if (startDayCount > lastDay) {
            calHtml +=
              `<div class='calendar__day borderHidden'>&nbsp;</div>`;

          }
        }
      }
      
      //캘린더 div 태그에 내용 붙임
  return calHtml;

}


//setcalendarData 에서 html 시행할때 id 생성용 
const setFixDayCount = number => {
    let fixNum = "";
    if (number <= 10) {
      fixNum = "0" + (number - 1);
    } else {
      fixNum = number - 1;
    }
    return fixNum;
}

// 달-1 받아서 달 로 만듦
function numToMonth(num){
  if (num+1<10){
    return "0"+(num+1);
  }
  else{
    return ""+(num+1);
  }
}



// 원하는 달의 연도와,달 구해서 calendarHtml 얻기
function getcalendarData(monthNum){
  //과거달 
  //과거달 1년 전까지만 가능
  if(monthNum<0){
    if(today.getMonth()+monthNum <0){
      // const g_year = today.getFullYear()-1;
      const g_year = today.getFullYear()-1;
      const g_month =numToMonth(12+monthNum+today.getMonth());
      return setcalendarData(g_year,g_month);
    }
    else{
      const g_year = today.getFullYear();
      const g_month =numToMonth(today.getMonth()+monthNum);
      return setcalendarData(g_year,g_month);

    }
  }
  //미래달 & 현재달
  //미래달 1년미만의후까지만 가능 
  else if(monthNum>=0){
    const g_year = today.getFullYear();
    const g_month =numToMonth(monthNum+today.getMonth());
    return setcalendarData(g_year,g_month);
  }

}


// 이벤트 호출 

//달력 삽입
const datebtn = document.querySelector("#search__box__date");
const calendar__zone = document.querySelector(".calendar__zone");

const c1h = document.querySelector(".calendar-1");
const c2h= document.querySelector(".calendar-2");
const c3h= document.querySelector(".calendar-3");
const c4h= document.querySelector(".calendar-3");


//날짜 입력시 캘린더 drop 
datebtn.addEventListener('click',function(e){
    console.log("wTF");
    calendar__zone.classList.toggle('act');
});

//달력 삽입
c1h.insertAdjacentHTML("beforeend", getcalendarData(0));
c2h.insertAdjacentHTML("beforeend", getcalendarData(1));
c3h.insertAdjacentHTML("beforeend",getcalendarData(2));
c3h.insertAdjacentHTML("beforeend",getcalendarData(3));

//달력 외 클릭 시 닫힘 
datebtn.addEventListener('blur',function(e){
  calendar__zone.classList.remove('act');

});


//달력 이동 이벤트  
const calendar__box = document.querySelector(".calendar__box");
const calendar__next_btn = document.querySelector(".calendar__next-btn-real");
const calendar__prev_btn = document.querySelector(".calendar__prev-btn-real");

//달력 오른쪽 버튼
calendar__next_btn.addEventListener('click',function(e){
  console.log("후 버튼 누름");
  calendar__box.classList.add('shiftCalendarRight');  
})

//달력 왼쪽 버튼 
calendar__prev_btn.addEventListener('click',function(e){
  console.log("전 버튼 누름");
  calendar__box.classList.remove('shiftCalendarRight');  

  // calendar__box.classList.add('shiftCalendarRight');  
})
