'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.popup.uploadOnSuccess();
      } else {
        window.popup.uploadError();
        window.popup.errorText.innerHTML = 'Ошибка загрузки объявления ' + '<br>' + xhr.status + ' ' + xhr.statusText;
      }
    });

    xhr.open('POST', window.const.UPLOAD_URL);
    xhr.send(data);
  };
})();

