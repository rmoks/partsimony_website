/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import Loader from '~baseComponents/Loader/Loader';

const Button = forwardRef(
  ({ children, className, light, disabled, isLoading, ...props }, ref) => {
    const isDisabled = isLoading || disabled;

    return (
      <button
        ref={ref}
        type="button"
        className={cx(
          styles.container,
          { [styles['container-light']]: light },
          { [styles['container-disabled']]: isDisabled },
          className,
        )}
        disabled={isDisabled}
        {...props}
      >
        <span className={cx({ [styles.hidden]: isLoading })}>{children}</span>
        {isLoading && <Loader className={styles.loader} />}
      </button>
    );
  },
);

Button.defaultProps = {
  className: null,
  children: null,
  light: false,
  disabled: false,
  isLoading: false,
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  light: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Button;
