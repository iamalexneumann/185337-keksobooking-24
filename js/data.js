import {getRandomNumber, getRandomNumberFloating, getRandomArrayElement, shuffleArray, getRandomArray} from './util.js';

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

const titles = [
  'Апарт-Отель Депутатский',
  'Гостевой Дом Верещагинский',
  'Гостевой Дом Пушкинский',
  'Гостевой Дом Семейный',
  'Гостевой дом Надежда',
];

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const hours = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const descriptions = [
  'Aliquam varius lectus quis est porttitor, sed commodo nisl sagittis.',
  'Suspendisse fringilla ipsum eget efficitur rhoncus.',
  'Ut at nibh nec dolor viverra eleifend.',
  'Phasellus molestie purus ut est efficitur molestie.',
  'Curabitur ultricies velit in ex vehicula porta.',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * Функция, возвращающая JS-объект со сгенерированными данными
 * @param {number} index индексный номер объявления
 * @returns Результат: объект со сгенерированными данными
 */
const createAd = (element, index) => {
  const location = {
    lat: getRandomNumberFloating(35.65000, 35.75000, 5),
    lng: getRandomNumberFloating(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: avatars[index],
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(5000, 100000),
      type: getRandomArrayElement(types),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(hours),
      checkout: getRandomArrayElement(hours),
      features: getRandomArray(shuffleArray(features)),
      description: getRandomArrayElement(descriptions),
      photos: getRandomArray(shuffleArray(photos)),
    },
    location: {
      lat: Number(location.lat),
      lng: Number(location.lng),
    },
  };
};

/**
 * Функция, генерирующая JS-объект с объявлениями со сгенерированными данными
 * @param {number} ADS_COUNT количество генерируемых объявлений
 * @returns Результат: объект с объектами сгенерированных даннных
 */
const createAds = (ADS_COUNT) => Array.from({length: ADS_COUNT}, createAd);

export {createAds};
