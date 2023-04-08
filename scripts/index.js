// Переменные блока profile
const editBtn = document.querySelector('.profile__btn-edit');
const addBtn = document.querySelector('.profile__btn-add');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Переменные блока popup
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__heading');

// Переменные кнопок блока popup
const closeBtns = document.querySelectorAll('.popup__btn-close');

// Переменные формы блока popup
const formElementProfile = document.querySelector('.popup__form_type_profile');
const formElementCard = document.querySelector('.popup__form_type_card');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

// Переменные блока elements
const cardContainer = document.querySelector('.elements');

// Переменные для работы функции toggleButton
const inputList = Array.from(document.querySelectorAll('.popup__input'));
const buttonElement = formElementCard.querySelector('.popup__btn-form');

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// функция открытия попапа
function openPopup(elem) {
	elem.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupByEsc);
}

// Функция закрытия попапа
function closePopup(elem) {
	elem.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапа при клике на крестик
function closeCross(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		closePopup(openPopup);
	});
}

// Функция закрытия попапа нажатием на кнопку Esc
function closePopupByEsc(evt) {
	if (evt.key === 'Escape') {
		const openPopup = document.querySelector('.popup_opened');
		closePopup(openPopup);
	} 
}

// функция работы кнопки 'Сохранить'
function handleFormSubmitTypeProfile (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup(popupEdit);
}

 export function openPopupImg(name, link) {
	openPopup(popupView);
	popupImage.src = link;
	popupImage.alt = name;
	popupTitle.textContent = `На фото ${name}`;
}

// Функция создания карточки
function addNewCard (dataCard) {
	const newCard = new Card(dataCard, '#template__card', openPopupImg);

	const newCardElement = newCard.generateCard();

	cardContainer.prepend(newCardElement);
}

// функция работы кнопки "Создать"
function createCard(evt) {
	evt.preventDefault(); 

	addNewCard ({
		name: titleInput.value,
		link: linkInput.value
	});

	formElementCard.reset();

	// toggleButton(inputList, buttonElement, validationClasses);

	closePopup(popupAdd);
}

// слушатель клика по кнопке editBtn и запуска открытия нужного попапа с автоматическим заполнением полей
editBtn.addEventListener('click', function() {
	openPopup(popupEdit);
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
});

// слушатель клика по кнопке addBtn и запуска открытия нужного попапа
addBtn.addEventListener('click', function() {
	openPopup(popupAdd);
});

// слушатель события submit на formElementProfile
formElementProfile.addEventListener('submit', handleFormSubmitTypeProfile);

// слушатель события submit на formElementCard
formElementCard.addEventListener('submit', createCard);

// закрытие попапа кликом на оверлей
popups.forEach((popupEl) => {
	popupEl.addEventListener('mousedown', (evt) => {
		if (evt.target === popupEl) {
			closePopup(popupEl);
		}
	})
})

// перебор массива с данными карточек и запуска функции fillCard
// import {initialCards} from './Card.js';
// initialCards.forEach(function(el) {
// 	cardContainer.prepend(fillCard(el));
// } );

// перебор кнопок закрытия попапа и запуск соответствующей функции 
closeBtns.forEach(closeCross);