import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

import {editBtn, addBtn, avatarBtn, formElementProfile, formElementCard, nameInput, jobInput, validationClasses, classes} from '../utils/constants.js';

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
	headers: {
		authorization: '717e6c4e-4750-40ec-9c9c-84fda89b08d4',
		'Content-Type': 'application/json'
	}
  }); 

api.getInitialCards()
.then((cards) => {
	cardContainer.renderItems(cards);
}).catch((err) => {
	  console.log(err);
	});

let userId;
api.getUserInfo().then((userData) => {
	userInfo.setUserInfo(userData.name, userData.about);
	userInfo.setUserAvatar(userData.avatar);
	userId = userData._id;
}).catch((err) => {
	console.log(err);
  });

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
		renderer: (item) => {
			cardContainer.addItem(addNewCard(item));
		}
	}, classes.cardContainer
)

const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();


const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();

const userInfo = new UserInfo({
	nameSelector:'.profile__name', 
	jobSelector: '.profile__job',
	avatarSelector: '.profile__avatar'
});

const popupAvatar = new PopupWithForm(classes.avatarPopupSelector, {
	submitForm: (data) => {

	}
});
popupAvatar.setEventListeners();

avatarBtn.addEventListener('click', function() {
	popupAvatar.open();
})

const popupProfile = new PopupWithForm(classes.profilePopupSelector, {
	submitForm: (data) => {
		userInfo.setUserInfo(data.nameProfile, data.jobProfile);
	}
});
popupProfile.setEventListeners();

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