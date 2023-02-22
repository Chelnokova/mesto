let editBtn = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__btn-close');

function openPopup() {
	popup.classList.add('popup_opened');
}
editBtn.addEventListener('click', openPopup);

function closePopup() {
	popup.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameInput.getAttribute('value');
	jobInput.getAttribute('value');

	let nameProfile = document.querySelector('.profile__name');
	let jobProfile = document.querySelector('.profile__job');

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);