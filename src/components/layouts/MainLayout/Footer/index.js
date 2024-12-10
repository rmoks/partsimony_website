import AngelIcon from 'assets/icons/socials/angel.svg';
import FacebookIcon from 'assets/icons/socials/facebook.svg';
import InstagramIcon from 'assets/icons/socials/instagram.svg';
import LinkedinIcon from 'assets/icons/socials/linkedin.svg';
import MediumIcon from 'assets/icons/socials/medium.svg';
import TwitterIcon from 'assets/icons/socials/twitter.svg';
import axios from 'axios';
import cx from 'classnames';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState, useRef } from 'react';
import * as Yup from 'yup';
import LogoLight from '~assets/icons/logo-light.svg';
import PinIcon from '~assets/icons/pin.svg';
import ErrorIcon from '~assets/icons/warning.svg';
import FooterImg from '~assets/images/footer-bg.svg';
import FooterImgTablet from '~assets/images/footer-bg-tablet.svg';
import Button from '~baseComponents/Button/Button';
import Input, { Select } from '~baseComponents/Input/Input';
import Content from '~layouts/Content/Content';
import styles from './Footer.module.scss';
import Policy from './Policy';

export const contactFormSchema = Yup.object({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  type: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
});

const Footer = ({
  menu,
  socials = {},
  address,
  mapUrl,
  // loginLink
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [hovered, setHovered] = useState(false);

  const handleFocus = () => {
    setHovered(true);
  };

  const handleBlur = () => {
    setHovered(false);
  };

  const onSubmitHandler = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setHasError(false);

    try {
      await axios.post('/api/contact', values);
      setIsSubmitted(true);
    } catch (e) {
      setHasError(true);
      setIsSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      type: '',
      company: '',
    },
    validationSchema: contactFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmitHandler,
  });

  const headerContent = isSubmitted
    ? 'Thank you for contacting! We will be in contact shortly.'
    : 'Get in touch';

  const socialData = [
    { link: socials?.angelUrl, icon: AngelIcon },
    { link: socials?.mediumUrl, icon: MediumIcon },
    { link: socials?.twitterUrl, icon: TwitterIcon },
    { link: socials?.instagramUrl, icon: InstagramIcon },
    { link: socials?.linkedinUrl, icon: LinkedinIcon },
    { link: socials?.facebookUrl, icon: FacebookIcon },
  ];

  const formRef = useRef();

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const fields =
        Array.from(formRef.current.querySelectorAll('input, button')) || [];

      const position = fields.indexOf(e.target);

      if (fields[position + 1]) fields[position + 1].focus();
    }
  };

  return (
    <footer className={styles.footer}>
      <div id="contact" className={styles.anchorToContact} />
      <Content className={styles.container}>
        <LogoLight className={styles.logo} />

        <div className={styles.content}>
          <div className={styles.formContainer}>
            <p className={styles.formHeader}>{headerContent}</p>

            {hasError && (
              <p className={styles.errorMessage}>
                <ErrorIcon />
                <span>Server is unable to handle this request.</span>
              </p>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className={cx(styles.form, {
                [styles['form-hidden']]: isSubmitted,
              })}
            >
              <div className={styles.formColumn}>
                <Input
                  label="First Name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  error={errors.name}
                  onKeyDown={onKeyDown}
                />
                <Input
                  label="Last Name"
                  name="surname"
                  onChange={handleChange}
                  value={values.surname}
                  error={errors.surname}
                  onKeyDown={onKeyDown}
                />
              </div>
              <div className={styles.formColumn}>
                <Input
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  onKeyDown={onKeyDown}
                />
                <Select
                  label="Type"
                  name="type"
                  options={[
                    {
                      label: 'Hardware Company',
                      value: 'Hardware Company',
                    },
                    {
                      label: 'Manufacturer',
                      value: 'Manufacturer',
                    },
                  ]}
                  onChange={(value) => {
                    setFieldTouched('type', true);
                    setFieldValue('type', value);
                  }}
                  value={values.type}
                  error={errors.type}
                  onKeyDown={onKeyDown}
                />
              </div>
              <div className={styles.formColumn}>
                <Input
                  label="Company"
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                  error={errors.company}
                  onKeyDown={onKeyDown}
                />
                <div className={styles.formButtonContainer}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    light
                    className={styles.formButton}
                    isLoading={isSubmitting}
                    onKeyUp={handleSubmit}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.details}>
            <nav>
              <ul className={styles.links}>
                {!!menu?.length &&
                  menu.map(({ label, url }, index) => (
                    <li key={index}>
                      {url.startsWith('http') ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link 
                          href={url} 
                          className={styles.link}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </nav>

            <div
              className={cx(styles.socialsContainer, {
                [styles.hovered]: hovered,
              })}
            >
              {socialData.map(({ icon: Icon, link }, index) => (
                <a
                  href={link}
                  key={index}
                  onFocus={handleFocus}
                  onMouseOver={handleFocus}
                  onBlur={handleBlur}
                  onMouseOut={handleBlur}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className={styles.socialIcon} />
                </a>
              ))}
            </div>

            <a
              href={mapUrl}
              target="_blank"
              className={styles.location}
              rel="noreferrer"
            >
              <PinIcon />
              <span>{address}</span>
            </a>
            <Policy className={cx(styles.policy, 'phoneDownHidden')} />
          </div>
        </div>

        <Policy className={cx(styles.policy, 'phoneUpHidden')} />
        <FooterImg className={styles.background} />
        <FooterImgTablet className={styles.backgroundTablet} />
      </Content>
    </footer>
  );
};

export default Footer;
