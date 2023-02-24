# Проект: Место

### Обзор

Сервис Mesto - это интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.
  
#### Часть I

На данном этапе реализована страница с адаптивной вёрсткой по макету Figma. В сервисе уже можно изменять имя и описание о себе, через модальное окно. Взаимодействие пользователя со страницей реализовано с помощью DOM-дерева и JavaScript.

#### Часть II

Реализованы следующие функции для пользователя:
*Добавить новую фотокарточку
*Удалить фотокарточку
*Поставить лайк фото
*Просмотр увеличенной фотокарточки

#### Часть III

*Валидация данных в форме
*Закрытие попапа нажатием на оверлей и кнопкой ESC

#### Часть IV

*Произведен рефакториг кода: созданы два класса FormValidate и Card. В каждом классе реализованы функции, непосрественно выполняющие задачи только в своем классе.

#### Часть V

*Код переработан по методологии парадигмы ООП. Использование инкапсуляции, наследования и полиморфизма.

#### Часть V. API

GET <https://nomoreparties.co/v1/cohortId/users/me>

Загрузка информации о пользователе с сервера. Поля name, about и avatar.

GET <https://mesto.nomoreparties.co/v1/cohortId/cards>

Загрузка карточек с сервера. name и link — это заголовок и ссылка на картинку

POST <https://mesto.nomoreparties.co/v1/cohortId/cards>

Создание карточки, обязательные поля: name и link

PATCH <https://mesto.nomoreparties.co/v1/cohortId/users/me>

Обновление информации о пользователе.
В заголовках запроса, кроме токена, необходимо отправить Content-Type, а в теле — JSON с двумя свойствами — name и about

DELETE <https://mesto.nomoreparties.co/v1/cohortId/cards/cardId>

Удаление карточки. Вместо cardId в URL нужно подставить параметр _id карточки, которую нужно удалить. Пример запроса: DELETE <https://mesto.nomoreparties.co/v1/cohortId/cards/5d1f0611d321eb4bdcd707dd>

PUT <https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes>

Поставить лайк карточке

DELETE <https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes>

Снять лайк у карточки

Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
В ответе придёт обновлённый JSON с карточкой. Массив лайков в нём будет уже обновлён

PATCH <https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar>

Обновление аватара пользователя

**Ссылки на проект и на макет в Figma**

* [Ссылка на макет 1](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Ссылка на макет 2](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1&t=zH29BLhLUisbn5Hj-0)

* [Ссылка на сервис проекта MESTO](https://alinalvova.github.io/mesto/index.html)

**Технологии**

* HTML5
* CSS3
* JavaScript
* BEM (nested)
* DOM-модель
* GIT (Git Branch)
* WebPack

**Функционал**

* Адаптивность страницы на всех разрешениях
* Модальное окно для редактирования данных пользователя
* Файловая структура и именование классов по методологии BEM
* Кроссбраузерная вёрстка
* Переполнение разделов "имя" и "о себе" строго контролируется.
