import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._itemPopup.querySelector('.popup__image');
		this._popupTitle = this._itemPopup.querySelector('.popup__heading');
	}
	open(name, link) {
		this._popupImage.src = link;
		this._popupImage.alt = name;
		this._popupTitle.textContent = `${name}`;
		super.open();
	}
}