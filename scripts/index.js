import Card from './Card.js';
import {openPopup, closePopup, closePopupByEscape} from './common.js';
import FormValidator from './FormValidator.js'; 

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileForm = document.querySelector('#popup-edit-form');
const newCardForm = document.querySelector('#popup-add-form');
const bigImageOfCard = document.querySelector('#popup-open-img');
const popupImage = bigImageOfCard.querySelector('.popup__image');
const popupFigcaption = bigImageOfCard.querySelector('.popup__figcaption');

const popupList = Array.from(document.querySelectorAll('.popup'));

const templateSelectorCard = '#cards-list-template';
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

const profileValidation = new FormValidator(validationConfig, profileForm);
const newCardValidation = new FormValidator(validationConfig, newCardForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();  

function saveProfile(evt) {
  evt.preventDefault();
  descrptProfile.textContent = descrptInput.value;
  userNameProfile.textContent = userNameInput.value;
  closePopup(profileForm);
}

function saveNewCard(evt) {
  evt.preventDefault();
  const dataCard = {name: titleImgInput.value, link: linkImgInput.value};
  const newAddCard = new Card(dataCard, templateSelectorCard, handleOpenPopup);
  cardsContainer.prepend(newAddCard.generateCard());
  closePopup(newCardForm);
  evt.target.reset();
  evt.submitter.disabled = true;
}

function openProfilePopup() {
  profileValidation.resetValidation();
  descrptInput.value = descrptProfile.textContent;
  userNameInput.value = userNameProfile.textContent;
  openPopup(profileForm);
}

function addEventListenerButtonClose(popup) {
  const closeButton = popup.querySelector('.popup__close-btn');
  // устанавливаем обработчик закрытия на крестик 
  closeButton.addEventListener('click', () => closePopup(popup));
}

//добавить обработчик для закрытия по overlay
function addEventListenerOverlayClose(popup) {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
}

//обработчик открытия попапа для фотокарточки
function handleOpenPopup(name, link) {
  popupImage.src = link; 
  popupImage.alt = name; 
  popupFigcaption.textContent = name; 
  openPopup(bigImageOfCard); 
}

const renderCardList = (data, templateSelectorCard) => {
  const cardItem = new Card(data, templateSelectorCard, handleOpenPopup);
  const cardElement = cardItem.generateCard();
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((cardItem) => {
  renderCardList(cardItem, templateSelectorCard);
});

profileForm.addEventListener('submit', saveProfile);
newCardForm.addEventListener('submit', saveNewCard);
editButton.addEventListener('click', () => { openProfilePopup() });
addButton.addEventListener('click', () => { 
    newCardValidation.resetValidation();
    openPopup(newCardForm);
});

popupList.forEach(popup => {
  addEventListenerButtonClose(popup);
  addEventListenerOverlayClose(popup);
});
