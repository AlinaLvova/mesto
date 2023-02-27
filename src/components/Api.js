export default class Api{
    headers;

    constructor(config){
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    // функция обработки результата ответа сервера
    _handleResponse (response, errorMessage) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}.${errorMessage}`));
    };

    sentCard({name, link}){
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(_handleResponse);
    }

    //обновление данных о пользователе на сервере
    updateUserInfo(name, about){
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(_handleResponse);
    }

    //обновить аватар
    updateAvatar(avatar){
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(_handleResponse);
    }

    //получить информацию о пользователе
    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: 'GET'
        })
        .then(_handleResponse);
    }
    
    //поставить лайк карточке
    setLike(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: this.headers,
            method: 'PUT'
        })
        .then(_handleResponse);
    }

    //убрать лайк с карточки
    deleteLike(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: this.headers,
            method: 'DELETE'
        })
        .then(_handleResponse);
    }

    //удалить карточку по id
    deleteCard(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            headers: this.headers,
            method: 'DELETE'
        })
        .then(_handleResponse);
    }

    //получить список карточек
    getCardList() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'GET'
        })
        .then(_handleResponse);
    }

    // async getInitialCardList() {
    //     const response = await fetch(`${this.baseUrl}/cards`, {
    //         headers: this.headers,
    //         method: 'GET'
    //     });
    //     const cards = await response.json();
    //     return cards;
    // }

    // async createCard({name, link}){
    //     const response = await fetch(`${this.baseUrl}/cards`, {
    //         headers: {
    //             'Authorization': this.headers.Authorization
    //         },
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: name,
    //             link: link
    //           })
    //     });
    //     const data = await response.json();
    //     return data;
    // }
}   