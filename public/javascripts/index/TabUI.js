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
        if (_.classContains(tabUI, 'visibility--visible')) {
            _.classAdd(tabUI, 'visibility--hidden');
            _.classRemove(tabUI, 'visibility--visible');
        } else {
            _.classAdd(tabUI, 'visibility--visible');
            _.classRemove(tabUI, 'visibility--hidden');
        }     
    }

    _tabUINotClickHandler(event, tabUI) {        
        if (_.classContains(tabUI, 'visibility--visible')) {
            _.classAdd(tabUI, 'visibility--hidden');
            _.classRemove(tabUI, 'visibility--visible');
        }
    }
}

export default TabUI;
