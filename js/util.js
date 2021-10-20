/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * https://learn.javascript.ru/number
 * @param {number} min начальное значение диапазона (от)
 * @param {number} max конечное значение диапазона (до)
 * @returns {number} Результат: целое число из диапазона "от...до"
*/
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return null;
};

/**
  * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
  * @param {number} min начальное значение диапазона (от)
  * @param {number} max конечное значение диапазона (до)
  * @param {number} float количество знаков после запятой
  * @returns {number} Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
*/
const getRandomNumberFloating = (min, max, float) => (min >= 0 && min < max) ? (Math.random() * (max - min) + min).toFixed(float) : null;

/**
 * Функция, возвращающая один случайный элемент массива из переданного массива
 * https://up.htmlacademy.ru/profession/backender/1/javascript/demos/5965#11
 * @param {array} elements начальные элементы массива
 * @returns Результат: случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

/**
 * Функция, возвращающая перемешанные элементы массива из переданного массива
 * https://learn.javascript.ru/task/shuffle
 * @param {array} elements начальные элементы массива
 * @returns Результат: массив с перемешанными элементами
 */
const shuffleArray = (elements) => elements.sort(() => Math.random() - 0.5);

/**
 * Функция, возвращающая копию части массива случайной длины из переданного массива
 * @param {array} elements начальные элементы массива
 * @returns Результат: массив случайной длины
 */
const getRandomArray = (elements) => elements.slice(0, getRandomNumber(1, elements.length-1));

export {getRandomNumber, getRandomNumberFloating, getRandomArrayElement, shuffleArray, getRandomArray};
