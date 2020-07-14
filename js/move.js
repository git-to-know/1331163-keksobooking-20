'use strict';
(function () {
  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newYCoord = window.map.mapPinMain.offsetTop - shift.y;
      var newXCoord = window.map.mapPinMain.offsetLeft - shift.x;

      if (newYCoord < window.const.TOP_BOARD - window.map.mapPinMain.clientHeight) {
        newYCoord = window.const.TOP_BOARD - window.map.mapPinMain.clientHeight;
      } else if (newYCoord > window.const.BOTTOM_BOARD - window.map.mapPinMain.clientHeight) {
        newYCoord = window.const.BOTTOM_BOARD - window.map.mapPinMain.clientHeight;
      }
      window.map.mapPinMain.style.top = newYCoord + 'px';

      if (newXCoord < window.const.LEFT_BOARD - (window.map.mapPinMain.clientWidth / 2)) {
        newXCoord = window.const.LEFT_BOARD - (window.map.mapPinMain.clientWidth / 2);
      } else if (newXCoord > window.const.RIGHT_BOARD - (window.map.mapPinMain.clientWidth / 2)) {
        newXCoord = window.const.RIGHT_BOARD - (window.map.mapPinMain.clientWidth / 2);
      }
      window.map.mapPinMain.style.left = newXCoord + 'px';

      window.map.adressInput.value = Math.round(newXCoord + (window.map.mapPinMain.clientWidth / 2)) + ' ' + Math.round(newYCoord + (window.map.mapPinMain.clientHeight));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
