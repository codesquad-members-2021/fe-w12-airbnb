import _ from "../util.js";

class Calendar {
    constructor(target, dynamicWrapper) {
        this.target = target;
        this.dynamicWrapper = dynamicWrapper;
        this.optionMonth = 0;
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
        
        const monthType = _.classContains(this.target, 'left') ? 0 : 1;
        const monthInfo = new Date(today.getFullYear(), today.getMonth() + (monthType + this.optionMonth));

        const yearMonthTxtNode = _.createTextNode(`${monthInfo.getFullYear()}년 ${monthInfo.getMonth()+1}월`);
        _.appendChild(this.target.querySelector('.year-month'), yearMonthTxtNode);
        
        const startDay = monthInfo.getDay(); // 매달 시작 요일
        const lastDate = new Date(monthInfo.getFullYear(), monthInfo.getMonth()+1, 0).getDate();    // 마지막 날짜

        let ulTmp = null, inputDate = 1, emptyCnt = startDay;
        const nLoop = (lastDate + startDay);

        for (let i = 0; i < nLoop; i++) {                        
            if (i % 7 === 0) {                
                ulTmp = _.createElement("ul");
                _.appendChild(this.dynamicWrapper, ulTmp);
            } 

            const li = _.createElement('li');
            if (emptyCnt > 0) {                               
                emptyCnt--;                
            } else {                              
                this._liTagModify(li, inputDate, today, monthInfo);                          
                inputDate++;
            }                
            _.appendChild(ulTmp, li);                                   
        }        
    }

    _liTagModify(li, inputDate, today, monthInfo) {
        // 망할 조건들
        const currYearMonthChk = today.getFullYear() === monthInfo.getFullYear() && today.getMonth() <= monthInfo.getMonth();
        const futureChk = today.getFullYear() < monthInfo.getFullYear();
        const monthChk = today.getMonth() === monthInfo.getMonth();
        // --
        
        // 조건별 함수들
        const txtDate = _.createTextNode(inputDate);
        const disableTxt = () => {
            _.classAdd(li, 'disableTxt');
            _.appendChild(li, txtDate);
        };

        const addButton = () => {
            const button = _.createElement('button');
            _.appendChild(button, txtDate);
            _.appendChild(li, button); 
        }
        // ---

        if (currYearMonthChk) {
            if (today.getDate() > inputDate && monthChk) disableTxt();
            else addButton();
        } else {
            if (futureChk) addButton();
            else disableTxt();
        }        
    }
    
}

export default Calendar;