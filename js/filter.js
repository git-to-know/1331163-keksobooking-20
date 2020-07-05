'use strict';
(function () {

  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var room = document.querySelector('#housing-rooms');
  var guest = document.querySelector('#housing-guests');
  var wifi = document.querySelector('#filter-wifi');
  var parking = document.querySelector('#filter-parking');
  var dishwasher = document.querySelector('#filter-dishwasher');
  var washer = document.querySelector('#filter-washer');
  var elevator = document.querySelector('#filter-elevator');
  var conditioner = document.querySelector('#filter-conditioner');


  var updateAd = function () {
    var filterByPrice = function (data) {
      switch (price.value) {
        case 'middle':
          return data.offer.price >= 10000 && data.offer.price <= 50000;
        case 'low':
          return data.offer.price < 10000;
        case 'high':
          return data.offer.price > 50000;
        default: return data;
      }
    };

    var filterByType = function (data) {
      if ((type.value === 'palace') || (type.value === 'flat') || (type.value === 'house') || (type.value === 'bungalo')) {
        return data.offer.type === type.value;
      }
      return data;
    };

    var filterByGuest = function (data) {
      if ((guest.value === '2') || (guest.value === '1') || (guest.value === '0')) {
        return data.offer.guests === guest.value;
      }
      return data;
    };

    var filtrerByRoom = function (data) {
      if ((room.value === '1') || (room.value === '2') || (room.value === '3')) {
        return data.offer.rooms === room.value;
      }
      return data;
    };

    var filterByFeature = function (data, feature) {
      if (feature.checked) {
        return data.offer.features.includes(feature.value);
      }
      return true;
    };

    var filtredData = window.pin.data.filter(function (data) {
      return filterByType(data) && filterByPrice(data) && filterByGuest(data) && filtrerByRoom(data) && filterByFeature(data, wifi) && filterByFeature(data, parking) && filterByFeature(data, dishwasher) && filterByFeature(data, washer) && filterByFeature(data, elevator) && filterByFeature(data, conditioner);
    }).slice(0, window.map.MAX_SIMILAR_PIN_COUNT);

    filtredData.forEach(function (item) {
      window.pin.renderPin(item);
    });
  };
  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', function () {
    window.utils.closeCardAndPins();
    updateAd();
  });

})();
