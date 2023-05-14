export class Card {
	constructor(data, templateSelector, userId, handleOpenPopupImg, handlePutLike, handleRemoveLike, handleOpenPopupDelete) {
		this._cardDate= data;
		this._name = data.name;
		this._link = data.link;
		this.cardId = data._id;
		this._templateSelector = templateSelector;
		this._userId = userId;
		this._handleOpenPopupImg = handleOpenPopupImg;
		this._handlePutLike = handlePutLike;
		this._handleRemoveLike = handleRemoveLike;
		this._handleOpenPopupDelete = handleOpenPopupDelete;
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
		
		this.renderLikes(this._cardDate);

		if(this._cardDate.owner._id !== this._userId) {
			this._basketButton.classList.add('elements__basket_disabled');
		}

		this._cardImage.src = this._link;
		this._elementTitle.textContent = this._name;
		this._cardImage.alt = `На фото ${this._name}`;

		return this._element;
	}

	_checkLikes() {
		return this._likes.find((like) => like._id === this._userId)
	}

	renderLikes(card) {
		this._likes = card.likes;
		this._amountLikes = this._element.querySelector('.element__amount-like');

		this._amountLikes.textContent = this._likes.length;

		if(this._checkLikes()) {
			this._likeButton.classList.add('elements__like_checked');
		} else {
			this._likeButton.classList.remove('elements__like_checked');
		}
	}

	_processingLike() {
		if(this._checkLikes()) {
			this._handleRemoveLike(this.cardId);
		} else {
			this._handlePutLike(this.cardId);
		}
	}

	deleteCard() {
		this._element.remove();
		this._element = null;
	}

	_setEventListeners() {
		this._likeButton.addEventListener('click', () => {
			this._processingLike();
		});
		this._basketButton.addEventListener('click', () => {
			this._handleOpenPopupDelete(this);
		});
		this._cardImage.addEventListener('click', () => {
			this._handleOpenPopupImg({
				name: this._name, 
				link: this._link});
		})
	}
}