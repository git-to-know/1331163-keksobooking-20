'use strict';
(function () {
  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', window.const.UPLOAD_URL);
    xhr.send(data);
  };
})();
