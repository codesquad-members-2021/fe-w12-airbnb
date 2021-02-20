const CALENDAR_CSS = "calendar_css";
const CALENDAR_DISPLAY = "calendar_display";
const CALENDAR_FLEX = "cal_flex"
const CALENDAR_OUT = document.querySelector("#calendar_out");

const BOX = document.createElement("div");
BOX.classList.add(CALENDAR_CSS);
BOX.classList.add(CALENDAR_DISPLAY);
BOX.id = "box_id";

const cal = document.createElement("div");
cal.classList.add(CALENDAR_FLEX);

cal.innerHTML = `
                    <table class="calendar_left">
                        <tr>
                            <td>
                                <font size=1%; color="#B3B6B3">
                                    <label onclick="beforeMon()" class="before"></label>
                                </font>
                            </td>
                            <td colspan="5" class="yearmonth"></td>
                        </tr>
                        <tr>
                            <td class="cal_padding">
                                <font color="#FF9090">일</font>
                            </td>
                            <td class="cal_padding"> 월 </td>
                            <td class="cal_padding"> 화 </td>
                            <td class="cal_padding"> 수 </td>
                            <td class="cal_padding"> 목 </td>
                            <td class="cal_padding"> 금 </td>
                            <td class="cal_padding">
                                <font color=#7ED5E4>토</font>
                            </td>
                        </tr>
                    </table>
                
                
                    <table class="calendar_right">
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
                            <td class="cal_padding">
                                <font color="#FF9090">일</font>
                            </td>
                            <td class="cal_padding"> 월 </td>
                            <td class="cal_padding"> 화 </td>
                            <td class="cal_padding"> 수 </td>
                            <td class="cal_padding"> 목 </td>
                            <td class="cal_padding"> 금 </td>
                            <td class="cal_padding">
                                <font color=#7ED5E4>토</font>
                            </td>
                        </tr>
                    </table>
                
                `;

CALENDAR_OUT.insertAdjacentElement('afterend', BOX);
BOX.insertAdjacentElement('beforeend', cal);


document.addEventListener("click", (e) => {
    const BOX_CLICK = e.target.closest("#box_id");
    const close = e.target.closest("#calendar_out"); //  체크아웃 div
    const contain = BOX.classList.contains(CALENDAR_DISPLAY);

    if (close && contain) {
        BOX.classList.remove(CALENDAR_DISPLAY);
    } else if (close) {
        BOX.classList.add(CALENDAR_DISPLAY);
    } else if (!BOX_CLICK) {
        BOX.classList.add(CALENDAR_DISPLAY);
    }
});

// ======================================================================================= 달력구현
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
    const CALENDAR_LEFT = document.querySelector(".calendar_left");
    const CALENDAR_RIGHT = document.querySelector(".calendar_right");
    let nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
    const tbcal_left = document.querySelector(".calendar_left");
    const tbcal_right = document.querySelector(".calendar_right"); // 테이블 달력을 만들 테이블
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

    // =============================================================================== left calendar
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
        cell.innerHTML = `<input type="button" class="CALENDAR_TABLE_BUTTON" value="${i}"></input>`;
        cnt = cnt + 1;

        if (cnt % 7 == 1) { //일요일 계산
            cell.innerHTML = `<input type="button" class="CALENDAR_TABLE_BUTTON" value="${i}"></input>`;
        }
        if (cnt % 7 == 0) { // 1주일이 7일 이므로 토요일 계산
            cell.innerHTML = `<input type="button" class="CALENDAR_TABLE_BUTTON" value="${i}"></input>`;
            row_left = CALENDAR_LEFT.insertRow(); // 줄 추가
        }
    }

    // ============================================================================= right calendar
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
        cell.innerHTML = `<input type="button" class="CALENDAR_TABLE_BUTTON" value="${i}"></input>`;
        cnt2 = cnt2 + 1;

        if (cnt2 % 7 == 1) { //일요일 계산
            cell.innerHTML = `<input type="button" class="CALENDAR_TABLE_BUTTON" value="${i}"></input>`;
        }
        if (cnt2 % 7 == 0) { // 1주일이 7일 이므로 토요일 계산
            cell.innerHTML = `<input type="button" class="CALENDAR_TABLE_BUTTON" value="${i}"></input>`;
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


// ========================================================================== 달력 클릭시 값
const CAL_BUTTON = document.querySelector(".CALENDAR_TABLE_BUTTON");
const CALENDAR_TABLE_BUTTON_CLICK = "CALENDAR_TABLE_BUTTON_CLICK";
const CHECK_IN = document.querySelector(".check_in");
const CHECK_OUT = document.querySelector(".check_out");


let begin = null; // 첫번째 클릭값
let after = null; // 두번째 클릭값
let count = 0;
let first_day = null;
let second_day = null;

BOX.addEventListener("click", (e) => {
    const left = e.target.closest(".calendar_left");
    const right = e.target.closest(".calendar_right");
    const day = Number(e.target.value);
    count++;

    // e.target.tagName === "INPUT" 드래그 되었을때 오동작을 방지하기 위함.

    // CHECK_IN.innerHTML = `${today.getMonth()}월 ${first_day}일`; 체크인
    // CHECK_OUT.innerHTML = `${today.getMonth()}월 ${second_day}일`; 체크아웃
    
    if (begin === null && e.target.tagName === "INPUT") {
        // 첫 클릭은 begin에 저장+
        begin = day;
        // 첫 클릭 버튼 표시
        first_day = Number(e.target.value);
        e.target.classList.add(CALENDAR_TABLE_BUTTON_CLICK);
    } else if (begin !== null && e.target.tagName === "INPUT") {
        //두번째 클릭부터 after에 저장
        after = day;
        if (begin < after) {
            second_day = Number(e.target.value);
            e.target.classList.add("CALENDAR_TABLE_BUTTON_CLICK");
            CHECK_IN.innerHTML = `${today.getMonth()}월 ${first_day}일`;
            CHECK_OUT.innerHTML = `${today.getMonth()}월 ${second_day}일`;
        } else if (begin > after) {
            second_day = Number(e.target.value);
            e.target.classList.add("CALENDAR_TABLE_BUTTON_CLICK");
            CHECK_IN.innerHTML = `${today.getMonth()}월 ${second_day}일`;
            CHECK_OUT.innerHTML = `${today.getMonth()}월 ${first_day}일`; 
        }
    }
});