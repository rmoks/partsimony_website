import CloseIcon from 'assets/icons/close.svg';
import MenuIcon from 'assets/icons/hamburger.svg';
import LogoLight from 'assets/icons/logo-light.svg';
import Logo from 'assets/icons/logo.svg';
import AngelIcon from 'assets/icons/socials/angel.svg';
import FacebookIcon from 'assets/icons/socials/facebook.svg';
import InstagramIcon from 'assets/icons/socials/instagram.svg';
import LinkedinIcon from 'assets/icons/socials/linkedin.svg';
import MediumIcon from 'assets/icons/socials/medium.svg';
import TwitterIcon from 'assets/icons/socials/twitter.svg';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '~baseComponents/Button/Button';
import Container from '~layouts/Container/Container';
import styles from './Header.module.scss';

const MobileMenu = ({ handleClose, open, socials, children }) => {
  const socialData = [
    { link: socials?.angelUrl, icon: AngelIcon },
    { link: socials?.mediumUrl, icon: MediumIcon },
    { link: socials?.twitterUrl, icon: TwitterIcon },
    { link: socials?.instagramUrl, icon: InstagramIcon },
    { link: socials?.linkedinUrl, icon: LinkedinIcon },
    { link: socials?.facebookUrl, icon: FacebookIcon },
  ];
  return (
    <div
      className={cx(styles.mobileMenu, { [styles['mobileMenu-open']]: open })}
    >
      <div className={styles['mobileMenu-header']}>
        <Link href="/" className={styles.logo}>
          <LogoLight />
        </Link>
        <CloseIcon
          className={styles['menuIcon--close']}
          onClick={handleClose}
        />
      </div>

      {children}

      <div className={styles.socialsContainer}>
        {socialData.map(({ icon: Icon, link }, index) => (
          link && (
            <a 
              key={index}
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <Icon />
            </a>
          )
        ))}
      </div>
    </div>
  );
};

export const SocialsType = PropTypes.shape({
  angelUrl: PropTypes.string,
  mediumUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  instagramUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
});

MobileMenu.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  socials: SocialsType.isRequired,
};

const Header = ({ menu, socials, loginLink, isSticky }) => {
  const { asPath } = useRouter();
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  useEffect(handleMenuClose, [pathname]);

  const LogoVariant = isSticky ? Logo : LogoLight;

  return (
    <header
      className={cx(styles.header, { [styles['header--sticky']]: isSticky })}
    >
      <Container>
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <LogoVariant />
          </Link>
          <MenuIcon className={styles.menuIcon} onClick={handleMenuOpen} />
          <MobileMenu
            handleClose={handleMenuClose}
            open={isMenuOpen}
            socials={socials}
          >
            <nav>
              <ul className={styles.links}>
                {!!menu?.length &&
                  menu.map(({ label, url }, index) => (
                    <li key={index}>
                      {url.startsWith('http') ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cx(styles.link)}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link 
                          href={url}
                          className={cx(styles.link, {
                            [styles['link-active']]: asPath === url,
                          })}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                <li>
                  <Link 
                    href={loginLink} 
                    className={styles.buttonLink}
                  >
                    <Button light className={styles.button}>
                      Login
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </MobileMenu>
        </div>
      </Container>
    </header>
  );
};

export const MenuType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    url: PropTypes.string,
  }),
);

Header.propTypes = {
  menu: MenuType.isRequired,
  loginLink: PropTypes.string.isRequired,
  socials: SocialsType.isRequired,
  isSticky: PropTypes.bool.isRequired,
};

export default Header;
