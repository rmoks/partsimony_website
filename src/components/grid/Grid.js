import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Grid = ({ id, children, className }) => {
  return (
    <div id={id} className={cx('container', className)}>
      {children}
    </div>
  );
};

Grid.defaultProps = {
  id: null,
  className: null,
  children: null,
};

Grid.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
