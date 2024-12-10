import React, { useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import Link from 'next/link';
import Button from '~baseComponents/Button/Button';
import styles from './StartupsSection.module.scss';
import Content from '~layouts/Content/Content';

const StartupTile = ({
  title,
  subtitle,
  shortDescription = '',
  logo,
  color,
  backgroundColor,
  hoverBackgroundColor,
  onHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((prev) => !prev);
    onHover();
  };
  const handleMouseEnter = () => {
    handleHover();
    onHover();
  };
  const handleMouseLeave = handleHover;

  return (
    <div
      className={styles.tile}
      style={{
        backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.logo}>
        <Image
          src={logo.url}
          layout="fill"
          objectFit="contain"
          objectPosition="center left"
          alt={title}
        />
      </div>

      <div style={{ color }}>
        <p className={styles.tileTitle}>{title}</p>
        <p className={styles.tileSubtitle}>{subtitle}</p>
        <p className={styles.tileDescription}>{shortDescription}</p>
      </div>
    </div>
  );
};

const StartupsSection = ({
  title,
  description,
  descriptionButton,
  entries,
}) => {
  const [activeItem, setActiveItem] = useState(3);

  const onHover = (index) => {
    setActiveItem(index);
  };

  return (
    <div className={styles.container}>
      <Content className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.imageWrapper}>
          {entries.map(({ image }, index) => (
            <Image
              key={`startup-image${index}`}
              src={image.url}
              layout="fill"
              objectFit="cover"
              alt={image.description || `Startup image ${index + 1}`}
              className={cx(styles.image, {
                [styles.visible]: activeItem === index,
              })}
            />
          ))}
        </div>

        <div className={styles.companies}>
          {entries.map(
            (
              {
                name,
                logo,
                subtitle,
                title: tileTitle,
                shortDescription,
                color,
                backgroundColor,
                hoverBackgroundColor,
              },
              index,
            ) => (
              <StartupTile
                key={index}
                index={index}
                name={name}
                logo={logo}
                subtitle={subtitle}
                title={tileTitle}
                shortDescription={shortDescription}
                color={color}
                backgroundColor={backgroundColor}
                hoverBackgroundColor={hoverBackgroundColor}
                onHover={() => onHover(index)}
              />
            ),
          )}
        </div>
      </Content>

      <Content className={styles.footer}>
        <p className={styles.footerTitle}>{description}</p>
        <Link 
          href={descriptionButton.url}
          className={styles.buttonLink}
        >
          <Button light>{descriptionButton.label}</Button>
        </Link>
      </Content>
    </div>
  );
};

export default StartupsSection;
