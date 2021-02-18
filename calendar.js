const leftCalendarDays = document.querySelectorAll(".left_calendar_days"),
    rightCalendarDays = document.querySelectorAll(".right_calendar_days"),
    leftCalendarTitle = document.querySelector(".left_title"),
    rightCalendarTitle = document.querySelector(".right_title"),
    leftButton = document.querySelector(".left_button"),
    rightButton = document.querySelector(".right_button"),
    dateButton = document.querySelector(".date_button"),
    calendar = document.querySelector(".calendar");
 



class LeftCalendar {
    constructor(year, month) {
        this.today = new Date(year, month);
        this.year = this.today.getFullYear(),
            this.month = this.today.getMonth(),
            this.date = this.today.getDate(),
            this.day = this.today.getDay()
    }


    getFirstDay() {
        const firstDate = new Date(this.year, this.month);
        return firstDate.getDay();
    }

    getLastDay() {
        let wholeDays = [];
        if ((this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0)) {
            wholeDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
            wholeDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        return wholeDays[this.month];
    }

    fillCalendar() {
        this.initCalendar();
        leftCalendarTitle.innerHTML = `${this.year}년 ${this.month + 1}월`
        const firstDay = this.getFirstDay();
        const lastDay = this.getLastDay();
        let day = 1;

        for (let i = firstDay; i < leftCalendarDays.length; i++) {
            if (day <= lastDay) {
                leftCalendarDays[i].innerHTML = `<button class = "day_button">${day}</button>`;
                day++;
            }
        }
    }

    initCalendar() {
        leftCalendarDays.forEach((e) => {
            e.innerHTML = "";
        });
    }

}

class RightCalendar {
    constructor(year, month) {
        this.today = new Date(year, month);
            this.year = this.today.getFullYear(),
            this.month = this.today.getMonth(),
            this.date = this.today.getDate(),
            this.day = this.today.getDay()
    }

    getFirstDay() {
        const firstDate = new Date(this.year, this.month);
        return firstDate.getDay();
    }

    getLastDay() {
        let wholeDays = [];
        if ((this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0)) {
            wholeDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
            wholeDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        return wholeDays[this.month];
    }

    fillCalendar() {
        this.initCalendar();
        rightCalendarTitle.innerHTML = `${this.year}년 ${this.month + 1}월`
        const firstDay = this.getFirstDay();
        const lastDay = this.getLastDay();
        let day = 1;

        for (let i = firstDay; i < rightCalendarDays.length; i++) {
            if (day <= lastDay) {
                rightCalendarDays[i].innerHTML = `<button class = "day_button">${day}</button>`;
                day++;
            }
        }
    }

    initCalendar() {
        rightCalendarDays.forEach((e) => {
            e.innerHTML = "";
        });
    }
}


function drawCalendar() {
    let change = 0;
    const today = new Date();
    let leftCalendar = new LeftCalendar(today.getFullYear(), today.getMonth() + change);
    let rightCalendar = new RightCalendar(today.getFullYear(), today.getMonth() + 1 + change);

    leftButton.addEventListener("click", (e) => {
        e.stopPropagation();
        change--;
        leftCalendar = new LeftCalendar(today.getFullYear(), today.getMonth() + change);
        rightCalendar = new RightCalendar(today.getFullYear(), today.getMonth() + 1 + change);
        leftCalendar.fillCalendar();
        rightCalendar.fillCalendar();
    });
    rightButton.addEventListener("click", (e) => {
        e.stopPropagation();
        change++;
        leftCalendar = new LeftCalendar(today.getFullYear(), today.getMonth() + change);
        rightCalendar = new RightCalendar(today.getFullYear(), today.getMonth() + 1 + change);
        leftCalendar.fillCalendar();
        rightCalendar.fillCalendar();
    });
    leftCalendar.fillCalendar();
    rightCalendar.fillCalendar();


}


function toggleCalendar() {
    dateButton.addEventListener("click", (e) => {
        e.stopPropagation();
        calendar.classList.toggle("hide");
    });

    calendar.addEventListener("click", (e) => {
        e.stopPropagation();
        calendar.classList.remove("hide");
    });


}

function updateSearch() {
    const dayButtons = document.querySelectorAll(".day_button");
    dayButtons.forEach((element) => {
        element.addEventListener("click", (event) => {

            event.target.classList.toggle("day_clicked");
        });
    });
}

drawCalendar();
toggleCalendar();
updateSearch();

