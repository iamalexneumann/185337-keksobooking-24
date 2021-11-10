import {createAds} from './data.js';
import {createMarker} from './map.js';

// генерация точек карты

const similarAds = createAds(10);

similarAds.forEach((similarAd) => {
  createMarker(similarAd);
});
