
export default class Card{
    constructor(data, templateSelector, {handleCardClick, handleDeleteCard, handleLikeClick}){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._templateSelector = templateSelector; 
        //функция открытия попапа с картинкой по клику на карточку
        this._handleCardClick = handleCardClick; 
        this._handleLikeClick = handleLikeClick;
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

    _deleteElement(){
        this._element.move();
        this._element = null;
    }
         
    //обновить количество лайков
    updateCounterLikes(counter){
        this._element.querySelector('.card__like-counter').textContent = (counter > 0) ? counter : "";
    }

    _setEventListener() {
        this._likeButton.addEventListener('click', () => {
            this._toggleLike();
            const f = this._likeButton.classList.contains('card__like_active');
            this._handleLikeClick(f);
        });
        this._cardImage.addEventListener('click', () => { 
            this._handleCardClick(this._name, this._link); 
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
        
        this.updateCounterLikes(this._likes.length);

        return this._element;
    }
}