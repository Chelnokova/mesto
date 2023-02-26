let editBtn = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__btn-close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template__card').content;



const initialCards = [
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

function openPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
}
console.log()
editBtn.addEventListener('click', openPopup);

function closePopup() {
	popup.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

initialCards.forEach(function fillCard(element) {
	
	const cardElement = cardTemplate.cloneNode(true);

	cardElement.querySelector('.elements__img').src = element.link;

	cardElement.querySelector('.elements__img').alt = `На фото ${element.name}`;

	cardElement.querySelector('.elements__title').textContent = element.name;

	cardContainer.append(cardElement);
});