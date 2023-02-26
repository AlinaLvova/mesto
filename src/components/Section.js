export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._element = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._element.prepend(item);
    }

    clear() {
        this._element.innerHTML = '';
    }

    renderItems(itemList) {
        this.clear();

        itemList.forEach(item => {
            this._renderer(item);
        });
    }
}