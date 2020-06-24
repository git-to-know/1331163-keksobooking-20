// создание данных
// data.js
'use strict';
(function () {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomArrayItem = function (array) {
    var length = window.utils.getRandomNumber(0, array.length);
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

  var generateData = function (count) {
    var data = [];

    for (var i = 0; i < count; i++) {
      var x = window.utils.getRandomNumber(0, 1200);
      var y = window.utils.getRandomNumber(130, 630);

      data.push({
        author: {
          avatar: 'img/avatars/user0' + window.utils.getRandomNumber(1, 8) + '.png'
        },
        offer: {
          'title': 'заголовок предложения' + i,
          'address': x + ', ' + y,
          'price': x + i,
          'type': type[window.utils.getRandomNumber(0, 3)],
          'rooms': window.utils.getRandomNumber(1, 10),
          'guests': window.utils.getRandomNumber(1, 10),
          'checkin': time[window.utils.getRandomNumber(0, time.length)],
          'checkout': time[window.utils.getRandomNumber(0, time.length)],
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

  window.data = {
    typeRusNames: typeRusNames,
    pinList: pinList
  };
})();
