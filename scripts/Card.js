// данные для карточек
export const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

//   export default class Card {
// 	constructor(data, templateSelector) {
// 		this._name = data.name;
// 		this._link = data.link;
// 		this._templateSelector = templateSelector;
// 	}

// 	_getTemplate() {
// 		const cardElement = document
// 		.querySelector(this._templateSelector)
// 		.content
// 		.querySelector('.elements__card')
// 		.cloneNode(true);
		
// 		return cardElement;
		
// 	}


	
// 	generateCard() {
// 		this._element = this._getTemplate();
// 		this._setEventListeners();
		
// 		this._element.querySelector('.elements__img').src = this._link;
// 		this._element.querySelector('.elements__title').textContent = this._name;
// 		this._element.querySelector('.elements__img').alt = `На фото ${this._name}`;

// 		return this._element;
// 	}

// 	_handleLikeButton() {
// 		this._element.querySelector('.elements__like').classList.toggle('elements__like_checked');
// 	}

// 	_handleDeleteButton() {
// 		this._element.remove();
// 	}

// 	_setEventListeners() {
// 		this._element.querySelector('.elements__like').addEventListener('click', () => {
// 			this._handleLikeButton();
// 		});
// 		this._element.querySelector('.elements__basket').addEventListener('click', () => {
// 			this._handleDeleteButton();
// 		})
// 	}
//   }

//   initialCards.forEach((item) => {
// 	const card = new Card(item, '#template__card');
	
// 	const cardElemenet = card.generateCard();

// 	document.querySelector('.elements').append(cardElemenet);
//   })