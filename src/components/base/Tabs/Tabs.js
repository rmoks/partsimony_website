/* eslint-disable no-unused-expressions */
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './Tabs.module.scss';

const Tabs = ({ tabs, contentClassName, className, onChange }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { content } = tabs[activeTabIndex];

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    onChange && onChange(index);
  };

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.tabsContainer}>
        {tabs.map(({ title }, index) => (
          <button
            key={index}
            className={cx(styles.tabButton, {
              [styles.tabButtonActive]: activeTabIndex === index,
            })}
            onClick={() => handleTabChange(index)}
            type="button"
          >
            {title}
          </button>
        ))}
      </div>
      <div className={cx(styles.content, contentClassName)}>{content}</div>
    </div>
  );
};

Tabs.defaultProps = {
  className: '',
  contentClassName: '',
  onChange: undefined,
};

Tabs.propTypes = {
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func,
};

export default Tabs;
