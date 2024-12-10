import {
  getFieldsFromArray,
  getImageFields,
  getFieldsFromObject,
} from 'api/clientUtils';
import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React, { useState } from 'react';
import Background from '~assets/images/a-background.svg';
import RichText from '~baseComponents/RichText';
import Tabs from '~baseComponents/Tabs/Tabs';
import Content from '~layouts/Content/Content';
import Button from '../Button/Button';
import styles from './TabsSection.module.scss';

const TabsSection = ({ className, tabs, title, button }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const parsedTabs = getFieldsFromArray(tabs);
  const activeImage = getImageFields(tabs[activeIndex].fields.image).url;
  const learnMoreButton = getFieldsFromObject(button);

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.contentWrapper}>
        <Content half>
          <h2 className={styles.title}>{title}</h2>
          <Tabs
            contentClassName={styles.content}
            onChange={setActiveIndex}
            tabs={parsedTabs.map(({ tabName, description }) => ({
              title: tabName,
              content: <RichText content={description} />,
            }))}
          />
          {learnMoreButton && learnMoreButton.url && (
            <Link 
              href={learnMoreButton.url}
              className={styles.cta}
            >
              <Button>{learnMoreButton.label}</Button>
            </Link>
          )}
        </Content>
      </div>
      <div>
        <div className={styles.imageContainer}>
          <Image 
            src={activeImage} 
            layout="fill" 
            objectFit="cover"
            alt={tabs[activeIndex].fields.image?.description || title}
          />
        </div>
        <div className={styles.background}>
          <div className={styles.background__image}>
            <Background />
          </div>
        </div>
      </div>
    </div>
  );
};

TabsSection.defaultProps = {
  className: '',
};

TabsSection.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      tabName: PropTypes.string,
      description: PropTypes.any,
      image: PropTypes.object,
    }),
  })).isRequired,
  title: PropTypes.string.isRequired,
  button: PropTypes.object,
};

export default TabsSection;
