const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfileForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupImgForm = document.querySelector('#popup-open-img');

const templateCard = document.querySelector('#cards-list-template');

const popupList = Array.from(document.querySelectorAll('.popup'));

const imgPopup = popupImgForm.querySelector('.popup__image');
const figcaptionCard = popupImgForm.querySelector('.popup__figcaption')

const cardsContainer = document.querySelector('.gallery__list');

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
  closePopup(popupProfileForm);
}

function saveNewCard (evt) {
  evt.preventDefault();
  renderCardList(titleImgInput.value, linkImgInput.value);
  closePopup(popupAddForm);
  evt.target.reset();
}

//удалить обработчик событий для кнопки закрытия
function removeEventListenerButtonClose (popup){
  const closeButton = popup.querySelector('.popup__close-btn');
  closeButton.removeEventListener('click', () => closePopup(popup));
}

//добавить обработчик для закрытия по overlay
function removeEventListenerOverlayClose(popup) {
  const popupContainer = popup.querySelector('.overlay');
  popupContainer.removeEventListener('click', (evt) => { closePopupIfEventContains(evt, 'overlay', popup) });
  popup.removeEventListener('click', (evt) => { closePopupIfEventContains(evt, 'popup_opened', popup) });
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupByEscape);
  popup.classList.remove('popup_opened');
  removeEventListenerButtonClose(popup);
  removeEventListenerOverlayClose(popup);
};

const closePopupByEscape = (evt) => {
    if (evt.key === 'Escape') {
      const popup = popupList.find(popupElem => popupElem.classList.contains('popup_opened'));
      closePopup(popup);
    }
}

function openProfilePopup() {
  descrptInput.value = descrptProfile.textContent;
  userNameInput.value = userNameProfile.textContent;
  openPopup(popupProfileForm);
}

function openAddPopup() {
  titleImgInput.value = '';
  linkImgInput.value = '';
  openPopup(popupAddForm);
}

function addEventListenerButtonClose (popup){
  const closeButton = popup.querySelector('.popup__close-btn');
  // устанавливаем обработчик закрытия на крестик 
  closeButton.addEventListener('click', () => closePopup(popup));
}

//закрыть попап, если событие содержит класс
const closePopupIfEventContains = (evt, _class, popup) => {
  if (evt.target.classList.contains(_class)){
    closePopup(popup);
  }
};

//добавить обработчик для закрытия по overlay
function addEventListenerOverlayClose(popup) {
  const popupContainer = popup.querySelector('.overlay');
  popupContainer.addEventListener('click', (evt) => { closePopupIfEventContains(evt, 'overlay', popup) });
  popup.addEventListener('click', (evt) => { closePopupIfEventContains(evt, 'popup_opened', popup) });
}

const openPopup = (popup) => {
  enableValidation(validationConfig);
  document.addEventListener('keydown', closePopupByEscape);
  popup.classList.add('popup_opened');
  addEventListenerButtonClose(popup);
  addEventListenerOverlayClose(popup);
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
  figcaptionCard.textContent = nameCard;
  imgPopup.src = linkCard;
  imgPopup.alt = nameCard;
  openPopup(popupImgForm); 
}

const renderCardList = (cardName, cardLink) => {
  cardsContainer.prepend(createCard(cardName, cardLink));
}

initialCards.forEach((cardItem) => {
  renderCardList(cardItem.name, cardItem.link);
});

popupProfileForm.addEventListener('submit', saveProfile);
popupAddForm.addEventListener('submit', saveNewCard);
editButton.addEventListener('click', () => { openProfilePopup() });
addButton.addEventListener('click', () => { openAddPopup() });
