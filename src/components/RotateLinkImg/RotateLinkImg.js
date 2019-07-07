import React from 'react';
import PropTypes from 'prop-types';

import './RotateLinkImg.css';

function RotateLinkImg({ href, size, src, ...restProps }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="rotate-icon" {...restProps}>
      <img src={src} alt="RotateLinkImg-icon" width={size} height={size} role="presentation" />
    </a>
  );
}

RotateLinkImg.propTypes = {
  src: PropTypes.string.isRequired,
  href: PropTypes.string,
  size: PropTypes.number,
};

RotateLinkImg.defaultProps = {
  href: null,
  size: 24,
};

export default RotateLinkImg;
