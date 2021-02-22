import _ from "../util.js";

class Calendar {
    constructor(target, dynamicWrapper) {
        this.target = target;
        this.dynamicWrapper = dynamicWrapper;
        this.optionMonth = 0;
        
        this.calendarType = _.classContains(this.target, 'left') ? 'left' : 'right';
        this.monthInfo = null;
        this.startDate = null;
        this.endDate = null;
        this.clickDateCnt = 0;
        
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

    _updateClickDateCnt() {
        this.clickDateCnt = this._createSelectDateBtnList(this.dynamicWrapper).length;
    }
    _updateAnotherClickDateCnt() {
        this.anotherCalendar.clickDateCnt = this._createSelectDateBtnList(this.anotherCalendar.dynamicWrapper).length;
    }

    /**
     * @param {Date} monthInfo
     */
    _updateMonthInfo(monthInfo) {
        this.monthInfo = monthInfo;
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
        this._updateMonthInfo(new Date(today.getFullYear(), today.getMonth() + (monthType + this.optionMonth)));        

        const yearMonthTxtNode = _.createTextNode(`${this.monthInfo.getFullYear()}년 ${this.monthInfo.getMonth()+1}월`);
        _.appendChild(this.target.querySelector('.year-month'), yearMonthTxtNode);
        
        const startDay = this.monthInfo.getDay(); // 매달 시작 요일
        const lastDate = new Date(this.monthInfo.getFullYear(), this.monthInfo.getMonth()+1, 0).getDate();    // 마지막 날짜

        this._createCalenderItems(today, this.monthInfo, startDay, lastDate);
    }

    _createCalenderItems(today, monthInfo, startDay, lastDate) {
        const ul = _.createElement("ul");
        _.appendChild(this.dynamicWrapper, ul);

        let inputDate = 1, emptyCnt = startDay;
        const nLoop = (lastDate + startDay);

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

// START ---- 만들어진 날짜 선택 버튼들 한땀 한땀 관련된 부분 설정 (이벤트, 상태에 따른 변화 등) ---------------------  
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
                this._initResultDateTag();

                this._updateClickDateCnt();
                return;
            }

            if (!this.startDate) {
                this._setStartDateDataBtn(thisBtn, currClickDate);
            } else {
                if (!this.anotherCalendar.endDate)
                    this._setEndDateBtnOrResetStartDateBtn(thisBtn, currClickDate);
            } 
            this._updateClickDateCnt();
        } else {
            if (this.anotherCalendar.startDate && this.anotherCalendar.endDate) return;

            if (this.anotherCalendar.startDate && !this.anotherCalendar.endDate && !this.endDate) {
                this._setEndDateDataBtn(thisBtn, currClickDate);
            } else if (this.anotherCalendar.startDate && !this.anotherCalendar.endDate && this.endDate) {
                this._removeDataBtnStyle(this.dynamicWrapper);
                this.initStartEndDate(this);
                this._removeDataBtnStyle(this.anotherCalendar.dynamicWrapper); 
                this.initStartEndDate(this.anotherCalendar);
                this._initResultDateTag();

                this._updateAnotherClickDateCnt();
            } else {
                if (this.startDate && this.endDate) {
                    this._removeDataBtnStyle(this.dynamicWrapper);
                    this.initStartEndDate(this);
                    this._initResultDateTag();

                    this._updateClickDateCnt();
                    return;
                }

                if (!this.startDate)
                    this._setStartDateDataBtn(thisBtn, currClickDate);
                else
                    this._setEndDateBtnOrResetStartDateBtn(thisBtn, currClickDate);
            }

            this._updateClickDateCnt();
        }
    }


    // 일반 버튼 Array 형식으로 모두 GET
    _createAllDateBtnList(parentNode) {
        return Array.from(_.$All('ul > li > button', parentNode));
    }

    // 날짜버튼의 부모인 li태그 전부 GET
    _createAllDateliList(parentNode) {
        return Array.from(_.$All('ul > li', parentNode));
    }

    // 날짜버튼의 부모인 li태그 - disableStatus 전부 GET
    _createAllDateDisableliList(parentNode) {
        return this._createAllDateliList(parentNode).filter((li) => _.classContains(li, 'disableStatus'));
    }

    // 시작 or 종료 버튼 스타일 지정되어 있는 항목 Array 형식으로 GET
    _createSelectDateBtnList(parentNode) {
        return this._createAllDateBtnList(parentNode).filter(
            (btn) =>
                _.classContains(btn, 'startDate') ||
                _.classContains(btn, 'endDate'),
        );
    }

    // referenceBtn의 숫자와 같거나 큰 숫자, btnList
    _createGreaterEqualDateBtnList(parentNode, referenceBtn) {
        return this._createAllDateBtnList(parentNode)
            .filter(
                (btn) => Number(referenceBtn.innerText) <= Number(btn.innerText),
            );
    }
    
    // referenceBtn의 숫자와 같거나 작은 숫자, btnList
    _createLowerEqualDateBtnList(parentNode, referenceBtn) {
        return this._createAllDateBtnList(parentNode)
            .filter(
                (btn) => Number(referenceBtn.innerText) >= Number(btn.innerText),
            );
    }

    // startBtn의 숫자와 같거나 큰 숫자 ~ endBtn의 숫자와 같거나 작은 숫자, btnLis
    _createGreaterEqualLowerDateBtnList(parentNode, startBtn, endBtn) {
        return this._createAllDateBtnList(parentNode)
            .filter(
                (btn) => 
                    (Number(startBtn.innerText) <= Number(btn.innerText)) 
                    && 
                    (Number(endBtn.innerText) >= Number(btn.innerText)),
            );
    }

    // 시작 or 종료 버튼 지정되어 있는 항목, 매개변수(className) 기준으로 1개만 찾음
    _findOneDataBtn(parentNode, className) {        
        return this._createAllDateBtnList(parentNode).filter((btn) => _.classContains(btn, className))[0];
    }

    // 시작 or 종료 and 버튼의 부모에 스타일이 지정되어 있는 항목, Style 제거 (css class)
    _removeDataBtnStyle(parentNode) {
        this._createSelectDateBtnList(parentNode).forEach((btn) =>
            _.classRemove(btn, 'clickStatus', 'startDate', 'endDate'),
        );
        this._createAllDateDisableliList(parentNode).forEach((li) =>
            _.classRemove(li, 'disableStatus', 'start', 'end'),
        );
    }

    // 각 날짜 클릭 시, classList Add & Calendar의 startDate, endDate 설정
    _setStartDateDataBtn(thisBtn, currClickDate) {
        _.classAdd(thisBtn, 'clickStatus', 'startDate');
        this.startDate = currClickDate;
    }

    _setEndDateDataBtn(thisBtn, currClickDate) {
        _.classAdd(thisBtn, 'clickStatus', 'endDate');
        this.endDate = currClickDate;
        this._fillColorStartToEndDate();

        const event = new CustomEvent('resultDate', {
            detail: {
                startDate: this.startDate || this.anotherCalendar.startDate,
                endDate: this.endDate || this.anotherCalendar.endDate,
            },
        });

        this.target.dispatchEvent(event);
    }
    
    // 최종 날짜 확정. (CustomEvent, dispatch는 _setEndDateDataBtn )
    setResultDateCustomEvent() {
        _.addEvent(this.target, 'resultDate', this._resultDateCustomEventHandler.bind(this));
    }

    _resultDateCustomEventHandler(e) {     
        const { startDate, endDate } = e.detail;        
        _.$All('.header__main__search__bar > label.roomsType').forEach((v) => {            
            if (_.$('p#checkin', v))
                _.$('p#checkin', v).innerText = `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`
            else if (_.$('p#checkout', v))   
                _.$('p#checkout', v).innerText = `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`
            else return;            
        });        
    }

    // 최종 날짜가 적혀진 p(id: checkin & checkout) 태그 초기화
    _initResultDateTag() {
        _.$All('.header__main__search__bar > label.roomsType').forEach((v) => {            
            if (_.$('p#checkin', v))
                _.$('p#checkin', v).innerText = '날짜 추가'
            else if (_.$('p#checkout', v))   
                _.$('p#checkout', v).innerText = '날짜 추가'
            else return;            
        });
    }

    // 다른 캘린더가 아닌 this 자체의 startDate 관련은 재설정하거나, endDate 관련 버튼을 설정함.
    _setEndDateBtnOrResetStartDateBtn(thisBtn, currClickDate) {
        if (this.startDate.valueOf() < currClickDate.valueOf()) {                        
            this._setEndDateDataBtn(thisBtn, currClickDate);
        } else {                    
            const startDateBtn = this._findOneDataBtn(this.dynamicWrapper, 'startDate');                                        
            _.classRemove(startDateBtn, 'clickStatus', 'startDate');
            this._setStartDateDataBtn(thisBtn, currClickDate);
        }
    }

    // 시작 ~ 종료 날짜 확정 (새로운 객체 반환)
    _updateCompleteStartEndData() {
        const tmpResult = {
            startDate: new Date(),
            endDate: new Date()
        };

        this._updateClickDateCnt();
        this._updateAnotherClickDateCnt();

        if ( (this.clickDateCnt + this.anotherCalendar.clickDateCnt) !== 2) 
            return tmpResult;
        
        if (this.startDate && this.endDate) {
            tmpResult.startDate = this.startDate;
            tmpResult.endDate = this.endDate;
        } else {
            if (this.calendarType === "right") {
                tmpResult.startDate = this.anotherCalendar.startDate; 
                tmpResult.endDate = this.endDate; 
            }
        }

        return tmpResult;
    }

    // 2개의 날짜가 선택 되었을 경우 fill Color (시작 ~ 끝까지)
    _fillColorStartToEndDate() {
        const {startDate, endDate} = this._updateCompleteStartEndData();
        if (!startDate || !endDate) return
        else {
            // startDatechk가 false 되는 경우는 단 하나. (왼쪽 캘린더에 StartDate, 오른쪽에 EndDate. 마지막 클릭이 오른쪽 캘린더라서)
            const startDateChk = startDate.getMonth().valueOf() === this.monthInfo.getMonth().valueOf();            

            if (startDateChk) this._fillColorOnlyOneCalendar();
            else this._fillColorAllCalendar();
        }
    }

    // 1개의 Calender만 색칠해야 할 때
    _fillColorOnlyOneCalendar() {
        const startBtn = this._findOneDataBtn(this.dynamicWrapper, 'startDate');
        const endBtn = this._findOneDataBtn(this.dynamicWrapper, 'endDate');  

        const btnList = this._createGreaterEqualLowerDateBtnList(this.dynamicWrapper, startBtn, endBtn);
        btnList.forEach((btn) => {
            _.classAdd(btn.parentNode, 'disableStatus');
            if (_.classContains(btn, 'startDate')) 
                _.classAdd(btn.parentNode, 'start')
            else if (_.classContains(btn, 'endDate'))
                _.classAdd(btn.parentNode, 'end');
        });
    }

    // 2개의 Calender 모두 색칠해야 할 때
    _fillColorAllCalendar() {
        const startBtn = this._findOneDataBtn(this.anotherCalendar.dynamicWrapper, 'startDate');
        const endBtn = this._findOneDataBtn(this.dynamicWrapper, 'endDate');   

        const leftBtnList = this._createGreaterEqualDateBtnList(this.anotherCalendar.dynamicWrapper, startBtn);
        const rightBtnList = this._createLowerEqualDateBtnList(this.dynamicWrapper, endBtn);
        
        leftBtnList.forEach((btn) => {
            _.classAdd(btn.parentNode, 'disableStatus');
            if (_.classContains(btn, 'startDate')) 
                _.classAdd(btn.parentNode, 'start');                                             
        });
        rightBtnList.forEach((btn) => {
            _.classAdd(btn.parentNode, 'disableStatus');
            if (_.classContains(btn, 'endDate')) 
                _.classAdd(btn.parentNode, 'end');                                             
        });
    }

// END ---- 만들어진 날짜 선택 버튼들 한땀 한땀 관련된 부분 설정 ---------------------  
}

export default Calendar;