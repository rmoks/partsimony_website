import _isArray from 'lodash/isArray';
import _get from 'lodash/get';

import { getAllEntries } from '.';

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

export const getFieldsFromPage = (array) => {
  return _get(array, 'items[0].fields', {});
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

export const formatAssetFile = (params) => {
  const fields = _get(params, 'fields', {});
  const url = _get(fields, 'file.url', '');
  return {
    url: url && `https:${url}`,
    contentType: _get(fields, 'file.contentType', ''),
    description: fields?.description || _get(fields, 'title', ''),
    size: fields?.file?.details?.image,
  };
};

export const formatLink = (params) => {
  const fields = _get(params, 'fields', {});
  const externalURL = _get(fields, 'externalPageLink', '');
  const internalURL = _get(fields, 'internalPageLink.fields.slug', '');
  const formattedInternalURL = internalURL && `/${internalURL}`;
  return {
    ...fields,
    label: fields?.label || '',
    url: externalURL || formattedInternalURL || '',
  };
};

const formatPrefooter = ({ preFooter: { fields } }) => {
  return {
    ...fields,
    image: getImageFields(fields.image),
    buttons: getFieldsFromArray(fields.buttons),
  };
};

const formatFooter = ({ footer: { fields } }) => {
  return {
    ...fields,
    menu: getFieldsFromArray(fields.menu).map((page) => {
      return {
        ...page,
      };
    }),
  };
};

const formatHeader = (params) => {
  const fields = _get(params, 'header.fields', {});
  return {
    ...fields,
    menu: getFieldsFromArray(fields.menu).map((page) => {
      return {
        ...page,
      };
    }),
  };
};

export const getDefaultSettings = async (page) => {
  const defaultSettings = await getAllEntries({
    content_type: 'defaultSettings',
    include: 5,
  });

  const fields = _get(defaultSettings, 'items[0].fields', {});
  const header = formatHeader(fields);
  const prefooter = formatPrefooter(fields);
  const footer = formatFooter(fields);

  const googleAnalyticsID = _get(fields, 'googleAnalyticsId', '');
  const defaultSEO = _get(fields, 'defaultSeo.fields', {});
  const pageSEO = _get(page, 'items[0].fields.pageSeo.fields', {});

  return {
    defaultSettings,
    header,
    prefooter,
    footer,
    googleAnalyticsID,
    defaultSEO,
    pageSEO,
  };
};

export const getPageFieldsAndSettings = async (pageType) => {
  const page = await getAllEntries(pageType);

  const fields = getFieldsFromPage(page);
  const settings = await getDefaultSettings(page);

  return {
    page: fields,
    settings,
  };
};

export const parseNextJSProps = (props) => {
  return JSON.parse(JSON.stringify(props));
};

// eslint-disable-next-line import/prefer-default-export
export const getSettings = async () => {
  const settings = await getAllEntries({
    content_type: 'settings',
    include: 3,
  });

  const path = 'items[0].fields';
  const GoogleAnalyticsID = _get(settings, `${path}.googleAnalyticsId`, '');
  const menu = _get(settings, `${path}.menu.fields.menuItem`);
  const defaultSEO = _get(settings, `${path}.seo.fields`, {});
  const formattedMenu = getFieldsFromArray(menu).map((menuItem) => ({
    ...menuItem,
    slug: menuItem?.internalPage?.fields?.slug ?? menuItem?.externalLink ?? '/',
  }));

  return { menu: formattedMenu, defaultSEO, GoogleAnalyticsID };
};
