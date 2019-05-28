import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import { scale } from '../../utils/typography';

function Header({ location, title }) {
  // eslint-disable-next-line no-undef
  const rootPath = `${__PATH_PREFIX__}/`;

  if (location.pathname === rootPath) {
    return (
      <h1
        style={{
          ...scale(0.75),
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'var(--textTitle)',
          }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    );
  }
  return (
    <h3
      style={{
        fontFamily: 'Montserrat, sans-serif',
        marginTop: 0,
        marginBottom: 0,
        height: 42,
        lineHeight: '2.625rem',
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'rgb(255, 167, 196)',
        }}
        to="/"
      >
        {title}
      </Link>
    </h3>
  );
}

Header.propTypes = {
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string,
};

Header.defaultProps = {
  title: null,
};

export default Header;
