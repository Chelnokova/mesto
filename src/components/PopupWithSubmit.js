import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
	constructor(popupSelector, {submit}) {
		super(popupSelector);
		this._submit = submit;
		this._form = this._itemPopup.querySelector('.popup__form');
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm();
			this.close();
		} )
	}

	close() {
		super.close();
		this._form.reset();
	}
}