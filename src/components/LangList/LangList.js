import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import './LangList.css';

function LangList({ languages, langKey, ...restProps }) {
  return (
    <div className="lang-root" {...restProps}>
      {Object.keys(languages).map(lang => {
        const url = lang === langKey ? '/' : `/${lang}/`;

        return (
          <Link key={lang} to={url} className="lang-link">
            {languages[lang]}
          </Link>
        );
      })}
    </div>
  );
}

LangList.propTypes = {
  languages: PropTypes.object.isRequired,
  langKey: PropTypes.string.isRequired,
};

export default LangList;
