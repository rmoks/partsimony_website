import cx from 'classnames';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownRenderer.module.scss';

const MarkdownRenderer = ({ children, className, ...props }) => (
  <ReactMarkdown className={cx(styles.container, className)} {...props}>
    {children}
  </ReactMarkdown>
);

MarkdownRenderer.defaultProps = {
  className: '',
};

MarkdownRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MarkdownRenderer;
