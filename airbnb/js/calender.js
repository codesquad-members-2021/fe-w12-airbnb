const today = new Date();
console.log(today);
console.log(today.getFullYear());//연도
console.log(today.getMonth());//월-1 (0~11)
console.log(today.getDate());//날짜
console.log(today.getDay()); // 요일

const setCalenderData = (year,month) =>{
    let calHtml="";
    //오늘날 날짜 객체  / 이번달 1째날짜 / 이번달 1째요일 / 이번달 막 날짜 / 지난달 막 날짜
    const setDate = new Date(year,month-1,1);
    //이번달 1째날짜 
    const firstDay = setDate.getDate();
    //이번달 1째요일 
    const firstDayName = setDate.getDay();
    //이번달 막 날짜 
    const lastDay = new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
    //지난달 막 날짜
    const prevLastDay = new Date(today.getFullYear(),today.getMonth(),0).getDate();

    //이번달의 일수 구하기
    let startDayCount = 1;
    let lastDayCount = 1;

    for (let i = 0; i < 5; i++) {
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
      const datebtn = document.querySelector("#search__box__date");
      console.log(datebtn);
      const html__cal = document.querySelector(".calender");
      console.log(html__cal);

      datebtn.addEventListener('click',function(e){
          console.log("wTF");
          html__cal.insertAdjacentHTML("beforeend", calHtml);

      });

}



const setFixDayCount = number => {
    let fixNum = "";
    if (number <= 10) {
      fixNum = "0" + (number - 1);
    } else {
      fixNum = number - 1;
    }
    return fixNum;
}

if (today.getMonth() + 1 < 10) {
    setCalenderData(today.getFullYear(), "0" + (today.getMonth() + 1));
  } else {
    setCalenderData(today.getFullYear(), "" + (today.getMonth() + 1));
  }