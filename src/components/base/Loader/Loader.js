import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

const Loader = ({ className }) => {
  return <div className={cx(styles.loader, className)} />;
};

Loader.defaultProps = {
  className: '',
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
