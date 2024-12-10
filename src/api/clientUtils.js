import _isArray from 'lodash/isArray';
import _get from 'lodash/get';

export const getFieldsFromObject = (object = {}) => {
  const fields = _get(object, 'fields', {});
  const sysId = _get(object, 'sys.id', {});
  return {
    ...fields,
    sysId,
  };
};

export const getFieldsFromArray = (array) => {
  if (!_isArray(array)) {
    return [{}];
  }
  return array.map(getFieldsFromObject);
};

export const getImageFields = (image) => {
  const url = _get(image, 'fields.file.url', '');
  const width = _get(image, 'fields.file.details.image.width', 0);
  const height = _get(image, 'fields.file.details.image.height', 0);
  const description = _get(image, 'fields.description', '');
  const name = _get(image, 'fields.title', '');
  return {
    url: `https:${url}`,
    width,
    height,
    alt: description || name || '',
  };
};
