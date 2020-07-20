// активация страницы по клику
'use strict';
(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;

  var mapPinMain = document.querySelector('.map__pin--main');
  var adressInput = window.utils.adForm.querySelector('#address');
  adressInput.value = window.utils.startXCord + ' ' + window.utils.startYCord;

  var pageActivate = function () {

    var mapBlock = document.querySelector('.map');
    mapBlock.classList.remove('map--faded');

    var adBlock = document.querySelector('.ad-form');
    adBlock.classList.remove('ad-form--disabled');

    window.utils.adFormFieldset.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    window.utils.mapFilter.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };


  var mainPinClickHandler = function () {
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
    adressInput.value = (Math.round(mapPinMain.offsetLeft + mapPinMain.clientWidth / 2)) + ' ' + (Math.round(mapPinMain.offsetTop + mapPinMain.clientHeight));
  };
  mapPinMain.addEventListener('mousedown', mainPinClickHandler);

  var enterClickHandler = function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      mainPinClickHandler();
      mapPinMain.removeEventListener('keydown', enterClickHandler);
    }
  };

  mapPinMain.addEventListener('keydown', enterClickHandler);

  window.map = {
    MAX_SIMILAR_PIN_COUNT: MAX_SIMILAR_PIN_COUNT,
    mapPinMain: mapPinMain,
    adressInput: adressInput,
    mainPinClickHandler: mainPinClickHandler
  };
})();
