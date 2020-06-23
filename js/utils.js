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
  for (var i = 0; i < mapFilter.length; i++) {
    mapFilter[i].setAttribute('disabled', 'true');
  }

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].setAttribute('disabled', 'true');
  }

  window.utils = {
    getRandomNumber: getRandomNumber,
    mapFilter: mapFilter,
    adForm: adForm,
    adFormFieldset: adFormFieldset
  };
})();
