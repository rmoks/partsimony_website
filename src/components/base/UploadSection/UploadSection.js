import Image from 'next/image';
import RichText from '~baseComponents/RichText';
import Content from '~layouts/Content/Content';
import styles from './UploadSection.module.scss';

const UploadSection = ({ title, content, mainImage, image }) => {
  return (
    <div>
      <Content className={styles.container}>
        <Content>
          <p className={styles.title}>{title}</p>
          <RichText className={styles.content} content={content} />
          <div className={styles.image}>
            <Image
              src={image.url}
              width={image.size.width}
              height={image.size.height}
              layout="responsive"
            />
          </div>
        </Content>
        <Content>
          <Image
            src={mainImage.url}
            width={mainImage.size.width}
            height={mainImage.size.height}
            layout="responsive"
          />
        </Content>
      </Content>
    </div>
  );
};

export default UploadSection;
