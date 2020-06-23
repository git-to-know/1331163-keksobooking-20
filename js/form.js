// валидация заполнения объявления
// form.js
'use strict';
(function () {
  var adTitleInput = document.querySelector('#title');

  adTitleInput.addEventListener('invalid', function () {
    if (adTitleInput.validity.valueMissing) {
      adTitleInput.setCustomValidity('Обязательное поле');
    } else if (adTitleInput.validity.tooShort) {
      adTitleInput.setCustomValidity('Заголовок должен содержать минимум 30 символов');
    } else if (adTitleInput.validity.tooLong) {
      adTitleInput.setCustomValidity('Заголовок не должен превыщать 100 символов');
    } else {
      adTitleInput.setCustomValidity('');
    }
  });

  var adPriceInput = document.querySelector('#price');

  adPriceInput.addEventListener('change', function () {
    if (adPriceInput.validity > 1000000) {
      adPriceInput.setCustomValidity('Цена не должна превышать 1 000 000');
    } else if (adPriceInput.validity.valueMissing) {
      adPriceInput.setCustomValidity('Обязательное поле');
    } else {
      adPriceInput.setCustomValidity('');
    }
  });

  var adTypeOption = document.querySelector('#type');

  var priceCheck = function () {
    switch (adTypeOption.value) {

      case 'bungalo':
        adPriceInput.min = '0';
        adPriceInput.placeholder = '0';
        if (!adPriceInput.value || adPriceInput.value < 0) {
          adPriceInput.setCustomValidity('Минимальная цена 0');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
      case 'flat':
        adPriceInput.min = '1000';
        adPriceInput.placeholder = '1000';
        if (!adPriceInput.value || adPriceInput.value < 1000) {
          adPriceInput.setCustomValidity('Минимальная цена 1 000');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
      case 'house':
        adPriceInput.min = '5000';
        adPriceInput.placeholder = '5000';
        if (!adPriceInput.value || adPriceInput.value < 5000) {
          adPriceInput.setCustomValidity('Минимальная цена 5 000');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
      case 'palace':
        adPriceInput.min = '10000';
        adPriceInput.placeholder = '10000';
        if (!adPriceInput.value || adPriceInput.value < 10000) {
          adPriceInput.setCustomValidity('Минимальная цена 10 000');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
    }
  };
  priceCheck();

  adTypeOption.addEventListener('change', priceCheck);
  adPriceInput.addEventListener('change', priceCheck);

  var adTimeIn = document.querySelector('#timein');
  var adTimeOut = document.querySelector('#timeout');

  var timeInTimeOut = function (select1, select2) {
    if (select1.value === '12:00') {
      select2.value = '12:00';
    } else if (select1.value === '13:00') {
      select2.value = '13:00';
    } else if (select1.value === '14:00') {
      select2.value = '14:00';
    }
  };

  adTimeIn.addEventListener('change', function () {
    timeInTimeOut(adTimeIn, adTimeOut);
  });

  adTimeOut.addEventListener('change', function () {
    timeInTimeOut(adTimeOut, adTimeIn);
  });


  var adRooms = document.querySelector('#room_number');
  var adGuests = document.querySelector('#capacity');

  var validateRoomsAndGuestsAmount = function () {
    var rooms = parseInt(adRooms.value, 10);
    var guests = parseInt(adGuests.value, 10);
    switch (rooms) {
      case 100:
        if (guests !== 0) {
          adRooms.setCustomValidity('100 комнат предназначены не для гостей');
        } else {
          adRooms.setCustomValidity('');
        }
        break;
      default:
        if (!guests) {
          adRooms.setCustomValidity('Выберите количество мест');
        } else if (rooms >= guests) {
          adRooms.setCustomValidity('');
        } else {
          adRooms.setCustomValidity('Комнат меньше чем гостей');
        }
        break;
    }
  };

  adRooms.addEventListener('change', validateRoomsAndGuestsAmount);
  adGuests.addEventListener('change', validateRoomsAndGuestsAmount);
})();
