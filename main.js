const _ = {
    CA: (target, className) => target.classList.add(className),

    CR: (target, className) => target.classList.remove(className),

    $: (selector, base = document) => base.querySelector(selector),

    $A: (selector, base = document) => base.querySelectorAll(selector),

    E: (target, type, listener) => target.addEventListener(type, listener)

}

class ViewTab {
    constructor(houseMenu, activityMenu, searchHouse, searchActivity) {
        this.houseMenu = houseMenu
        this.activityMenu = activityMenu
        this.searchHouse = searchHouse
        this.searchActivity = searchActivity
    }
    
    
    resetMenu() {
        _.CR(this.houseMenu, 'b')
        _.CR(this.houseMenu, 'u')
        _.CR(this.activityMenu, 'b')
        _.CR(this.activityMenu, 'u')
        _.CA(this.searchHouse, 'transparent')
        _.CA(this.searchActivity, 'transparent')
    }

    clickHouse() {
        this.resetMenu()
        _.CA(this.houseMenu, 'b')
        _.CA(this.houseMenu, 'u')
        _.CR(this.searchHouse, 'transparent')
    }
    //같은구조긴 한데 중복제거 어떻게 할까
    clickActivity() {
        this.resetMenu()
        _.CA(this.activityMenu, 'b')
        _.CA(this.activityMenu, 'u')
        _.CR(this.searchActivity, 'transparent')
    }

}

class ViewCalender {

}

class Controller {
    constructor(DOM) {
        //이렇게 기괴하게;; 선언하는게 맞나? 더 깔끔한 방법 모색할 것
        [this.houseMenu, this.activityMenu, this.searchHouse, this.searchActivity] = DOM
        this.tab = new ViewTab(this.houseMenu, this.activityMenu, this.searchHouse, this.searchActivity)
        this.init()
    }

    init() {
        //이렇게 억지로 bind까지 해가며 controller에서 이벤트를 거는 게 맞나?
        _.E(this.houseMenu, 'click', this.tab.clickHouse.bind(this.tab)) 
        _.E(this.activityMenu, 'click', this.tab.clickActivity.bind(this.tab))
    }

}

const searchBar = _.$A('.main__search-bar')
const searchHouse = _.$('.search-house')
const searchActivity = _.$('.search-activity')
const houseMenu = _.$('.main__site-menu--house')
const activityMenu = _.$('.main__site-menu--activity')


const DOMList = [houseMenu, activityMenu, searchHouse, searchActivity]
new Controller(DOMList)