// получение рандомного числе
// utils.js
'use strict';
(function () {
  var getRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  // неактивное состояне страницы
  // utils.js
  var mapFilter = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  var pageDisActivate = function () {
    adForm.reset();
    for (var i = 0; i < mapFilter.length; i++) {
      mapFilter[i].setAttribute('disabled', 'true');
    }

    for (i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].setAttribute('disabled', 'true');
    }
    var mapBlock = document.querySelector('.map');
    mapBlock.classList.add('map--faded');

    var adBlock = document.querySelector('.ad-form');
    adBlock.classList.add('ad-form--disabled');
  };


  var formLoad = document.querySelector('.ad-form');
  formLoad.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(formLoad), function () {
      pageDisActivate();
      var map = document.querySelector('.map');
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (pins.length !== 0) {
        pins.forEach(function (pin) {
          pin.remove();
          window.card.closeCard();
        });
      }
    });
    window.map.mapPinMain.addEventListener('mousedown', window.map.mainPinClickHandler);

    evt.preventDefault();
  });

  window.utils = {
    getRandomNumber: getRandomNumber,
    mapFilter: mapFilter,
    adForm: adForm,
    adFormFieldset: adFormFieldset
  };
})();
