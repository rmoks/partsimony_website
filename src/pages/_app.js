import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@splidejs/splide/dist/css/splide-core.min.css';
import '../assets/fonts/inter/inter.css';
import 'normalize.css/normalize.css';
import 'flexboxgrid2/flexboxgrid2.css';
import 'styles/base.scss';
import 'swiper/swiper.scss';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.defaultProps = {
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape(),
};

export default MyApp;
