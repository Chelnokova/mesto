// Переменные блока profile
const editBtn = document.querySelector('.profile__btn-edit');
const addBtn = document.querySelector('.profile__btn-add');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Переменные блока popup
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// Переменные кнопок блока popup
const closeBtn = document.querySelectorAll('.popup__btn-close');
const saveBtn = document.querySelector('.popup__btn-save');
const createBtn = document.querySelector('.popup__btn-create');

// Переменные формы блока popup
const formElementProfile = document.querySelector('.popup__form_type_profile');
const formElementCard = document.querySelector('.popup__form_type_card');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

// Переменные блока elements
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template__card').content;

// данные для карточек
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

// функция открытия попапа
function openPopup(elem) {
	if (elem === 'edit') {
		popupEdit.classList.add('popup_opened');
	} if (elem === 'add') {
		popupAdd.classList.add('popup_opened');
	}
}

// слушатель клика по editBtn и запуска открытия нужного попапа с автоматическим заполнением полей
editBtn.addEventListener('click', function() {
	openPopup('edit');
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
});

// слушатель клика по addBtn и запуска открытия нужного попапа
addBtn.addEventListener('click', function() {
	openPopup('add');
});

// перебор массива initialCards и запуска функции fillCard
initialCards.forEach(fillCard);

// функция добавления карточек на страницу с работой кнопок лайк и удалить
function fillCard(element) {
	
	const cardElement = cardTemplate.cloneNode(true);
	
	cardElement.querySelector('.elements__img').src = element.link;
	
	cardElement.querySelector('.elements__img').alt = `На фото ${element.name}`;
	
	cardElement.querySelector('.elements__title').textContent = element.name;

	cardElement.querySelector('.elements__like').addEventListener('click', function(evt) {
		evt.target.classList.toggle('elements__like_checked');
	});

	const deleteBtn = cardElement.querySelector('.elements__basket');
	deleteBtn.addEventListener('click', clickDeleteBtn);
	
	cardContainer.prepend(cardElement);
}

// перебор кнопок закрытия попапа и запуск соответствующей функции 
closeBtn.forEach(closePopup);

// функция закрытия попапа при клике на кнопку закрыть
function closePopup(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		openPopup.classList.remove('popup_opened');
	});
}

// слушатель события submit на formElementProfile
formElementProfile.addEventListener('submit', handleFormSubmit);

// функция работы кнопки 'Сохранить'
function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup(saveBtn);
}

// слушатель события submit на formElementCard
formElementCard.addEventListener('submit', createCard);

// функция пополнения initialCards новой информацией и создание карточки
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

// функция удаления карточки
function clickDeleteBtn(evt) {
	const button = evt.target;
	const card = button.closest('.elements__card');
	card.remove();
}

