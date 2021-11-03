import {createAd} from './data.js';
import {createSimilarAd, cardItemFragment} from './popup.js';
import {hideElements} from './form.js';

const ADS_COUNT = 1;
const createAds = () => Array.from({length: ADS_COUNT}, createAd);

const similarAds = createAds();
const mapCanvas = document.querySelector('.map__canvas');
similarAds.forEach(createSimilarAd);
mapCanvas.appendChild(cardItemFragment);

hideElements(['ad-form', 'map__filters']);
