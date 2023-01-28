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
        this._likeButton.classList.toggle('card__like_active');
    }

    _deleteElement(){
        this._element.remove();
        this._element = null;
    }
              
    _setEventListener() {
        this._likeButton.addEventListener('click', () => {
            this._handleClickLike();
        });
        this._cardImage.addEventListener('click', () => { 
            this._handleOpenPopup(this._name, this._link); 
        });
        this._deleteButton.addEventListener('click', () => {
             this._deleteElement(); 
        });
    }

    getCard(){
        return this;
    }

    generateCard(){
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._deleteButton = this._element.querySelector('.card__delete');

        this._setEventListener();

        this._element.querySelector('.card__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = "Фото пользователя " + this._name;

        return this._element;
    }
}