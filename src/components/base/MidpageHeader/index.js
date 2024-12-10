import Content from '~layouts/Content/Content';
import styles from './MidpageHeader.module.scss';

const MidpageHeader = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <Content>
        <h3 className={styles.title}>{title}</h3>
      </Content>
    </div>
  );
};

export default MidpageHeader;
