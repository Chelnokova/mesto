import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
	constructor(popupSelector, {submitForm}) {
		super(popupSelector);
		this._submitForm = submitForm;
		this._form = this._itemPopup.querySelector('.popup__form');
		this._submitButton = this._form.querySelector('.popup__btn-form');
		this.initialTextButton = this._submitButton.textContent;
		this._inputList = this._form.querySelectorAll('.popup__input');
	}

	_getInputValues() {
		this._inputValue = {};
		this._inputList.forEach(input => {
			this._inputValue[input.name] = input.value;
		});
		return this._inputValue;
	}
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this._getInputValues());
		} )
	}

	renderLoading(isLoading) {
		if(isLoading) {
			this._submitButton.textContent = 'Сохранение...';
		} else {
			this._submitButton.textContent = this.initialTextButton;
		}
	}

	close() {
		super.close();
		this._form.reset();
	}
}