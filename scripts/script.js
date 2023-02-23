let editBtn = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__btn-close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

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