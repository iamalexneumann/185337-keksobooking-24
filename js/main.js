import {createAds} from './data.js';
import {createSimilarAd, cardItemFragment} from './popup.js';
import {hideElements, showElements} from './form.js';

const mapCanvas = document.querySelector('.map__canvas');
const similarAds = createAds(1);
similarAds.forEach(createSimilarAd);
mapCanvas.appendChild(cardItemFragment);

hideElements(['ad-form', 'map__filters']);
showElements(['ad-form', 'map__filters']);
