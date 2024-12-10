import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

function addSize(name, val, classNames) {
  if (val) {
    if (val === true) {
      classNames.push(`col-${name}`);
    } else {
      classNames.push(`col-${name}-${val}`);
    }
  }
}

function addOffset(name, val, classNames) {
  if (val) {
    classNames.push(`col-${name}-offset-${val}`);
  }
}

function addFirst(name, val, classNames) {
  if (val) {
    classNames.push(`first-${name}`);
  }
}

function addLast(name, val, classNames) {
  if (val) {
    classNames.push(`last-${name}`);
  }
}

const Col = ({
  tagName,
  xs,
  sm,
  md,
  lg,
  xl,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  xsFirst,
  smFirst,
  mdFirst,
  lgFirst,
  xlFirst,
  xsLast,
  smLast,
  mdLast,
  lgLast,
  xlLast,
  className,
  children,
}) => {
  const classNames = [];

  const Tag = tagName;

  if (className) {
    classNames.push(className);
  }

  addSize('xs', xs, classNames);
  addSize('sm', sm, classNames);
  addSize('md', md, classNames);
  addSize('lg', lg, classNames);
  addSize('xl', xl, classNames);
  addOffset('xs', xsOffset, classNames);
  addOffset('sm', smOffset, classNames);
  addOffset('md', mdOffset, classNames);
  addOffset('lg', lgOffset, classNames);
  addOffset('xl', xlOffset, classNames);
  addFirst('xs', xsFirst, classNames);
  addFirst('sm', smFirst, classNames);
  addFirst('md', mdFirst, classNames);
  addFirst('lg', lgFirst, classNames);
  addFirst('xl', xlFirst, classNames);
  addLast('xs', xsLast, classNames);
  addLast('sm', smLast, classNames);
  addLast('md', mdLast, classNames);
  addLast('lg', lgLast, classNames);
  addLast('xl', xlLast, classNames);

  return <Tag className={cx(classNames)}>{children}</Tag>;
};

Col.defaultProps = {
  tagName: 'div',
  xs: 0,
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  xsOffset: 0,
  smOffset: 0,
  mdOffset: 0,
  lgOffset: 0,
  xlOffset: 0,
  xsFirst: false,
  smFirst: false,
  mdFirst: false,
  lgFirst: false,
  xlFirst: false,
  xsLast: false,
  smLast: false,
  mdLast: false,
  lgLast: false,
  xlLast: false,
  className: null,
  children: null,
};

Col.propTypes = {
  tagName: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  xlOffset: PropTypes.number,
  xsFirst: PropTypes.bool,
  smFirst: PropTypes.bool,
  mdFirst: PropTypes.bool,
  lgFirst: PropTypes.bool,
  xlFirst: PropTypes.bool,
  xsLast: PropTypes.bool,
  smLast: PropTypes.bool,
  mdLast: PropTypes.bool,
  lgLast: PropTypes.bool,
  xlLast: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Col;
