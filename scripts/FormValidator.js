export const validationClasses = ({
	activeErrorBorder: 'popup__input_type_error',
	activeErrorText: 'popup__text-error_active',
	inactiveClassButton: 'popup__btn-form_inactive',
	inputSelector: '.popup__input',
	buttonSelector: '.popup__btn-form',
	formSelector: '.popup__form',
});

export class FormValidator {
	constructor(classSelectors, form) {
		this._activeErrorBorder = classSelectors.activeErrorBorder;
		this._activeErrorText = classSelectors.activeErrorText;
		this._inactiveClassButton = classSelectors.inactiveClassButton;
		this._inputSelector = classSelectors.inputSelector
		this._buttonSelector = classSelectors.buttonSelector;
		this._formSelector = classSelectors.formSelector;
		this._form = form;
	}

	_showInputError(inputElement, errorMessage) {
		const formError = this._form.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._activeErrorBorder);
		formError.textContent = errorMessage;
		formError.classList.add(this._activeErrorText);
	}

	_hideInputError(inputElement) {
		const formError = this._form.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.remove(this._activeErrorBorder);
		formError.classList.remove(this._activeErrorText);
		formError.textContent = '';
	}

	_isValid(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

	_toggleButton(inputList, buttonElement) {
		if (this._hasInvalidInput(inputList)) {
			buttonElement.classList.add(this._inactiveClassButton);
			buttonElement.setAttribute('disabled', 'true');
		} else {
			buttonElement.classList.remove(this._inactiveClassButton);
			buttonElement.removeAttribute('disabled');
		}
	}

	_setEventListener() {
		const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
		const buttonElement = this._form.querySelector(this._buttonSelector);

		this._toggleButton(inputList, buttonElement);

		inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			this._isValid(inputElement);
			
			this._toggleButton(inputList, buttonElement);
		});
	});
	}
	
	enableValidation() {
		this._setEventListener();
	}
}