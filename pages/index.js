import {initialCards} from '../utils/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import {editBtn, addBtn, formElementProfile, formElementCard, nameInput, jobInput, validationClasses, classes} from '../utils/constants.js';

function openPopupImg(data) {
	popupView.open(data.name, data.link);
}

function addNewCard (dataCard) {
	const newCard = new Card(dataCard, classes.cardTemplate, openPopupImg);

	const newCardElement = newCard.generateCard();
	return newCardElement;
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

const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();


const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();

const userInfo = new UserInfo({
	nameSelector:'.profile__name', 
	jobSelector: '.profile__job'
});

const popupProfile = new PopupWithForm(classes.profilePopupSelector, {
	submitForm: (data) => {
		userInfo.setUserInfo(data.nameProfile, data.jobProfile);
	}
});

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

addBtn.addEventListener('click', function() {
	popupNewCard.open();
	formCardValidator.cleanupValidation();
});

const popupView = new PopupWithImage(classes.viewPopupSelector);
popupView.setEventListeners();