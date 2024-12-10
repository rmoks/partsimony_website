import { getAllEntries } from 'api';
import _get from 'lodash/get';
import mg from 'mailgun-js';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { contactFormSchema } from '~components/layouts/MainLayout/Footer';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const mailGun = mg({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

async function addToAudience({ name, surname, email, type, company }) {
  const audienceIdManufacturer = process.env.MAILCHIMP_AUDIENCE_ID_MANUFACTURER;
  const audienceIdHardwareCompany =
    process.env.MAILCHIMP_AUDIENCE_ID_HARDWARE_COMPANY;

  let audienceId = audienceIdHardwareCompany;
  if (type === 'Manufacturer') {
    audienceId = audienceIdManufacturer;
  }

  // It verifies if the email is already registered.
  const isEmailRegistered = await mailchimp.searchMembers.search(email, {
    listId: audienceId,
  });

  if (isEmailRegistered?.exact_matches?.members?.length) {
    return null;
  }

  // It adds the email the to audencie using the first name as new and last name subscriber.
  return mailchimp.lists.addListMember(audienceId, {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: name,
      LNAME: surname,
      CNAME: company,
    },
  });
}

async function sendEmail({ name, surname, email, type, company }) {
  const defaultSettings = await getAllEntries({
    content_type: 'defaultSettings',
  });

  const settings = _get(defaultSettings, 'items[0].fields', {});

  const toEmail = _get(settings, 'contactFormTo');
  const emailSubject = _get(settings, 'contactFormSubject');

  return new Promise((resolve, reject) => {
    const template = `
    <h2>${emailSubject}</h2>
    <p><strong>Name:</strong> ${name} ${surname}</p>
    <p><strong>Email:</strong> ${email} </p>
    <p><strong>Type:</strong> ${type} </p>
    <p><strong>Company:</strong> ${company} </p>
    `;

    const data = {
      from: email,
      to: toEmail,
      subject: emailSubject,
      html: template,
    };

    mailGun.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(body);
    });
  });
}

function validateFields(params) {
  return new Promise((resolve, reject) => {
    if (contactFormSchema.isValidSync(params)) {
      return resolve();
    }

    return reject();
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = _get(req, 'body', {});
      await validateFields(params);
      const actions = [sendEmail(params), addToAudience(params)];
      await Promise.all(actions);
      res.status(200).json({ ok: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      res
        .status(403)
        .json({ error: 'Error while sending e-mail. Please try again.' });
    }
  }
}
