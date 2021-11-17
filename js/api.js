import {getFeaturesArray, setFilterFormChange} from './filters.js';
import {resetToDefault, toggleActivationForm} from './form.js';
import {showMarkers, removeMarkerGroup} from './map.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';
import {debounce, showAlert} from './util.js';

const URL_SERVER = 'https://24.javascript.pages.academy/keksobooking';

const onGetSuccess = (response) => {
  const rankingResponse = response.reduce(getFeaturesArray, []);
  showMarkers(rankingResponse);
  toggleActivationForm(true);
  setFilterFormChange(debounce (
    () => showMarkers(rankingResponse)));
};

const getData = (onSuccess) => {
  fetch(`${URL_SERVER}/data`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      showAlert('Не удалось загрузить объявления.');
    });
};

const sendData = (body) => {
  fetch(URL_SERVER,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
        resetToDefault();
        removeMarkerGroup();
      } else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {onGetSuccess, getData, sendData};
