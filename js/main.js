import {createAd} from './data.js';
import {createSimilarAd, cardItemFragment} from './popup.js';
import {hideElements, showElements, validateInputLength, setCapacity, validateRooms} from './form.js';

const ADS_COUNT = 1;
const createAds = () => Array.from({length: ADS_COUNT}, createAd);
createAds();

const similarAds = createAds();
const mapCanvas = document.querySelector('.map__canvas');
similarAds.forEach(createSimilarAd);
mapCanvas.appendChild(cardItemFragment);

hideElements(['ad-form', 'map__filters']);
showElements(['ad-form', 'map__filters']);

validateInputLength('#title', 30, 100);
validateInputLength('#price', 0, 1000000, 'Число должно быть больше 0', 'Число должно быть меньше 1 000 000');
setCapacity();
validateRooms();
