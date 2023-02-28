import { templateSelectorCard } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";
import "./index.css";

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    Authorization: "615ec7c0-c05d-4e3c-8fba-c9ef3b1c5572",
    "Content-Type": "application/json",
  },
};

//api
const api = new Api(apiConfig);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const updateAvatarButton = document.querySelector(".profile__avatar-button");

//попап с увеличенной картинкой
const cardImagePopup = new PopupWithImage("#popup-open-img");

//установить обработчики событий на попап с картинкой
cardImagePopup.setEventListeners();

//-----------------------------------------------------------------------------------

//config для валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-field",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input-field_type_error",
  errorClass: "popup__input-field-error_visible",
};

//массив форм валидации
const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    //в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//-----------------------------------------------------------------------------------------------------

//попап "подтвердить удаление"
const popupConfirmDelete = new PopupConfirm("#popup-confirmation");
popupConfirmDelete.setEventListeners();

//-----------------------------------------------------------------------------------------------------
//является ли владельцем? is owner?
const isOwner = (idCard) => {
  return (idCard.owner._id === user.getUserInfo().id) ? true : false;
}

//создание карточки. _templateSelectorCard необходим для выбора типа показа карточки(горизонтального или по умолчанию)
function createCard(dataCard, _isOwner, _templateSelectorCard) {
  const card = new Card(
    dataCard,
    _isOwner,
    _templateSelectorCard,
    {
      handleCardClick: (titleImage, linkImage) => {
        cardImagePopup.open(titleImage, linkImage);
      },
      handleAddLikeClick: () => {
        api
          .setLike(dataCard._id)
          .then((dataCard) => {
            card.toggleLike();
            card.updateCounterLikes(dataCard.likes.length);
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      handleDeleteLikeClick: () => {
        api
          .deleteLike(dataCard._id)
          .then((dataCard) => {
            card.toggleLike();
            card.updateCounterLikes(dataCard.likes.length);
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      handleRemoveCard: (dataCard) => {
        popupConfirmDelete.open({
          handleSubmit: () => {
            api
              .deleteCard(dataCard)
              .then(() => {
                card.delete();
              })
              .catch((error) => {
                console.log(error.message);
              })
              .finally(() => {
                popupConfirmDelete.close();
              });
          },
        });
      },
    }
  );
  return card.generate();
}

//создание списка карточек для отображения
const cardList = new Section(
  {
    renderer: (item) => {
      const _isOwner = isOwner(item);
      //создание карточки
      const card = createCard(item, _isOwner, templateSelectorCard);
      //добавление карточки
      cardList.addItem(card);
    },
  },
  ".gallery__list"
);

Promise.all([api.getUserInfo(), api.getCardList()])
  .then(([infoData, cardListData]) => {
    user.setUserInfo(infoData.name, infoData.about);
    user.setAvatar(infoData.avatar);
    user.setId(infoData._id);
    cardList.renderItems(cardListData.reverse());
  })
  .catch((error) => {
    console.log(error.message);
  });

//-----------------------------------------------------------------------------------------------------
//попапы

//создание объекта пользователь
const user = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__avatar"
);

popupConfirmDelete.setEventListeners();

//создание объекта формы для редактирования данных о пользователе
const popupProfileForm = new PopupWithForm({
  containerSelector: "#popup-edit-form",
  handleSubmitForm: (formData) => {
    popupProfileForm.renderLoading("Обновление...");
    api
      .updateUserInfo(formData["user-name"], formData["user-about"])
      .then((userData) => {
        user.setUserInfo(userData.name, userData.about);
        popupProfileForm.close();
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        popupProfileForm.renderLoading("Сохранить");
      });
  },
});

//обработичик событий для формы
popupProfileForm.setEventListeners();

//обработчик события нажатие на кнопку редактировать данные
editButton.addEventListener("click", () => {
  const { name, about } = user.getUserInfo();
  popupProfileForm.setInputValues({ "user-name": name, "user-about": about });
  popupProfileForm.open();
  formValidators["edit-form"].resetValidation();
});

//объект попап для обновления аватара
const popupAvatarForm = new PopupWithForm({
  containerSelector: "#popup-update-avatar",
  handleSubmitForm: (formData) => {
    popupAvatarForm.renderLoading("Обновление аватара...");
    api
      .updateAvatar(formData["input-link-on-avatar"])
      .then((userData) => {
        user.setAvatar(userData.avatar);
        popupAvatarForm.close();
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        popupAvatarForm.renderLoading("Сохранить");
      });
  },
});

popupAvatarForm.setEventListeners();

//обработчик события нажатие на кнопку поменять аватар
updateAvatarButton.addEventListener("click", () => {
  popupAvatarForm.open();
  formValidators["update-avatar-form"].resetValidation();
});

//объект формы добавления карточки
const popupAddCardForm = new PopupWithForm({
  containerSelector: "#popup-add-form",
  handleSubmitForm: (data) => {
    popupAddCardForm.renderLoading("Сохранение...");
    api
      .sentCard(data)
      .then((dataCard) => {
        cardList.addItem(createCard(dataCard, true, templateSelectorCard));
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        popupAddCardForm.renderLoading("Создать");
      });
  },
});

//установить слушатели событий на
popupAddCardForm.setEventListeners();

//обработчик события нажатие на кнопку добавить карточку
addButton.addEventListener("click", () => {
  popupAddCardForm.open();
  formValidators["add-form"].resetValidation();
});

//-----------------------------------------------------------------------------------------------------
