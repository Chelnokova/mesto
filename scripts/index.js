import {initialCards} from './initialCards.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {Popup} from './components/Popup.js';

import {editBtn, addBtn, nameProfile, jobProfile, popups, popupEdit, popupAdd, popupView, popupImage, popupTitle, closeBtns, formElementProfile, formElementCard, nameInput, jobInput, titleInput, linkInput,validationClasses, clases} from './utils/constants.js';

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
		resetFormInput(openPopup);
		closePopup(openPopup);
	} 
}

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
	const section = new Section({
		items: dataCard,
		renderer: (dataCard) => {
			const newCard = new Card(dataCard, '#template__card', openPopupImg);

			const newCardElement = newCard.generateCard();

			section.addItem(newCardElement);
		}
	}, clases.cardContainer);
	section.renderItems();
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

// initialCards.forEach((item) => {
// 	addNewCard(item);
// })
addNewCard(initialCards);