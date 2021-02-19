class Calendar {
    constructor (year, month, num) {
        this.year = year;
        this.month = month;
        this.monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];
        this.leftContainer = document.querySelector(`.calendar__day${num}`);
        this.yearMonth = document.querySelector(`.calendar__year-month${num}`);
        this.weekDay = ['일','월','화','수','목','금','토'];
        this.calendarTableInner = '';
        this.fristDayInfo = new Date(this.year, this.month, 1);
        this.fristDay = this.fristDayInfo.getDay();
        this.lastDateArr = [31,28,31,30,31,30,31,31,30,31,30,31];
        this.lastDate = this.lastDateArr[this.month];
        // this.calendarCalssNum = 1;
    }
    
    displayYearMonth() {
        console.log(this.yearMonth);
        this.yearMonth.innerHTML = `
        ${this.year}년 ${this.monthArr[this.month]}월`;
        this.createWeekday();
    }

    createWeekday() {
        this.calendarTableInner = '<tr>';
        for(let i=0; i<this.weekDay.length; i++) {
            this.calendarTableInner += `<th>${this.weekDay[i]}</th>`;
        }
        this.calendarTableInner += '</tr>';
        this.isLeapYear();
    }

    displayClander() {
        this.leftContainer.innerHTML = `${this.calendarTableInner}`;
        // this.leftContainer.innerHTML = '';
        // this.preCalenderEvent();
        this.isLeftCalendar()
    }

    isLeftCalendar() {
        if(classNameCnt === 1) {
            classNameCnt++;
            if(thisMonth === 11) {
                thisMonth = 0;
                thisYear++;
            }
            else {
                thisMonth++;
            }
            calendar1 = new Calendar(thisYear, thisMonth, classNameCnt);
            return calendar1.displayYearMonth();
        }
        return;
    }

    isLeapYear() {
        if((this.year%4 === 0 && this.year%100=== 0) || this.year%400 === 0) {
            this.lastDateArr[1] = 29;
        }
        this.createRowCnt();
    }

    createRowCnt() {
        let rowCnt = Math.ceil((this.fristDay+this.lastDate)/7);
        this.createDate(rowCnt);
    }

    createDate(rowCnt) {
        let dateNum=1;
        for(let i=1; i<=rowCnt; i++){
        this.calendarTableInner+="<tr>";
        for(let k=1; k<=7; k++){       
            if(i==1 && k<=this.fristDay || dateNum>this.lastDate){
                this.calendarTableInner+="<td> &nbsp; </td>";
            }
            else{
                this.calendarTableInner+="<td>"+dateNum+"</td>";
                dateNum++;
            }
        }
        this.calendarTableInner+="</tr>";
        }  
        this.displayClander();
    }
    // preCalenderEvent() {
    //     const preCalenderBtn = document.querySelector('leftBtn');
    //     preCalenderBtn.addEventListener('click', () =>this.preBtnHandler());
    // }
    // preBtnHandler() {
    //     if(this.month === 0) {
    //         this.year--;
    //         this.month = 11;
    //     }
    //     else {
    //         this.month--;
    //     }
    //     calendar1 = new Calendar(this.year, this.month);
    //     calendar1.displayYearMonth();
    // } 
}

let classNameCnt = 1;
const date = new Date();
let thisYear = date.getFullYear();
let thisMonth = date.getMonth();
let calendar1 = new Calendar(thisYear, thisMonth, classNameCnt); 
calendar1.displayYearMonth();


const preCalenderBtn = document.querySelector('.pre-month');
// .search-sub__calendarBtn
preCalenderBtn.addEventListener('click', () => {
    classNameCnt =1;
    // if(thisMonth === 0) {
    //     thisYear--;
    //     thisMonth = 11;
    // }
    // else{
    //     thisMonth--;
    // }
    calendar1 = new Calendar(thisYear, thisMonth); 
    calendar1.displayYearMonth();
})

const nextCalenderBtn = document.querySelector('.next-month');
nextCalenderBtn.addEventListener('click', () => {
    classNameCnt = 1;
    // if(thisMonth === 11) {
    //     thisYear++;
    //     thisMonth = 0;
    // }
    // else {
    //     thisMonth++;
    // }
    calendar1 = new Calendar(thisYear, thisMonth,classNameCnt);
    calendar1.displayYearMonth();
})


