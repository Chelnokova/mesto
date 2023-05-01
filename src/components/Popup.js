export class Popup {
	constructor(popupSelector) {
		this._itemPopup = document.querySelector(popupSelector);
		this._closeButton = this._itemPopup.querySelector('.popup__btn-close');

	}
	open() {
		this._itemPopup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}
	close() {
		this._itemPopup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}
	_handleEscClose = (evt) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
	setEventListeners() {
		this._itemPopup.addEventListener('mousedown', (evt) => {
			if (evt.target === this._itemPopup) {
				this.close();
			}
		});
		this._closeButton.addEventListener('click', () => {
			this.close()
		})
	}
}