import React from 'react';
import Image from 'next/image';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './CaseStudy.module.scss';
import { Grid, Row, Col } from '~components/grid';
import Quote, { QuoteTypes } from '~baseComponents/Quote/Quote';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import Content from '~components/layouts/Content/Content';

const CaseStudy = ({
  title,
  logo,
  featured,
  highlights,
  challenge,
  solution,
  quote,
  inverted,
  highlightBackgroundColor,
  highlightTextColor,
}) => {
  return (
    <Content full>
      <Grid
        id={title.replace(' ', '-').toLocaleLowerCase()}
        className={cx(styles.caseStudyWrapper, inverted && styles.inverted)}
      >
        <Row className={styles.imageWrapper}>
          <div className={styles.imageInner}>
            <h2 className={styles.title}>{title}</h2>
            <Col className={styles.header}>
              <div
                className={styles.highlight}
                style={{
                  backgroundColor: highlightBackgroundColor,
                  color: highlightTextColor,
                }}
              >
                <div className={styles.logoContainer}>
                  <Image
                    src={logo.url}
                    objectFit="contain"
                    objectPosition="center left"
                    layout="fill"
                  />
                </div>
                {highlights &&
                  highlights.map((highlight, index) => (
                    <div
                      key={`highlight-${index + 1}`}
                      className={styles.highlightText}
                    >
                      <p>{highlight.title}</p>
                      <small>{highlight.subtitle}</small>
                      {highlight.shortDescription && (
                        <small className={styles.tileDescription}>
                          {highlight.shortDescription}
                        </small>
                      )}
                    </div>
                  ))}
              </div>

              <h2 className={styles.title}>{title}</h2>
              <div className={styles.featuredImage}>
                <Image
                  src={featured.url}
                  objectFit="cover"
                  objectPosition="top center"
                  layout="fill"
                />
              </div>
            </Col>
          </div>
        </Row>
        <Row className={styles.body}>
          <div className={styles.bodyInner}>
            {quote?.content && (
              <Col className={styles.quote} xs={12} md={12} lg={6}>
                <Col xsOffset={0} lg={inverted ? 12 : 12} xs={12}>
                  <Quote {...quote} />
                </Col>
                <div
                  className={cx(styles.quoteBg, {
                    [styles.inverted]: inverted,
                  })}
                />
              </Col>
            )}
            <Col className={styles.data} xs={12} lg={6}>
              <Col lg={12} sm={12}>
                <div>
                  <h3>Challenge</h3>
                  <RichText content={challenge} />
                </div>
                <div>
                  <h3>Solution</h3>
                  <RichText content={solution} />
                </div>
              </Col>
            </Col>
          </div>
        </Row>
      </Grid>
    </Content>
  );
};

CaseStudy.defaultProps = {
  highlightBackgroundColor: '#111827',
  highlightTextColor: '#f9fafb',
  quote: null,
};

CaseStudy.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  featured: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
  ).isRequired,
  highlightBackgroundColor: PropTypes.string,
  highlightTextColor: PropTypes.string,
  challenge: RichTextTypes.isRequired,
  solution: RichTextTypes.isRequired,
  quote: QuoteTypes,
  inverted: PropTypes.bool.isRequired,
};
export default CaseStudy;
