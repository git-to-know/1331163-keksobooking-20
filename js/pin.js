// создание пина
'use strict';
(function () {
  var similarListPin = document.querySelector('.map__pins');

  var createPin = function (data) {
    var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

    var pin = similarPinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pinImg.src = data.author.avatar;
    pinImg.alt = data.offer.title;
    pin.style = 'left: ' + (data.location.x - window.const.PIN_WIDTH / 2) + 'px; top: ' + (data.location.y - window.const.PIN_HEIGHT) + 'px;';

    return pin;
  };

  var renderPin = function (data) {
    var newPin = window.pin.createPin(data);
    newPin.addEventListener('click', function () {
      var mapPins = document.querySelector('.map');
      window.card.cardCloseHandler();
      mapPins.appendChild(window.card.createCard(data));
    });
    window.pin.similarListPin.appendChild(newPin);
  };

  window.pin = {
    renderPin: renderPin,
    createPin: createPin,
    similarListPin: similarListPin,
  };
})();
