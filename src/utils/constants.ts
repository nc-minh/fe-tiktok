export const STALE_TIME = {
  ONE_HOUR: 3600000,
};

export const PAGE_SIZE = 20;

export const MB_50 = 52428800;

export const numberFormat = (number: number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number;
};

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getExtension(filename: string) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isImage(filename: string) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'apng':
    case 'avif':
    case 'gif':
    case 'jpg':
    case 'jpeg':
    case 'jfif':
    case 'pjpeg':
    case 'pjp':
    case 'png':
    case 'svg':
    case 'webp':
    case 'bmp':
    case 'ico':
    case 'cur':
    case 'tif':
    case 'tiff':
      //etc
      return true;
  }
  return false;
}

export function isVideo(filename: string) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      // etc
      return true;
  }
  return false;
}
