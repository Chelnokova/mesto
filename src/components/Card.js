export class Card {
	constructor(data, templateSelector, handleOpenPopupImg) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._handleOpenPopupImg = handleOpenPopupImg;
	}

	_getTemplate() {
		const cardElement = document
		.querySelector(this._templateSelector)
		.content
		.querySelector('.elements__card')
		.cloneNode(true);
		
		return cardElement;
		
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();
		
		this._element.querySelector('.elements__img').src = this._link;
		this._element.querySelector('.elements__title').textContent = this._name;
		this._element.querySelector('.elements__img').alt = `На фото ${this._name}`;

		return this._element;
	}

	_handleLikeButton() {
		this._element.querySelector('.elements__like').classList.toggle('elements__like_checked');
	}

	_handleDeleteButton() {
		this._element.remove();
		this._element = null;
	}

	_setEventListeners() {
		this._element.querySelector('.elements__like').addEventListener('click', () => {
			this._handleLikeButton();
		});
		this._element.querySelector('.elements__basket').addEventListener('click', () => {
			this._handleDeleteButton();
		});
		this._element.querySelector('.elements__img').addEventListener('click', () => {
			this._handleOpenPopupImg({
				name: this._name, 
				link: this._link});
		})
	}
}