import {initialCards} from '../components/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//попап с увеличенной картинкой
const cardImagePopup = new PopupWithImage('#popup-open-img');

//установить обработчики событий на попап с картинкой
cardImagePopup.setEventListeners();

const templateSelectorCard = '#cards-list-template';

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_visible'
};

//объект валидации для формы пользователя
const profileValidation = new FormValidator(validationConfig, document.querySelector('#popup-edit-form'));
profileValidation.enableValidation();

//объект валидации для формы добавления новой карточки
const newCardValidation = new FormValidator(validationConfig, document.querySelector('#popup-add-form'));
newCardValidation.enableValidation();

//создание карточки. _templateSelectorCard необходим для выбора типа показа карточки(горизонтального или по умолчанию) 
function createCard(dataCard, _templateSelectorCard) {
  const newAddCard = new Card(
    dataCard,
    _templateSelectorCard,
    (titleImage, linkImage) => {
      cardImagePopup.open(titleImage, linkImage);
    });
  return newAddCard.generateCard();
}

//создание списка карточек для отображения
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    //создание карточки
    const card = createCard(item, templateSelectorCard);

    //добавление карточки
    cardList.addItem(card);
  }
}, '.gallery__list');

//отображение карточек на странице
cardList.renderItems();

//объект формы добавления карточки
const addCardForm = new PopupWithForm(
  {
    containerSelector: '#popup-add-form',
    handleSubmitForm: (formData) => {
      const dataCard = { name: formData['input-title'], link: formData['input-link-on-img']};
      cardList.addItem(createCard(dataCard, templateSelectorCard));
      addCardForm.close();
    }
  }
);

//установить слушатели событий на 
addCardForm.setEventListeners();

//обработчик события нажатие на кнопку добавить карточку
addButton.addEventListener('click', () => {
  addCardForm.open();
  newCardValidation.resetValidation();
});

//создание объекта пользователь
const user = new UserInfo('.profile__name', '.profile__description');

//данные для заполнения в форме редактирования информации о пользователе
const userData = {   
   '#input-name': document.querySelector('.profile__name').textContent,
   '#input-descrpt': document.querySelector('.profile__description').textContent
}

//создание объекта формы для редактирования данных о пользователе
const profileForm = new PopupWithForm(
  {
    containerSelector: '#popup-edit-form',
    handleSubmitForm: (formData) => {
      user.setUserInfo(formData['user-name'], formData['user-descrpt']);
      userData['#input-name'] = formData['user-name'];
      userData['#input-descrpt'] = formData['user-descrpt'];
      profileForm.close();
    }
  }
);

//обработичик событий для формы
profileForm.setEventListeners();

//обработчик события нажатие на кнопку редактировать данные
editButton.addEventListener('click', () => {
  profileForm.setInputValues(userData);
  profileForm.open();
  profileValidation.resetValidation();
});


