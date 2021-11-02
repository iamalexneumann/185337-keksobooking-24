import {isAvailable} from './util.js';
import {AD_TYPES} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardItemFragment = document.createDocumentFragment();

/**
 * Функция, выводящая на страницу однострочные данные
 * https://learn.javascript.ru/string#tryuk-s-pobitovym-ne
 * @param {*} data входящая строка, число или массив данных из объекта data.js
 * @param {*} selector селектор по классу, существующий на странице, для вывода данных
 * @param {string} value строка выводимых данных
 */
const outputStringData = (data, selector, value = data) => {
  if (data && (typeof data === 'string' || typeof data === 'number')) {
    if (typeof data === 'string' && ~data.indexOf('png')) {
      selector.src = value;
    } else {
      selector.textContent = value;
    }
  } else if (Array.isArray(data) && data.length > 0 && data.every(isAvailable)) {
    selector.textContent = value;
  } else {
    selector.classList.add('visually-hidden');
    selector.innerHTML = '';
  }
};
/**
 * Функция-обёртка, выводящая на страницу многострочные данные
 * @param {array} data входящая строка массива данных из объекта data.js
 * @param {*} selector селектор по классу, существующий на странице, для вывода данных
 * @param {function} inputFunction входящая функция со сгенерированными данными
 */
const outputArrayData = (data, selector, inputFunction) => {
  if (Array.isArray(data) && data.length > 0 && data.every(isAvailable)) {
    inputFunction();
  } else {
    selector.classList.add('visually-hidden');
    selector.innerHTML = '';
  }
};

/**
 * Функция, генерирующая разметку похожих элементов
 * @param {object} объект данных из data.js для генерации разметки
 */
const createSimilarAd = ({
  author: {avatar},
  offer: {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  },
}) => {
  const cardItem = cardTemplate.cloneNode(true);
  const popupFeatures = cardItem.querySelector('.popup__features');
  const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
  const popupPhotos = cardItem.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  /**
   * Функция, выводящая удобства объекта
   */
  const outputFeatures = () => {
    popupFeature.forEach((popupFeatureItem) => {
      const isNecessary = features.some(
        (adFeature) => popupFeatureItem.classList.contains(`popup__feature--${adFeature}`),
      );
      if (!isNecessary) {
        popupFeatureItem.remove();
      }
    });
  };
  /**
   * Функция, выводящая фотографии объекта
   */
  const outputPhotos = () => {
    const adPhotoFragment = document.createDocumentFragment();
    photos.forEach((adPhoto) => {
      const popupClonePhoto = popupPhoto.cloneNode(true);
      popupClonePhoto.src = adPhoto;
      cardItemFragment.appendChild(cardItem);
      adPhotoFragment.appendChild(popupClonePhoto);
    });
    popupPhoto.remove();
    popupPhotos.appendChild(adPhotoFragment);
  };

  outputStringData(title, cardItem.querySelector('.popup__title'));
  outputStringData(address, cardItem.querySelector('.popup__text--address'));
  outputStringData(price, cardItem.querySelector('.popup__text--price'), `${price} ₽/ночь`);
  outputStringData(type, cardItem.querySelector('.popup__type'), AD_TYPES[type]);
  outputStringData([rooms, guests], cardItem.querySelector('.popup__text--capacity'), `${rooms} комнаты для ${guests} гостей`);
  outputStringData([checkin, checkout], cardItem.querySelector('.popup__text--time'), `Заезд после ${checkin}, выезд до ${checkout}`);
  outputArrayData(features, popupFeatures, outputFeatures);
  outputStringData(description, cardItem.querySelector('.popup__description'), description);
  outputArrayData(photos, popupPhotos, outputPhotos);
  outputStringData(avatar, cardItem.querySelector('.popup__avatar'));
  cardItemFragment.appendChild(cardItem);
};

export {createSimilarAd, cardItemFragment};
