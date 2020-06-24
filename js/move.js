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
      // console.log(window.map.mapPinMain.offsetTop - shift.y);
      var newYCoord = window.map.mapPinMain.offsetTop - shift.y;
      var newXCoord = window.map.mapPinMain.offsetLeft - shift.x;

      if (newYCoord < window.const.topBoard - window.map.mapPinMain.clientHeight) {
        newYCoord = window.const.topBoard - window.map.mapPinMain.clientHeight;
      } else if (newYCoord > window.const.bottomBoard - window.map.mapPinMain.clientHeight) {
        newYCoord = window.const.bottomBoard - window.map.mapPinMain.clientHeight;
      }
      window.map.mapPinMain.style.top = newYCoord + 'px';

      if (newXCoord < window.const.leftBoard) {
        newXCoord = window.const.leftBoard;
      } else if (newXCoord > window.const.rightBoard - window.map.mapPinMain.clientWidth) {
        newXCoord = window.const.rightBoard - (window.map.mapPinMain.clientWidth);
      }
      window.map.mapPinMain.style.left = newXCoord + 'px';

      window.map.adressInput.value = (newXCoord + (window.map.mapPinMain.clientWidth / 2)) + ' ' + (newYCoord + (window.map.mapPinMain.clientHeight));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // var shiftUp = {
      //   x: startCoords.x - upEvt.clientX,
      //   y: startCoords.y - upEvt.clientY
      // };

      // startCoords = {
      //   x: upEvt.clientX,
      //   y: upEvt.clientY
      // };

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
