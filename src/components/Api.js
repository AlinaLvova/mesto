// функция обработки результата ответа сервера
const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(new Error('Произошла ошибка получения данных с сервера'));
};

export default class Api{
    headers;

    constructor(config){
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    addNewCard({name, link}){
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(handleResponse);
    }

    //обновление данных о пользователе на сервере
    updateUserInfo({name, about}){
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(handleResponse);
    }

    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: 'GET'
        })
        .then(handleResponse);
    }
    
    deleteCard(id){
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'DELETE'
        })
        .then(handleResponse);
    }

    getCardList() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'GET'
        })
        .then(handleResponse);
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