/* eslint-disable no-console */
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import PropTypes from 'prop-types';

let hasInitialized;
const GoogleAnalytics = ({ trackingId }) => {
  useEffect(() => {
    if (!trackingId) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'Google Analytics ID is not being provided. Please, check the usage of the GoogleAnalytics component.',
        );
      }
      return;
    }

    if (!hasInitialized) {
      hasInitialized = true;
      ReactGA.initialize(trackingId);
    }
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }, [trackingId]);

  return null;
};

export default GoogleAnalytics;

GoogleAnalytics.defaultProps = {
  trackingId: '',
};

GoogleAnalytics.propTypes = {
  trackingId: PropTypes.string,
};
