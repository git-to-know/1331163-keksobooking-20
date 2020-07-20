'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PhotoSize = {
    WIDTH: 70,
    HEIGHT: 70,
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var placePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var placePhotoPreview = document.querySelector('.ad-form__photo');


  var photoLoad = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var placePhotoCreate = function () {
    var placePhoto = document.createElement('img');
    placePhoto.alt = 'Фото жилья';
    placePhoto.width = PhotoSize.WIDTH;
    placePhoto.height = PhotoSize.HEIGHT;
    placePhotoPreview.appendChild(placePhoto);
    photoLoad(placePhotoFileChooser, placePhoto);
  };

  avatarFileChooser.addEventListener('change', function () {
    photoLoad(avatarFileChooser, avatarPreview);
  });

  placePhotoFileChooser.addEventListener('change', function () {
    placePhotoCreate();
  });

  window.photoLoad = {
    avatarPreview: avatarPreview,
    placePhotoPreview: placePhotoPreview,
    placePhotoCreate: placePhotoCreate
  };
})();

