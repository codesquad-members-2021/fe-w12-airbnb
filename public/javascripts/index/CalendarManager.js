import _ from "../util.js";
import Calendar from "./Calendar.js";

class CalendarManager {
    /**
     * @param {String} calendarWrapSelector
     * @param {Calendar} calendar
     * @param {Calendar} anotherCalendar
     */
    constructor(calendarWrapSelector, calendar, anotherCalendar = null) {
        this.calendarWrapper = _.$(calendarWrapSelector);
        this.calendar = calendar;
        this.anotherCalendar = anotherCalendar;     // anotherCalendar는 필수가 아님
        
        this.prevBtn = null;    this.nextBtn = null;
        this._initCreateComponents();
    }

    init() {
        this.calendar.createCalendar();

        if(this.anotherCalendar)   
            this.anotherCalendar.createCalendar();
    }

    _initCreateComponents() {
        try {
            if (!this.calendarWrapper) 
                throw new Error('[!] calendarWrapper is null. The component cannot be set...')
            else {
                const btnList = Array.from(_.$All('.move-month__btn', this.calendarWrapper));
                this._setButtons(
                    btnList.find((btn) => _.classContains(btn, 'move-month__btn--left')),
                    btnList.find((btn) => _.classContains(btn, 'move-month__btn--right')),
                );
                this._setButtonsEvent();   
            }                
        } catch(err) {
            console.error(err.message);
        }                
    }

    /**
     * @param {Node} prevBtn
     * @param {Node} nextBtn     
     */
    _setButtons(prevBtn, nextBtn) {        
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
    }

    _setButtonsEvent() {
        this._setPrevBtnClickEvent();
        this._setNextBtnClickEvent(); 
    }

    _setPrevBtnClickEvent() {        
        _.addEvent(this.prevBtn, 'click', this._prevBtnClickEventHandler.bind(this));
    }

    _prevBtnClickEventHandler() {
        this._calendarReCreateAndMonthMinus(this.calendar);
        if(this.anotherCalendar)
            this._calendarReCreateAndMonthMinus(this.anotherCalendar);                
    }

    _setNextBtnClickEvent() {
        _.addEvent(this.nextBtn, 'click', this._nextBtnClickEventHandler.bind(this));
    }

    _nextBtnClickEventHandler() { 
        this._calendarReCreateAndMonthPlus(this.calendar);
        if(this.anotherCalendar)
            this._calendarReCreateAndMonthPlus(this.anotherCalendar);
    }

    /**
     * @param {Calendar} calendar 
     */
    _reCreateCalendar(calendar) {        
        calendar.removeAllChildNodes(); 
        calendar.initStartEndDate();
        calendar.createCalendar();        
    }

    /**
     * @param {Calendar} calendar 
     */
    _calendarReCreateAndMonthMinus(calendar) {
        calendar.optionMonthMinus();
        this._reCreateCalendar(calendar);
    }

    /**
     * @param {Calendar} calendar 
     */
    _calendarReCreateAndMonthPlus(calendar) {
        calendar.optionMonthPlus();
        this._reCreateCalendar(calendar);
    }

    toggleCalendarWrapper() {
        // 작성해야함
    }

}

export default CalendarManager;