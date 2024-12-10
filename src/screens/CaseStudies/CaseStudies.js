import Header from '~baseComponents/Header/Header';
import CaseStudiesSection from './CaseStudiesSection';

const CaseStudies = ({ data }) => {
  const { caseStudies, hero } = data;
  return (
    <div>
      <Header title={hero} content="" spacer={false} />
      <CaseStudiesSection data={caseStudies} />
    </div>
  );
};

export default CaseStudies;
