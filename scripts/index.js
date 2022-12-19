const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
let popupEditForm = document.querySelector('#popup-edit-form');
let popupAddForm = document.querySelector('#popup-add-form');
const popupCloseBtnEditForm = document.querySelector('#close-btn-edit');
const popupCloseBtnAddForm = document.querySelector("#close-btn-add");

let titleInput = document.querySelector('#input-title');
let linkInput = document.querySelector('#input-link');
// let titleImg = document.querySelector('')

// let EditForm = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('#input-name');
let descrptInput = document.querySelector('#input-descrpt');
let nameProfile = document.querySelector('.profile__name');
let descrptProfile = document.querySelector('.profile__description');

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
  };

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

const openPopupEditForm = () => {
    descrptInput.value = descrptProfile.textContent;
    nameInput.value = nameProfile.textContent;
    let temp = document.querySelector('#popup-edit-form');
    popupEditForm.classList.add("popup_opened");
    console.log(temp);
};

editButton.addEventListener('click', openPopupEditForm);

addButton.addEventListener('click', () =>{
     popupAddForm.classList.add('popup_opened');
});

popupCloseBtnEditForm.addEventListener('click', () => {
    closePopup(popupEditForm);
});

popupCloseBtnAddForm.addEventListener('click', () => {
    closePopup(popupAddForm);   
});

popupEditForm.addEventListener('submit', saveInputEditForm);
popupAddForm.addEventListener('submit', saveInputAddForm);

console.log(popupEditForm, popupAddForm);