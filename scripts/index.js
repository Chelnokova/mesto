import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator, validationClasses} from './FormValidator.js';

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


const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();


const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();

// Функция предназначена для сброса написанных данных и текста ошибки в формах создания карточки и редактирования данных профиля при обычном закрытии попапа без сохранения
function resetFormInput(elem) {
	if(elem.classList.contains('popup_type_add')) {
		formCardValidator.cleanupValidation();
		formElementCard.reset();
	}
	if(elem.classList.contains('popup__type_edit')) {
		formProfileValidator.cleanupValidation();
	}
}

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
		resetFormInput(openPopup);
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

	closePopup(popupAdd);
}

// слушатель клика по кнопке editBtn и запуска открытия нужного попапа с автоматическим заполнением полей
editBtn.addEventListener('click', function() {
	openPopup(popupEdit);
	
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
	formProfileValidator.cleanupValidation();
});

// слушатель клика по кнопке addBtn и запуска открытия нужного попапа
addBtn.addEventListener('click', function() {
	openPopup(popupAdd);
	formCardValidator.cleanupValidation();
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

// перебор кнопок закрытия попапа и запуск соответствующей функции 
closeBtns.forEach(closeCross);

initialCards.forEach((item) => {
	addNewCard(item);
})