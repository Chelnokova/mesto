import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._form = this._itemPopup.querySelector('.popup__form');
	}

	setSubmitAction(action) {
		this._functionSubmit = action;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._functionSubmit();
			super.close();
		} )
	}
}