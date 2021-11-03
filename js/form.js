const adForm = document.querySelector('.ad-form');
const capacity = adForm.querySelector('#capacity');
const roomNumber = adForm.querySelector('#room_number');

const ROOM_MATCHING = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const capacityIndex = {};

/**
 * Функция, генерирующая объект соответствий select.options[i].value с его индексом. Нужна для установки валидного значения setCapacity();
 */
const getCapacityIndex = () => {
  for (let i = 0; i < capacity.length; i++) {
    capacityIndex[capacity.options[i].value] = i;
  }
};

getCapacityIndex();

/**
 * Функция, устанавливающая валидные значения в select #capacity
 */
const setCapacity = () => {
  const roomMatching = ROOM_MATCHING[roomNumber.value];
  for (let i = 0; i < capacity.length; i++) {
    capacity.options[i].disabled = true;
  }

  roomMatching.some((i) => {
    capacity.options[capacityIndex[i]].disabled = false;
  });

  capacity.options[capacityIndex[roomMatching[0]]].selected = true;
};

/**
 * Функция, валидирующая длину текстовых полей (заголовок объявления) и число в цифровых полях (цена за ночь)
 * @param {string} selector селектор поля ввода, чье значение нужно валидировать
 * @param {number} MIN начальное значение диапазона (от)
 * @param {number} MAX конечное значение диапазона (до)
 * @param {string} minMessage текст подсказки, показываемой если значение поля меньше минимального
 * @param {string} maxMessage текст подсказки, показываемой если значение поля больше минимального
 */
const validateInputLength = (
  selector,
  MIN,
  MAX,
  minMessage = `Текст должен быть длиннее ${MIN} симв.`,
  maxMessage = `Текст должен быть короче ${MAX} симв.`,
) => {
  const input = adForm.querySelector(selector);
  input.addEventListener('input', () => {
    let value;
    if (input.type === 'number') {
      value = input.value;
    } else {
      value = input.value.length;
    }

    if (value < MIN) {
      input.setCustomValidity(minMessage);
    } else if (value > MAX) {
      input.setCustomValidity(maxMessage);
    } else {
      input.setCustomValidity('');
    }

    input.reportValidity();
  });
};

/**
 * Функция, валидирующая количество комнат и количество мест
 */
const validateRooms = () => {
  roomNumber.addEventListener('change', () => {
    setCapacity();
  });
};

/**
 * Функция, переводящая элементы страницы в неактивное состояние
 * @param {array} selectors массив селекторов по классу без точки родительских элементов, чьи элементы нужно перевести в неактивное состояние
 */
const hideElements = (selectors) => {
  selectors.forEach((selector) => {
    const parent = document.querySelector(`.${selector}`);
    parent.classList.add(`${selector}--disabled`);
    parent.querySelectorAll('fieldset, select, input, textarea, button').forEach((child) => {
      child.disabled = true;
    });
  });
};

/**
 * Функция, переводящая элементы страницы в активное состояние
 * @param {array} selectors массив селекторов по классу без точки родительских элементов, чьи элементы нужно перевести в активное состояние
 */
const showElements = (selectors) => {
  selectors.forEach((selector) => {
    const parent = document.querySelector(`.${selector}`);
    parent.classList.remove(`${selector}--disabled`);
    parent.querySelectorAll('fieldset, select, input, textarea, button').forEach((child) => {
      child.disabled = false;
    });
  });
};

export {hideElements, showElements, validateInputLength, setCapacity, validateRooms};
