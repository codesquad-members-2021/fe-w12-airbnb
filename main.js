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
    constructor(calenderTab, calenderTriggers) {
        this.calenderTab = calenderTab
        this.calenderTriggers = calenderTriggers//이거 여기서 쓰냐?
    }

    toggleCalender() {
        _.CT(this.calenderTab, 'transparent')
        console.log('달력 토글 진행')
    }

    appendCalender() {

    }
}

class Controller {
    constructor(DOM) {
        //이렇게 기괴하게;; 선언하는게 맞나? 더 깔끔한 방법 모색할 것
        [this.houseMenu, this.activityMenu, this.searchHouse, this.searchActivity, this.userMenu, this.userTab, this.calenderTab, this.calenderTriggers] = DOM
        this.tab = new ViewTab(...DOM)
        this.calender = new ViewCalender(this.calenderTab, this.calenderTriggers)
        this.init()
    }

    init() {
        //이렇게 억지로 bind까지 해가며 controller에서 이벤트를 거는 게 맞나?
        _.E(this.houseMenu, 'click', this.tab.clickHouse.bind(this.tab))
        _.E(this.activityMenu, 'click', this.tab.clickActivity.bind(this.tab))
        _.E(document, 'click', this.tab.hideUserTab.bind(this.tab))
        _.E(this.userMenu, 'click', this.tab.toggleUserTab.bind(this.tab))
        _.E(this.userTab, 'click', (e) => e.stopPropagation())//이렇게 막는 게 올바른 방법인가?

        this.calenderTriggers.forEach((element)=>_.E(element, 'click', this.calender.toggleCalender.bind(this.calender)))
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