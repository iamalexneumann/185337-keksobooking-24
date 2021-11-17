import {getData, onGetSuccess, sendData} from './api.js';
import {mapFilters} from './filters.js';
import {setDefaultAddress, setDefaultMainPin, removeMarkerGroup} from './map.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const typeInput = adForm.querySelector('#type');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const addressInput = adForm.querySelector('#address');
const fieldsets = adForm.querySelectorAll('fieldset');
const selects = mapFilters.querySelectorAll('select');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const AdTypePrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const onTitleChange = () => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Заполните заголовок объявления');
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок объявления должен содержать минимум 30 символов');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const onPriceChange = () => {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Цена за ночь обязательна для заполнения');
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Цена должна быть меньше или равна 1 000 000');
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

const onCapacityChange = () => {
  if (roomNumberInput.value === '1' && capacityInput.value !== '1') {
    roomNumberInput.setCustomValidity('жильё для одного гостя');
  } else if (roomNumberInput.value === '2' && capacityInput.value !== '1' && capacityInput.value !== '2') {
    roomNumberInput.setCustomValidity('вмещает от 1 до 2 гостей');
  } else if (roomNumberInput.value === '3' && capacityInput.value === '0') {
    roomNumberInput.setCustomValidity('вмещает от 1 до 3 гостей');
  } else if (roomNumberInput.value === '100' && capacityInput.value !== '0') {
    roomNumberInput.setCustomValidity('Жильё не для гостей');
  } else {
    roomNumberInput.setCustomValidity('');
  }
  roomNumberInput.reportValidity();
};

const onTypeChange = () => {
  priceInput.placeholder = AdTypePrices[typeInput.value];
  priceInput.min = AdTypePrices[typeInput.value];
};

const onCheckinChange = (evt) => {
  timeOutInput.value = evt.target.value;
  timeInInput.value = evt.target.value;
};

typeInput.addEventListener('change', onTypeChange);
titleInput.addEventListener('input', onTitleChange);
priceInput.addEventListener('input', onPriceChange);
roomNumberInput.addEventListener('change', onCapacityChange);
capacityInput.addEventListener('change', onCapacityChange);
timeInInput.addEventListener('change', onCheckinChange);
timeOutInput.addEventListener('change', onCheckinChange);

submitButton.addEventListener('click', () => {
  onTitleChange();
  onPriceChange();
  onCapacityChange();
  onTypeChange();
});

const toggleActivationForm = (data) => {
  if (!data) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    fieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', ''));
    selects.forEach((select) => select.setAttribute('disabled', ''));
  }
  else {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    fieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
    selects.forEach((select) => select.removeAttribute('disabled'));
  }
};

const resetFormAndFilters = () => {
  adForm.reset();
  mapFilters.reset();
};

const resetToDefault = () => {
  resetFormAndFilters();
  setDefaultMainPin();
  setDefaultAddress();
  getData(onGetSuccess);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    new FormData(evt.target),
  );
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetToDefault();
  removeMarkerGroup();
});

export {toggleActivationForm, resetToDefault, addressInput};
