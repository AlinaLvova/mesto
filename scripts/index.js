const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupCloseBtnEditForm = document.querySelector('#close-btn-edit');
const popupCloseBtnAddForm = document.querySelector("#close-btn-add");

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


let titleInput = document.querySelector('#input-title');
let linkInput = document.querySelector('#input-link');

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
    // descrptProfile.textContent = titleInput.value; 
    // nameProfile.textContent =  linkInput.value; 
    closePopup(popupAddForm);
    titleInput.value="";
    linkInput.value="";
}

popupEditForm.addEventListener('submit', saveInputEditForm);
popupAddForm.addEventListener('submit', saveInputAddForm);


const cardsList = document.querySelector('.gallery__list');

const createCard = (nameCard, linkCard) => {
    const li = document.createElement('li');
    const article = document.createElement('article');
    const img =  document.createElement('img');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const buttonLike = document.createElement('button');

    li.classList.add('card');
    img.classList.add('card__image');
    img.src=linkCard;
    div.classList.add('card__footer');
    h2.classList.add('card__title');
    h2.textContent=nameCard;
    buttonLike.classList.add('card__like', 'link');
    buttonLike.ariaLabel='liked';
    buttonLike.type='button';

    div.append(h2, buttonLike);
    article.append(img, div);
    li.append(article);
    return li; 



}

cardsList.append(...initialCards.map((cardItem) => {
    return createCard(cardItem.name, cardItem.link);
}))