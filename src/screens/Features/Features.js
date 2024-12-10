import HeaderImg from 'assets/images/header.png';
import { useState } from 'react';
import ColumnedSection from '~baseComponents/ColumnedSection/ColumnedSection';
import Header from '~baseComponents/Header/Header';
import Slider from '~baseComponents/Slider/Slider';
import TileListSection from '~baseComponents/TileListSection';
import UploadSection from '~baseComponents/UploadSection/UploadSection';
import Quote from '~components/base/Quote/Quote';
import Content from '~layouts/Content/Content';
import styles from './Features.module.scss';

const Features = ({ page }) => {
  const {
    hero,
    quotesSection,
    uploadSection,
    evaluateSection,
    routeSection,
    strategizeSection,
    manageSection,
    collaborateSection,
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
        <UploadSection
          title={uploadSection.title}
          content={uploadSection.content}
          image={uploadSection.image}
          mainImage={uploadSection.mainImage}
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
          title={routeSection.title}
          content={routeSection.content}
          image={routeSection.image.url}
          mainImage={routeSection.mainImage}
          backgroundPosition={routeSection.backgroundPosition}
          backgroundColor={routeSection.backgroundColor}
          reversed={routeSection.reversed}
        />
        <ColumnedSection
          title={strategizeSection.title}
          content={strategizeSection.content}
          image={strategizeSection.image.url}
          mainImage={strategizeSection.mainImage}
          backgroundPosition={strategizeSection.backgroundPosition}
          backgroundColor={strategizeSection.backgroundColor}
          reversed={strategizeSection.reversed}
        />
        <ColumnedSection
          title={manageSection.title}
          content={manageSection.content}
          image={manageSection.image.url}
          mainImage={manageSection.mainImage}
          backgroundPosition={manageSection.backgroundPosition}
          backgroundColor={manageSection.backgroundColor}
          reversed={manageSection.reversed}
        />
        {/* <ColumnedSection
          title="2. Evaluate"
          content={`
Once processed, our intelligent algorithm automatically generates proposals for most designs.

Some designs receive recommendations on manufacturing methods, material selection, price estimates, and lead time.`}
          image={CheckMarkImg.src}
          mainImage={SamplePreviewImg.src}
          backgroundPosition="halfRight"
          backgroundColor="blue"
        />
        <ColumnedSection
          title="3. Route"
          content={`
We then identify optimal manufacturerss for each component — both within and outside of your network — and even batch components to achieve volume discounts and negotiation leverage.

RFP links can be easily shared with manufacturers, even if they don’t use Partsimony.`}
          image={CheckMarkImg.src}
          mainImage={SamplePreviewImg.src}
          backgroundPosition="left"
          backgroundColor="lightGrey"
        />
        <ColumnedSection
          title="4. Strategize"
          content={`
Leverage real-time insights to discover the supply chain network that best meets your goals.

Initiate purchase orders for thousands of components across various manufacturers with a single click.

Gain deep visibility across your supply chain footprint.`}
          image={CheckMarkImg.src}
          mainImage={SamplePreviewImg.src}
          backgroundPosition="halfLeft"
          backgroundColor="darkBlue"
          reversed
        />
        <ColumnedSection
          title="5. Manage"
          content={`
Receive automatic notifications of potential production risks to mitigate disruptions.

Keep your entire supply chain updated throughout the process to avoid bottlenecks.

Break down silos and provide organizational visibility into status changes of production schedules.`}
          image={CheckMarkImg.src}
          mainImage={SamplePreviewImg.src}
          backgroundPosition="halfRight"
          backgroundColor="lightGrey"
        />
      /> */}
        <TileListSection
          title={collaborateSection.fields.title}
          image={collaborateSection.fields.image}
          tiles={collaborateSection.fields.tiles}
        />
      </div>
    </div>
  );
};

export default Features;
