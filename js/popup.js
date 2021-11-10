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
  const popupTitle = cardItem.querySelector('.popup__title');
  const popupAddress = cardItem.querySelector('.popup__text--address');
  const popupPrice = cardItem.querySelector('.popup__text--price');
  const popupPriceText = `${price} ₽/ночь`;
  const popupType = cardItem.querySelector('.popup__type');
  const popupFeatures = cardItem.querySelector('.popup__features');
  const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
  const popupCapacity = cardItem.querySelector('.popup__text--capacity');
  const popupCapacityText = `${rooms} комнаты для ${guests} гостей`;
  const popupTime = cardItem.querySelector('.popup__text--time');
  const popupTimeText = `Заезд после ${checkin}, выезд до ${checkout}`;
  const popupDescription = cardItem.querySelector('.popup__description');
  const popupPhotos = cardItem.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupAvatar = cardItem.querySelector('.popup__avatar');

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

  outputStringData(title,popupTitle);
  outputStringData(address,popupAddress);
  outputStringData(price, popupPrice, popupPriceText);
  outputStringData(type, popupType, adTypes[type]);
  outputStringData(
    [rooms, guests],
    popupCapacity,
    popupCapacityText,
  );
  outputStringData(
    [checkin, checkout],
    popupTime,
    popupTimeText,
  );
  outputArrayData(features, popupFeatures, outputFeatures);
  outputStringData(description, popupDescription);
  outputArrayData(photos, popupPhotos, outputPhotos);
  outputStringData(avatar, popupAvatar);
  return cardItem;
  //cardItemFragment.appendChild(cardItem);
};

export {createSimilarAd, cardItemFragment};
