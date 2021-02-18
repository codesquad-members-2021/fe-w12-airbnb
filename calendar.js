const CALENDAR_CSS = "calendar_css";
const CALENDAR_DISPLAY = "calendar_display";
const CALENDAR = document.querySelector("#calendar_out");

let cal = document.createElement("div");
cal.id = "cal_ID";
cal.classList.add(CALENDAR_CSS);
cal.classList.add(CALENDAR_DISPLAY);

cal.innerHTML = `
                    <table id="calendar">
                        <tr>
                            <td>
                                <font size=1%; color="#B3B6B3">
                                    <label onclick="beforeMon()" id="before"></label>
                                </font>
                            </td>
                            <td colspan="5" align="center" id="yearmonth"></td>
                            <td>
                                <font size=1%; color="#B3B6B3">
                                    <label onclick="nextMon()" id="next"></label>
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <font color="#FF9090">일</font>
                            </td>
                            <td align="center"> 월 </td>
                            <td align="center"> 화 </td>
                            <td align="center"> 수 </td>
                            <td align="center"> 목 </td>
                            <td align="center"> 금 </td>
                            <td align="center">
                                <font color=#7ED5E4>토</font>
                            </td>
                        </tr>
                    </table>
                `

CALENDAR.insertAdjacentElement('afterend', cal);

document.addEventListener("click", (e) => {
    const close = e.target.closest("#calendar_out");
    const contain = cal.classList.contains(CALENDAR_DISPLAY);

    if (close && contain) {
        cal.classList.remove(CALENDAR_DISPLAY);
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

const beforeMon = () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    build();
}

const nextMon = () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    build();
}

const build = () => {
    let nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
    let tbcal = document.querySelector("#calendar"); // 테이블 달력을 만들 테이블
    let yearmonth = document.querySelector("#yearmonth"); //  년도와 월 출력할곳
    yearmonth.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; //년도와 월 출력

    if (today.getMonth() + 1 == 12) //  눌렀을 때 월이 넘어가는 곳
    {
        before.innerHTML = (today.getMonth()) + "월";
        next.innerHTML = "1월";
    }
    else if (today.getMonth() + 1 == 1) //  1월 일 때
    {
        before.innerHTML = "12월";
        next.innerHTML = (today.getMonth() + 2) + "월";
    }
    else //   12월 일 때
    {
        before.innerHTML = (today.getMonth()) + "월";
        next.innerHTML = (today.getMonth() + 2) + "월";
    }

    // 남은 테이블 줄 삭제
    while (tbcal.rows.length > 2) {
        tbcal.deleteRow(tbcal.rows.length - 1);
    }

    let row = null;
    row = tbcal.insertRow();
    let cnt = 0;

    // 1일 시작칸 찾기
    for (let i = 0; i < nMonth.getDay(); i++) {
        let cell = row.insertCell();
        cnt = cnt + 1;
    }

    // 달력 출력
    for (let i = 1; i <= lastDate.getDate(); i++) // 1일부터 마지막 일까지
    {
        cell = row.insertCell();
        cell.innerHTML = i;
        cnt = cnt + 1;
        if (cnt % 7 == 1) {//일요일 계산
            cell.innerHTML = "<font color=#FF9090>" + i//일요일에 색
        }
        if (cnt % 7 == 0) { // 1주일이 7일 이므로 토요일 계산
            cell.innerHTML = "<font color=#7ED5E4>" + i//토요일에 색
            row = calendar.insertRow(); // 줄 추가
        }
    }
}