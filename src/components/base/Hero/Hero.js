import BicycleMobileImg from 'assets/images/hero/Bicycle-M.png';
import BicycleImg from 'assets/images/hero/Bicycle.png';
import BikeMobileImg from 'assets/images/hero/Bike-M.png';
import BikeImg from 'assets/images/hero/Bike.png';
import MachineMobileImg from 'assets/images/hero/Machine-M.png';
import MachineImg from 'assets/images/hero/Machine.png';
import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Indicator from '~baseComponents/Indicator/Indicator';
import Button from '~baseComponents/Button/Button';
import useIsMobile from '~hooks/useIsMobile';
import Content from '~layouts/Content/Content';
import styles from './Hero.module.scss';

const images = [BicycleImg, BikeImg, MachineImg];
const imagesMobile = [BicycleMobileImg, BikeMobileImg, MachineMobileImg];

const Indicators = ({ activeIndex, onChange, className }) => {
  return (
    <div className={cx(styles.indicators, className)}>
      {new Array(3).fill('').map((_, index) => (
        <Indicator
          key={index}
          active={activeIndex === index}
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
};

Indicators.defaultProps = {
  className: '',
};

Indicators.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const Hero = ({ title, subtitle, btnLabel, btnUrl }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useIsMobile();
  const sliderRef = useRef();

  const changeSlide = (index) => {
    sliderRef.current.go(index);
  };

  useEffect(() => {
    setActiveSlide(sliderRef.current?.splide?.index);
  }, [activeSlide, sliderRef.current?.splide?.index]);

  return (
    <div className={styles.container}>
      <Content className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <a href={btnUrl}>
            <Button light>{btnLabel}</Button>
          </a>
          <Indicators onChange={changeSlide} activeIndex={activeSlide} />
        </div>
        <div className={styles.imageContainer}>
          <Splide
            ref={sliderRef}
            className={styles.slider}
            options={{
              autoHeight: true,
              autoWidth: true,
              type: 'fade',
              arrows: false,
              pagination: false,
            }}
            onPaginationUpdated={(splide) => {
              setActiveSlide(splide.index);
            }}
          >
            {(isMobile ? imagesMobile : images).map(
              ({ src, width, height }, index) => (
                <SplideSlide key={`hero-slide-${index}`}>
                  <div
                    key={`image-${index}`}
                    className={cx(styles.image, [styles[`image-${index}`]])}
                  >
                    <Image
                      layout="fixed"
                      alt="Hero"
                      src={src}
                      width={width / 2}
                      height={height / 2}
                    />
                  </div>
                </SplideSlide>
              ),
            )}
          </Splide>
        </div>
      </Content>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  btnUrl: PropTypes.string.isRequired,
};

export default Hero;
