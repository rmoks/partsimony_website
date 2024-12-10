import { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ArrowLeft from '~assets/icons/arrow-left.svg';
import ArrowRight from '~assets/icons/arrow-right.svg';
import styles from './Slider.module.scss';

const ControlButton = ({ onClick, children, light }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cx(styles.controlButton, {
        [styles['controlButton-light']]: light,
      })}
    >
      {children}
    </button>
  );
};

ControlButton.defaultProps = {
  light: false,
};

ControlButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  light: PropTypes.bool,
};

const Slider = ({
  slides,
  activeIndex,
  onChangeIndex,
  reverseControls,
  wrapperClassName,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef();

  const handlePrev = () => {
    sliderRef.current?.splide.go('<');
  };

  const handleNext = () => {
    sliderRef.current?.splide.go('>');
  };

  useEffect(() => {
    setActiveSlide(sliderRef.current?.splide?.index);
    sliderRef.current.go(activeIndex);
  }, [activeSlide, activeIndex]);

  return (
    <div
      className={cx(styles.container, {
        [styles['container-reverse']]: reverseControls,
      })}
    >
      <div className={cx(styles.wrapper, wrapperClassName)}>
        <Splide
          ref={sliderRef}
          options={{
            type: 'loop',
            clones: 2,
            arrows: false,
            pagination: false,
            perPage: 1,
          }}
          onActive={(splide) => {
            if (typeof onChangeIndex === 'function') {
              onChangeIndex(splide.index);
            }
          }}
        >
          {slides.map((slide, index) => (
            <SplideSlide key={`slide-${index}`}>{slide}</SplideSlide>
          ))}
        </Splide>
      </div>
      <div className={styles.controls}>
        <ControlButton onClick={handlePrev} light>
          <ArrowLeft />
        </ControlButton>
        <ControlButton onClick={handleNext}>
          <ArrowRight />
        </ControlButton>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  reverseControls: false,
};

Slider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  reverseControls: PropTypes.bool,
  activeIndex: PropTypes.number.isRequired,
};

export default Slider;
