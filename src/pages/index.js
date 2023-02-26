import {templateSelectorCard} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    'Authorization': '615ec7c0-c05d-4e3c-8fba-c9ef3b1c5572',
    'Content-Type': 'application/json'
  }
}

//api
const api = new Api(apiConfig);

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const updateAvatarButton = document.querySelector('.profile__avatar-button');

//попап с увеличенной картинкой
const cardImagePopup = new PopupWithImage('#popup-open-img');

//установить обработчики событий на попап с картинкой
cardImagePopup.setEventListeners();

//-----------------------------------------------------------------------------------

//config для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_visible'
};

//массив форм валидации
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//-----------------------------------------------------------------------------------------------------

//создание карточки. _templateSelectorCard необходим для выбора типа показа карточки(горизонтального или по умолчанию) 
function createCard(dataCard, _templateSelectorCard) {
  const newAddCard = new Card(
    dataCard,
    _templateSelectorCard, {
    handleCardClick: (titleImage, linkImage) => {
      cardImagePopup.open(titleImage, linkImage);
    },
    handleLikeClick: (isActiveButton) => {
      if (isActiveButton) {
        api.setLike(dataCard._id)
        .then((dataCard) => {
          console.log(dataCard);
          newAddCard.updateCounterLikes(dataCard.likes.length);
        });
      }else{
        api.deleteLike(dataCard._id)
        .then((dataCard) => {
          newAddCard.updateCounterLikes(dataCard.likes.length);
        });
      }

    }
  });
  return newAddCard.generateCard();
}

//создание списка карточек для отображения
const cardList = new Section({
  data: [],
  renderer: (item) => {
    //создание карточки
    const card = createCard(item, templateSelectorCard);

    //добавление карточки
    cardList.addItem(card);
  }
}, '.gallery__list');

//получение списка карточек от сервера и отображение карточек на странице
api.getCardList().then((cards) => {
  cards.slice().reverse().forEach((card) => {
    cardList.addItem(createCard(card, templateSelectorCard));
  });
});

//-----------------------------------------------------------------------------------------------------
//попапы

//создание объекта пользователь
const user = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

api.getUserInfo().then((userInfo) => {
  console.log(userInfo);
  user.setUserInfo(userInfo.name, userInfo.about);
  user.setAvatar(userInfo.avatar);
});

//создание объекта формы для редактирования данных о пользователе
const profileForm = new PopupWithForm(
  {
    containerSelector: '#popup-edit-form',
    handleSubmitForm: (formData) => {
      user.setUserInfo(formData['user-name'], formData['user-about']);
      profileForm.close();
    }
  }
);

//обработичик событий для формы
profileForm.setEventListeners();

//обработчик события нажатие на кнопку редактировать данные
editButton.addEventListener('click', () => {
  const { name, about } = user.getUserInfo();
  profileForm.setInputValues({ "user-name": name, "user-about": about });
  profileForm.open();
  formValidators['edit-form'].resetValidation()
});

//объект попап для обновления аватара
const popupAvatarForm = new PopupWithForm(
  {
    containerSelector: '#popup-update-avatar',
    handleSubmitForm: (formData) => {
      console.log(formData['input-link-on-img']);
      api.updateAvatar(formData['input-link-on-img'])
      .then((userData) => {
        console.log(userData);
      });
      user.setAvatar(formData['input-link-on-img']);
      popupAvatarForm.close();
    }
  }
);

popupAvatarForm.setEventListeners();

//обработчик события нажатие на кнопку поменять аватар
updateAvatarButton.addEventListener('click', () => {
  popupAvatarForm.open();
  formValidators['update-avatar-form'].resetValidation();
});

//объект формы добавления карточки
const popupAddCardForm = new PopupWithForm(
  {
    containerSelector: '#popup-add-form',
    handleSubmitForm: (data) => {
      api.addNewCard(data)
      .then((dataCard) => {
        cardList.addItem(createCard(dataCard, templateSelectorCard));
      });
      //cardList.addItem(createCard(dataCard, templateSelectorCard));
      popupAddCardForm.close();
    }
  }
);

//установить слушатели событий на 
popupAddCardForm.setEventListeners();

//обработчик события нажатие на кнопку добавить карточку
addButton.addEventListener('click', () => {
  popupAddCardForm.open();
  formValidators['add-form'].resetValidation();
});

//-----------------------------------------------------------------------------------------------------





