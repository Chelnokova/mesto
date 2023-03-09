// Переменные блока profile
const editBtn = document.querySelector('.profile__btn-edit');
const addBtn = document.querySelector('.profile__btn-add');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Переменные блока popup
// const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__heading');

// Переменные кнопок блока popup
const closeBtns = document.querySelectorAll('.popup__btn-close');

// Переменные формы блока popup
const formElementProfile = document.querySelector('.popup__form_type_profile');
const formElementCard = document.querySelector('.popup__form_type_card');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

// Переменные блока elements
const cardContainer = document.querySelector('.elements');
const imageCard = document.querySelector('.elements__img');
const titleCard = document.querySelector('.elements__title');
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
	elem.classList.add('popup_opened');
}

// слушатель клика по кнопке editBtn и запуска открытия нужного попапа с автоматическим заполнением полей
editBtn.addEventListener('click', function() {
	openPopup(popupEdit);
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
});

// слушатель клика по кнопке addBtn и запуска открытия нужного попапа
addBtn.addEventListener('click', function() {
	openPopup(popupAdd);
	console.log(initialCards);
});

// перебор массива initialCards и запуска функции fillCard
initialCards.forEach(function(el) {
	cardContainer.prepend(fillCard(el));
} );
// функция добавления карточек на страницу с работой кнопок лайк и удалить
function fillCard(element) {
	
	const cardElement = cardTemplate.cloneNode(true);

	const cardElementImg = cardElement.querySelector('.elements__img');
	
	cardElementImg.src = element.link;
	
	cardElementImg.alt = `На фото ${element.name}`;
	
	cardElement.querySelector('.elements__title').textContent = element.name;

	cardElement.querySelector('.elements__like').addEventListener('click', function(evt) {
		evt.target.classList.toggle('elements__like_checked');
	});

	const deleteBtn = cardElement.querySelector('.elements__basket');
	deleteBtn.addEventListener('click', clickDeleteBtn);

	cardElementImg.addEventListener('click', openImgPopup);

	return cardElement;
}

// Функция открытия попапа с нужной картинкой и заголовком
function openImgPopup(evt) {
	openPopup(popupView);

	const openCard = evt.target.closest('.elements__card');
	const cardImg = evt.target.getAttribute('src');
	const cardAltImg = evt.target.getAttribute('alt');
	const cardTitle = openCard.querySelector('.elements__title').textContent;

	popupImage.src = cardImg;
	popupImage.alt = `На фото ${cardAltImg}`;
	popupTitle.textContent = cardTitle;
}

// функция закрытия попапа при клике на кнопку внутри формы "Сохранить" или "Создать"
function closePopupBtn(el) {
	el.classList.remove('popup_opened');
}

// // перебор кнопок закрытия попапа и запуск соответствующей функции 
closeBtns.forEach(closePopup);

// // функция закрытия попапа при клике на крестик
function closePopup(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		closePopupBtn(openPopup);
	});
}

// слушатель события submit на formElementProfile
formElementProfile.addEventListener('submit', handleFormSubmit);

// функция работы кнопки 'Сохранить'
function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopupBtn(popupEdit);
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

	formElementCard.reset();

	cardContainer.prepend(fillCard(initialCards[0]))

	closePopupBtn(popupAdd);
}

// функция удаления карточки
function clickDeleteBtn(evt) {
	const button = evt.target;
	const card = button.closest('.elements__card');
	card.remove();
}
