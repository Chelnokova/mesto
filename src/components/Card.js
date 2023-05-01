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
		this._cardImage = this._element.querySelector('.elements__img');
		this._likeButton = this._element.querySelector('.elements__like');
		this._elementTitle = this._element.querySelector('.elements__title');
		this._basketButton = this._element.querySelector('.elements__basket');
		this._setEventListeners();
		
		this._cardImage.src = this._link;
		this._elementTitle.textContent = this._name;
		this._cardImage.alt = `На фото ${this._name}`;

		return this._element;
	}

	_handleLikeButton() {
		this._likeButton.classList.toggle('elements__like_checked');
	}

	_handleDeleteButton() {
		this._element.remove();
		this._element = null;
	}

	_setEventListeners() {
		this._likeButton.addEventListener('click', () => {
			this._handleLikeButton();
		});
		this._basketButton.addEventListener('click', () => {
			this._handleDeleteButton();
		});
		this._cardImage.addEventListener('click', () => {
			this._handleOpenPopupImg({
				name: this._name, 
				link: this._link});
		})
	}
}