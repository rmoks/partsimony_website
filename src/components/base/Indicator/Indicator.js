import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Indicator.module.scss';

const Indicator = ({ active, onClick }) => (
  <div
    className={cx(styles.indicator, {
      [styles['indicator--active']]: active,
      [styles['indicator--interactive']]: onClick,
    })}
    onClick={onClick}
    role="button"
    onKeyPress={onClick}
    tabIndex={0}
    aria-label="Indicator"
  />
);

Indicator.defaultProps = {
  active: false,
  onClick: undefined,
};

Indicator.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Indicator;
