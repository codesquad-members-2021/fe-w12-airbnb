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

    clickActivity() {
        this.resetMenu()
        _.CA(this.activityMenu, 'u')
        _.CR(this.searchActivity, 'transparent')
    }

    toggleUserTab() {
        _.CT(this.userTab, 'transparent')
    }

    hideUserTab(e) {
        if (e.target.closest('.main__user--tab') === null && e.target.closest('.main__user-menu--user') === null)
            _.CA(this.userTab, 'transparent')
    }
}

class ViewCalender {
    constructor(calenderTab, calenderTitle, calenderContent) {
        this.calenderTab = calenderTab;
        this.calenderTitle = calenderTitle;
        this.calenderContent = calenderContent;
    }

    currentMove = 0;
    checkedDayCount = 0;

    toggleCalender() {
        _.CT(this.calenderTab, 'transparent')
        this.render()
        this.currentMove = 0
    }

    render(modifier = 0) {
        this.checkedDayCount = 0;
        
        const now = new Date(Date.now())

        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + modifier

        const [year, month] = this.checkMonth(currentYear, currentMonth)

        const firstDay = new Date(year, month, 1).getDay()
        const sumDay = new Date(year, month + 1, 0).getDate()
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
        this.calenderContent.innerHTML = calender

        this.calenderTitle.innerHTML = `${year}년 ${month + 1}월`
    }

    checkMonth(year, month) {
        if (0 <= month && month <= 11) return [year, month]

        return month < 0 ? this.checkMonth(year - 1, month + 12) : this.checkMonth(year + 1, month - 12)
    }

    hideCalender(e) {
        if (e.target.closest('.main__calender') === null && e.target.closest('.calender-trigger') === null)
            _.CA(this.calenderTab, 'transparent')
    }

    checkDay(e) {
        if (e.target.tagName !== 'TD') return
        e.target.className === 'checked-day' ? this.checkedDayCount-- : this.checkedDayCount++
        this.checkedDayCount > 2 ? this.checkedDayCount = 2 : _.CT(e.target, 'checked-day')
    }
}

class Controller {

    searchHouse = _.$('.search-house')
    searchActivity = _.$('.search-activity')
    houseMenu = _.$('.main__site-menu--house')
    activityMenu = _.$('.main__site-menu--activity')

    userMenu = _.$('.main__user-menu--user')
    userTab = _.$('.main__user--tab')

    calenderTab = _.$('.main__calender')
    calenderTitle = _.$('.main__calender--month')
    calenderContent = _.$('tbody')//class 추가할 것
    calenderTriggers = _.$A('.calender-trigger')

    viewTab = new ViewTab(this.houseMenu, this.activityMenu, this.searchHouse, this.searchActivity, this.userMenu, this.userTab)
    viewCalender = new ViewCalender(this.calenderTab, this.calenderTitle, this.calenderContent)

    leftBtn = _.$('.main__calender--move-left')
    rightBtn = _.$('.main__calender--move-right')

    addTabEvent() {
        _.E(this.houseMenu, 'click', this.viewTab.clickHouse.bind(this.viewTab))
        _.E(this.activityMenu, 'click', this.viewTab.clickActivity.bind(this.viewTab))
        _.E(document, 'click', this.viewTab.hideUserTab.bind(this.viewTab))
        _.E(this.userMenu, 'click', this.viewTab.toggleUserTab.bind(this.viewTab))
    }

    addCalenderEvent() {
        this.calenderTriggers.forEach((element) => _.E(element, 'click', this.viewCalender.toggleCalender.bind(this.viewCalender)))
        _.E(this.leftBtn, 'click', () => this.viewCalender.render(--this.viewCalender.currentMove))//인자 쓰면서 bind하는방법?
        _.E(this.rightBtn, 'click', () => this.viewCalender.render(++this.viewCalender.currentMove))
        _.E(document, 'click', this.viewCalender.hideCalender.bind(this.viewCalender))
        _.E(this.calenderContent, 'click', this.viewCalender.checkDay.bind(this.viewCalender))
    }

    init() {
        this.addTabEvent()
        this.addCalenderEvent()
    }
}

new Controller().init()