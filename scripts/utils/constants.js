// Переменные блока profile
export const editBtn = document.querySelector('.profile__btn-edit');
export const addBtn = document.querySelector('.profile__btn-add');
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile = document.querySelector('.profile__job');

// Переменные блока popup
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupView = document.querySelector('.popup_type_view');
export const popupImage = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__heading');

// Переменные кнопок блока popup
export const closeBtns = document.querySelectorAll('.popup__btn-close');

// Переменные формы блока popup
export const formElementProfile = document.querySelector('.popup__form_type_profile');
export const formElementCard = document.querySelector('.popup__form_type_card');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_link');

export const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

export const clases = ({
	cardContainer: '.elements',
})