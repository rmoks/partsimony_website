import {
  formatAssetFile,
  getFieldsFromArray,
  getFieldsFromObject,
  getPageFieldsAndSettings,
} from 'api/utils';
import MainLayout from '~layouts/MainLayout';
import Features from '~screens/Features/Features';

const FeaturesPage = ({ settings, page }) => {
  return (
    <MainLayout settings={settings} hidePrefooter={page.hidePrefooter}>
      <Features page={page} />
    </MainLayout>
  );
};

export default FeaturesPage;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageFeatures',
    include: 5,
  });

  const { settings, page } = data;

  const quotesSection = getFieldsFromArray(page?.quotesSection).map((quote) => {
    const author = getFieldsFromObject(quote.author);

    return {
      ...quote,
      author: {
        ...author,
        logo: formatAssetFile(author.logo),
      },
    };
  });

  let evaluateSection = getFieldsFromObject(page?.evaluateSection);
  evaluateSection = {
    ...evaluateSection,
    image: formatAssetFile(evaluateSection.image),
    mainImage: formatAssetFile(evaluateSection.mainImage),
  };

  let uploadSection = getFieldsFromObject(page?.uploadSection);
  uploadSection = {
    ...uploadSection,
    image: formatAssetFile(uploadSection.image),
    mainImage: formatAssetFile(uploadSection.mainImage),
  };

  let routeSection = getFieldsFromObject(page?.routeSection);
  routeSection = {
    ...routeSection,
    image: formatAssetFile(routeSection.image),
    mainImage: formatAssetFile(routeSection.mainImage),
  };

  let strategizeSection = getFieldsFromObject(page?.strategizeSection);
  strategizeSection = {
    ...strategizeSection,
    image: formatAssetFile(strategizeSection.image),
    mainImage: formatAssetFile(strategizeSection.mainImage),
  };

  let manageSection = getFieldsFromObject(page?.manageSection);
  manageSection = {
    ...manageSection,
    image: formatAssetFile(manageSection.image),
    mainImage: formatAssetFile(manageSection.mainImage),
  };

  return {
    props: {
      settings,
      page: {
        ...page,
        hero: getFieldsFromObject(page?.hero),
        quotesSection,
        uploadSection,
        evaluateSection,
        routeSection,
        strategizeSection,
        manageSection,
      },
    },
  };
}
