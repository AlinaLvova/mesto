export default class Popup{
    constructor(containerSelector){
        this._element = document.querySelector(containerSelector);
    }

    open(){
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt);});
        this._element.classList.add('popup_opened');    
    }

    close(){
        document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt);});
        this._element.classList.remove('popup_opened');      
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    setEventListeners(){  
        const closeButton = this._element.querySelector('.popup__close-btn');
        // устанавливаем обработчик закрытия на крестик 
        closeButton.addEventListener('click', () => this.close());
  
        //добавить обработчик для закрытия по overlay
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
              this.close();
            }
        });
    }
}