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
