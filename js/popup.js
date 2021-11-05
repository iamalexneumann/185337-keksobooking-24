import {outputStringData, outputArrayData} from './popup-util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardItemFragment = document.createDocumentFragment();
const adTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
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
      const isNecessary = features.some((adFeature) => popupFeatureItem.classList.contains(`popup__feature--${adFeature}`));
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

  outputStringData(
    title,
    cardItem.querySelector('.popup__title'),
  );
  outputStringData(
    address,
    cardItem.querySelector('.popup__text--address'),
  );
  outputStringData(
    price,
    cardItem.querySelector('.popup__text--price'),
    `${price} ₽/ночь`,
  );
  outputStringData(
    type,
    cardItem.querySelector('.popup__type'),
    adTypes[type],
  );
  outputStringData(
    [rooms, guests],
    cardItem.querySelector('.popup__text--capacity'),
    `${rooms} комнаты для ${guests} гостей`,
  );
  outputStringData(
    [checkin, checkout],
    cardItem.querySelector('.popup__text--time'),
    `Заезд после ${checkin}, выезд до ${checkout}`,
  );
  outputArrayData(
    features,
    popupFeatures,
    outputFeatures,
  );
  outputStringData(
    description,
    cardItem.querySelector('.popup__description'),
    description,
  );
  outputArrayData(
    photos,
    popupPhotos,
    outputPhotos,
  );
  outputStringData(
    avatar,
    cardItem.querySelector('.popup__avatar'),
  );
  cardItemFragment.appendChild(cardItem);
};

export {createSimilarAd, cardItemFragment};
