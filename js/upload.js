'use strict';
(function () {
  var StatusCode = {
    OK: 200
    // ERR: [400, 401, 404]
  };

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'multipart/form-data';

    var mainBlock = document.querySelector('main');

    var uploadOnSuccess = function () {
      var successMessageTemplate = document.querySelector('#success');
      var successMessage = successMessageTemplate.cloneNode(true)
        .content
        .querySelector('.success');
      mainBlock.appendChild(successMessage);

      successMessage.addEventListener('click', closeSuccessMessage);

      var successOnEscClickHandler = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeSuccessMessage();
          document.removeEventListener('keydown', successOnEscClickHandler);
        }
      };

      document.addEventListener('keydown', successOnEscClickHandler);
    };

    var uploadERROR = function () {
      var errorMessageTemplate = document.querySelector('#error');
      var errorMessage = errorMessageTemplate.cloneNode(true)
        .content
        .querySelector('.error');
      mainBlock.appendChild(errorMessage);
      var errorText = errorMessage.querySelector('p');
      errorText.innerHTML = 'Ошибка загрузки объявления ' + '<br>' + xhr.status + ' ' + xhr.statusText;

      errorMessage.addEventListener('click', closeErrMessage);

      var errCloseButton = errorMessage.querySelector('.error__button');
      errCloseButton.addEventListener('click', closeErrMessage);

      var errOnEscClickHandler = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeErrMessage();
          document.removeEventListener('keydown', errOnEscClickHandler);
        }
      };

      document.addEventListener('keydown', errOnEscClickHandler);
    };

    var closeErrMessage = function () {
      var errMessage = document.querySelector('.error');
      if (errMessage) {
        errMessage.remove();
      }
    };

    var closeSuccessMessage = function () {
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
      }
    });

    xhr.open('POST', window.const.UPLOAD_URL);
    xhr.send(data);

    //

    // document.addEventListener('keydown', onEscClickHandler);
  };

})();

