export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, avatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._avatar.alt = "Аватар";
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      id: this._id,
    };
  }

  setUserInfo(userName, userAbout) {
    this._userName.textContent = userName;
    this._userAbout.textContent = userAbout;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setId(id) {
    this._id = id;
  }
}
