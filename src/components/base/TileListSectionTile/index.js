import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import styles from './TileListSectionTile.module.scss';

const TileListSectionTile = ({ icon, title, description }) => {
  return (
    <div className={styles.wrapper}>
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.icon}
          src={`https://${icon.fields.file.url}`}
          width={icon.fields.file.details.image.width}
          height={icon.fields.file.details.image.height}
          alt=""
        />
      )}
      <div className={styles.title}>{title}</div>
      <RichText className={styles.description} content={description} />
    </div>
  );
};

export const TileListSectionTileType = {
  icon: PropTypes.shape({
    fields: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
        details: PropTypes.shape({
          image: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
          }),
        }),
      }),
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: RichTextTypes.isRequired,
};

TileListSectionTile.propTypes = TileListSectionTileType;

export default TileListSectionTile;
