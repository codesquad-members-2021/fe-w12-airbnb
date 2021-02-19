(function (window, document) {
  'use strict';
  const DATE = new Date();
  let day = DATE.getDay();
  let month = DATE.getMonth() + 1;
  let fullYear = DATE.getFullYear();

  const WEEKDAY = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };

  const $monthlyTitle = document.querySelector('.monthly--title');

  // 돔 생성 (그리기)

  // title -->
  // .upper > title
  $monthlyTitle.innerHTML = `${fullYear}년 ${month}월`;
  console.log($monthlyTitle);

  // week -->
  // .weekdays > ul > li * 7

  // day -->
  // table > tbody > tr > td * 7 > div * 7

  // 데이터 생성 (분리)
  // 데이터 넣기

  console.log(`DATE: ${DATE}`);
  console.log(`day: ${WEEKDAY[day]}`);
  console.log(`month: ${month}`);
  console.log(`fullYear: ${fullYear}`);
})(window, document);
