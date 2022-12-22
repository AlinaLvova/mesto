const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupImgForm = document.querySelector('#popup-open-img');
const imgPopup = popupImgForm.querySelector('.popup__image');
const figcaptionCard = popupImgForm.querySelector('.popup__figcaption')

const popupCloseBtnEditForm = document.querySelector('#close-btn-edit');
const popupCloseBtnAddForm = document.querySelector("#close-btn-add");
const popupCloseBtnImgForm = document.querySelector('#close-btn-img');

const templateCard = document.querySelector('#cards-list-template');
const cardsList = document.querySelector('.gallery__list');
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

let titleImgInput = document.querySelector('#input-title');
let linkImgInput = document.querySelector('#input-link');

let nameInput = document.querySelector('#input-name');
let descrptInput = document.querySelector('#input-descrpt');

let nameProfile = document.querySelector('.profile__name');
let descrptProfile = document.querySelector('.profile__description');

function saveProfile(evt) {
  evt.preventDefault();
  descrptProfile.textContent = descrptInput.value;
  nameProfile.textContent = nameInput.value;
  closePopup(popupEditForm);
}

function saveNewCard (evt) {
  evt.preventDefault();
  if (titleImgInput.value === "" || linkImgInput.value === "")
    return alert("Введите корректные данные");
  initialCards.push({ name: titleImgInput.value, link: linkImgInput.value });
  closePopup(popupAddForm);
  renderCardList(titleImgInput.value, linkImgInput.value);
  evt.target.reset();
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const openPopupEditForm = () => {
  descrptInput.value = descrptProfile.textContent;
  nameInput.value = nameProfile.textContent;
  openPopup(popupEditForm);
};

function closePopupAddForm (evt){
    closePopup(popupAddForm);
    evt.target.reset();
}

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
  cardsList.prepend(createCard(cardName, cardLink));
}

initialCards.forEach((cardItem) => {
  renderCardList(cardItem.name, cardItem.link);
});


popupEditForm.addEventListener('submit', saveProfile);
popupAddForm.addEventListener('submit', saveNewCard);
editButton.addEventListener('click', openPopupEditForm);
addButton.addEventListener('click', () => { openPopup(popupAddForm) });
popupCloseBtnEditForm.addEventListener('click', () => { closePopup(popupEditForm);});
popupCloseBtnAddForm.addEventListener('click', closePopupAddForm);
popupCloseBtnImgForm.addEventListener('click', () => { closePopup(popupImgForm);} );

// Убрала кнопки и попробовала применить этот способ. К сожалению, не сработало :(
// const closeButtons = document.querySelectorAll('.popup__close');
// closeButtons.forEach((button) => {
//   // находим 1 раз ближайший к крестику попап 
//   const popup = button.closest('.popup');
//   // устанавливаем обработчик закрытия на крестик
//   button.addEventListener('click', () => closePopup(popup));
// });


