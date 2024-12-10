import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Container.module.scss';

const Container = ({ children, className }) => {
  return <div className={cx(styles.container, className)}>{children}</div>;
};

export default Container;

Container.defaultProps = {
  className: '',
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
