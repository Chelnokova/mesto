
// console.log(inputList);

const showInputError = (formElement, inputElement, errorMessage) => {
	const formError = formElement.querySelector(`.${inputElement.id}-error`);

	inputElement.classList.add('popup__input_type_error');
	formError.textContent = errorMessage;
	formError.classList.add('popup__text-error_active');
}
const hideInputError = (formElement, inputElement) => {
	const formError = formElement.querySelector(`.${inputElement.id}-error`);

	inputElement.classList.remove('popup__input_type_error');
	formError.classList.remove('popup__text-error_active');
	formError.textContent = '';
}
const isValid = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
}

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
}

const toggleButton = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add('popup__btn-form_inactive');
	} else {
		buttonElement.classList.remove('popup__btn-form_inactive');
	}
}

const setEventListener = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__btn-form');

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement);
			toggleButton(inputList, buttonElement);
		});
	});
}

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));
	formList.forEach((formElement) => {
		setEventListener(formElement);
	});
}

enableValidation();