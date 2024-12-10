import LegalDocument from '~screens/LegalDocument';
import MainLayout from '~layouts/MainLayout';
import { getPageFieldsAndSettings } from '../api/utils';

const PrivacyPolicyPage = ({ settings, page }) => {
  return (
    <MainLayout settings={settings} hidePrefooter>
      <LegalDocument page={page} />
    </MainLayout>
  );
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageLegal',
    'fields.slug': '/privacy-policy',
    include: 5,
    select: ['fields'],
  });
  const { settings, page } = data;

  return {
    props: {
      settings,
      page,
    },
  };
}

export default PrivacyPolicyPage;
