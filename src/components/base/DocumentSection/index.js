import React from 'react';
import Content from '~layouts/Content/Content';
import styles from './DocumentSection.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

const DocumentSection = ({ content }) => {
  return (
    <div className={styles.wrapper}>
      <Content>
        <RichText className={styles.content} content={content} />
      </Content>
    </div>
  );
};

DocumentSection.propTypes = {
  content: RichTextTypes.isRequired,
};

export default DocumentSection;
