export default class UserBtnLayer {
    constructor({userAnchor, userLayer, body}) {
        this.userBtn = userAnchor;
        this.userLayer = userLayer;
        this.body = body;
        this.setEvent();
    }          
    setEvent() {
        this.body.addEventListener('click', this.toggleLayer.bind(this));
    }
    toggleLayer({target}) {
        const btnIsClicked = target.closest('a') == this.userBtn;
        const layerHasClass = this.userLayer.classList.contains('hidden');
        if(btnIsClicked) {
            this.userLayer.classList.toggle('hidden');
        } else if(!layerHasClass) {
            this.userLayer.classList.add('hidden');
        }
    }
}