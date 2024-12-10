import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import GoogleAnalytics from '~baseComponents/GoogleAnalytics';
import SEO, { SEODefaultValues, SEOType } from '~baseComponents/SEO';
import Footer from './Footer';
import Header from './Header';
import styles from './MainLayout.module.scss';
import Prefooter from './Prefooter/Prefooter';

const MainLayout = ({ settings, children, hidePrefooter }) => {
  const {
    pageSEO,
    defaultSEO,
    footer,
    prefooter,
    header,
    googleAnalyticsID,
    defaultSettings,
  } = settings || {};
  const fields = _get(defaultSettings, 'items[0].fields', {});
  const loginLink = _get(fields, 'loginLink');

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollYPosition = window.scrollY;

      if (scrollYPosition > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <SEO defaultSEO={defaultSEO} pageSEO={pageSEO} />
      <Header
        menu={header?.menu}
        socials={header?.socials?.fields}
        loginLink={loginLink}
        isSticky={isSticky}
      />
      <div className={styles.content}>{children}</div>
      <GoogleAnalytics trackingId={googleAnalyticsID} />
      {!hidePrefooter && <Prefooter {...prefooter} />}
      <Footer
        menu={footer?.menu}
        socials={footer?.socials?.fields}
        loginLink={loginLink}
        address={footer?.address}
        mapUrl={footer?.mapUrl}
      />
    </div>
  );
};

export default MainLayout;

MainLayout.defaultProps = {
  pageSeo: SEODefaultValues,
  defaultSEO: SEODefaultValues,
  GoogleAnalyticsID: '',
  hidePrefooter: false,
};

MainLayout.propTypes = {
  GoogleAnalyticsID: PropTypes.string,
  pageSeo: PropTypes.shape({
    fields: PropTypes.shape(SEOType),
  }),
  defaultSEO: PropTypes.shape({
    description: PropTypes.string,
    hostname: PropTypes.string,
    title: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  hidePrefooter: PropTypes.bool,
};
