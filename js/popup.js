import {createAds} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = createAds();
const cardItemFragment = document.createDocumentFragment();

similarAds.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const cardItem = cardTemplate.cloneNode(true);
  const popupTitle = cardItem.querySelector('.popup__title');
  const popupAddress = cardItem.querySelector('.popup__text--address');
  const popupPrice = cardItem.querySelector('.popup__text--price');
  const popupType = cardItem.querySelector('.popup__type');
  const AD_TYPES = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const popupCapacity = cardItem.querySelector('.popup__text--capacity');
  const popupTime = cardItem.querySelector('.popup__text--time');
  const popupFeatures = cardItem.querySelector('.popup__features');
  const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
  const popupDescription = cardItem.querySelector('.popup__description');
  const popupPhotos = cardItem.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupAvatar = cardItem.querySelector('.popup__avatar');

  (title) ? popupTitle.textContent = title : popupTitle.classList.add('visually-hidden');
  (address) ? popupAddress.textContent = address : popupAddress.classList.add('visually-hidden');
  (price) ? popupPrice.textContent = `${price} ₽/ночь` : popupPrice.classList.add('visually-hidden');
  (type) ? popupType.textContent = AD_TYPES[type] : popupAddress.classList.add('visually-hidden');
  (rooms && guests) ? popupCapacity.textContent = `${rooms} комнаты для ${guests} гостей` : popupCapacity.classList.add('visually-hidden');
  (checkin && checkout) ? popupTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}` : popupTime.classList.add('visually-hidden');
  if (features.length > 0) {
    popupFeature.forEach((popupFeatureItem) => {
      const isNecessary = features.some(
        (adFeature) => popupFeatureItem.classList.contains(`popup__feature--${adFeature}`),
      );
      if (!isNecessary) {
        popupFeatureItem.remove();
      }
    });
  } else {
    popupFeatures.classList.add('visually-hidden');
  }
  (description) ? popupDescription.textContent = description : popupDescription.classList.add('visually-hidden');
  if (photos.length > 0) {
    const adPhotoFragment = document.createDocumentFragment();
    photos.forEach((adPhoto) => {
      const popupClonePhoto = popupPhoto.cloneNode(true);
      popupClonePhoto.src = adPhoto;
      cardItemFragment.appendChild(cardItem);
      adPhotoFragment.appendChild(popupClonePhoto);
    });
    popupPhoto.remove();
    popupPhotos.appendChild(adPhotoFragment);
  } else {
    popupPhotos.classList.add('visually-hidden');
  }
  (avatar) ? popupAvatar.src = avatar : popupAvatar.classList.add('visually-hidden');
  cardItemFragment.appendChild(cardItem);
});

mapCanvas.appendChild(cardItemFragment);
