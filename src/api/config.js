import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.CMS_SPACE,
  accessToken: process.env.CMS_TOKEN,
});

export default client;
