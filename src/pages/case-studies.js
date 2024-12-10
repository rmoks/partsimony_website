/* eslint-disable no-param-reassign */
import {
  formatAssetFile,
  getFieldsFromArray,
  getFieldsFromObject,
  getPageFieldsAndSettings,
} from 'api/utils';
import CaseStudies from '~screens/CaseStudies/CaseStudies';

import MainLayout from '~layouts/MainLayout';

const CaseStudiesPage = ({ page, settings }) => (
  <MainLayout settings={settings} hidePrefooter={page.hidePrefooter}>
    <CaseStudies data={page} />
  </MainLayout>
);
export default CaseStudiesPage;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageCaseStudies',
    include: 5,
    select: ['fields'],
  });

  const { settings, page } = data;

  let caseStudies = page.caseStudies.map((caseStudy) =>
    getFieldsFromObject(caseStudy),
  );

  caseStudies = caseStudies.map((caseStudy) => {
    if (caseStudy?.quote) {
      caseStudy.quote = getFieldsFromObject(caseStudy.quote);
      if (caseStudy.quote?.author) {
        caseStudy.quote.author = getFieldsFromObject(caseStudy.quote.author);
        caseStudy.quote.author.logo = null;
      }
    }
    return {
      ...caseStudy,
      featured: formatAssetFile(caseStudy.featured),
      logo: formatAssetFile(caseStudy.logo),
      highlights: getFieldsFromArray(caseStudy.highlights),
    };
  });

  return {
    props: {
      settings,
      page: {
        ...page,
        caseStudies,
      },
    },
  };
}
