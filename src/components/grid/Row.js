import React, { forwardRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

function addStyle(style, name, val, classNames) {
  if (val) {
    classNames.push(`${style}-${name}`);
  }

  return null;
}

const Row = forwardRef(
  (
    {
      children,
      reverse,
      className,
      tagName,
      aroundXs,
      aroundSm,
      aroundMd,
      aroundLg,
      aroundXl,
      betweenXs,
      betweenSm,
      betweenMd,
      betweenLg,
      betweenXl,
      middleXs,
      middleSm,
      middleMd,
      middleLg,
      middleXl,
      startXs,
      startSm,
      startMd,
      startLg,
      startXl,
    },
    ref,
  ) => {
    const classNames = [];

    const Tag = tagName || 'div';

    addStyle('around', 'xs', aroundXs, classNames);
    addStyle('around', 'sm', aroundSm, classNames);
    addStyle('around', 'md', aroundMd, classNames);
    addStyle('around', 'lg', aroundLg, classNames);
    addStyle('around', 'xl', aroundXl, classNames);

    addStyle('between', 'xs', betweenXs, classNames);
    addStyle('between', 'sm', betweenSm, classNames);
    addStyle('between', 'md', betweenMd, classNames);
    addStyle('between', 'lg', betweenLg, classNames);
    addStyle('between', 'xl', betweenXl, classNames);

    addStyle('middle', 'xs', middleXs, classNames);
    addStyle('middle', 'sm', middleSm, classNames);
    addStyle('middle', 'md', middleMd, classNames);
    addStyle('middle', 'lg', middleLg, classNames);
    addStyle('middle', 'xl', middleXl, classNames);

    addStyle('start', 'xs', startXs, classNames);
    addStyle('start', 'sm', startSm, classNames);
    addStyle('start', 'md', startMd, classNames);
    addStyle('start', 'lg', startLg, classNames);
    addStyle('start', 'xl', startXl, classNames);

    const allClassNames = cx('row', className, { reverse }, classNames);

    return (
      <Tag ref={ref} className={allClassNames}>
        {children}
      </Tag>
    );
  },
);

Row.defaultProps = {
  tagName: 'div',
  aroundXs: false,
  aroundSm: false,
  aroundMd: false,
  aroundLg: false,
  aroundXl: false,
  betweenXs: false,
  betweenSm: false,
  betweenMd: false,
  betweenLg: false,
  betweenXl: false,
  middleXs: false,
  middleSm: false,
  middleMd: false,
  middleLg: false,
  middleXl: false,
  startXs: false,
  startSm: false,
  startMd: false,
  startLg: false,
  startXl: false,
  reverse: false,
  className: null,
  children: null,
};

Row.propTypes = {
  tagName: PropTypes.string,
  aroundXs: PropTypes.bool,
  aroundSm: PropTypes.bool,
  aroundMd: PropTypes.bool,
  aroundLg: PropTypes.bool,
  aroundXl: PropTypes.bool,
  betweenXs: PropTypes.bool,
  betweenSm: PropTypes.bool,
  betweenMd: PropTypes.bool,
  betweenLg: PropTypes.bool,
  betweenXl: PropTypes.bool,
  middleXs: PropTypes.bool,
  middleSm: PropTypes.bool,
  middleMd: PropTypes.bool,
  middleLg: PropTypes.bool,
  middleXl: PropTypes.bool,
  startXs: PropTypes.bool,
  startSm: PropTypes.bool,
  startMd: PropTypes.bool,
  startLg: PropTypes.bool,
  startXl: PropTypes.bool,
  reverse: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Row;
