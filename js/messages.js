import {isEsc} from './util.js';

const templateErrorMessage = document.querySelector('#error').content;
const templateSuccessMessage = document.querySelector('#success').content;

const showErrorMessage = (message = 'Ошибка размещения объявления') => {
  document.body.appendChild(templateErrorMessage.cloneNode(true));

  const errorMessageNode = document.querySelector('.error');
  const errorButton = errorMessageNode.querySelector('.error__button');

  errorMessageNode.querySelector('.error__message').textContent = message;

  const onDocumentEscKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      errorMessageNode.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  const onDocumentClick = (evt) => {
    evt.preventDefault();
    errorMessageNode.remove();
    errorMessageNode.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  };

  const onErrorButtonClick = () => {
    errorMessageNode.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  };

  document.addEventListener('keydown', onDocumentEscKeydown);
  errorMessageNode.addEventListener('click', onDocumentClick);
  errorButton.addEventListener('click', onErrorButtonClick);
};

const showSuccessMessage = () => {
  document.body.appendChild(templateSuccessMessage.cloneNode(true));

  const successMessageNode = document.querySelector('.success');

  const onDocumentEscKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      successMessageNode.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  const onDocumentClick = (evt) => {
    evt.preventDefault();
    successMessageNode.remove();
    successMessageNode.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  };

  document.addEventListener('keydown', onDocumentEscKeydown);
  successMessageNode.addEventListener('click', onDocumentClick);
};

export {showErrorMessage, showSuccessMessage};

