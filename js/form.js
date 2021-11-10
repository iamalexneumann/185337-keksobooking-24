import {adRoomGuests, adTypePrices} from './form-data.js';

const adFormTitle = document.querySelector('#title');
const adFormPrice = document.querySelector('#price');
const adFormCapacity = document.querySelector('#capacity');
const adFormRoomNumber = document.querySelector('#room_number');
const adFormType = document.querySelector('#type');
const adFromAddress = document.querySelector('#address');
const capacityIndex = {};

/**
 * Функция, генерирующая объект соответствий select.options[i].value с его индексом. Нужна для обработчика onRoomNumberSelectChange();
 */
const getCapacityIndex = () => {
  for (let i = 0; i < adFormCapacity.length; i++) {
    capacityIndex[adFormCapacity.options[i].value] = i;
  }
};
getCapacityIndex();

/**
 * Обработчик, устанавливающий правильные значения в <select id="capacity">
 */
const onRoomNumberSelectChange = () => {
  const roomMatching = adRoomGuests[adFormRoomNumber.value];
  for (let i = 0; i < adFormCapacity.length; i++) {
    adFormCapacity.options[i].disabled = true;
  }

  roomMatching.some((match) => {
    adFormCapacity.options[capacityIndex[match]].disabled = false;
  });

  adFormCapacity.options[capacityIndex[roomMatching[0]]].selected = true;
};

/**
 * Обработчик, выводящий окошко валидации длины поля для <input type="text">
 * @param {element} element элемент <input type="text">
 */
const onTextInputLengthChange = (element, MIN_LENGTH, MAX_LENGTH) => {
  const elementLength = element.value.length;

  element.setCustomValidity('');
  if (elementLength < MIN_LENGTH) {
    element.setCustomValidity(`Введите еще ${MIN_LENGTH - elementLength} симв.`);
  } else if (elementLength > MAX_LENGTH) {
    element.setCustomValidity(`Удалите лишние ${MIN_LENGTH - MAX_LENGTH} симв.`);
  }

  element.reportValidity();
};

/**
 * Обработчик, выводящий окошко валидации цифрового значения для <input type="number">
 * @param {element} element элемент <input type="number"> с прописанными в вёрстке значениями min и max
 */
const onNumberInputValueChange = (element) => {
  const elementValue = element.value;
  const MIN = Number(element.min);
  const MAX = Number(element.max);
  element.setCustomValidity('');
  if (elementValue < MIN) {
    element.setCustomValidity(`Число не должно быть меньше ${MIN}`);
  } else if (elementValue > MAX) {
    element.setCustomValidity(`Число не должно быть больше ${MAX}`);
  }

  element.reportValidity();
};

/**
 * Обработчик, устанавливающий минимальное значение и плейсхолдер для инпута с ценой
 */
const onTypeSelectChange = () => {
  adFormPrice.placeholder = adTypePrices[adFormType[adFormType.selectedIndex].text];
  adFormPrice.min = adTypePrices[adFormType[adFormType.selectedIndex].text];
};

/**
 * Функция, валидирующая <select>, где должны быть одинаковые значения
 * @param {element} selectorOne первый связанный <select>
 * @param {element} selectorTwo второй связанный <select>
 */
const validateTwoSelects = (selectorOne, selectorTwo) => {
  const selectOne = document.querySelector(selectorOne);
  const selectTwo = document.querySelector(selectorTwo);
  const selects = [selectOne, selectTwo];
  selects.forEach((select) => {
    select.addEventListener('change', () => {
      selects.some((someSelect) => {
        if (select !== someSelect) {
          someSelect.value = select.value;
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
    const element = document.querySelector(`.${selector}`);
    element.classList.add(`${selector}--disabled`);
    element.querySelectorAll('fieldset, select, input, textarea, button').forEach((elementChild) => {
      elementChild.disabled = true;
    });
  });
};

/**
 * Функция, переводящая элементы страницы в активное состояние
 * @param {array} selectors массив селекторов (по классу, без точки) родительских элементов, чьи элементы нужно перевести в активное состояние
 */
const showElements = (selectors) => {
  selectors.forEach((selector) => {
    const element = document.querySelector(`.${selector}`);
    element.classList.remove(`${selector}--disabled`);
    element.querySelectorAll('fieldset, select, input, textarea, button').forEach((elementChild) => {
      elementChild.disabled = false;
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

export {adFromAddress, hideElements, showElements};
