import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import MarkdownRenderer from '~baseComponents/MarkdownRenderer/MarkdownRenderer';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import Content from '~layouts/Content/Content';
import styles from './Header.module.scss';

const Header = ({ title, content, image, centered, spacer }) => {
  const contentBasedOnType =
    typeof content === 'string' ? (
      <MarkdownRenderer className={styles.subtitle}>{content}</MarkdownRenderer>
    ) : (
      <RichText content={content} className={styles.subtitle} />
    );

  return (
    <Content className={cx(styles.content, { [styles.centered]: centered })}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {content ? (
          contentBasedOnType
        ) : (
          <div className={cx({ [styles.spacer]: spacer })} />
        )}
      </div>

      {image && (
        <div className={styles.imageContainer}>
          <Image
            alt="Header"
            src={image}
            className={styles.image}
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
      )}
    </Content>
  );
};

Header.defaultProps = {
  image: null,
  centered: false,
  spacer: true,
  content: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, RichTextTypes]),
  image: PropTypes.string,
  centered: PropTypes.bool,
  spacer: PropTypes.bool,
};

export default Header;
