const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupCloseBtnEditForm = document.querySelector('#close-btn-edit');
const popupCloseBtnAddForm = document.querySelector("#close-btn-add");

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

addButton.addEventListener('click', () => {openPopup(popupAddForm);});

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
    descrptProfile.textContent = titleInput.value; 
    nameProfile.textContent =  linkInput.value; 
    closePopup(popupAddForm); 
}

popupEditForm.addEventListener('submit', saveInputEditForm);
popupAddForm.addEventListener('submit', saveInputAddForm);
