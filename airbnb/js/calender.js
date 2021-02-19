const today = new Date();
console.log(today);
console.log(typeof(today.getFullYear()));//연도
console.log(today.getMonth());//월-1 (0~11)
console.log(today.getDate());//날짜
console.log(today.getDay()); // 요일

const setCalenderData = (year,month) =>{
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
          if (i == 0 && j < firstDayName) {
            if (j == 0) {

              calHtml +=
                `<div class='calender__day horizontalGutter'><span>${(prevLastDay - (firstDayName - 1) + j)}</span><span></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calender__day'><span>${(prevLastDay - (firstDayName - 1) + j)}</span><span></span></div>`;
            } else {

              calHtml +=
                `<div class='calender__day horizontalGutter'><span>${(prevLastDay - (firstDayName - 1) + j)}</span><span></span></div>`;
            }
          }
          else if (i == 0 && j == firstDayName) {
            if (j == 0) {

              calHtml +=
                `<div class='calender__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calender__day'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else {

              calHtml +=
                `<div class='calender__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            }
          }
          else if (i == 0 && j > firstDayName) {
            if (j == 0) {

              calHtml +=
                `<div class='calender__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calender__day'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else {

              calHtml +=
                `<div class='calender__day horizontalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            }
          }
          else if (i > 0 && startDayCount <= lastDay) {
            if (j == 0) {

              calHtml +=
                `<div class='calender__day horizontalGutter verticalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calender__day verticalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            } else {

              calHtml +=
                `<div class='calender__day horizontalGutter verticalGutter'><span>${startDayCount}</span><span id='${year}${month}${setFixDayCount(startDayCount++)}'></span></div>`;
            }
          }
          else if (startDayCount > lastDay) {
            if (j == 0) {

              calHtml +=
                `<div class='calender__day horizontalGutter verticalGutter'><span>${lastDayCount++}</span><span></span></div>`;
            } else if (j == 6) {

              calHtml +=
                `<div class='calender__day verticalGutter'><span>${lastDayCount++}</span><span></span></div>`;
            } else {

              calHtml +=
                `<div class='calender__day horizontalGutter verticalGutter'><span>${lastDayCount++}</span><span></span></div>`;
            }
          }
        }
      }
      
      //캘린더 div 태그에 내용 붙임
  return calHtml;

}


//setCalenderData 에서 html 시행할때 id 생성용 
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

// 원하는 달의 연도와,달 구해서 calenderHtml 얻기
function getCalenderData(monthNum){
  //과거달 
  //과거달 1년 전까지만 가능
  if(monthNum<0){
    if(today.getMonth()+monthNum <0){
      // const g_year = today.getFullYear()-1;
      const g_year = today.getFullYear()-1;
      const g_month =numToMonth(12+monthNum+today.getMonth());
      return setCalenderData(g_year,g_month);
    }
    else{
      const g_year = today.getFullYear();
      const g_month =numToMonth(today.getMonth()+monthNum);
      return setCalenderData(g_year,g_month);

    }
  }
  //미래달 & 현재달
  //미래달 1년미만의후까지만 가능 
  else if(monthNum>=0){
    const g_year = today.getFullYear();
    const g_month =numToMonth(monthNum+today.getMonth());
    return setCalenderData(g_year,g_month);
  }

}



getCalenderData(-2);
console.log("*******************************************************");
getCalenderData(-1);
console.log("*******************************************************");
getCalenderData(0);
console.log("*******************************************************");
getCalenderData(1);
console.log("*******************************************************");
getCalenderData(2);




// 이벤트 호출 
  const datebtn = document.querySelector("#search__box__date");
  console.log(datebtn);

  const c1h = document.querySelector(".calender-1");
  console.log(c1h);
  const c2h= document.querySelector(".calender-2");
  console.log(c2h);

  datebtn.addEventListener('click',function(e){
      console.log("wTF");
      c1h.insertAdjacentHTML("beforeend", getCalenderData(0));
      c2h.insertAdjacentHTML("beforeend", getCalenderData(1));

  });