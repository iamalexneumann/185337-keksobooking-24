import {avatars, TITLES, TYPES, HOURS, FEATURES, DESCRIPTIONS, PHOTOS} from './data.js';
import {getRandomNumber, getRandomNumberFloating, getRandomArrayElement, shuffleArray, getRandomArray} from './util.js';

const ADS_COUNT = 10;

/**
 * Функция, возвращающая JS-объект со сгенерированными данными
 * @param {*} element
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
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(5000, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: getRandomArray(shuffleArray(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(shuffleArray(PHOTOS)),
    },
    location: {
      lat: Number(location.lat),
      lng: Number(location.lng),
    },
  };
};

Array.from({length: ADS_COUNT}, createAd);
