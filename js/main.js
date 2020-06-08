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

// console.log(generateData(5));

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
  pin.style = 'left: ' + (data.location.x - pinWidth/2) + 'px; top: ' + (data.location.y - pinHeight) + 'px;';

  return pin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pinList.length; i++) {
  fragment.appendChild(renderPin(pinList[i]));
}

similarListPin.appendChild(fragment);
