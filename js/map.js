import {adFromAddress, hideElements, showElements} from './form.js';
import {createSimilarAd} from './popup.js';

const mapCanvas = document.querySelector('.map__canvas');
const tokyoCenter = {
  lat: 35.6895000,
  lng: 139.6917100,
};

hideElements(['ad-form', 'map__filters']);

const map = L.map(mapCanvas)
  .on('load', () => {
    showElements(['ad-form', 'map__filters']);
    adFromAddress.value = `${(tokyoCenter.lat).toFixed(5)}, ${(tokyoCenter.lng).toFixed(5)}`;
  })
  .setView({
    lat: tokyoCenter.lat,
    lng: tokyoCenter.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: tokyoCenter.lat,
    lng: tokyoCenter.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const getLatLng = evt.target.getLatLng();
  const pinLat = (getLatLng.lat).toFixed(5);
  const pinLng = (getLatLng.lng).toFixed(5);
  adFromAddress.value = `${pinLat}, ${pinLng}`;
});

const createMarker = (similarAd) => {
  const {lat, lng} = similarAd.location;

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createSimilarAd(similarAd));
};

export {createMarker};
