const dayList = ['일', '월', '화', '수', '목', '금', '토'];
export const calendarTpl = function (cy, cm, ny, nm) {
   return `
<div class="prev_btn">
<svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
</div>

<div class="calendar_current">
<div class="calendar_y_m">
<span class="year">${cy}년</span>
&nbsp;
<span class="month">${cm}월</span>
</div>
<div class="calendar_d_d">
   <div class="calendar_day">
      <div>${dayList[0]}</div>
      <div>${dayList[1]}</div>
      <div>${dayList[2]}</div>
      <div>${dayList[3]}</div>
      <div>${dayList[4]}</div>
      <div>${dayList[5]}</div>
      <div>${dayList[6]}</div>
   </div>
   <div class="calendar_date"></div>
</div>   
</div>

<div class="calendar_next_month">
<div class="calendar_y_m">
<span class="year">${ny}년</span>
&nbsp;
<span class="month">${nm}월</span>
</div>
<div class="calendar_d_d">
<div class="calendar_day">
   <div>${dayList[0]}</div>
   <div>${dayList[1]}</div>
   <div>${dayList[2]}</div>
   <div>${dayList[3]}</div>
   <div>${dayList[4]}</div>
   <div>${dayList[5]}</div>
   <div>${dayList[6]}</div>
</div>
<div class="calendar_date"></div>
</div>   
</div>

<div class="next_btn">
<svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
</div>`
};