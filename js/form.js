import {adFormTitle, adFormPrice, adFormRoomNumber, adFormType, onRoomNumberSelectChange, onTextInputLengthChange, onNumberInputValueChange, onTypeSelectChange} from './form-handlers.js';

/**
 * Функция, валидирующая <select>, где должны быть одинаковые значения
 * @param {element} elementOne первый связанный <select>
 * @param {element} elementTwo второй связанный <select>
 */
const validateTwoSelects = (elementOne, elementTwo) => {
  elementOne = document.querySelector(elementOne);
  elementTwo = document.querySelector(elementTwo);
  const selectors = [elementOne, elementTwo];
  selectors.forEach((selector) => {
    selector.addEventListener('change', () => {
      selectors.some((selectorItem) => {
        if (selector !== selectorItem) {
          selectorItem.value = selector.value;
        }
      });
    });
  });
};

/**
 * Функция, переводящая элементы страницы в неактивное состояние
 * @param {array} selectors массив селекторов (по классу, без точки) родительских элементов, чьи элементы нужно перевести в неактивное состояние
 */
const hideElements = (selectors) => {
  selectors.forEach((selector) => {
    const parentSelector = document.querySelector(`.${selector}`);
    parentSelector.classList.add(`${selector}--disabled`);
    parentSelector.querySelectorAll('fieldset, select, input, textarea, button').forEach((parentSelectorChild) => {
      parentSelectorChild.disabled = true;
    });
  });
};

/**
 * Функция, переводящая элементы страницы в активное состояние
 * @param {array} selectors массив селекторов (по классу, без точки) родительских элементов, чьи элементы нужно перевести в активное состояние
 */
const showElements = (selectors) => {
  selectors.forEach((selector) => {
    const parentSelector = document.querySelector(`.${selector}`);
    parentSelector.classList.remove(`${selector}--disabled`);
    parentSelector.querySelectorAll('fieldset, select, input, textarea, button').forEach((parentSelectorChild) => {
      parentSelectorChild.disabled = false;
    });
  });
};

onTypeSelectChange();

adFormTitle.addEventListener('input', () => {
  onTextInputLengthChange(adFormTitle, 30, 100);
});

adFormPrice.addEventListener('input', () => {
  onNumberInputValueChange(adFormPrice);
});

onRoomNumberSelectChange();

adFormRoomNumber.addEventListener('change', () => {
  onRoomNumberSelectChange();
});

adFormType.addEventListener('change', () => {
  onTypeSelectChange();
});

validateTwoSelects('#timein', '#timeout');

export {hideElements, showElements};
