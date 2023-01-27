import {openPopup} from './common.js';

export default class Card{
    constructor(data, templateSelector, handleOpenPopup){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector; 
        this._handleOpenPopup = handleOpenPopup;  
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _handleClickLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _deleteElement(){
        this._element.remove();
        this._element = null;
    }
              
    _setEventListener() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleClickLike();
        });
        this._element.querySelector('.card__image').addEventListener('click', () => { 
            this._handleOpenPopup(this._name, this._link); 
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