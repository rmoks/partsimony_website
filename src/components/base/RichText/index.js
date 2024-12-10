/* eslint-disable jsx-a11y/media-has-caption */
import cx from 'classnames';
import _get from 'lodash/get';
import { string, shape, arrayOf } from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import styles from './RichText.module.scss';

function addHttps(url) {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    return `https:${url}`;
  }
  return url;
}

function embedAsset(node, assetStyle = '') {
  const { title, description, file } = node.data.target.fields;
  const mimeType = file.contentType;
  const mimeGroup = mimeType.split('/')[0];
  switch (mimeGroup) {
    case 'video':
      return (
        <span className={cx(assetStyle, styles.component)}>
          <video className={styles.video}>
            <source src={addHttps(file.url)} type="video/mp4" />
          </video>
          {description && <p className={styles.subtitle}>{description}</p>}
        </span>
      );
    case 'image':
      return (
        <span className={cx(assetStyle, styles.component)}>
          <Image
            src={addHttps(file.url)}
            alt={title || description || 'Content image'}
            layout="responsive"
            width={file.details.image.width}
            height={file.details.image.height}
          />
          {description && <p className={styles.subtitle}>{description}</p>}
        </span>
      );
    case 'application':
      return (
        <a href={file.url} target="_blank" rel="noopener noreferrer">
          {title || file.details.fileName}
        </a>
      );
    default:
      return null;
  }
}

const BlockEntry = ({ node, ...props }) => {
  const images = _get(node, 'data.target.fields.images', []);
  if (images.length) {
    return (
      <div {...props}>
        {images.map((image, index) => (
          <span key={`image-${index}`}>
            <Image
              objectFit="cover"
              src={addHttps(image.fields.file.url)}
              alt={image.fields.title || 'Content image'}
              layout="responsive"
              width={image.fields.file.details.image.width}
              height={image.fields.file.details.image.height}
            />
          </span>
        ))}
      </div>
    );
  }
  if (process.env.NODE_ENV !== 'production') {
    console.warn(node.nodeType, 'type not implemented at Rich Text component');
  }
  return null;
};

const RichText = ({
  content,
  className,
  h1Style,
  pStyle,
  h2Style,
  h3Style,
  h4Style,
  h5Style,
  h6Style,
  aStyle,
  hrStyle,
  headingStyle,
  blockquoteStyle,
  imageStyle,
  blockEntryStyle,
}) => {
  const style = cx(className);

  const options = {
    renderNode: {
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={blockquoteStyle}>{children}</blockquote>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={pStyle}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={h1Style ?? headingStyle}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={h2Style ?? headingStyle}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={h3Style ?? headingStyle}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={h4Style ?? headingStyle}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={h5Style ?? headingStyle}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={h6Style ?? headingStyle}>{children}</h6>
      ),
      [BLOCKS.HR]: () => <hr className={hrStyle} />,
      [INLINES.HYPERLINK]: (node, children) => {
        const isExternal = node.data.uri.startsWith('http');
        return isExternal ? (
          <a 
            href={node.data.uri}
            className={aStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ) : (
          <Link 
            href={node.data.uri}
            className={aStyle}
          >
            {children}
          </Link>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <BlockEntry node={node} className={blockEntryStyle} />
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => embedAsset(node, imageStyle),
    },
    renderText: (text) => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [
          ...children,
          index > 0 && <br key={`br-${index}`} />,
          textSegment,
        ];
      }, []);
    },
  };

  return content ? (
    <div className={cx(styles.defaultStyles, style)}>
      {documentToReactComponents(content, options)}
    </div>
  ) : null;
};

export default RichText;

RichText.defaultProps = {
  pStyle: '',
  headingStyle: '',
  h1Style: '',
  h2Style: '',
  h3Style: '',
  h4Style: '',
  h5Style: '',
  h6Style: '',
  hrStyle: '',
  aStyle: '',
  imageStyle: '',
  blockquoteStyle: '',
  blockEntryStyle: '',
  className: '',
};

export const RichTextTypes = shape({
  nodeType: string,
  data: shape({}),
  content: arrayOf(shape({})),
});

BlockEntry.propTypes = {
  node: RichTextTypes.isRequired,
};

RichText.propTypes = {
  content: RichTextTypes.isRequired,
  blockquoteStyle: string,
  pStyle: string,
  h1Style: string,
  h2Style: string,
  h3Style: string,
  h4Style: string,
  h5Style: string,
  headingStyle: string,
  h6Style: string,
  hrStyle: string,
  aStyle: string,
  blockEntryStyle: string,
  imageStyle: string,
  className: string,
};
