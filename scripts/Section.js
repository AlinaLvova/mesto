export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._containerSelector.prepend(item);
    }

    clear() {
        this._containerSelector.innerHTML = '';
    }

    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}