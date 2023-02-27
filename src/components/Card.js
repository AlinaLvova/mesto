
export default class Card{
    constructor(data, idOwner, templateSelector, {handleCardClick, handleRemoveCard, handleLikeClick}){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._idOwner = idOwner;
        this._templateSelector = templateSelector; 
        //функция открытия попапа с картинкой по клику на карточку
        this._handleCardClick = handleCardClick; 
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveCard = handleRemoveCard;
        this._remove = this._remove.bind(this);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    //функция обработчика нажатия на лайк карточки
    _toggleLike() {
        this._likeButton.classList.toggle('card__like_active');
    }

    _remove() {
        this._handleRemoveCard(this._id);
    }

    delete(){
        this._element.remove();
        this._element = null;
    }

    //обновить количество лайков
    updateCounterLikes(counter){
        this._element.querySelector('.card__like-counter').textContent = (counter > 0) ? counter : "";
    }

    //отрисовка лайков у тех карточек, которые понравились пользователю
    _renderLikeIcon(){
        this._likes.forEach((user) => {
            if (this._idOwner === user._id){
                this._element.querySelector('.card__like').classList.add('card__like_active');
            }
        });
        
    }

    _setEventListener() {
        this._likeButton.addEventListener('click', () => {
            this._toggleLike();
            const isActiveLike = this._likeButton.classList.contains('card__like_active');
            this._handleLikeClick(isActiveLike);
        });
        this._cardImage.addEventListener('click', () => { 
            this._handleCardClick(this._name, this._link); 
        });
    }

    getCard(){
        return this;
    }

    //отрисовать иконку "удалить" только у карточек владельца
    _renderTrashIcon(){
        if (this._idOwner === this._owner._id) {
            this._deleteButton = this._element.querySelector('.card__delete');
            this._deleteButton.classList.add('card__delete_active');
            this._deleteButton.addEventListener('click', () => {
                this._handleRemoveCard(this._id);
            });
        }
    }

    generate(){
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');

        this._element.querySelector('.card__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = "Фото пользователя " + this._name;
        
        this.updateCounterLikes(this._likes.length);
        this._renderTrashIcon();
        this._renderLikeIcon();
        this._setEventListener();
        return this._element;
    }
}