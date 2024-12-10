/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import cx from 'classnames';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';
import ArrowIcon from '~assets/icons/arrow.svg';
import useOnClickOutside from '~hooks/useOnClickOutside';

const InputWrapper = ({
  error,
  disabled,
  name,
  label,
  endAdornment: EndAdornment,
  children,
  className,
  onChange = () => {},
  value,
  inputProps,
  setOpen,
  onKeyDown,
}) => {
  return (
    <div
      className={cx(
        styles['material-form-field'],
        {
          [styles['material-form-field--invalid']]: error,
          [styles['material-form-field--disabled']]: disabled,
        },
        className,
      )}
      data-validationerror={error}
    >
      <input
        type="text"
        required
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        onClick={() => setOpen?.(true)}
        onFocus={() => setOpen?.(true)}
        onKeyDown={onKeyDown}
        {...inputProps}
      />
      {EndAdornment && <EndAdornment className={styles.endAdornment} />}
      <label className={styles['material-form-field-label']} htmlFor={name}>
        {label}
      </label>
      {children}
    </div>
  );
};

InputWrapper.defaultProps = {
  error: '',
  disabled: false,
  children: null,
  className: '',
  setOpen: undefined,
};

InputWrapper.propTypes = {
  error: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  setOpen: PropTypes.func,
};

const Input = (props) => {
  return <InputWrapper {...props} />;
};

const selectOption = (e, current, options, onChange, setOpen, onKeyDown) => {
  if (e.key === 'Enter') {
    setOpen(false);
    onKeyDown(e);
  }
  let index = 0;
  if (current) {
    index = options.findIndex((option) => option.value === current);
  }

  if (e.keyCode === 38) {
    // up
    if (index - 1 >= 0) {
      index -= 1;
      onChange(options[index].value);
    }
  } else if (e.keyCode === 40) {
    // down
    if (index + 1 <= options.length) {
      index += 1;
      onChange(options[index].value);
    }
  }
};

export const Select = ({ onChange, options, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <InputWrapper
      {...props}
      className={styles.dropdown}
      endAdornment={ArrowIcon}
      setOpen={setOpen}
      inputProps={{
        autoComplete: 'off',
        onKeyDown: (e) =>
          selectOption(
            e,
            props.value,
            options,
            onChange,
            setOpen,
            props.onKeyDown,
          ),
      }}
    >
      <div
        className={cx(styles['material-dropdown'], { [styles.open]: open })}
        onMouseLeave={() => setOpen(false)}
        ref={ref}
      >
        <ul className={styles.optionsContainer}>
          {options.map(({ value, label }, index) => {
            const isSelected = value === props.value;

            return (
              <li
                key={index}
                role="option"
                aria-selected={isSelected}
                className={cx({
                  [styles['material-dropdown-selected']]: isSelected,
                })}
                onClick={() => {
                  onChange(value);
                  setOpen(false);
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </InputWrapper>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  ...InputWrapper.propTypes,
};

export default Input;
