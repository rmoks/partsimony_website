import { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import styles from './CaseStudiesSection.module.scss';
import useIsMobile from '~hooks/useIsMobile';
import { Grid, Row, Col } from '~components/grid';
import CaseStudy from '~components/base/CaseStudy/CaseStudy';
import Content from '~components/layouts/Content/Content';

const CaseStudiesSection = ({ data }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedSubNavIndex, setSelectedSubNavIndex] = useState(0);
  const pageContainer = useRef(null);

  useEffect(() => {
    const caseStudiesOffsetTop = data.map(
      (caseStudy) =>
        document
          .getElementById(caseStudy.title.replace(' ', '-').toLocaleLowerCase())
          .getBoundingClientRect().top +
        window.pageYOffset -
        150,
    );

    const handleScroll = () => {
      if (!pageContainer.current) {
        return;
      }

      caseStudiesOffsetTop.forEach((offset, index) => {
        if (window.scrollY > offset) {
          setSelectedSubNavIndex(index);
        }
      });

      if (window.scrollY > pageContainer.current.offsetTop - 93) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  const isMobile = useIsMobile();

  const jumpToSection = (e, caseStudy) => {
    const elm = document.getElementById(
      caseStudy.title.replace(' ', '-').toLocaleLowerCase(),
    );
    e.preventDefault();
    const scrollAmount =
      elm?.getBoundingClientRect().top + window.pageYOffset - 140;
    window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
  };
  return (
    <div
      ref={pageContainer}
      className={cx(styles.container, isSticky && styles.fixed)}
    >
      <Grid className={styles.secondaryNav}>
        <Row>
          <Col className={styles.secondaryNavCol} xs={12} md={12}>
            <Content>
              <ul>
                {data.map((caseStudy, index) => (
                  <li
                    key={`submenu-item-${index}`}
                    className={cx(
                      selectedSubNavIndex === index && styles.active,
                    )}
                  >
                    <a
                      onClick={(e) => jumpToSection(e, caseStudy, index)}
                      href={`#${caseStudy.title
                        .replace(' ', '-')
                        .toLocaleLowerCase()}`}
                    >
                      {caseStudy.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Content>
          </Col>
        </Row>
      </Grid>
      <div>
        {data.map((caseStudy, index) => (
          <CaseStudy
            key={`case-study-${index}`}
            {...caseStudy}
            inverted={!isMobile ? index % 2 === 0 : false}
          />
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesSection;
