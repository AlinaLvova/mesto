export default class Card {
  constructor(
    data,
    isOwner,
    templateSelector,
    { handleCardClick, handleRemoveCard, handleAddLikeClick, handleDeleteLikeClick }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._isOwner = isOwner;
    this._templateSelector = templateSelector;
    //функция открытия попапа с картинкой по клику на карточку
    this._handleCardClick = handleCardClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._remove = this._remove.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //функция обработчика нажатия на лайк карточки
  toggleLike() {
    this._likeButton.classList.toggle("card__like_active");
  }

  _remove() {
    this._handleRemoveCard(this._id);
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  //обновить количество лайков
  updateCounterLikes(counter) {
    this._element.querySelector(".card__like-counter").textContent =
      counter > 0 ? counter : "";
  }

  //отрисовка лайков у тех карточек, которые понравились пользователю
  _renderLikeIcon() {
    this._likes.forEach(() => {
      if (this._isOwner) {
        this._element
          .querySelector(".card__like")
          .classList.add("card__like_active");
      }
    });
  }

  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__like_active"))
        this._handleDeleteLikeClick();
      else
        this._handleAddLikeClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._cardImage.addEventListener('error', (error) => {
      this._cardImage.src = require('../images/404-Page.jpg');
    })
  }

  getCard() {
    return this;
  }

  //отрисовать иконку "удалить" только у карточек владельца
  _renderTrashIcon() {
    if (this._isOwner) {
      this._deleteButton = this._element.querySelector(".card__delete");
      this._deleteButton.classList.add("card__delete_active");
      this._deleteButton.addEventListener("click", () => {
        this._handleRemoveCard(this._id);
      });
    }
  }

  generate() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like");
    this._cardImage = this._element.querySelector(".card__image");

    this._element.querySelector(".card__title").textContent = this._name;

    this._cardImage.src = this._link;
    this._cardImage.alt = "Фото пользователя " + this._name;

    this.updateCounterLikes(this._likes.length);
    this._renderTrashIcon();
    this._renderLikeIcon();
    this._setEventListener();

    return this._element;
  }
}
