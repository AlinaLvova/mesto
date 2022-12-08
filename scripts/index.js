const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-descrpt');
let nameProfile = document.querySelector('.profile__name');
let descrptProfile = document.querySelector('.profile__description');
let popupContainer = document.querySelector('.popup__container');

console.log({formElement});

function openPopup() {
    event.preventDefault();    
    jobInput.value = descrptProfile.textContent;
    nameInput.value = nameProfile.textContent;  
    popup.classList.add('popup_opened');
}

function closePopup(){
    popup.classList.remove('popup_opened');
}

function saveInput (evt) {
    evt.preventDefault(); 
    descrptProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value; 
    console.log('me');
    closePopup(); 
    console.log('me2');
}

editButton.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', saveInput);