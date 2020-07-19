// валидация заполнения объявления
'use strict';
(function () {
  var MAX_PRICE = 1000000;

  var FlatType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace',
  };

  var MinPrice = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000',
  };

  var CheckOutTime = {
    TWELVE: '12:00',
    THIRTEEN: '13:00',
    FOURTEEN: '14:00',
  };

  var RoomsAmount = {
    HUNDRED: 100,
  };

  var GuestAmount = {
    ZERO: 0,
  };

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
    if (adPriceInput.validity > MAX_PRICE) {
      adPriceInput.setCustomValidity('Цена не должна превышать 1 000 000');
    } else if (adPriceInput.validity.valueMissing) {
      adPriceInput.setCustomValidity('Обязательное поле');
    } else {
      adPriceInput.setCustomValidity('');
    }
  });

  var adTypeOption = document.querySelector('#type');

  var priceCheckHandler = function () {
    switch (adTypeOption.value) {

      case FlatType.BUNGALO:
        adPriceInput.min = MinPrice.BUNGALO;
        adPriceInput.placeholder = MinPrice.BUNGALO;
        if (!adPriceInput.value || adPriceInput.value < MinPrice.BUNGALO) {
          adPriceInput.setCustomValidity('Минимальная цена 0');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
      case FlatType.FLAT:
        adPriceInput.min = MinPrice.FLAT;
        adPriceInput.placeholder = MinPrice.FLAT;
        if (!adPriceInput.value || adPriceInput.value < MinPrice.FLAT) {
          adPriceInput.setCustomValidity('Минимальная цена 1 000');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
      case FlatType.HOUSE:
        adPriceInput.min = MinPrice.HOUSE;
        adPriceInput.placeholder = MinPrice.HOUSE;
        if (!adPriceInput.value || adPriceInput.value < MinPrice.HOUSE) {
          adPriceInput.setCustomValidity('Минимальная цена 5 000');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
      case FlatType.PALACE:
        adPriceInput.min = MinPrice.PALACE;
        adPriceInput.placeholder = MinPrice.PALACE;
        if (!adPriceInput.value || adPriceInput.value < MinPrice.PALACE) {
          adPriceInput.setCustomValidity('Минимальная цена 10 000');
        } else {
          adPriceInput.setCustomValidity('');
        }
        break;
    }
  };
  priceCheckHandler();

  var typeOptionHandler = function () {
    priceCheckHandler();
  };

  var priceInputHandler = function () {
    priceCheckHandler();
  };

  adTypeOption.addEventListener('change', typeOptionHandler);
  adPriceInput.addEventListener('change', priceInputHandler);


  var adTimeIn = document.querySelector('#timein');
  var adTimeOut = document.querySelector('#timeout');

  var timeInTimeOutVerify = function (select1, select2) {
    if (select1.value === CheckOutTime.TWELVE) {
      select2.value = CheckOutTime.TWELVE;
    } else if (select1.value === CheckOutTime.THIRTEEN) {
      select2.value = CheckOutTime.THIRTEEN;
    } else if (select1.value === CheckOutTime.FOURTEEN) {
      select2.value = CheckOutTime.FOURTEEN;
    }
  };

  adTimeIn.addEventListener('change', function () {
    timeInTimeOutVerify(adTimeIn, adTimeOut);
  });

  adTimeOut.addEventListener('change', function () {
    timeInTimeOutVerify(adTimeOut, adTimeIn);
  });


  var adRooms = document.querySelector('#room_number');
  var adGuests = document.querySelector('#capacity');

  var roomsAndGuestsAmountValidateHandler = function () {
    var rooms = parseInt(adRooms.value, 10);
    var guests = parseInt(adGuests.value, 10);
    switch (rooms) {
      case RoomsAmount.HUNDRED:
        if (guests !== GuestAmount.ZERO) {
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

  var roomsOptionHandler = function () {
    roomsAndGuestsAmountValidateHandler();
  };

  var guestAmountHandler = function () {
    roomsAndGuestsAmountValidateHandler();
  };

  adRooms.addEventListener('change', roomsOptionHandler);
  adGuests.addEventListener('change', guestAmountHandler);
})();
