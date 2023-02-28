let editBtn = document.querySelector('.profile__btn-edit');
const addBtn = document.querySelector('.profile__btn-add');
let popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
let closeBtn = document.querySelectorAll('.popup__btn-close');
let formElementProfile = document.querySelector('.popup__form_type_profile');
let formElementCard = document.querySelector('.popup__form_type_card');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let titleInput = document.querySelector('.popup__input_type_title');
let linkInput = document.querySelector('.popup__input_type_link');
const saveBtn = document.querySelector('.popup__btn-save');
const createBtn = document.querySelector('.popup__btn-create');
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

function openPopup(elem) {
	if (elem === 'edit') {
		popupEdit.classList.add('popup_opened');
	} if (elem === 'add') {
		popupAdd.classList.add('popup_opened');
	}
}

editBtn.addEventListener('click', function() {
	openPopup('edit');
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
});

addBtn.addEventListener('click', function() {
	openPopup('add');
});

initialCards.forEach(fillCard);

function fillCard(element) {
	
	const cardElement = cardTemplate.cloneNode(true);
	
	cardElement.querySelector('.elements__img').src = element.link;
	
	cardElement.querySelector('.elements__img').alt = `На фото ${element.name}`;
	
	cardElement.querySelector('.elements__title').textContent = element.name;
	
	cardContainer.prepend(cardElement);
}

closeBtn.forEach(closePopup);

function closePopup(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		openPopup.classList.remove('popup_opened');
	});
}

formElementProfile.addEventListener('submit', handleFormSubmit);

function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup(saveBtn);
}

formElementCard.addEventListener('submit', createCard);

function createCard(evt) {
	evt.preventDefault(); 

	const newCard = {
		name: titleInput.value,
		link: linkInput.value
	};
	initialCards.splice(0, 0, newCard);
	closePopup(createBtn);

	titleInput.value = '';
	linkInput.value = '';
	fillCard(initialCards[0]);
}