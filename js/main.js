'use strict';

var getRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomArrayItem = function (array) {
  var length = getRandomNumber(0, array.length);
  var result = [];
  for (var i = 0; i < length; i++) {
    result.push(array[i]);
  }
  return result;
};

var featuresData = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var time = ['12:00', '13:00', '14:00'];

var type = ['palace', 'flat', 'house', 'bungalo'];
var typeRusNames = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var pinHeight = 70;
var pinWidth = 50;


var generateData = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    var x = getRandomNumber(0, 1200);
    var y = getRandomNumber(130, 630);

    data.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },
      offer: {
        'title': 'заголовок предложения' + i,
        'address': x + ', ' + y,
        'price': x + i,
        'type': type[getRandomNumber(0, 3)],
        'rooms': getRandomNumber(1, 10),
        'guests': getRandomNumber(1, 10),
        'checkin': time[getRandomNumber(0, time.length)],
        'checkout': time[getRandomNumber(0, time.length)],
        'features': getRandomArrayItem(featuresData),
        'description': 'описание' + i,
        'photos': getRandomArrayItem(photos),
      },
      location: {
        'x': x,
        'y': y,
      }
    });
  }
  return data;
};

var block = document.querySelector('.map');
block.classList.remove('map--faded');

var pinList = generateData(8);

var similarListPin = document.querySelector('.map__pins');

var renderPin = function (data) {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pin = similarPinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pinImg.src = data.author.avatar;
  pinImg.alt = data.offer.title;
  pin.style = 'left: ' + (data.location.x - pinWidth / 2) + 'px; top: ' + (data.location.y - pinHeight) + 'px;';

  return pin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pinList.length; i++) {
  fragment.appendChild(renderPin(pinList[i]));
}

similarListPin.appendChild(fragment);

var createCard = function (data) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  var newCard = cardTemplate.cloneNode(true);

  var popupTitle = newCard.querySelector('.popup__title');
  popupTitle.textContent = data.offer.title;
  if (data.offer.title === '') {
    popupTitle.style = 'display: none';
  }

  var popupArdess = newCard.querySelector('.popup__text--address');
  popupArdess.textContent = data.offer.address;
  if (data.offer.address === '') {
    popupArdess.style = 'display: none';
  }

  var popupPrice = newCard.querySelector('.popup__text--price');
  popupPrice.textContent = data.offer.price + '₽/ночь';
  if (data.offer.price === '') {
    popupPrice.style = 'display: none';
  }

  var popupType = newCard.querySelector('.popup__type');
  popupType.textContent = typeRusNames[data.offer.type];
  if (data.offer.type === '') {
    popupType.style = 'display: none';
  }

  var popupGuestsRooms = newCard.querySelector('.popup__text--capacity');
  popupGuestsRooms.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  if (data.offer.rooms === '' | data.offer.guests === '') {
    popupGuestsRooms.style = 'display: none';
  }

  var popupCheckInCheckOut = newCard.querySelector('.popup__text--time');
  popupCheckInCheckOut.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout + '.';
  if (data.offer.checkin === '' | data.offer.checkout === '') {
    popupCheckInCheckOut.style = 'display: none';
  }

  var popupFeatures = newCard.querySelector('.popup__features');
  popupFeatures.textContent = '';
  var featureTemplate = cardTemplate.querySelector('.popup__feature');
  for (i = 0; i < data.offer.features.length; i++) {
    var feature = featureTemplate.cloneNode(true);
    feature.className = 'popup__feature popup__feature--' + data.offer.features[i];
    popupFeatures.appendChild(feature);
  }

  var popupDescription = newCard.querySelector('.popup__description');
  popupDescription.textContent = data.offer.description;
  if (data.offer.description === '') {
    popupDescription.style = 'display: none';
  }

  var popupPhotos = newCard.querySelector('.popup__photos');
  popupPhotos.textContent = '';
  var pictureTemplate = cardTemplate.querySelector('.popup__photo');
  for (i = 0; i < data.offer.photos.length; i++) {
    var picture = pictureTemplate.cloneNode(true);
    picture.src = data.offer.photos[i];
    popupPhotos.appendChild(picture);
  }

  var popupAuthor = newCard.querySelector('.popup__avatar');
  popupAuthor.src = data.author.avatar;
  if (data.author.avatar === '') {
    popupAuthor.style = 'display: none';
  }

  return newCard;
};

var mapPins = document.querySelector('.map');
mapPins.appendChild(createCard(pinList[0]));
