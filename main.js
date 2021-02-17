const _ = {
    CA: (target, className) => target.classList.add(className),

    CR: (target, className) => target.classList.remove(className),

    CT: (target, className) => target.classList.toggle(className),

    $: (selector, base = document) => base.querySelector(selector),

    $A: (selector, base = document) => base.querySelectorAll(selector),

    E: (target, type, listener, useCapture = false) => target.addEventListener(type, listener, useCapture)

}

class ViewTab {
    constructor(houseMenu, activityMenu, searchHouse, searchActivity, userMenu, userTab) {
        this.houseMenu = houseMenu
        this.activityMenu = activityMenu
        this.searchHouse = searchHouse
        this.searchActivity = searchActivity
        this.userMenu = userMenu
        this.userTab = userTab
    }


    resetMenu() {
        _.CR(this.houseMenu, 'u')
        _.CR(this.activityMenu, 'u')
        _.CA(this.searchHouse, 'transparent')
        _.CA(this.searchActivity, 'transparent')
    }

    clickHouse() {
        this.resetMenu()
        _.CA(this.houseMenu, 'u')
        _.CR(this.searchHouse, 'transparent')
    }
    //같은구조긴 한데 중복제거 어떻게 할까
    clickActivity() {
        this.resetMenu()
        _.CA(this.activityMenu, 'u')
        _.CR(this.searchActivity, 'transparent')
    }

    toggleUserTab(e) {
        _.CT(this.userTab, 'transparent')
        e.stopPropagation();
    }

    hideUserTab() {
        _.CA(this.userTab, 'transparent')
    }
}

class ViewCalender {
    constructor(calenderTab) {
        this.calenderTab = calenderTab;
        //임시

        // 해결할 것 : 4주나 6주 차지하는 달일때 heigth값 조정
        // append쪽 분화
        // render를 toggle쪽에?
        // 오늘 이전 글자 반투명하게
        // < > 버튼은 makeCalender(month-1 / +1) -> 이러면 firstDay 계산도 저쪽에서? 
        // 아에 render(month조정 = 0)으로 인자 받게 해서 
        // render(-2), render(-3) 하며 year month계산을 안에서 하는식으로?
    }
    
    currentMove = 0;

    toggleCalender() {
        _.CT(this.calenderTab, 'transparent')
        this.render()
        this.currentMove = 0
    }

    render(modifier = 0) {
        const now = new Date(Date.now())

        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + modifier

        const [year, month] = this.checkMonth(currentYear, currentMonth)

        const firstDay = new Date(year, month, 1).getDay()
        const sumDay = new Date(year, month+1, 0).getDate()
        const calender = this.makeCalender(firstDay, sumDay)

        this.appendCalender(year, month, calender)
    }
    
    makeCalender(firstDay, sumDay) {
        let html = '<tr>'
        
        for (let i = 0; i < firstDay; i++)
        html += '<td></td>'
        
        for (let i = 0; i < sumDay; i++) {
            if ((firstDay + i) % 7 === 0)
            html += '</tr><tr>'
            html += `<td>${i + 1}</td>`
        }
        
        html += '</tr>'
        return html
    }

    appendCalender(year, month, calender) {
        const foo = _.$('tbody')
        foo.innerHTML = calender

        const bar = _.$('.main__calender--month')
        bar.innerHTML = `${year}년 ${month + 1}월`
    }

    checkMonth(year, month) {
        if (0 <= month && month <= 11) return [year, month]

        if (month < 0) return this.checkMonth(year - 1, month + 12)
        if (month > 11) return this.checkMonth(year + 1, month - 12)
    }

}

class Controller {
    constructor(DOM) {
        //이렇게 기괴하게;; 선언하는게 맞나? 더 깔끔한 방법 모색할 것
        [this.houseMenu, this.activityMenu, this.searchHouse, this.searchActivity, this.userMenu, this.userTab, this.calenderTab, this.calenderTriggers] = DOM
        this.tab = new ViewTab(...DOM)
        this.calender = new ViewCalender(this.calenderTab)
        this.init()
    }


    init() {
        //이렇게 억지로 bind까지 해가며 controller에서 이벤트를 거는 게 맞나?
        _.E(this.houseMenu, 'click', this.tab.clickHouse.bind(this.tab))
        _.E(this.activityMenu, 'click', this.tab.clickActivity.bind(this.tab))
        _.E(document, 'click', this.tab.hideUserTab.bind(this.tab))
        _.E(this.userMenu, 'click', this.tab.toggleUserTab.bind(this.tab))
        _.E(this.userTab, 'click', (e) => e.stopPropagation())//이렇게 막는 게 올바른 방법인가?

        this.calenderTriggers.forEach((element) => _.E(element, 'click', this.calender.toggleCalender.bind(this.calender)))

        const leftBtn = _.$('.main__calender--move-left')
        const rightBtn = _.$('.main__calender--move-right')
        _.E(leftBtn, 'click', ()=>{
            this.calender.render(--this.calender.currentMove)
        })
        _.E(rightBtn, 'click', ()=>{
            this.calender.render(++this.calender.currentMove)
        })
    }

}

const searchBar = _.$A('.main__search-bar')
const searchHouse = _.$('.search-house')
const searchActivity = _.$('.search-activity')
const houseMenu = _.$('.main__site-menu--house')
const activityMenu = _.$('.main__site-menu--activity')
// const onlineActivityMenu = _.$('.main__site-menu--online-activity')

const userMenu = _.$('.main__user-menu--user')//네이밍 이게 최선?
const userTab = _.$('.main__user--tab')
const calenderTab = _.$('.main__calender')// class calender와 calender 네이밍 정리할 것
const calenderTriggers = _.$A('.calender-trigger')

const DOMList = [houseMenu, activityMenu, searchHouse, searchActivity, userMenu, userTab, calenderTab, calenderTriggers]
new Controller(DOMList)