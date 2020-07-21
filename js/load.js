'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', window.const.LOAD_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onErrorMessage();
      }
    });

    var onErrorMessage = function () {
      window.loadMessage.uploadError();
      window.loadMessage.errorText.innerHTML = 'Ошибка загрузки данных ' + '<br>' + xhr.status + ' ' + xhr.statusText;
    };

    xhr.addEventListener('error', onErrorMessage);

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send();
  };
})();
