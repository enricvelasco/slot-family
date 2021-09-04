export function getFileExtension(filename) {
  return filename && filename.split('.').pop();
}

export function previewFile(file, idPreview) {
  const preview = document.getElementById(idPreview);
  const reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
    return file
  } else {
    preview.src = "";
  }
}

const dataURLToBlob = function(dataURL) {
  const BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    const parts = dataURL.split(',');
    const contentType = parts[0].split(':')[1];
    const raw = parts[1];

    return new Blob([raw], {type: contentType});
  }

  const parts = dataURL.split(BASE64_MARKER);
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

export const setImageFromURL = ({ url, maxWidth, maxHeight }) => {
  const image = new Image()

  image.onload = function () {
    const canvas = document.createElement('canvas')

    const MAX_WIDTH = maxWidth;
    const MAX_HEIGHT = maxHeight;
    let width = image.width;
    let height = image.height;

    if (!!maxWidth && width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else if (!!maxHeight) {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;

    canvas.getContext('2d').drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    const resizedImage = dataURLToBlob(dataUrl);

    console.log('RESIZED___', resizedImage)
  }

  image.src = url
}

export function getBase64ImageFromURL(src) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL('image/png');

    console.log('DATA_URL', dataURL)
    // callback(dataURL);
  };

  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

export const resizeImage = ({ file, maxWidth, maxHeight }) => {
  return new Promise((resolve, reject) => {
    const isImageFile = !!file.type.match(/image.*/)
    if (isImageFile) {
      const reader = new FileReader();
      reader.onload = function(readerEvent) {
        const image = new Image();
        image.onload = function() {
          const canvas = document.createElement('canvas')

          const MAX_WIDTH = maxWidth;
          const MAX_HEIGHT = maxHeight;
          let width = image.width;
          let height = image.height;

          if (!!maxWidth && width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else if (!!maxHeight) {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;

          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL();
          const resizedImage = dataURLToBlob(dataUrl);

          resolve(resizedImage)
        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    }
  })
}
