import _ from "../util.js";

class Calendar {
    constructor(target, dynamicWrapper) {
        this.target = target;
        this.dynamicWrapper = dynamicWrapper;
        this.optionMonth = 0;
        
        this.calendarType = _.classContains(this.target, 'left') ? 'left' : 'right';
        this.startDate = null;
        this.endDate = null;

        this.anotherCalendar = null;
    }    

    /**
     * @param {Calendar} calendar
     */
    set setAnotherCalendar(calendar) {
        this.anotherCalendar = calendar;
    }

    removeAllChildNodes() {
        while (this.dynamicWrapper.firstChild) {
            this.dynamicWrapper.removeChild(this.dynamicWrapper.firstChild);
        }
        this.target.querySelector('.year-month').removeChild(this.target.querySelector('.year-month').firstChild);
    }
    
    optionMonthPlus() { this.optionMonth++ };
    optionMonthMinus() { this.optionMonth-- };

    createCalendar() {        
        const today = new Date();
        const monthType = this.calendarType === 'left' ? 0 : 1;
        const monthInfo = new Date(today.getFullYear(), today.getMonth() + (monthType + this.optionMonth));

        const yearMonthTxtNode = _.createTextNode(`${monthInfo.getFullYear()}년 ${monthInfo.getMonth()+1}월`);
        _.appendChild(this.target.querySelector('.year-month'), yearMonthTxtNode);
        
        const startDay = monthInfo.getDay(); // 매달 시작 요일
        const lastDate = new Date(monthInfo.getFullYear(), monthInfo.getMonth()+1, 0).getDate();    // 마지막 날짜

        let inputDate = 1, emptyCnt = startDay;
        const nLoop = (lastDate + startDay);

        const ul = _.createElement("ul");
        _.appendChild(this.dynamicWrapper, ul);

        for (let i = 0; i < nLoop; i++) {                                
            const li = _.createElement('li');
            if (emptyCnt > 0) {                               
                emptyCnt--;                
            } else {                              
                this._liTagModify(li, inputDate, today, monthInfo);                          
                inputDate++;
            }                
            _.appendChild(ul, li);                                   
        }        
    }

    _liTagModify(li, inputDate, today, monthInfo) {
        // 망할 조건들
        const currYearMonthChk =
            today.getFullYear() === monthInfo.getFullYear() &&
            today.getMonth() <= monthInfo.getMonth();
        const futureChk = today.getFullYear() < monthInfo.getFullYear();
        const monthChk = today.getMonth() === monthInfo.getMonth();
        // --

        const txtDate = _.createTextNode(inputDate);
        if (currYearMonthChk) {
            if (today.getDate() > inputDate && monthChk) {
                this._disableTxtAddIn_li(li, txtDate);
            } else {
                this._createButtonIn_li(li, txtDate);
            }
        } else {
            if (futureChk) this._createButtonIn_li(li, txtDate);
            else this._disableTxtAddIn_li(li, txtDate);
        }       
    }

    _disableTxtAddIn_li(li, txtDate) {
        _.classAdd(li, 'disableTxt');
        _.appendChild(li, txtDate);
    }

    _createButtonIn_li(li, txtDate){
        const button = _.createElement('button');
        _.appendChild(button, txtDate);      
        this._setDateBtnClickEvent(button);
        _.appendChild(li, button);         
    }

    _setDateBtnClickEvent(button) {
        _.addEvent(button, 'click', (e) => this._dateBtnClickEventHandler(e, button));        
    }
    _dateBtnClickEventHandler(e, thisBtn) {        
        // console.log(e, thisBtn, this)
        const arrYearMonth =  _.$('.year-month', this.target).innerText.replace(/[^0-9\s]/g, '').split(' ');
        const currClickDate = new Date(arrYearMonth[0], (arrYearMonth[1]-1), Number(thisBtn.innerText));
        const dateBtnList = Array.from(_.$All('ul > li > button', this.dynamicWrapper));

        // 공사중 -------------------------------------------------
        if (this.calendarType === 'left') {
            if (this.startDate && this.endDate) {
                const filterBtnList = dateBtnList.filter(
                    (btn) =>
                        _.classContains(btn, 'startDate') ||
                        _.classContains(btn, 'endDate'),
                );

                filterBtnList.forEach((btn) => _.classRemove(btn, 'clickStatus', 'startDate', 'endDate'));
                this.startDate = null;  
                this.endDate = null;  
            }

            if (!this.startDate) {
                _.classAdd(thisBtn, 'clickStatus', 'startDate');
                this.startDate = currClickDate;  
            } else {
                if (this.startDate.valueOf() < currClickDate.valueOf()) {
                    _.classAdd(thisBtn, 'clickStatus', 'endDate');
                    this.endDate = currClickDate;  
                } else {                    
                    const startDateBtn = dateBtnList.filter((btn) => _.classContains(btn, 'startDate'))[0];                    
                    _.classRemove(startDateBtn, 'clickStatus', 'startDate');
                    _.classAdd(thisBtn, 'clickStatus', 'startDate');
                    this.startDate = currClickDate;  
                }
                
            }

            // console.log(this.startDate.getDate(), this.endDate && this.endDate.getDate() );
        } else {

        }
        // 공사중 ---------------------------------------------------------------------...

        /*
        if(!this.startDate) {
            if (this.calendarType === 'left') {
                _.classAdd(thisBtn, 'clickStatus', 'startDate');
                this.startDate = currClickDate;                
            } else {
                const leftAllOK = this.anotherCalendar.startDate && this.anotherCalendar.endDate; 

                if (!leftAllOK) {
                    _.classAdd(thisBtn, 'clickStatus', 'startDate');
                    this.startDate = currClickDate; 
                } else {
                    const leftStartOKEndNull = this.anotherCalendar.startDate && !this.anotherCalendar.endDate;

                    if (leftStartOKEndNull) {
                        _.classAdd(thisBtn, 'clickStatus', 'startDate');
                        this.endDate = currClickDate;
                    }
                }                
            }            
        } else {

            return;
            if (currClickDate.valueOf() === this.startDate.valueOf()) {
                // 



                _.classRemove(thisBtn, 'clickStatus', 'startDate', 'endDate');
                                
                this.startDate = null;
                this.endDate = null;
                return;
            }

            if (!this.endDate) {
                if (this.calendarType === 'left') {
                    if (currClickDate.valueOf() > this.startDate.valueOf()) {
                        _.classAdd(thisBtn, 'clickStatus', 'endDate');
                        this.endDate = currClickDate;  
                    }                    
                } 
            } else {
                if (currClickDate.valueOf() === this.endDate.valueOf()) {
                    _.classRemove(thisBtn, 'clickStatus', 'endDate');
                    this.endDate = null;
                }
            }             
        }

        /*
        if (!this._getCurrentClickDate) {
            _.classAdd(thisBtn, 'clickStatus');
            this._setCurrentClickDate = currClickDate;
        } else {                                    
            if (currClickDate.valueOf() === this._getCurrentClickDate.valueOf()) {
                _.classRemove(thisBtn, 'clickStatus');
                this._setCurrentClickDate = null;
            } else {                
                // - [] (공통) 
                // - [] right 캘린더라면, left캘린더에 클릭된 값있는지 확인.    // + (무조건 1개의 캘린더에서 2개가 입력되면 안됨. 추가적 조건도 생각하기)                    

                // 많은 조건이 필요할 듯함. 이 함수.. 정리해서 작업하기. 일단 커밋
            }
        }
        */
    }
    
}

export default Calendar;