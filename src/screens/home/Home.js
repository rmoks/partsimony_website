// import { useState } from 'react';
import ControlledSlider from '~baseComponents/ControlledSlider/ControlledSlider';
import Hero from '~baseComponents/Hero/Hero';
import SimplifyComplexitySection from '~baseComponents/SimplifyComplexitySection/SimplifyComplexitySection';
import StartupsSection from '~baseComponents/StartupsSection/StartupsSection';
import TabsSection from '~baseComponents/TabsSection/TabsSection';

const Home = ({ data }) => {
  // const [activeIndex, setActiveIndex] = useState(0);

  // const prevSlide = () =>
  //   setActiveIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  // const nextSlide = () =>
  //   setActiveIndex((prev) => (prev + 1 > slides.length - 1 ? 0 : prev + 1));

  const {
    keyFeaturesSection,
    capabilitiesSection,
    complexitySimplifiedSection,
    startupsSection,
    hero,
  } = data;

  return (
    <div>
      <Hero {...hero} />
      <StartupsSection {...startupsSection} />
      <SimplifyComplexitySection {...complexitySimplifiedSection} />
      <TabsSection {...keyFeaturesSection.fields} />

      <ControlledSlider {...capabilitiesSection} />
      {/* <TabsSection />
      <ControlledSlider />
      <Content>
        <Slider
          activeIndex={activeIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
          slides={slides}
        />
      </Content>
      */}
    </div>
  );
};

export default Home;
