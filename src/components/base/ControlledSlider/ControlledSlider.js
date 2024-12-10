/* eslint-disable jsx-a11y/alt-text */
import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RichText from '~baseComponents/RichText';
import Slider from '~baseComponents/Slider/Slider';
import useIsMobile from '~hooks/useIsMobile';
import Content from '~layouts/Content/Content';
import styles from './ControlledSlider.module.scss';

const IconControl = ({ onClick, children, active }) => {
  return (
    <div
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
      className={cx(styles.iconControl, {
        [styles['iconControl-active']]: active,
      })}
    >
      {children}
    </div>
  );
};

IconControl.defaultProps = {
  active: false,
};

IconControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

const ControlledSlider = ({ title, tabs, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile(992);

  const slides = tabs.map(({ image, title: slideTitle }, index) => (
    <div className={styles.imageContainer} key={index}>
      <Image src={image.url} layout="fill" objectFit="cover" alt={slideTitle} />
    </div>
  ));

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1 > slides.length - 1 ? 0 : prev + 1));

  const changeIndex = (index) => setActiveIndex(index);

  return (
    <div className={cx(styles.container, className)}>
      <div>
        {/* <div className={styles.imageContainer}>
          <Image src={activeImage.src} layout="fill" objectFit="cover" />
        </div> */}
        <Slider
          activeIndex={activeIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
          slides={slides}
          reverseControls={!isMobile}
          onChangeIndex={changeIndex}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Content half className={styles.sliderNav}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.iconsContainer}>
            {tabs.map(({ icon, title: iconTitle }, index) => (
              <IconControl
                onClick={() => setActiveIndex(index)}
                key={index}
                active={activeIndex === index}
              >
                <div className={styles.tooltip}>
                  <span className={styles.arrow} />
                  {iconTitle}
                </div>

                <Image src={icon.url} layout="fill" objectFit="contain" />
              </IconControl>
            ))}
          </div>

          <div className={styles.content}>
            <p className={styles.contentTitle}>{tabs[activeIndex].title}</p>
            <RichText
              className={styles.contentText}
              content={tabs[activeIndex].description}
            />
          </div>
        </Content>
      </div>
    </div>
  );
};

ControlledSlider.defaultProps = {
  className: '',
};

ControlledSlider.propTypes = {
  className: PropTypes.string,
};

export default ControlledSlider;
