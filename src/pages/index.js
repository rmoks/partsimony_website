import {
  formatAssetFile,
  getFieldsFromArray,
  getFieldsFromObject,
  getPageFieldsAndSettings,
} from 'api/utils';
import MainLayout from '~layouts/MainLayout';
import Home from '~screens/home/Home';

const IndexPage = ({ settings, page }) => {
  return (
    <MainLayout settings={settings} hidePrefooter={page.hidePrefooter}>
      <Home data={page} />
    </MainLayout>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageHome',
    include: 5,
    select: ['fields'],
  });

  const { settings, page } = data;

  let capabilitiesSection = getFieldsFromObject(page.capabilitiesSection);
  capabilitiesSection = {
    ...capabilitiesSection,
    tabs: getFieldsFromArray(capabilitiesSection.tabs).map((tab) => ({
      ...tab,
      icon: formatAssetFile(tab.icon),
      image: formatAssetFile(tab.image),
    })),
  };

  const hero = getFieldsFromObject(page.hero);
  hero.btnLabel = hero.buttonLabel;
  hero.btnUrl = hero.buttonUrl;

  let complexitySimplifiedSection = getFieldsFromObject(
    page.complexitySimplifiedSection,
  );
  complexitySimplifiedSection = {
    ...complexitySimplifiedSection,
    image: formatAssetFile(complexitySimplifiedSection.image),
  };

  let startupsSection = getFieldsFromObject(page.startupsSection);
  startupsSection = {
    ...startupsSection,
    descriptionButton: getFieldsFromObject(startupsSection.descriptionButton),
    entries: getFieldsFromArray(startupsSection.entries).map((entry) => ({
      ...entry,
      logo: formatAssetFile(entry.logo),
      image: formatAssetFile(entry.image),
    })),
  };

  return {
    props: {
      settings,
      page: {
        ...page,
        hero,
        complexitySimplifiedSection,
        capabilitiesSection,
        startupsSection,
      },
    },
  };
}
