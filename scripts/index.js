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

popupEditForm.addEventListener('submit', saveInputEditForm);
popupAddForm.addEventListener('submit', saveInputAddForm);


const cardsList = document.querySelector('.gallery__list');

const createCard = (nameCard, linkCard) => {
    return `<li class="card">
        <article>
            <img class="card__image" src="${linkCard}">
            <div class="card__footer">
                <h2 class="card__title">${nameCard}</h2>
                <button class="card__like link" type="button" aria-label="liked"></button>
            </div>
        </article>
    </li>`
    const container = document.createElement('div');
    container.innerHTML = string;
    container.querySelector('.card__image').src = linkCard;
    container.querySelector('.card__title').textContent = nameCard;
    return container.firstElementChild;
}

const renderCardList = (cardName, cardLink) =>{
    cardsList.append(createCard(cardName, cardLink));
}

initialCards.forEach((cardItem) => {
    renderCardList(cardItem.name, cardItem.link);
});

// cardsList.insertAdjacentElement('beforebegin',  map(createCard).join('\n'));