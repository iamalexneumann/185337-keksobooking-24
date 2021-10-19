import {shuffleArray} from './util.js';

const AVATARS_COUNT = 10;

/**
 * Функция, возвращающая строку с адресом изображения
 * @param {*} element
 * @param {number} index индексный номер изображения
 * @returns Результат: строка с адресом изображения формата
 */
const getAvatarUrl = (element, index) => {
  index++;
  if (index >= AVATARS_COUNT) {
    return `img/avatars/user${index}.png`;
  }
  return `img/avatars/user0${index}.png`;
};

const avatars = shuffleArray(Array.from({length: AVATARS_COUNT}, getAvatarUrl));

const TITLES = [
  'Апарт-Отель Депутатский',
  'Гостевой Дом Верещагинский',
  'Гостевой Дом Пушкинский',
  'Гостевой Дом Семейный',
  'Гостевой дом Надежда',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Aliquam varius lectus quis est porttitor, sed commodo nisl sagittis.',
  'Suspendisse fringilla ipsum eget efficitur rhoncus.',
  'Ut at nibh nec dolor viverra eleifend.',
  'Phasellus molestie purus ut est efficitur molestie.',
  'Curabitur ultricies velit in ex vehicula porta.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

export {avatars, TITLES, TYPES, HOURS, FEATURES, DESCRIPTIONS, PHOTOS};
