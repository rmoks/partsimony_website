import {
  formatAssetFile,
  getFieldsFromArray,
  getFieldsFromObject,
  getPageFieldsAndSettings,
} from 'api/utils';
import MainLayout from '~layouts/MainLayout';
import Manufacturers from '~screens/Manufacturers/Manufacturers';

const ManufacturersPage = ({ settings, page }) => {
  return (
    <MainLayout settings={settings} hidePrefooter={page.hidePrefooter}>
      <Manufacturers page={page} />
    </MainLayout>
  );
};

export default ManufacturersPage;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageManufacturers',
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

  let doMoreSection = getFieldsFromObject(page.doMoreSection);
  doMoreSection = {
    ...doMoreSection,
    image: formatAssetFile(doMoreSection.image),
  };

  let benefitsHeader = getFieldsFromObject(page.benefitsHeader);
  benefitsHeader = {
    ...benefitsHeader,
  };

  let discoverSection = getFieldsFromObject(page?.discoverSection);
  discoverSection = {
    ...discoverSection,
    image: formatAssetFile(discoverSection.image),
    mainImage: formatAssetFile(discoverSection.mainImage),
  };

  let evaluateSection = getFieldsFromObject(page?.evaluateSection);
  evaluateSection = {
    ...evaluateSection,
    image: formatAssetFile(evaluateSection.image),
    mainImage: formatAssetFile(evaluateSection.mainImage),
  };

  let collaborateSection = getFieldsFromObject(page?.collaborateSection);
  collaborateSection = {
    ...collaborateSection,
    image: formatAssetFile(collaborateSection.image),
    mainImage: formatAssetFile(collaborateSection.mainImage),
  };

  let quoteSection = getFieldsFromObject(page?.quoteSection);
  quoteSection = {
    ...quoteSection,
    image: formatAssetFile(quoteSection.image),
    mainImage: formatAssetFile(quoteSection.mainImage),
  };

  let manageSection = getFieldsFromObject(page?.manageSection);
  manageSection = {
    ...manageSection,
    image: formatAssetFile(manageSection.image),
    mainImage: formatAssetFile(manageSection.mainImage),
  };

  let collectSection = getFieldsFromObject(page?.collectSection);
  collectSection = {
    ...collectSection,
    image: formatAssetFile(collectSection.image),
    mainImage: formatAssetFile(collectSection.mainImage),
  };

  let capabilitiesSection = getFieldsFromObject(page.capabilitiesSection);
  capabilitiesSection = {
    ...capabilitiesSection,
    tabs: getFieldsFromArray(capabilitiesSection.tabs).map((tab) => ({
      ...tab,
      icon: formatAssetFile(tab.icon),
      image: formatAssetFile(tab.image),
    })),
  };

  // let evaluateSection = getFieldsFromObject(page?.evaluateSection);
  // evaluateSection = {
  //   ...evaluateSection,
  //   image: formatAssetFile(evaluateSection.image),
  //   mainImage: formatAssetFile(evaluateSection.mainImage),
  // };
  //

  // let evaluateSection = getFieldsFromObject(page?.evaluateSection);
  // evaluateSection = {
  //   ...evaluateSection,
  //   image: formatAssetFile(evaluateSection.image),
  //   mainImage: formatAssetFile(evaluateSection.mainImage),
  // };
  //
  // let uploadSection = getFieldsFromObject(page?.uploadSection);
  // uploadSection = {
  //   ...uploadSection,
  //   image: formatAssetFile(uploadSection.image),
  //   mainImage: formatAssetFile(uploadSection.mainImage),
  // };
  //
  // let routeSection = getFieldsFromObject(page?.routeSection);
  // routeSection = {
  //   ...routeSection,
  //   image: formatAssetFile(routeSection.image),
  //   mainImage: formatAssetFile(routeSection.mainImage),
  // };
  //
  // let strategizeSection = getFieldsFromObject(page?.strategizeSection);
  // strategizeSection = {
  //   ...strategizeSection,
  //   image: formatAssetFile(strategizeSection.image),
  //   mainImage: formatAssetFile(strategizeSection.mainImage),
  // };
  //
  // let manageSection = getFieldsFromObject(page?.manageSection);
  // manageSection = {
  //   ...manageSection,
  //   image: formatAssetFile(manageSection.image),
  //   mainImage: formatAssetFile(manageSection.mainImage),
  // };

  return {
    props: {
      settings,
      page: {
        ...page,
        hero: getFieldsFromObject(page?.hero),
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
      },
    },
  };
}
