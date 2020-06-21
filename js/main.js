'use strict';

var i;

var getRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomArrayItem = function (array) {
  var length = getRandomNumber(0, array.length);
  var result = [];
  for (i = 0; i < length; i++) {
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

// var block = document.querySelector('.map');
// block.classList.remove('map--faded');

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

  var popupCloseButton = newCard.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closeCard);

  var onEscClickHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
      document.removeEventListener('keydown', onEscClickHandler);
    }
  };

  document.addEventListener('keydown', onEscClickHandler);

  return newCard;
};

// var mapPins = document.querySelector('.map');
// mapPins.appendChild(createCard(pinList[0]));


var mapFilter = document.querySelectorAll('.map__filter');
for (i = 0; i < mapFilter.length; i++) {
  mapFilter[i].setAttribute('disabled', 'true');
}

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
for (i = 0; i < adFormFieldset.length; i++) {
  adFormFieldset[i].setAttribute('disabled', 'true');
}

var mapPinMain = document.querySelector('.map__pin--main');
var adressInput = adForm.querySelector('#address');
adressInput.value = (mapPinMain.offsetLeft + mapPinMain.clientWidth / 2) + ' ' + (mapPinMain.offsetTop + mapPinMain.clientHeight / 2);

var pageActivate = function () {
  var mapBlock = document.querySelector('.map');
  mapBlock.classList.remove('map--faded');

  var adBlock = document.querySelector('.ad-form');
  adBlock.classList.remove('ad-form--disabled');

  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].removeAttribute('disabled');
  }

  for (i = 0; i < mapFilter.length; i++) {
    mapFilter[i].removeAttribute('disabled');
  }

  for (i = 0; i < mapFilter.length; i++) {
    mapFilter[i].removeAttribute('disabled');
  }
};


mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    pageActivate();
    var fragment = document.createDocumentFragment();

    pinList.forEach(function (item) {
      var newPin = renderPin(item);
      fragment.appendChild(newPin);

      newPin.addEventListener('click', function () {
        var mapPins = document.querySelector('.map');
        closeCard();
        mapPins.appendChild(createCard(item));
      });
    });

    similarListPin.appendChild(fragment);

    adressInput.value = (mapPinMain.offsetLeft + mapPinMain.clientWidth / 2) + ' ' + (mapPinMain.offsetTop + mapPinMain.clientHeight);
  }
});

var closeCard = function () {
  var oldCard = document.querySelector('.map__card');
  if (oldCard) {
    oldCard.remove();
  }
};

var adTitleInput = document.querySelector('#title');

adTitleInput.addEventListener('invalid', function () {
  if (adTitleInput.validity.valueMissing) {
    adTitleInput.setCustomValidity('Обязательное поле');
  } else if (adTitleInput.validity.tooShort) {
    adTitleInput.setCustomValidity('Заголовок должен содержать минимум 30 символов');
  } else if (adTitleInput.validity.tooLong) {
    adTitleInput.setCustomValidity('Заголовок не должен превыщать 100 символов');
  } else {
    adTitleInput.setCustomValidity('');
  }
});

var adPriceInput = document.querySelector('#price');

adPriceInput.addEventListener('change', function () {
  if (adPriceInput.validity > 1000000) {
    adPriceInput.setCustomValidity('Цена не должна превышать 1 000 000');
  } else if (adPriceInput.validity.valueMissing) {
    adPriceInput.setCustomValidity('Обязательное поле');
  } else {
    adPriceInput.setCustomValidity('');
  }
});

var adTypeOption = document.querySelector('#type');

var priceCheck = function () {
  switch (adTypeOption.value) {

    case 'bungalo':
      adPriceInput.min = '0';
      adPriceInput.placeholder = '0';
      if (!adPriceInput.value || adPriceInput.value < 0) {
        adPriceInput.setCustomValidity('Минимальная цена 0');
      } else {
        adPriceInput.setCustomValidity('');
      }
      break;
    case 'flat':
      adPriceInput.min = '1000';
      adPriceInput.placeholder = '1000';
      if (!adPriceInput.value || adPriceInput.value < 1000) {
        adPriceInput.setCustomValidity('Минимальная цена 1 000');
      } else {
        adPriceInput.setCustomValidity('');
      }
      break;
    case 'house':
      adPriceInput.min = '5000';
      adPriceInput.placeholder = '5000';
      if (!adPriceInput.value || adPriceInput.value < 5000) {
        adPriceInput.setCustomValidity('Минимальная цена 5 000');
      } else {
        adPriceInput.setCustomValidity('');
      }
      break;
    case 'palace':
      adPriceInput.min = '10000';
      adPriceInput.placeholder = '10000';
      if (!adPriceInput.value || adPriceInput.value < 10000) {
        adPriceInput.setCustomValidity('Минимальная цена 10 000');
      } else {
        adPriceInput.setCustomValidity('');
      }
      break;
  }
};
priceCheck();

adTypeOption.addEventListener('change', priceCheck);
adPriceInput.addEventListener('change', priceCheck);

var adTimeIn = document.querySelector('#timein');
var adTimeOut = document.querySelector('#timeout');

var timeInTimeOut = function (select1, select2) {
  if (select1.value === '12:00') {
    select2.value = '12:00';
  } else if (select1.value === '13:00') {
    select2.value = '13:00';
  } else if (select1.value === '14:00') {
    select2.value = '14:00';
  }
};

adTimeIn.addEventListener('change', function () {
  timeInTimeOut(adTimeIn, adTimeOut);
});

adTimeOut.addEventListener('change', function () {
  timeInTimeOut(adTimeOut, adTimeIn);
});

var adRooms = document.querySelector('#room_number');
var adGuests = document.querySelector('#capacity');


var validateRoomsAndGuestsAmount = function () {
  var rooms = parseInt(adRooms.value, 10);
  var guests = parseInt(adGuests.value, 10);
  switch (rooms) {
    case 100:
      if (guests !== 0) {
        adRooms.setCustomValidity('100 комнат предназначены не для гостей');
      } else {
        adRooms.setCustomValidity('');
      }
      break;
    default:
      if (!guests) {
        adRooms.setCustomValidity('Выберите количество мест');
      } else if (rooms >= guests) {
        adRooms.setCustomValidity('');
      } else {
        adRooms.setCustomValidity('Комнат меньше чем гостей');
      }
      break;
  }
};

adRooms.addEventListener('change', validateRoomsAndGuestsAmount);
adGuests.addEventListener('change', validateRoomsAndGuestsAmount);
