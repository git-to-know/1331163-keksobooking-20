// активация страницы по клику
// map.js
'use strict';
(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;

  var mapPinMain = document.querySelector('.map__pin--main');
  var adressInput = window.utils.adForm.querySelector('#address');
  adressInput.value = (Math.round(mapPinMain.offsetLeft + mapPinMain.clientWidth / 2)) + ' ' + (Math.round(mapPinMain.offsetTop + mapPinMain.clientHeight / 2));

  var pageActivate = function () {

    var mapBlock = document.querySelector('.map');
    mapBlock.classList.remove('map--faded');

    var adBlock = document.querySelector('.ad-form');
    adBlock.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.utils.adFormFieldset.length; i++) {
      window.utils.adFormFieldset[i].removeAttribute('disabled');
    }

    for (i = 0; i < window.utils.mapFilter.length; i++) {
      window.utils.mapFilter[i].removeAttribute('disabled');
    }
  };


  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      pageActivate();
      window.load(function (data) {
        window.pin.data = data;
        var counter = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].offer) {
            window.pin.renderPin(data[i]);
            counter++;
          }

          if (counter === MAX_SIMILAR_PIN_COUNT) {
            break;
          }
        }
        mapPinMain.removeEventListener('mousedown', mainPinClickHandler);
      });
      adressInput.value = (mapPinMain.offsetLeft + mapPinMain.clientWidth / 2) + ' ' + (mapPinMain.offsetTop + mapPinMain.clientHeight);
    }
  };
  mapPinMain.addEventListener('mousedown', mainPinClickHandler);

  window.map = {
    MAX_SIMILAR_PIN_COUNT: MAX_SIMILAR_PIN_COUNT,
    mapPinMain: mapPinMain,
    adressInput: adressInput,
    mainPinClickHandler: mainPinClickHandler
  };
})();
