const CALENDAR_CSS = "calendar_css";
const CALENDAR_DISPLAY = "calendar_display";
const CALENDAR_FLEX = "cal_flex"
const CALENDAR_OUT = document.querySelector("#calendar_out");

const BOX = document.createElement("div");
BOX.classList.add(CALENDAR_CSS);
BOX.classList.add(CALENDAR_DISPLAY);

const cal = document.createElement("div");
cal.classList.add(CALENDAR_FLEX);

cal.innerHTML = `
                    <table class="calendar">
                        <tr>
                            <td>
                                <font size=1%; color="#B3B6B3">
                                    <label onclick="beforeMon()" class="before"></label>
                                </font>
                            </td>
                            <td colspan="5" class="yearmonth"></td>
                        </tr>
                        <tr>
                            <td>
                                <font color="#FF9090">일</font>
                            </td>
                            <td> 월 </td>
                            <td> 화 </td>
                            <td> 수 </td>
                            <td> 목 </td>
                            <td> 금 </td>
                            <td>
                                <font color=#7ED5E4>토</font>
                            </td>
                        </tr>
                    </table>
                
                
                    <table class="calendar2">
                        <tr>
                            <td></td>
                            <td colspan="5" class="yearmonth_second"></td>
                            <td>
                                <font size=1%; color="#B3B6B3">
                                    <label onclick="nextMon()" class="next"></label>
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <font color="#FF9090">일</font>
                            </td>
                            <td> 월 </td>
                            <td> 화 </td>
                            <td> 수 </td>
                            <td> 목 </td>
                            <td> 금 </td>
                            <td>
                                <font color=#7ED5E4>토</font>
                            </td>
                        </tr>
                    </table>
                
                `;

CALENDAR_OUT.insertAdjacentElement('afterend', BOX);
BOX.insertAdjacentElement('beforeend', cal);


document.addEventListener("click", (e) => {
    const close = e.target.closest("#calendar_out");
    const contain = BOX.classList.contains(CALENDAR_DISPLAY);

    if (close && contain) {
        BOX.classList.remove(CALENDAR_DISPLAY);
    }
    // else if (close && !contain) {
    //     cal.classList.add(CALENDAR_DISPLAY);
    // } else {
    //     cal.classList.add(CALENDAR_DISPLAY);
    // }
});


// 달력구현
let today = new Date();
let data = new Date();
let nextyear_today = new Date();

const beforeMon = () => {
    today = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
    build();
}

const nextMon = () => {
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    build();
}

const build = () => {
    const CALENDAR_LEFT = document.querySelector(".calendar");
    const CALENDAR_RIGHT = document.querySelector(".calendar2");
    let nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
    const tbcal_left = document.querySelector(".calendar");
    const tbcal_right = document.querySelector(".calendar2"); // 테이블 달력을 만들 테이블
    const FIRST_YEARMONTH = document.querySelector(".yearmonth"); //  년도와 월 출력할곳
    const SECOND_YEARMONTH = document.querySelector(".yearmonth_second");
    const BEFORE = document.querySelector(".before");
    const NEXT = document.querySelector(".next");

    FIRST_YEARMONTH.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; //년도와 월 출력

    // left calendar

    // 남은 테이블 줄 삭제
    while (tbcal_left.rows.length > 2) {
        tbcal_left.deleteRow(tbcal_left.rows.length - 1);
    }
    while (tbcal_right.rows.length > 2) {
        tbcal_right.deleteRow(tbcal_right.rows.length - 1);
    }

    // ============================================================================ left calendar
    let row_left = null;
    row_left = tbcal_left.insertRow();
    let cnt = 0;

    // 1일 시작칸 찾기
    for (let i = 0; i < nMonth.getDay(); i++) {
        let cell = row_left.insertCell();
        cnt = cnt + 1;
    }

    // 달력 출력
    for (let i = 1; i <= lastDate.getDate(); i++) // 1일부터 마지막 일까지
    {
        let cell = row_left.insertCell();
        cell.innerHTML = i;
        cnt = cnt + 1;
        // console.log(cnt)
        // if (cnt % 7 == 1) { //일요일 계산
        //     cell.innerHTML = "<font color=#FF9090>" + i//일요일에 색
        // }
        if (cnt % 7 == 0) { // 1주일이 7일 이므로 토요일 계산
            cell.innerHTML = "<font color=#7ED5E4>" + i//토요일에 색
            row_left = CALENDAR_LEFT.insertRow(); // 줄 추가
        }
    }

    // ============================================================================ right calendar
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
    lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
    SECOND_YEARMONTH.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

    let row_right = null;
    row_right = tbcal_right.insertRow();
    let cnt2 = 0;

    // 1일 시작칸 찾기
    for (let i = 0; i < nMonth.getDay(); i++) {
        let cell = row_right.insertCell();
        cnt2 = cnt2 + 1;
    }

    // 달력 출력
    for (let i = 1; i <= lastDate.getDate(); i++) // 1일부터 마지막 일까지
    {
        let cell = row_right.insertCell();
        cell.innerHTML = i;
        cnt2 = cnt2 + 1;
        // console.log(cnt2)
        // if (cnt2 % 7 == 1) { //일요일 계산
        //     cell.innerHTML = "<font color=#FF9090>" + i//일요일에 색
        // }
        if (cnt2 % 7 == 0) { // 1주일이 7일 이므로 토요일 계산
            cell.innerHTML = "<font color=#7ED5E4>" + i//토요일에 색
            row_right = CALENDAR_RIGHT.insertRow(); // 줄 추가
        }
    }

    if (today.getMonth() + 1 == 12) //   12월 일 때
    {
        BEFORE.innerHTML = (today.getMonth() - 1) + "월";
        NEXT.innerHTML = "1월";
    } else if (today.getMonth() + 1 == 1) //  1월 일 때
    {
        BEFORE.innerHTML = "11월";
        NEXT.innerHTML = (today.getMonth() + 2) + "월";
    } else {
        if (today.getMonth() + 1 === 2) {
            BEFORE.innerHTML = "12월";
            NEXT.innerHTML = (today.getMonth() + 2) + "월";
        } else {
            BEFORE.innerHTML = (today.getMonth() - 1) + "월";
            NEXT.innerHTML = (today.getMonth() + 2) + "월";
        }
        
        
    }
}