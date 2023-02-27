import Popup from "./Popup";

export default class popupConfirm extends Popup {
    constructor(containerSelector){
        super(containerSelector);
        this._form = this._element.querySelector('.popup__form');
        this._handleSubmit = undefined;
    }

    open({handleSubmit}){
        super.open();
        this._handleSubmit = handleSubmit;
    }

    close(){
        super.close();
        this._handleSubmit = undefined;
    }

    setEventListeners(){
        super.setEventListeners();
        this.btn = document.querySelector('.popup__submit-btn');
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit();
        });
    }
}
