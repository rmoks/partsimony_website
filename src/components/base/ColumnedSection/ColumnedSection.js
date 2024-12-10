import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import useIsMobile from '~hooks/useIsMobile';
import Content from '~layouts/Content/Content';
import RichText, { RichTextTypes } from '../RichText';
import styles from './ColumnedSection.module.scss';

const ColumnedSection = ({
  title,
  content,
  mainImage,
  image,
  reversed,
  backgroundPosition,
  backgroundColor,
  smallGap,
}) => {
  const isMobile = useIsMobile();

  const backgroundPositionClass = {
    halfRight: styles['background--halfRight'],
    halfLeft: styles['background--halfLeft'],
    left: styles['background--left'],
  };

  const backgroundColorClass = {
    darkBlue: styles['background--darkBlue'],
    blue: styles['background--blue'],
    lightGrey: styles['background--lightGrey'],
  };

  const hasBackground = backgroundPosition && backgroundColor;

  return (
    <div>
      <Content className={cx(styles.root, { [styles.smallGap]: smallGap })}>
        <Content className={styles.previewContainer}>
          <Image
            src={mainImage.url}
            width={mainImage.size.width}
            height={mainImage.size.height}
            layout="responsive"
          />
        </Content>

        <Content
          className={cx(styles.container, {
            [styles['container--reversed']]: reversed,
          })}
        >
          <div className={styles.contentContainer}>
            <p className={styles.title}>{title}</p>
            <RichText className={styles.content} content={content} />

            {!isMobile && hasBackground && (
              <div
                className={cx(
                  styles.background,
                  backgroundPositionClass[backgroundPosition],
                  backgroundColorClass[backgroundColor],
                )}
              />
            )}
          </div>
          <Content half className={styles.imageContainer}>
            {isMobile && hasBackground && (
              <div
                className={cx(
                  styles.background,
                  backgroundPositionClass[backgroundPosition],
                  backgroundColorClass[backgroundColor],
                )}
              />
            )}
            <Image src={image} layout="fill" objectFit="contain" />
          </Content>
        </Content>
      </Content>
    </div>
  );
};

ColumnedSection.defaultProps = {
  reversed: false,
  backgroundPosition: undefined,
  backgroundColor: undefined,
  smallGap: false,
};

ColumnedSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: RichTextTypes.isRequired,
  image: PropTypes.string.isRequired,
  mainImage: PropTypes.shape({
    contentType: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }).isRequired,
  }).isRequired,
  reversed: PropTypes.bool,
  smallGap: PropTypes.bool,
  backgroundPosition: PropTypes.oneOf(['halfRight', 'halfLeft', 'left']),
  backgroundColor: PropTypes.oneOf(['darkBlue', 'blue', 'lightGrey']),
};

export default ColumnedSection;
