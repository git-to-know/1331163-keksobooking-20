'use strict';
(function () {
  var LOW_PRICE = 'low';
  var MIDDLE_PRICE = 'middle';
  var HIGH_PRICE = 'high';
  var HIGH_VALUE = 50000;
  var LOW_VALUE = 10000;
  var ANY_VALUE = 'any';

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
        case MIDDLE_PRICE:
          return data.offer.price >= LOW_VALUE && data.offer.price <= HIGH_VALUE;
        case LOW_PRICE:
          return data.offer.price < LOW_VALUE;
        case HIGH_PRICE:
          return data.offer.price > HIGH_VALUE;
        default: return data;
      }
    };

    var filterByType = function (data) {
      return type.value === ANY_VALUE || data.offer.type === type.value;
    };

    var filterByGuest = function (data) {
      if (guest.value !== ANY_VALUE) {
        return data.offer.guests === +guest.value;
      } else {
        return data;
      }
    };

    var filterByRoom = function (data) {
      if (room.value !== ANY_VALUE) {
        return data.offer.rooms === +room.value;
      }
      return data;
    };

    var filterByFeature = function (data, feature) {
      return feature.checked ? data.offer.features.includes(feature.value) : true;
    };

    var filtredData = window.pin.data.filter(function (data) {
      return filterByType(data) && filterByPrice(data) && filterByGuest(data) && filterByRoom(data) && filterByFeature(data, wifi) && filterByFeature(data, parking) && filterByFeature(data, dishwasher) && filterByFeature(data, washer) && filterByFeature(data, elevator) && filterByFeature(data, conditioner);
    }).slice(0, window.map.MAX_SIMILAR_PIN_COUNT);

    filtredData.forEach(function (item) {
      window.pin.renderPin(item);
    });
  };

  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', window.debounce(function () {
    window.utils.closeCardAndPins();
    updateAd();
  }));

})();
