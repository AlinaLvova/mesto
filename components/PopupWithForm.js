import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({containerSelector, handleSubmitForm}) {
        super(containerSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._element.querySelector('.popup__form'); 
    }

    //собрать данные всех полей формы
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._element.querySelectorAll('.popup__input-field');

        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }

    //заполнить поля формы данными
    setInputValues(data) {
        for(let key in data){
            document.querySelector(key).value = data[key];
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
            this.close();
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
};