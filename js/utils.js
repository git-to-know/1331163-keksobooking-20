'use strict';
(function () {
  // неактивное состояние страницы
  var mapFilter = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var startXCord = 570;
  var startYCord = 375;


  var pageDisActivate = function () {
    adForm.reset();

    mapFilter.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });

    adFormFieldset.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });

    var mapBlock = document.querySelector('.map');
    mapBlock.classList.add('map--faded');

    var adBlock = document.querySelector('.ad-form');
    adBlock.classList.add('ad-form--disabled');

    window.map.adressInput.value = startXCord + ' ' + startYCord;
    window.map.mapPinMain.style = 'left: ' + startXCord + 'px; top: ' + startYCord + 'px;';

    window.photoLoad.avatarPreview.src = 'img/muffin-grey.svg';

    var placePhotoList = document.querySelectorAll('.ad-form__photo img');
    placePhotoList.forEach(function (item) {
      window.photoLoad.placePhotoPreview.removeChild(item);
    });
  };

  var closeCardAndPins = function () {
    var map = document.querySelector('.map');
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length !== 0) {
      pins.forEach(function (pin) {
        pin.remove();
      });
      window.card.cardCloseHandler();
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
    adFormFieldset: adFormFieldset,
    startXCord: startXCord,
    startYCord: startYCord
  };
})();
