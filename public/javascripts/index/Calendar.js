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

    /**
     * @param {Calendar} calendar
     */
    initStartEndDate(calendar = this) {
        calendar.startDate = null;  
        calendar.endDate = null;  
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

// START ---- 만들어진 날짜 선택 버튼들 한땀 한땀 이벤트 설정 ---------------------  
    _setDateBtnClickEvent(button) {
        _.addEvent(button, 'click', (e) => this._dateBtnClickEventHandler(e, button));        
    }
    _dateBtnClickEventHandler(e, thisBtn) {                
        const arrYearMonth =  _.$('.year-month', this.target).innerText.replace(/[^0-9\s]/g, '').split(' ');
        const currClickDate = new Date(arrYearMonth[0], (arrYearMonth[1]-1), Number(thisBtn.innerText));
        
        if (this.calendarType === 'left') {
            if (this.anotherCalendar.startDate || this.anotherCalendar.endDate) return;

            if (this.startDate && this.endDate) {
                this._removeDataBtnStyle(this.dynamicWrapper);
                this.initStartEndDate(this);
                return;
            }

            if (!this.startDate) {
                this._setStartDateDataBtn(thisBtn, currClickDate);
            } else {
                if (!this.anotherCalendar.endDate)
                    this._setEndDateBtnOrResetStartDateBtn(thisBtn, currClickDate);                  
            }  
        } else {
            if (this.anotherCalendar.startDate && this.anotherCalendar.endDate) return;

            if (this.anotherCalendar.startDate && !this.anotherCalendar.endDate && !this.endDate) {
                this._setEndDateDataBtn(thisBtn, currClickDate);
            } else if (this.anotherCalendar.startDate && !this.anotherCalendar.endDate && this.endDate) {                
                this._removeDataBtnStyle(this.dynamicWrapper);
                this.initStartEndDate(this);
                this._removeDataBtnStyle(this.anotherCalendar.dynamicWrapper); 
                this.initStartEndDate(this.anotherCalendar);                
            } else {
                if (this.startDate && this.endDate) {
                    this._removeDataBtnStyle(this.dynamicWrapper);
                    this.initStartEndDate(this);
                    return;
                }

                if (!this.startDate)
                    this._setStartDateDataBtn(thisBtn, currClickDate);
                else
                    this._setEndDateBtnOrResetStartDateBtn(thisBtn, currClickDate);                
            }
        }
    }

    // 시작 or 종료 버튼 지정되어 있는 항목 Array 형식으로 GET
    _createDateBtnList(parentNode) {
        return Array.from(_.$All('ul > li > button', parentNode)).filter(
            (btn) =>
                _.classContains(btn, 'startDate') ||
                _.classContains(btn, 'endDate'),
        );
    }

    // 시작 or 종료 버튼 지정되어 있는 항목, 매개변수(className) 기준으로 1개만 찾음
    _findOneDataBtn(parentNode, className) {
        // -- 굳이 querySelectAll 안써도되지만.. 일단은..
        return Array.from(_.$All('ul > li > button', parentNode)).filter((btn) => _.classContains(btn, className))[0];
    }

    // 시작 or 종료 버튼 지정되어 있는 항목, Style 제거 (css class)
    _removeDataBtnStyle(parentNode) {        
        this._createDateBtnList(parentNode).forEach((btn) => _.classRemove(btn, 'clickStatus', 'startDate', 'endDate'));
    }

    // 각 날짜 클릭 시, classList Add & Calendar의 startDate, endDate 설정
    _setStartDateDataBtn(thisBtn, currClickDate) {
        _.classAdd(thisBtn, 'clickStatus', 'startDate');
        this.startDate = currClickDate;  
    }

    _setEndDateDataBtn(thisBtn, currClickDate) {
        _.classAdd(thisBtn, 'clickStatus', 'endDate');
        this.endDate = currClickDate; 
    }

    // 다른 캘린더가 아닌 this 자체의 startDate 관련은 재설정하거나, endDate 관련 버튼을 설정함.
    _setEndDateBtnOrResetStartDateBtn(thisBtn, currClickDate) {
        if (this.startDate.valueOf() < currClickDate.valueOf()) {                        
            this._setEndDateDataBtn(thisBtn, currClickDate)
        } else {                    
            const startDateBtn = this._findOneDataBtn(this.dynamicWrapper, 'startDate');                                        
            _.classRemove(startDateBtn, 'clickStatus', 'startDate');
            this._setStartDateDataBtn(thisBtn, currClickDate);
        }
    }
// END ---- 만들어진 날짜 선택 버튼들 한땀 한땀 이벤트 설정 ---------------------  

}

export default Calendar;