// активация страницы по клику
// map.js
'use strict';
(function () {
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

    // for (i = 0; i < window.utils.mapFilter.length; i++) {
    //   window.utils.mapFilter[i].removeAttribute('disabled');
    // }
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      pageActivate();
      var fragment = document.createDocumentFragment();

      window.data.pinList.forEach(function (item) {
        var newPin = window.pin.renderPin(item);
        fragment.appendChild(newPin);

        newPin.addEventListener('click', function () {
          var mapPins = document.querySelector('.map');
          window.card.closeCard();
          mapPins.appendChild(window.card.createCard(item));
        });
      });

      window.pin.similarListPin.appendChild(fragment);

      adressInput.value = (mapPinMain.offsetLeft + mapPinMain.clientWidth / 2) + ' ' + (mapPinMain.offsetTop + mapPinMain.clientHeight);

      mapPinMain.removeEventListener('mousedown', mainPinClickHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mainPinClickHandler);

  window.map = {
    mapPinMain: mapPinMain,
    adressInput: adressInput
  };
})();
