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

export {hideElements, showElements};
