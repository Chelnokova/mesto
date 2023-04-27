import {initialCards} from './utils/initialCards.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {UserInfo} from './components/UserInfo.js';

import {editBtn, addBtn, formElementProfile, formElementCard, nameInput, jobInput, validationClasses, classes} from './utils/constants.js';

const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();


const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();

const popupProfile = new PopupWithForm(classes.profilePopupSelector, {
	submitForm: (data) => {
		userInfo.setUserInfo(data.nameProfile, data.jobProfile);
	}
});
// слушатель клика по кнопке editBtn и запуска открытия нужного попапа с автоматическим заполнением полей
editBtn.addEventListener('click', function() {
	popupProfile.open();
	
	const dataUser = userInfo.getUserInfo();
	
	nameInput.value = dataUser.name;
	jobInput.value = dataUser.job;

	formProfileValidator.cleanupValidation();
});
popupProfile.setEventListeners();

const popupNewCard = new PopupWithForm(classes.newCardPopupSelector, {
	submitForm: (item) => {
		cardContainer.addItem(addNewCard(item));
	}
});
popupNewCard.setEventListeners();

const popupView = new PopupWithImage(classes.viewPopupSelector);
popupView.setEventListeners();

const userInfo = new UserInfo({
	nameSelector:'.profile__name', 
	jobSelector: '.profile__job'
});

 export function openPopupImg(data) {
	popupView.open(data.name, data.link);
}

const cardContainer = new Section(
	{
		items: initialCards,
		renderer: (item) => {
			cardContainer.addItem(addNewCard(item));
		}
	}, classes.cardContainer
)

cardContainer.renderItems();

// Функция создания карточки
function addNewCard (dataCard) {
	const newCard = new Card(dataCard, classes.cardTemplate, openPopupImg);

	const newCardElement = newCard.generateCard();
	return newCardElement;
	
}

// слушатель клика по кнопке addBtn и запуска открытия нужного попапа
addBtn.addEventListener('click', function() {
	popupNewCard.open();
	formCardValidator.cleanupValidation();
});
