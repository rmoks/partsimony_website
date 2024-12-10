import PropTypes from 'prop-types';
import styles from './TileListSection.module.scss';
import Content from '~layouts/Content/Content';
import TileListSectionTile, {
  TileListSectionTileType,
} from '~baseComponents/TileListSectionTile';

const TileListSection = ({ title, image, tiles }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <Content className={styles.content}>
          <div className={styles.title}>{title}</div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.image}
              src={`https://${image.fields.file.url}`}
              width={image.fields.file.details.image.width}
              height={image.fields.file.details.image.height}
              alt=""
            />
          )}
        </Content>
      </div>
      <div className={styles.tilesRow}>
        <Content>
          <div className={styles.tilesContainer}>
            {tiles.map(({ sys: { id }, fields }) => {
              return (
                <TileListSectionTile
                  key={`tile-list-section-${id}`}
                  title={fields.title}
                  description={fields.description}
                  icon={fields.icon}
                />
              );
            })}
          </div>
        </Content>
      </div>
    </div>
  );
};

TileListSection.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
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
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape(TileListSectionTileType),
    }),
  ).isRequired,
};

export default TileListSection;
