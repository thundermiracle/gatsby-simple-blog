import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import './TranslationsLink.css';

function TranslationsLink({ translationsLink, langKey, ...restProps }) {
  if (translationsLink == null || translationsLink.length === 0) {
    return null;
  }

  return (
    <div className="translation-root" {...restProps}>
      {translationsLink.map(({ name, url }) => (
        <Link key={name} to={url} className="translation-link">
          {name}
        </Link>
      ))}
    </div>
  );
}

TranslationsLink.propTypes = {
  translationsLink: PropTypes.array.isRequired,
  langKey: PropTypes.string.isRequired,
};

export default TranslationsLink;
