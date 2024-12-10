import client from './config';

export const getAllEntries = (params = {}) => {
  return client.getEntries(params);
};

export const getSingleEntry = (id) => {
  return client.getEntry(id);
};

export const getSingleContentType = (id) => {
  return client.getContentType(id);
};

export const getAllContentType = () => {
  return client.getContentTypes();
};

export const getAllTags = () => {
  return client.getTags();
};

export const getSingleTag = (id) => {
  return client.getTag(id);
};

export const getSpace = () => {
  return client.getSpace();
};
