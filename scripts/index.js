const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupCloseBtnEditForm = document.querySelector('#close-btn-edit');
const popupCloseBtnAddForm = document.querySelector("#close-btn-add");
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

editButton.addEventListener('click', openPopupEditForm);

addButton.addEventListener('click',  () => { openPopup(popupAddForm);});

popupCloseBtnEditForm.addEventListener('click', () => {
    closePopup(popupEditForm);
});

popupCloseBtnAddForm.addEventListener('click', () => {
    closePopup(popupAddForm);   
});

function saveInputEditForm (evt) {
    evt.preventDefault();    
    descrptProfile.textContent = descrptInput.value;
    nameProfile.textContent = nameInput.value; 
    closePopup(popupEditForm); 
}

function saveInputAddForm (evt) {
    evt.preventDefault();
    let newCard = {};
    newCard.name = titleImgInput.value;
    newCard.link = linkImgInput.value;
    initialCards.push({name: titleImgInput.value, link: linkImgInput.value});
    console.log(initialCards);
    closePopup(popupAddForm);
    renderCardList(titleImgInput.value, linkImgInput.value);
    titleImgInput.value="";
    linkImgInput.value="";
}

const createCard = (nameCard, linkCard) => {
    const newCardItem = templateCard.content.querySelector('.card').cloneNode(true);
    newCardItem.querySelector('.card__image').src = linkCard;
    newCardItem.querySelector('.card__title').textContent = nameCard;
    return newCardItem;
}

const renderCardList = (cardName, cardLink) =>{
    cardsList.prepend(createCard(cardName, cardLink));
}

popupEditForm.addEventListener('submit', saveInputEditForm);
popupAddForm.addEventListener('submit', saveInputAddForm);


initialCards.forEach((cardItem) => {
    renderCardList(cardItem.name, cardItem.link);
});
