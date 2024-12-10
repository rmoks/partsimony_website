import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import Background from '~assets/images/complexity-bg.svg';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import Content from '~layouts/Content/Content';
import styles from './SimplifyComplexitySection.module.scss';

const SimplifyComplexitySection = ({ title, content, image }) => {
  return (
    <div className={styles.container}>
      <Content>
        <h2 className={styles.title}>{title}</h2>
        <RichText className={styles.description} content={content} />
      </Content>

      <Content className={styles.imagesWrapper}>
        <div className={styles.imageContainer}>
          <Image src={image.url} layout="fill" objectFit="cover" />
          <div className={styles.backgroundContainer}>
            <Background className={styles.background} />
          </div>
        </div>

        <div className={styles.desktopContent}>
          <RichText
            className={cx(styles.description, styles.desktopDescription)}
            content={content}
          />
          <div
            className={cx(
              styles.backgroundContainer,
              styles.desktopBackgroundContainer,
            )}
          >
            <Background className={styles.background} />
          </div>
        </div>
      </Content>
    </div>
  );
};

SimplifyComplexitySection.propTypes = {
  title: PropTypes.string.isRequired,
  content: RichTextTypes.isRequired,
  image: PropTypes.shape({
    contentType: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default SimplifyComplexitySection;
