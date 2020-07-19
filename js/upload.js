'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };

  var mainBlock = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error');
  var errorMessage = errorMessageTemplate.cloneNode(true)
    .content
    .querySelector('.error');
  var errorText = errorMessage.querySelector('p');


  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';
    var uploadOnSuccess = function () {
      var successMessageTemplate = document.querySelector('#success');
      var successMessage = successMessageTemplate.cloneNode(true)
        .content
        .querySelector('.success');
      mainBlock.appendChild(successMessage);

      uploadERROR();

      successMessage.addEventListener('click', successMessageCloseHandler);

      var successEscClickHandler = function (evt) {
        if (evt.key === window.const.ESC_BUTTON) {
          evt.preventDefault();
          successMessageCloseHandler();
          document.removeEventListener('keydown', successEscClickHandler);
        }
      };

      document.addEventListener('keydown', successEscClickHandler);
    };

    var successMessageCloseHandler = function () {
      var successMessage = document.querySelector('.success');
      if (successMessage) {
        successMessage.remove();
      }
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        uploadOnSuccess();
      } else {
        uploadERROR();
        errorText.innerHTML = 'Ошибка загрузки объявления ' + '<br>' + xhr.status + ' ' + xhr.statusText;
      }
    });

    xhr.open('POST', window.const.UPLOAD_URL);
    xhr.send(data);
  };

  var uploadERROR = function () {
    mainBlock.appendChild(errorMessage);
    errorMessage.addEventListener('click', errMessageCloseHandler);

    var errCloseButton = errorMessage.querySelector('.error__button');
    errCloseButton.addEventListener('click', errMessageCloseHandler);

    var errEscClickHandler = function (evt) {
      if (evt.key === window.const.ESC_BUTTON) {
        evt.preventDefault();
        errMessageCloseHandler();
        document.removeEventListener('keydown', errEscClickHandler);
      }
    };
    document.addEventListener('keydown', errEscClickHandler);
  };

  var errMessageCloseHandler = function () {
    var errMessage = document.querySelector('.error');
    if (errMessage) {
      errMessage.remove();
    }
  };

  window.upload = {
    uploadERROR: uploadERROR,
    errorText: errorText
  };

})();

