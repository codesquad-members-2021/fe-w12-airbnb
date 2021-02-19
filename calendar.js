const leftCalendarDays = document.querySelectorAll(".left_calendar_days"),
    rightCalendarDays = document.querySelectorAll(".right_calendar_days"),
    leftCalendarTitle = document.querySelector(".left_title"),
    rightCalendarTitle = document.querySelector(".right_title"),
    leftButton = document.querySelector(".left_button"),
    rightButton = document.querySelector(".right_button"),
    dateButton = document.querySelector(".date_button"),
    calendar = document.querySelector(".calendar"),
    dateUpdate = document.querySelector(".date_update");




class Calendar {
    constructor(year, month) {
        this.today = new Date(year, month);
        this.year = this.today.getFullYear(),
            this.month = this.today.getMonth(),
            this.date = this.today.getDate(),
            this.day = this.today.getDay()
    }

    getFirstDay(calendarPos) {
        const firstDate = (calendarPos==="R") ? new Date(this.year, this.month) : new Date(this.year, this.month-1);
        return firstDate.getDay();
    }

    getLastDay(calendarPos) {
        let wholeDays = [];
        if ((this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0)) {
            wholeDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
            wholeDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        if(calendarPos === "L") return wholeDays[this.month-1];
        if(calendarPos === "R") return wholeDays[this.month];
    }

    fillCalendar() {
        this.initCalendars();

        leftCalendarTitle.innerHTML = `${this.year}년 ${this.month}월`
        rightCalendarTitle.innerHTML = `${this.year}년 ${this.month + 1}월`
        const lcFirstDay = this.getFirstDay("L");
        const lcLastDay = this.getLastDay("L");
        const rcFirstDay = this.getFirstDay("R");
        const rcLastDay = this.getLastDay("R");
        let dayL = 1;
        let dayR = 1;


        for (let i = lcFirstDay; i < leftCalendarDays.length; i++) {
            if (dayL <= lcLastDay) {
                leftCalendarDays[i].innerHTML = `<button class = "left_day_button">${dayL}</button>`;
                dayL++;
            }
        }

        for (let i = rcFirstDay; i < rightCalendarDays.length; i++) {
            if (dayR <= rcLastDay) {
                rightCalendarDays[i].innerHTML = `<button class = "right_day_button">${dayR}</button>`;
                dayR++;
            }
        }
    }

    initCalendars() {
        leftCalendarDays.forEach((e) => {
            e.innerHTML = "";
        });
        rightCalendarDays.forEach((e) => {
            e.innerHTML = "";
        });
    }


    toggleCalendar() {
        dateButton.addEventListener("click", (e) => {
            e.stopPropagation();
            calendar.classList.toggle("hide");
        });

        calendar.addEventListener("click", (e) => {
            e.stopPropagation();
            calendar.classList.remove("hide");
        });
    }

    drawCalendar() {
        let change = 0;
        const today = new Date();
        let leftCalendar = new Calendar(today.getFullYear(), today.getMonth() + change);
        let rightCalendar = new Calendar(today.getFullYear(), today.getMonth() + 1 + change);


        leftCalendar.fillCalendar(".left_day_button");
        rightCalendar.fillCalendar(".right_day_button");

        leftButton.addEventListener("click", (e) => {
            e.stopPropagation();
            change--;
            leftCalendar = new Calendar(today.getFullYear(), today.getMonth() + change);
            rightCalendar = new Calendar(today.getFullYear(), today.getMonth() + 1 + change);
            leftCalendar.fillCalendar(".left_day_button");
            rightCalendar.fillCalendar(".right_day_button");
            this.updateCalendarStyle(".left_day_button");
            this.updateCalendarStyle(".right_day_button");
        });
        rightButton.addEventListener("click", (e) => {
            e.stopPropagation();
            change++;
            leftCalendar = new Calendar(today.getFullYear(), today.getMonth() + change);
            rightCalendar = new Calendar(today.getFullYear(), today.getMonth() + 1 + change);
            leftCalendar.fillCalendar(".left_day_button");
            rightCalendar.fillCalendar(".right_day_button");
            this.updateCalendarStyle(".left_day_button");
            this.updateCalendarStyle(".right_day_button");
        });
    }


    handleEvents() {
        this.drawCalendar();
        this.toggleCalendar();
        this.updateCalendarStyle(".left_day_button");
        this.updateCalendarStyle(".right_day_button");
    }


    updateCalendarStyle(className) {
        const dayButtons = document.querySelectorAll(className);
        let firstSelectedDay = 0;
        let lastSelectedDay = 0;
        let clickCount = 0;
    
        // 달력 스타일 초기화
        dayButtons.forEach((element) => {
            element.classList.remove("day_selected");
            element.parentNode.classList.remove("gray");
        })
    
    
        // 달력 날짜들에 클릭 이벤트 추가
        dayButtons.forEach((element) => {
            element.addEventListener("click", (event) => {
                event.target.classList.toggle("day_selected");
    
                clickCount++;
    
                // 선택 일자 타입 변환
                if (firstSelectedDay === 0) {
                    firstSelectedDay = Number(event.target.innerText);
                } else {
                    lastSelectedDay = Number(event.target.innerText);
                }
    
                // 클릭 횟수 2회 넘어가면 달력 스타일 초기화
                if (clickCount > 2) {
                    dayButtons.forEach((e) => {
                        e.parentNode.classList.remove("gray");
                        e.classList.remove("day_selected");
                        clickCount = 0;
                        firstSelectedDay = 0;
                        lastSelectedDay = 0;
                    });
                }
    
                // 선택 일자 사이에 회색 배경 적용
                if (firstSelectedDay !== 0 && lastSelectedDay !== 0) {
                    dayButtons.forEach((e) => {
                        const day = Number(e.innerText);
                        if (day >= firstSelectedDay && day <= lastSelectedDay) {
                            e.parentNode.classList.toggle("gray");
                        }
                    });
                }
    
                // 선택 일자 중 왼쪽값이 오른쪽 값보다 크면 회색 배경 삭제 
                if (firstSelectedDay > lastSelectedDay) {
                    dayButtons.forEach((e) => e.parentNode.classList.remove("gray"));
                }
            });
        });
    
        // 달력 날짜들에 호버링 이벤트 추가
        dayButtons.forEach((element) => {
            element.addEventListener("mouseenter", (event) => {
                event.target.classList.add("day_hover")
            });
        });
    
        dayButtons.forEach((element) => {
            element.addEventListener("mouseleave", (event) => {
                event.target.classList.remove("day_hover")
            });
        });
    }
}



const cal = new Calendar();
cal.handleEvents();
