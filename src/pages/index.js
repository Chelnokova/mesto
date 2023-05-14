import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

import {editBtn, addBtn, avatarBtn, formElementProfile, formElementCard, formElementAvatar, nameInput, jobInput, validationClasses, classes} from '../utils/constants.js';

let userId;

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
	headers: {
		authorization: '717e6c4e-4750-40ec-9c9c-84fda89b08d4',
		'Content-Type': 'application/json'
	}
  }); 

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
	userInfo.setUserInfo(userData);
	userInfo.setUserAvatar(userData.avatar);
	userId = userData._id;

	cardContainer.renderItems(cards);
}).catch((err) => {
	console.log(err);
})

function openPopupImg(data) {
	popupView.open(data.name, data.link);
}

function handleDelete(card) {
	const submitConfirm = () => {
		api.deleteCard(card.cardId)
		.then((res) => {
			card.deleteCard(res);
			popupDelete.close();
		}).catch((err) => {
			console.log(err);
		})
	}

	popupDelete.open(card);
	popupDelete.setSubmitAction(submitConfirm);
}

function addNewCard (dataCard) {
	const newCard = new Card(dataCard, classes.cardTemplate, userId, openPopupImg, 
		(cardId) => {
			api.sendLike(cardId)
			.then((res) => {
				newCard.renderLikes(res)
			}).catch((err) => {
				console.log(err);
			})
		}, (cardId) => {
			api.removeLike(cardId)
			.then((res) => {
				newCard.renderLikes(res)
			}).catch((err) => {
				console.log(err);
			})
		}, handleDelete);

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
const userInfo = new UserInfo({
	nameSelector:'.profile__name', 
	jobSelector: '.profile__job',
	avatarSelector: '.profile__avatar'
});

const popupView = new PopupWithImage(classes.viewPopupSelector);

const popupDelete = new PopupWithSubmit(classes.deletePopupSelector);

const popupAvatar = new PopupWithForm(classes.avatarPopupSelector, {
	submitForm: (data) => {
		popupAvatar.renderLoading(true);
		api.sendNewAvatar(data.link)
		.then((data) => {
			userInfo.setUserAvatar(data.avatar);
			popupAvatar.close();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			popupAvatar.renderLoading(false);
		})
	}
});

const popupProfile = new PopupWithForm(classes.profilePopupSelector, {
	submitForm: (data) => {
		popupProfile.renderLoading(true);
		api.sendUserData(data)
		.then((data) => {
			userInfo.setUserInfo(data);
			popupProfile.close();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			popupProfile.renderLoading(false);
		})
	}
});

const popupNewCard = new PopupWithForm(classes.newCardPopupSelector, {
	submitForm: (item) => {
		popupNewCard.renderLoading(true);
		api.sendNewCard(item)
		.then((item) => {
			cardContainer.addItem(addNewCard(item));
			popupNewCard.close();
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			popupNewCard.renderLoading(false);
		})
	}
});

const formProfileValidator = new FormValidator(validationClasses, formElementProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationClasses, formElementCard);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationClasses, formElementAvatar);
formAvatarValidator.enableValidation();

avatarBtn.addEventListener('click', function() {
	popupAvatar.open();
	formAvatarValidator.cleanupValidation();
})

editBtn.addEventListener('click', function() {
	popupProfile.open();
	
	const dataUser = userInfo.getUserInfo();
	nameInput.value = dataUser.name;
	jobInput.value = dataUser.about;

	formProfileValidator.cleanupValidation();
});

addBtn.addEventListener('click', function() {
	popupNewCard.open();
	formCardValidator.cleanupValidation();
});

popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupView.setEventListeners();
popupDelete.setEventListeners();
