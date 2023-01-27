// export const popupImgForm = document.querySelector('#popup-open-img');
// export const imgPopup = popupImgForm.querySelector('.popup__image');
// export const figcaptionCard = popupImgForm.querySelector('.popup__figcaption');
import {openPopup} from './common.js';

export class Card{
    constructor(data, templateSelector, popupSelector){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupImage = popupSelector.querySelector('.popup__image');
        this._popupFigcaption = popupSelector.querySelector('.popup__figcaption');
        this._popup = popupSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _handleOpenPopup() {
        this._popupFigcaption.textContent = this._name;
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        openPopup(this._popup);
    }

    _handleClickLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _deleteElement(){
        this._element.remove();
    }
              
    _setEventListener() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleClickLike();
        });
        this._element.querySelector('.card__image').addEventListener('click', () => { 
            this._handleOpenPopup(); 
        });
        this._element.querySelector('.card__delete').addEventListener('click', () => {
             this._deleteElement(); 
        });
    }

    getCard(){
        return this;
    }

    generateCard(){
        this._element = this._getTemplate();
        this._setEventListener();

        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = "Фото пользователя " + this._name;

        return this._element;
    }
}