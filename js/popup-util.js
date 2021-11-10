import {isAvailableArray} from './util.js';

/**
 * Функция, скрывающая элемент на страинце и очищающая его значение
 * @param {*} selector селектор через document.querySelector(element)
 */
const popupHideElements = (selector) => {
  selector.classList.add('visually-hidden');
  selector.innerHTML = '';
};
/**
 * Функция, выводящая на страницу однострочные данные
 * @param {*} data входящая строка, число или массив данных из объекта data.js
 * @param {*} element элемент для вывода данных
 * @param {string} value строка выводимых данных
 */
const outputStringData = (data, element, value = data) => {
  if (data && (typeof data === 'string' || typeof data === 'number')) {
    const imageExtensionRe = /^.*\.(jpg|jpeg|png|svg|gif|heic|webp)/;
    if (typeof data === 'string' && imageExtensionRe.exec(data)) {
      element.src = value;
    } else {
      element.textContent = value;
    }
  } else if (isAvailableArray(data)) {
    element.textContent = value;
  } else {
    popupHideElements(element);
  }
};
/**
 * Функция, выводящая на страницу многострочные данные
 * @param {array} data входящая строка массива данных из объекта data.js
 * @param {*} element элемент для вывода данных
 * @param {function} callback входящая функция со сгенерированными данными
 */

const outputArrayData = (data, element, callbackFunction) => {
  if (isAvailableArray(data)) {
    callbackFunction();
  } else {
    popupHideElements(element);
  }
};

export {outputStringData, outputArrayData};
