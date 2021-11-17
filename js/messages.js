import {isEsc} from './util.js';

const templateErrorMessage = document.querySelector('#error').content;
const templateSuccessMessage = document.querySelector('#success').content;

const showErrorMessage = (message = 'Ошибка размещения объявления') => {
  document.body.appendChild(templateErrorMessage.cloneNode(true));

  const errorMessageNode = document.querySelector('.error');
  const errorButton = errorMessageNode.querySelector('.error__button');

  errorMessageNode.querySelector('.error__message').textContent = message;

  const onDocumentClick = () => {
    errorMessageNode.remove();
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentEscKeydown = (key) => {
    if (isEsc(key)) {
      errorMessageNode.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  const onErrorButtonClick = () => {
    errorMessageNode.remove();
    document.removeEventListener('click', onErrorButtonClick);
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  errorButton.addEventListener('click', onErrorButtonClick);
};

const showSuccessMessage = () => {
  document.body.appendChild(templateSuccessMessage.cloneNode(true));

  const successMessageNode = document.querySelector('.success');

  const onDocumentClick = () => {
    successMessageNode.remove();
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentEscKeydown = (key) => {
    if (isEsc(key)) {
      successMessageNode.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export {showErrorMessage, showSuccessMessage};
