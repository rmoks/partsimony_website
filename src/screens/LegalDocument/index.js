import PropTypes from 'prop-types';
import Header from '~baseComponents/Header/Header';
import DocumentSection from '~baseComponents/DocumentSection';
import { RichTextTypes } from '~baseComponents/RichText';

const LegalDocument = ({ page }) => {
  return (
    <div>
      <Header centered title={page.title} content={page.subtitle} />
      <DocumentSection content={page.body} />
    </div>
  );
};

LegalDocument.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    body: RichTextTypes.isRequired,
  }).isRequired,
};

export default LegalDocument;
