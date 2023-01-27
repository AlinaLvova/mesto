export default class FormValidator {
    constructor(config, formValidate) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formValidate = formValidate;
        this._inputList = Array.from(this._formValidate.querySelectorAll(this._inputSelector));
        this._submitButtonElement = this._formValidate.querySelector(this._submitButtonSelector);
    }

    //скрыть сообщение об ошибке
    _hideInputError(inputElement) {
        const errorElement = this._formValidate.querySelector(`.${inputElement.id}-error`);

        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    //показать сообщение об ошибке
    _showInputError(inputElement) {
        const errorElement = this._formValidate.querySelector(`.${inputElement.id}-error`);

        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    // проверка у инпутов на свойство validity
    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    //проверка на валидность всех полей в форме
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    //переключить состояние кнопки на активное/неактивное
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._submitButtonElement.classList.add(this._inactiveButtonClass);
            this._submitButtonElement.disabled = true;
        } else {
            this._submitButtonElement.classList.remove(this._inactiveButtonClass);
            this._submitButtonElement.disabled = false;
        }
    }

    //обработчик события инпут для всех форм
    _setEventListener() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListener();
    }
}


