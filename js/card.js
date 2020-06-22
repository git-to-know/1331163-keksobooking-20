// отрисовка карточки
// card.js
'use strict';
(function () {
  var createCard = function (data) {
    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup');

    var newCard = cardTemplate.cloneNode(true);

    var popupTitle = newCard.querySelector('.popup__title');
    popupTitle.textContent = data.offer.title;
    if (data.offer.title === '') {
      popupTitle.style = 'display: none';
    }

    var popupArdess = newCard.querySelector('.popup__text--address');
    popupArdess.textContent = data.offer.address;
    if (data.offer.address === '') {
      popupArdess.style = 'display: none';
    }

    var popupPrice = newCard.querySelector('.popup__text--price');
    popupPrice.textContent = data.offer.price + '₽/ночь';
    if (data.offer.price === '') {
      popupPrice.style = 'display: none';
    }

    var popupType = newCard.querySelector('.popup__type');
    popupType.textContent = window.data.typeRusNames[data.offer.type];
    if (data.offer.type === '') {
      popupType.style = 'display: none';
    }

    var popupGuestsRooms = newCard.querySelector('.popup__text--capacity');
    popupGuestsRooms.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    if (data.offer.rooms === '' | data.offer.guests === '') {
      popupGuestsRooms.style = 'display: none';
    }

    var popupCheckInCheckOut = newCard.querySelector('.popup__text--time');
    popupCheckInCheckOut.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout + '.';
    if (data.offer.checkin === '' | data.offer.checkout === '') {
      popupCheckInCheckOut.style = 'display: none';
    }

    var popupFeatures = newCard.querySelector('.popup__features');
    popupFeatures.textContent = '';
    var featureTemplate = cardTemplate.querySelector('.popup__feature');
    for (var i = 0; i < data.offer.features.length; i++) {
      var feature = featureTemplate.cloneNode(true);
      feature.className = 'popup__feature popup__feature--' + data.offer.features[i];
      popupFeatures.appendChild(feature);
    }

    var popupDescription = newCard.querySelector('.popup__description');
    popupDescription.textContent = data.offer.description;
    if (data.offer.description === '') {
      popupDescription.style = 'display: none';
    }

    var popupPhotos = newCard.querySelector('.popup__photos');
    popupPhotos.textContent = '';
    var pictureTemplate = cardTemplate.querySelector('.popup__photo');
    for (i = 0; i < data.offer.photos.length; i++) {
      var picture = pictureTemplate.cloneNode(true);
      picture.src = data.offer.photos[i];
      popupPhotos.appendChild(picture);
    }

    var popupAuthor = newCard.querySelector('.popup__avatar');
    popupAuthor.src = data.author.avatar;
    if (data.author.avatar === '') {
      popupAuthor.style = 'display: none';
    }

    var popupCloseButton = newCard.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', closeCard);

    var onEscClickHandler = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCard();
        document.removeEventListener('keydown', onEscClickHandler);
      }
    };

    document.addEventListener('keydown', onEscClickHandler);

    return newCard;
  };

  // зактрытие карточки объявления
  // card.js
  var closeCard = function () {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  window.card = {
    createCard: createCard,
    closeCard: closeCard
  };
})();
