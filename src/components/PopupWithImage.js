import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._image = this._element.querySelector('.popup__image');
        this._figcaption = this._element.querySelector('.popup__figcaption');
    }
    
    open(titleImage, linkImage){
        this._image.src = linkImage;
        this._figcaption.textContent = titleImage;
        this._image.alt = `Пользовательское описание - ${titleImage}.`;
        super.open();
    }
};