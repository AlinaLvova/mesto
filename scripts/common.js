
const openPopup = (popup) => {
    document.addEventListener('keydown', closePopupByEscape);
    popup.classList.add('popup_opened');
  };  

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupByEscape);
  popup.classList.remove('popup_opened');
};

const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

export {openPopup, closePopup, closePopupByEscape};
