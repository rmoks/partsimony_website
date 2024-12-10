import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';

const Content = ({ children, half, full, className }) => {
  return (
    <div
      className={cx(styles.content, className, {
        [styles['content-half']]: half,
        [styles['content-full']]: full,
      })}
    >
      {children}
    </div>
  );
};

export default Content;

Content.defaultProps = {
  className: '',
  half: false,
  full: false,
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  half: PropTypes.bool,
  full: PropTypes.bool,
};
