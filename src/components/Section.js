export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._element = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._element.prepend(item);
    }

    clear() {
        this._element.innerHTML = '';
    }

    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}