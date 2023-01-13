
//проверка на валидность всех полей в форме
function hasInvalidInput(inputList){
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

//переключить состояние кнопки
function toggleButtonState(inputList, submitButtonElement, config){
    if(hasInvalidInput(inputList)){
        submitButtonElement.classList.add(config.inactiveButtonClass);
        submitButtonElement.disabled = true;
    }else{
        submitButtonElement.classList.remove(config.inactiveButtonClass);
        submitButtonElement.disabled = false;
    }
}

function hideAllInputErrors(popup, config){
    const errorList = Array.from(popup.querySelectorAll(`.${config.errorClass}`));
    const inputList = errorList.map((error) => error.previousElementSibling);
  
    inputList.forEach(inputElement => inputElement.classList.remove(config.inputErrorClass));
    errorList.forEach(errorElement => errorElement.classList.remove(config.errorClass));  
}

//скрыть сообщение об ошибке
function hideInputError(formElement, inputElement, config){ 
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
}

//показать сообщение об ошибке
function showInputError(formElement, inputElement, config){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
}

// проверка у инпутов на свойство validity
function checkInputValidity(formElement, inputElement, config){  
    if (inputElement.validity.valid){
        hideInputError(formElement, inputElement, config);
    }else{
        showInputError(formElement, inputElement, config);
    }
}

//обработчик события инпут для всех форм
function setEventListener(formElement, config){ 
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, submitButtonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, submitButtonElement, config);
        });
    });
}

function enableValidation(config){
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        setEventListener(formElement, config);
    });
}