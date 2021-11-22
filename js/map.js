import {getData} from './api.js';
import {onGetSuccess} from './api.js';
import {filterOffers} from './filters.js';
import {addressInput} from './form.js';
import {createSimilarAd} from './popup.js';

const mapCanvas = document.querySelector('.map__canvas');
const OFFERS_COUNT = 10;
const LAT_CENTER_TOKIO = 35.6895000;
const LNG_CENTER_TOKIO = 139.6917100;
const ZOOM = 12;

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);
const pinIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
);

const map = L.map(mapCanvas);

const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
tileLayer.addTo(map);

const mainMarker = L.marker(
  {
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

const onInputCoordinatesChange = (evt) => {
  const targetCoordinates = evt.target.getLatLng();
  addressInput.value = `${targetCoordinates.lat.toFixed(5)}, ${targetCoordinates.lng.toFixed(5)}`;
};
mainMarker.addEventListener('move', onInputCoordinatesChange);

const markerGroup = L.layerGroup().addTo(map);

const removeMarkerGroup = () => {
  markerGroup.clearLayers();
};

const createMarkerWithInfo = (similarCard) => {
  const {location} = similarCard;
  const marker = L.marker(location, {icon: pinIcon});

  marker
    .addTo(markerGroup)
    .bindPopup(
      createSimilarAd(similarCard),
      {keepInView: true},
    );
};

const showMarkers = (offers) => {
  offers
    .filter(filterOffers)
    .slice(0, OFFERS_COUNT)
    .forEach(createMarkerWithInfo);
};

const setDefaultMainPin = () => {
  map.setView({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  }, ZOOM);
  mainMarker.setLatLng({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  });
};
const setDefaultAddress = () => addressInput.value = `${LAT_CENTER_TOKIO.toFixed(5)}, ${LNG_CENTER_TOKIO.toFixed(5)}`;

const initializeMap = () => {
  map.addEventListener('load', () => {
    setDefaultAddress();
    getData(onGetSuccess);
  })
    .setView({
      lat: LAT_CENTER_TOKIO,
      lng: LNG_CENTER_TOKIO,
    }, ZOOM);
};

export {showMarkers, setDefaultMainPin, setDefaultAddress, removeMarkerGroup, initializeMap, map};
