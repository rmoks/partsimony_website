import HeaderImg from 'assets/images/header.png';
import { useState } from 'react';
import ColumnedSection from '~baseComponents/ColumnedSection/ColumnedSection';
import Header from '~baseComponents/Header/Header';
import Slider from '~baseComponents/Slider/Slider';
import Quote from '~components/base/Quote/Quote';
import Content from '~layouts/Content/Content';
import styles from './Manufacturers.module.scss';
import SimplifyComplexitySection from '~baseComponents/SimplifyComplexitySection/SimplifyComplexitySection';
import ControlledSlider from '~baseComponents/ControlledSlider/ControlledSlider';
import MidpageHeader from '~baseComponents/MidpageHeader';

const Manufacturers = ({ page }) => {
  const {
    hero,
    quotesSection,
    doMoreSection,
    benefitsHeader,
    discoverSection,
    evaluateSection,
    collaborateSection,
    quoteSection,
    manageSection,
    collectSection,
    capabilitiesSection,
  } = page;

  const slides = quotesSection.map(({ content, author }, index) => (
    <Quote
      key={index}
      content={content}
      author={{
        name: author.name,
        position: author.position,
        logo: author.logo.url,
      }}
    />
  ));

  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1 > slides.length - 1 ? 0 : prev + 1));

  return (
    <div>
      <Header
        title={hero.title}
        content={hero.subtitle}
        image={HeaderImg.src}
      />
      <div className={styles.sections}>
        <Content className={styles.quotesSection}>
          <Slider
            activeIndex={activeIndex}
            onPrev={prevSlide}
            onNext={nextSlide}
            slides={slides}
            wrapperClassName={styles.slider}
          />
        </Content>
        <SimplifyComplexitySection {...doMoreSection} />
        <MidpageHeader title={benefitsHeader.title} />
        <ColumnedSection
          title={discoverSection.title}
          content={discoverSection.content}
          image={discoverSection.image.url}
          mainImage={discoverSection.mainImage}
          backgroundPosition={discoverSection.backgroundPosition}
          backgroundColor={discoverSection.backgroundColor}
          reversed={discoverSection.reversed}
          smallGap
        />
        <ColumnedSection
          title={evaluateSection.title}
          content={evaluateSection.content}
          image={evaluateSection.image.url}
          mainImage={evaluateSection.mainImage}
          backgroundPosition={evaluateSection.backgroundPosition}
          backgroundColor={evaluateSection.backgroundColor}
          reversed={evaluateSection.reversed}
        />
        <ColumnedSection
          title={collaborateSection.title}
          content={collaborateSection.content}
          image={collaborateSection.image.url}
          mainImage={collaborateSection.mainImage}
          backgroundPosition={collaborateSection.backgroundPosition}
          backgroundColor={collaborateSection.backgroundColor}
          reversed={collaborateSection.reversed}
        />
        <ColumnedSection
          title={quoteSection.title}
          content={quoteSection.content}
          image={quoteSection.image.url}
          mainImage={quoteSection.mainImage}
          backgroundPosition={quoteSection.backgroundPosition}
          backgroundColor={quoteSection.backgroundColor}
          reversed={quoteSection.reversed}
        />
        <ColumnedSection
          title={manageSection.title}
          content={manageSection.content}
          image={manageSection.image.url}
          mainImage={manageSection.mainImage}
          backgroundPosition={manageSection.backgroundPosition}
          backgroundColor={manageSection.backgroundColor}
          reversed={manageSection.reversed}
          smallGap
        />
        <ColumnedSection
          title={collectSection.title}
          content={collectSection.content}
          image={collectSection.image.url}
          mainImage={collectSection.mainImage}
          backgroundPosition={collectSection.backgroundPosition}
          backgroundColor={collectSection.backgroundColor}
          reversed={collectSection.reversed}
        />
        <ControlledSlider {...capabilitiesSection} />
      </div>
    </div>
  );
};

export default Manufacturers;
