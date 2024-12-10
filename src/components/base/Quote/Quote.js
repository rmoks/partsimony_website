import Image from 'next/image';
import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '../RichText';
import styles from './Quote.module.scss';

const Quote = ({ content, author: { name, position, logo } }) => {
  return (
    <div className={styles.container}>
      {typeof content === 'string' ? (
        <p className={styles.content}>{`"${content}"`}</p>
      ) : (
        <RichText className={styles.content} content={content} />
      )}

      <div className={styles.details}>
        <div className={styles.authorData}>
          <p className={styles.name}>
            {'— '}
            {name}
          </p>
          {position && <p className={styles.position}>{position}</p>}
        </div>

        {logo && (
          <div className={styles.imageContainer}>
            <div>
              <Image
                layout="fill"
                src={logo}
                alt={name}
                objectFit="contain"
                objectPosition="right"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const QuoteTypes = PropTypes.shape({
  content: PropTypes.oneOfType([PropTypes.string, RichTextTypes]).isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
});

Quote.propTypes = QuoteTypes.isRequired;

export default Quote;
