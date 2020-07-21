'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.loadMessage.uploadOnSuccess();
      } else {
        onErrorMessage();
      }
    });

    var onErrorMessage = function () {
      window.loadMessage.uploadError();
      window.loadMessage.errorText.innerHTML = 'Ошибка загрузки объявления ' + '<br>' + xhr.status + ' ' + xhr.statusText;
    };

    xhr.addEventListener('error', onErrorMessage);

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', window.const.UPLOAD_URL);
    xhr.send(data);
  };
})();

