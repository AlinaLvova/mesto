const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupImgForm = document.querySelector('#popup-open-img');

const templateCard = document.querySelector('#cards-list-template');

const popupList = Array.from(document.querySelectorAll('.popup'));

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const titleImgInput = document.querySelector('#input-title');
const linkImgInput = document.querySelector('#input-link');

const userNameInput = document.querySelector('#input-name');
const descrptInput = document.querySelector('#input-descrpt');

const userNameProfile = document.querySelector('.profile__name');
const descrptProfile = document.querySelector('.profile__description');

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_visible'
};

function saveProfile(evt) {
  evt.preventDefault();
  descrptProfile.textContent = descrptInput.value;
  userNameProfile.textContent = userNameInput.value;
  closePopup(popupEditForm);
}

function saveNewCard (evt) {
  evt.preventDefault();
  initialCards.push({ name: titleImgInput.value, link: linkImgInput.value });
  renderCardList(titleImgInput.value, linkImgInput.value);
  closePopup(popupAddForm);
  evt.target.reset();
}

const closePopup = (popup) => {
  if (popup == popupAddForm) {
    titleImgInput.value = "";
    linkImgInput.value = "";
  }
  hideAllInputErrors(popup, validationConfig);
  popup.classList.remove('popup_opened');
};

const openPopup = (popup) => {
  if (popup == popupEditForm) {
    descrptInput.value = descrptProfile.textContent;
    userNameInput.value = userNameProfile.textContent;
  }
  popup.classList.add('popup_opened');
};

const createCard = (nameCard, linkCard) => {
  const cardItem = templateCard.content.querySelector('.card').cloneNode(true);
  const cardItemImg = cardItem.querySelector('.card__image');
  const cardItemLike = cardItem.querySelector('.card__like');
  cardItemImg.src = linkCard;
  cardItemImg.alt = nameCard;
  cardItem.querySelector('.card__title').textContent = nameCard;

  cardItemLike.addEventListener('click', () => {
    cardItemLike.classList.toggle('card__like_active');
  });
  cardItemImg.addEventListener('click', () => { openPopupImgForm(nameCard, linkCard) });
  cardItem.querySelector('.card__delete').addEventListener('click', () => { cardItem.remove(); });

  return cardItem;
}

const openPopupImgForm = (nameCard, linkCard) => {
  const imgPopup = popupImgForm.querySelector('.popup__image');
  const figcaptionCard = popupImgForm.querySelector('.popup__figcaption')

  figcaptionCard.textContent = nameCard;
  imgPopup.src = linkCard;
  imgPopup.alt = nameCard;
  openPopup(popupImgForm); 
}

const renderCardList = (cardName, cardLink) => {
  const cardsList = document.querySelector('.gallery__list');
  cardsList.prepend(createCard(cardName, cardLink));
}

initialCards.forEach((cardItem) => {
  renderCardList(cardItem.name, cardItem.link);
});

popupEditForm.addEventListener('submit', saveProfile);
popupAddForm.addEventListener('submit', saveNewCard);
editButton.addEventListener('click', () => { openPopup(popupEditForm) });
addButton.addEventListener('click', () => { openPopup(popupAddForm) });

enableValidation(validationConfig);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape'){
    const popup = popupList.find(popupElem => popupElem.classList.contains('popup_opened'));
    closePopup(popup);
  }
});

//закрытие попапа через оверлей и кнопку "закрыть"
popupList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (popup == evt.target || popup.firstElementChild == evt.target || popup.firstElementChild.firstElementChild === evt.target) {
      closePopup(popup);
    }
  });
}) 
