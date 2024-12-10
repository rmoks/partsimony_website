import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import Button from '~baseComponents/Button/Button';
import Content from '~layouts/Content/Content';
import styles from './Prefooter.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

const Prefooter = ({ title, content, image, buttons }) => {
  return (
    <div className={styles.container}>
      <Content className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        {content && <RichText content={content} />}
        {buttons && (
          <div className={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <Link
                key={`button-prefooter-${index}`}
                href={button.url}
                className={styles.buttonLink}
              >
                <Button>{button.label}</Button>
              </Link>
            ))}
          </div>
        )}
      </Content>
      {image.url && (
        <div className={styles.imageContainer}>
          <Image
            src={image.url}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            alt={image.description || title}
          />
        </div>
      )}
    </div>
  );
};

const imagePropTypes = PropTypes.shape({
  contentType: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
});

Prefooter.defaultProps = { image: {} };

Prefooter.propTypes = {
  title: PropTypes.string.isRequired,
  content: RichTextTypes.isRequired,
  image: imagePropTypes,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Prefooter;
