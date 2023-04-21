import EmailValidator from 'email-validator';
import IMask from 'imask';
import {isValidPhoneNumber} from 'libphonenumber-js';

export default class FormValidator {
  phoneMask = '+{7} (000) 000-00-00';
  successMessage = 'Заполнено успешно';
  errorMessages = {
    phone: 'Неверный формат номера',
    email: 'Неверный формат email',
    question: 'Вопрос не может быть короче 30 символов',
    required: 'Поле обязательно к заполнению',
    agreement: 'Необходимо согласиться с условиями'
  };

  constructor({
    formSelector,
    submitBtnSelector,
    inputContainerSelector,
    clearBtnSelector,
    messageSelector,
    inputSelector,
    errorClass,
    successClass,
    modal
  }) {
    this.inputContainerSelector = inputContainerSelector;
    this.inputSelector = inputSelector;
    this.clearBtnSelector = clearBtnSelector;
    this.messageSelector = messageSelector;

    this.errorClass = errorClass;
    this.successClass = successClass;

    this.form = document.querySelector(formSelector);
    this.submitBtn = document.querySelector(submitBtnSelector);
    this.inputContainers = document.querySelectorAll(inputContainerSelector);
    this.clearBtns = document.querySelectorAll(clearBtnSelector);
    this.modal = modal;
  }

  init = () => {
    this.clearBtns.forEach((clearBtn) => {
      clearBtn.addEventListener('click', this.onClearBtnClick);
    });

    this.submitBtn.addEventListener('click', this.onSubmitBtnClick);
    this.inputContainers.forEach((inputContainer) => {
      inputContainer
        .querySelector('[name]')
        .addEventListener('input', () => this.onInputInput(inputContainer));
    });

    this.setPhoneMask();
  };

  setPhoneMask = () => {
    IMask(this.form.querySelector('[name="phone"]'), {mask: this.phoneMask});
  };

  onClearBtnClick = (evt) => {
    const inputContainer = evt.target.closest(this.inputContainerSelector);

    this.showClearBtn(inputContainer);

    if (inputContainer.classList.contains(this.successClass)) {
      return;
    }

    inputContainer.querySelector(this.inputSelector).value = '';
    clearBtn.style.display = '';
  };

  onSubmitBtnClick = (evt) => {
    evt.preventDefault();

    this.inputContainers.forEach((inputContainer) => {
      this.onInputInput(inputContainer);
    });

    const isError = this.form.querySelector('.' + this.errorClass);

    if (isError) {
      return;
    }

    this.form.reset();

    this.inputContainers.forEach((inputContainer) => {
      this.clearClasses(inputContainer);
      this.hideClearBtn(inputContainer);
    });

    this.modal.modalOpen();
  };

  onInputInput = (inputContainer) => {
    const required = inputContainer.querySelector('[required]');
    const name = inputContainer.querySelector('[name="name"]');
    const phone = inputContainer.querySelector('[name="phone"]');
    const email = inputContainer.querySelector('[name="email"]');
    const question = inputContainer.querySelector('[name="question"]');
    const agreement = inputContainer.querySelector('[name="agreement"]');

    this.clearClasses(inputContainer);

    if (name) {
      this.validateName(name);
    }
    if (phone) {
      this.validatePhone(phone);
    }
    if (email) {
      this.validateEmail(email);
    }
    if (question) {
      this.validateQuestion(question);
    }
    if (required) {
      this.validateRequired(required);
    }
    if (agreement) {
      this.validateAgreement(agreement);
    }

    this.showClearBtn(inputContainer);
  };

  validateRequired = (required) => {
    if (required.validity.valueMissing || required.value === '+7') {
      this.showError(required, this.errorMessages.required);
    }
  };

  validateName = (name) => {
    if (name.validity.valid) {
      this.showSuccess(name);
    }
  };

  validatePhone = (phone) => {
    if (!isValidPhoneNumber(phone.value, 'RU')) {
      this.showError(phone, this.errorMessages.phone);
    }

    if (isValidPhoneNumber(phone.value, 'RU')) {
      this.showSuccess(phone);
    }
  };

  validateEmail = (email) => {
    if (!EmailValidator.validate(email.value)) {
      this.showError(email, this.errorMessages.email);
    }

    if (EmailValidator.validate(email.value)) {
      this.showSuccess(email);
    }
  };

  validateQuestion = (question) => {
    if (question.validity.tooShort) {
      this.showError(question, this.errorMessages.question);
    }

    if (question.validity.valid) {
      this.showSuccess(question);
    }
  };

  validateAgreement = (agreement) => {
    if (!agreement.validity.valid) {
      this.showError(agreement, this.errorMessages.agreement);
    }

    if (agreement.validity.valid) {
      this.showSuccess(agreement);
    }
  };

  showError = (input, text) => {
    const inputContainer = input.closest(this.inputContainerSelector);
    const message = inputContainer.querySelector(this.messageSelector);

    inputContainer.classList.add(this.errorClass);
    message.textContent = text;
  };

  showSuccess = (input) => {
    const inputContainer = input.closest(this.inputContainerSelector);
    const message = inputContainer.querySelector(this.messageSelector);
    inputContainer.classList.add(this.successClass);
    message.textContent = this.successMessage;
  };

  clearClasses = (inputContainer) => {
    inputContainer.classList.remove(this.errorClass);
    inputContainer.classList.remove(this.successClass);
  };

  hideClearBtn = (inputContainer) => {
    const clearBtn = inputContainer.querySelector(this.clearBtnSelector);
    if (clearBtn) {
      clearBtn.style.display = '';
    }
  };

  showClearBtn = (inputContainer) => {
    const isEmpty =
      inputContainer.querySelector(this.inputSelector).value === '';
    const clearBtn = inputContainer.querySelector(this.clearBtnSelector);

    if (isEmpty && clearBtn) {
      clearBtn.style.display = '';
      return;
    }

    if (clearBtn) {
      clearBtn.style.display = 'block';
    }
  };
}
