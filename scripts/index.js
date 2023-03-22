// Переменные блока profile
const editBtn = document.querySelector('.profile__btn-edit');
const addBtn = document.querySelector('.profile__btn-add');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Переменные блока popup
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__heading');

// Переменные кнопок блока popup
const closeBtn = document.querySelectorAll('.popup__btn-close');
const saveBtn = document.querySelector('.popup__btn-form_type_save');
const createBtn = document.querySelector('.popup__btn-form_type_create');

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

// Переменные для работы функции toggleButton
const inputList = Array.from(document.querySelectorAll('.popup__input'));
const buttonElement = formElementCard.querySelector('.popup__btn-form');

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
	elem.classList.add('popup_animeted');
	toggleButton(inputList, buttonElement, validationClasses);
}

// Функция закрытия попапа
function close(elem) {
	elem.classList.remove('popup_opened');
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

// // перебор кнопок закрытия попапа и запуск соответствующей функции 
closeBtn.forEach(closePopup);

// // функция закрытия попапа при клике на крестик
function closePopup(el) {
	const openPopup = el.closest('.popup');
	el.addEventListener('click', () => {
		openPopup.classList.remove('popup_opened');
		titleInput.value = '';
		linkInput.value = '';
	});
}

// слушатель события submit на formElementProfile
formElementProfile.addEventListener('submit', handleFormSubmit);

// функция работы кнопки 'Сохранить'
function handleFormSubmit (evt) {
    evt.preventDefault(); 

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	close(popupEdit);
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

	titleInput.value = '';
	linkInput.value = '';
	fillCard(initialCards[0]);
	close(popupAdd);
}

// функция удаления карточки
function clickDeleteBtn(evt) {
	const button = evt.target;
	const card = button.closest('.elements__card');
	card.remove();
}

// Открытие попапа с нужной картинкой и заголовком при клике на картинку в карточке
Array.from(document.querySelectorAll('.elements__img')).forEach(function (el) {
	el.addEventListener('click', function(evt) {
		openPopup(popupView);

		const openCard = evt.target.closest('.elements__card');
		const cardImg = evt.target.getAttribute('src');
		const cardAltImg = evt.target.getAttribute('alt');
		const cardTitle = openCard.querySelector('.elements__title').textContent;

		popupImage.src = cardImg;
		popupImage.alt = `На фото ${cardAltImg}`;
		popupTitle.textContent = cardTitle;
	});
});

popup.forEach((popupEl) => {
	popupEl.addEventListener('click', (evt) => {
		if (evt.target === popupEl) {
			close(popupEl);
		}
	})
})

document.addEventListener('keydown', (evt) => {
		if (evt.key === 'Escape') {
			popup.forEach((popupEl) => {
				if (popupEl.classList.contains('popup_opened')) {
					close(popupEl);
				} 
			})
		}
	})
