const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');
const AdTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderElement = (element, content) => {
  if (content === undefined) {
    element.remove();
  }
  element.textContent = content;
};

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
  const popupType = cardItem.querySelector('.popup__type');
  const popupCapacity = cardItem.querySelector('.popup__text--capacity');
  const popupTime = cardItem.querySelector('.popup__text--time');
  const popupDescription = cardItem.querySelector('.popup__description');
  const popupAvatar = cardItem.querySelector('.popup__avatar');
  const popupFeature = cardItem.querySelectorAll('.popup__feature');

  renderElement(popupTitle, title);
  renderElement(popupAddress, address);
  renderElement(popupPrice, `${price} ₽/ночь`);
  renderElement(popupType, AdTypes[type]);
  renderElement(popupCapacity, `${rooms} комнаты для ${guests} гостей`);
  renderElement(popupTime, `Заезд после ${checkin}, выезд до ${checkout}`);
  renderElement(popupDescription, description);

  if (avatar) {
    popupAvatar.src = avatar;
  }
  else {
    popupAvatar.remove();
  }

  if (features) {
    popupFeature.forEach((popupFeatureItem) => {
      const isNecessary = features.some((adFeature) => popupFeatureItem.classList.contains(`popup__feature--${adFeature}`));
      if (!isNecessary) {
        popupFeatureItem.remove();
      }
    });
  }

  if (photos) {
    const popupPhotos = cardItem.querySelector('.popup__photos');
    photos.forEach((photoSrc) => {
      const popupPhoto = popupPhotos.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = photoSrc;
      popupPhotos.appendChild(popupPhoto);
    });
    popupPhotos.querySelector('.popup__photo').remove();
  }
  else {
    cardItem.querySelector('.popup__photos').remove();
  }

  return cardItem;
};

export {createSimilarAd};
