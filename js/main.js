/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * https://learn.javascript.ru/number
 * @param {number} min начальное значение диапазона (от)
 * @param {number} max конечное значение диапазона (до)
 * @returns {number} Результат: целое число из диапазона "от...до"
*/
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return null;
};

/**
  * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
  * @param {number} min начальное значение диапазона (от)
  * @param {number} max конечное значение диапазона (до)
  * @param {number} float количество знаков после запятой
  * @returns {number} Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
*/
const getRandomNumberFloating = (min, max, float) => (min >= 0 && min < max) ? (Math.random() * (max - min) + min).toFixed(float) : null;

const ADS_COUNT = 10;
const AVATARS_COUNT = 10;

const getAvatarUrl = (element, index) => {
  index++;
  if (index >= AVATARS_COUNT) {
    return `img/avatars/user${index}.png`;
  }
  return `img/avatars/user0${index}.png`;
};

const avatars = Array.from({length: AVATARS_COUNT}, getAvatarUrl);

const TITLES = [
  'Апарт-Отель Депутатский',
  'Гостевой Дом Верещагинский',
  'Гостевой Дом Пушкинский',
  'Гостевой Дом Семейный',
  'Гостевой дом Надежда',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Aliquam varius lectus quis est porttitor, sed commodo nisl sagittis.',
  'Suspendisse fringilla ipsum eget efficitur rhoncus.',
  'Ut at nibh nec dolor viverra eleifend.',
  'Phasellus molestie purus ut est efficitur molestie.',
  'Curabitur ultricies velit in ex vehicula porta.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * Функция, возвращающая один случайный элемент массива из переданного массива
 * https://up.htmlacademy.ru/profession/backender/1/javascript/demos/5965#11
 * @param {array} elements начальные элементы массива
 * @returns Результат: случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

/**
 * Функция, возвращающая перемешанные элементы массива из переданного массива
 * https://learn.javascript.ru/task/shuffle
 * @param {array} elements начальные элементы массива
 * @returns Результат: массив с перемешанными элементами
 */
const shuffleArray = (elements) => elements.sort(() => Math.random() - 0.5);

/**
 * Функция, возвращающая копию части массива случайной длины из переданного массива
 * @param {array} elements начальные элементы массива
 * @returns Результат: массив случайной длины
 */
const getRandomArray = (elements) => elements.slice(0, getRandomNumber(1, elements.length-1));

const createAd = (element, index) => {
  const location = {
    lat: getRandomNumberFloating(35.65000, 35.75000, 5),
    lng: getRandomNumberFloating(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: avatars[index],
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(5000, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: getRandomArray(shuffleArray(FEATURES)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArray(shuffleArray(PHOTOS)),
    },
    location: {
      lat: location.lat,
      lng: location.lng,
    },
  };
};

const ads = Array.from({length: ADS_COUNT}, createAd);

console.log(ads);
