import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import './LinkLetter.css';

function LinkLetter({ href, children, ...restProps }) {
  return (
    <Link className="lang-icon" to={href} {...restProps}>
      {children}
    </Link>
  );
}

LinkLetter.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default LinkLetter;
