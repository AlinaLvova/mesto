const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupImgForm = document.querySelector('#popup-open-img');

const popupCloseBtnEditForm = document.querySelector('#close-btn-edit');
const popupCloseBtnAddForm = document.querySelector("#close-btn-add");
const popupCloseBtnImgForm = document.querySelector('#close-btn-img');

const templateCard = document.querySelector('#cards-list-template');
const cardsList = document.querySelector('.gallery__list');
let initialCards = [
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

const saveProfile = function saveInputEditForm(evt) {
  evt.preventDefault();
  descrptProfile.textContent = descrptInput.value;
  nameProfile.textContent = nameInput.value;
  closePopup(popupEditForm);
}

const saveNewCard = function saveInputAddForm(evt) {
  evt.preventDefault();
  if (titleImgInput.value === "" || linkImgInput.value === "")
    return alert("Введите корректные данные");
  initialCards.push({ name: titleImgInput.value, link: linkImgInput.value });
  closePopup(popupAddForm);
  renderCardList(titleImgInput.value, linkImgInput.value);
  titleImgInput.value = "";
  linkImgInput.value = "";
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

const createCard = (nameCard, linkCard) => {
  const cardItem = templateCard.content.querySelector('.card').cloneNode(true);
  const cardItemImg = cardItem.querySelector('.card__image');
  let cardItemLike = cardItem.querySelector('.card__like');
  cardItemImg.src = linkCard;
  cardItemImg.alt = nameCard;
  cardItem.querySelector('.card__title').textContent = nameCard;

  cardItemLike.addEventListener('click', () => {
    if (!cardItemLike.matches('.card__like_active')){
      cardItemLike.classList.add('card__like_active');
    }
    else{
      cardItemLike.classList.remove('card__like_active');
    }
  });
  cardItemImg.addEventListener('click', () => { popupOpenImgForm(nameCard, linkCard) });
  popupCloseBtnImgForm.addEventListener('click', () => { closePopup(popupImgForm);} );
  cardItem.querySelector('.card__delete').addEventListener('click', () => { cardItem.remove(); });

  return cardItem;
}

const popupOpenImgForm = (nameCard, linkCard) => {
  const img = popupImgForm.querySelector('.popup__image');
  popupImgForm.querySelector('.popup__figcaption').textContent = nameCard;
  img.src = linkCard;
  img.alt = nameCard;
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
addButton.addEventListener('click', () => { openPopup(popupAddForm); });
popupCloseBtnEditForm.addEventListener('click', () => { closePopup(popupEditForm);});
popupCloseBtnAddForm.addEventListener('click', () => {  closePopup(popupAddForm);});


