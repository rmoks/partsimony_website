import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Policy.module.scss';

const Policy = ({ links }) => (
  <div className={styles.policy}>
    {links?.map((link, index) => (
      <Link 
        key={index}
        href={link.url}
        className={styles.link}
      >
        {link.label}
      </Link>
    ))}
  </div>
);

Policy.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default Policy;