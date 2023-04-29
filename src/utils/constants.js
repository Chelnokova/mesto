// Переменные блока profile
export const editBtn = document.querySelector('.profile__btn-edit');
export const addBtn = document.querySelector('.profile__btn-add');

// Переменные формы блока popup
export const formElementProfile = document.querySelector('.popup__form_type_profile');
export const formElementCard = document.querySelector('.popup__form_type_card');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

export const classes = ({
	cardTemplate: '#template__card',
	cardContainer: '.elements',
	profilePopupSelector: '.popup_type_edit',
	newCardPopupSelector: '.popup_type_add',
	viewPopupSelector: '.popup_type_view',
});