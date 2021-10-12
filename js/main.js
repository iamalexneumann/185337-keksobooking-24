/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * https://learn.javascript.ru/number
 * @param {number} min начальное значение диапазона (от)
 * @param {number} max конечное значение диапазона (до)
 * @returns {number} Результат: целое число из диапазона "от...до"
*/

const getRandomNumber = (min, max) => (min >= 0 && min < max) ? Math.floor(Math.random() * (max - min + 1)) + min : null;

getRandomNumber(2, 20);

/**
  * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
  * @param {number} min начальное значение диапазона (от)
  * @param {number} max конечное значение диапазона (до)
  * @param {number} float количество знаков после запятой
  * @returns {number} Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
*/

const getRandomNumberFloating = (min, max, float) => (min >= 0 && min < max) ? (Math.random() * (max - min + 1) + min).toFixed(float) : null;

getRandomNumberFloating(2, 20, 3);
