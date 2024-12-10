import React from 'react';
import PropTypes from 'prop-types';
import styles from './CookieWarning.module.scss';

const CookieWarning = ({ settings, onClose }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{settings.gdprCookieWarningText}</p>
      <a className={styles.close} href="#close" onClick={onClose}>
        &times;
      </a>
    </div>
  );
};

export default CookieWarning;

CookieWarning.propTypes = {
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    gdprCookieWarningText: PropTypes.string,
  }).isRequired,
};
