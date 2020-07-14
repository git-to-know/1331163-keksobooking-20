'use strict';
(function () {
  // неактивное состояние страницы
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

    window.map.adressInput.value = (Math.round(window.map.mapPinMain.offsetLeft + window.map.mapPinMain.clientWidth / 2)) + ' ' + (Math.round(window.map.mapPinMain.offsetTop + window.map.mapPinMain.clientHeight / 2));
  };

  var closeCardAndPins = function () {
    var map = document.querySelector('.map');
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length !== 0) {
      pins.forEach(function (pin) {
        pin.remove();
      });
      window.card.closeCard();
    }
  };

  var formLoad = document.querySelector('.ad-form');
  formLoad.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(formLoad), function () {
      pageDisActivate();
      closeCardAndPins();
    });
    window.map.mapPinMain.addEventListener('mousedown', window.map.mainPinClickHandler);

    evt.preventDefault();
  });

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('mousedown', function () {
    pageDisActivate();
    closeCardAndPins();
    window.map.mapPinMain.addEventListener('mousedown', window.map.mainPinClickHandler);
  });

  window.utils = {
    closeCardAndPins: closeCardAndPins,
    mapFilter: mapFilter,
    adForm: adForm,
    adFormFieldset: adFormFieldset
  };
})();
