import _ from '../util.js';

class TabUI {
    constructor(tabUI, tabUIBtn) {
        this.tabUI = tabUI;
        this.tabUIBtn = tabUIBtn;
    }

    init() {
        this._setTabUIClickEvent();
        this._setTabUINotClickEvent();
    }

    _setTabUIClickEvent() {
        this.tabUIBtn.addEventListener('click', (event) => this._tabUIClickHandler(event, this.tabUI));        
    }

    _setTabUINotClickEvent() {
        document.body.addEventListener('click', (event) => this._tabUINotClickHandler(event, this.tabUI));                        
    }

    _tabUIClickHandler(event, tabUI) {
        event.stopPropagation();
        _.classToggle(tabUI, 'visibility--hidden');
    }

    _tabUINotClickHandler(event, tabUI) {    
        if (!_.classContains(tabUI, 'visibility--hidden'))
            _.classAdd(tabUI, 'visibility--hidden');
    }
}

export default TabUI;
