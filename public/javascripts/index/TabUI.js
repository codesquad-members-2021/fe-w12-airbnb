import _ from '../util.js';

class TabUI {
    constructor(target) {
        this.target = target;
    }

    tabUIClick() {
        this.target.addEventListener('click', this._tabUIClickHandler);
    }

    _tabUIClickHandler(e) {        
        const { target } = e;
    }
}

export default TabUI;
