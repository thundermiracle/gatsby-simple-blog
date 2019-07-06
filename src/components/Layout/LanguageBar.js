import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import './LanguageBar.css';

import { rhythm } from '../../utils/typography';
import LangButton from '../LangButton';

/**
 * base MUST include slash (eg: en/)
 *
 * @param {*object} { location, title, base}
 */
function LanguageBar() {
  const [lang, setLang] = useState('');
  useEffect(() => {
    const savedLang = window.__getPreferredLang();
    setLang(savedLang);
  });

  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={supportedLanguagesQuery}
      render={data => {
        const { langsJson } = data.site.siteMetadata;
        const supportedLanguages = JSON.parse(langsJson) || {};
        if (supportedLanguages == null || Object.keys(supportedLanguages).length < 2) {
          return null;
        }

        if (!lang) {
          return null;
        }

        return (
          <div
            className="bar"
            style={{
              maxWidth: rhythm(24),
            }}
          >
            <LangButton lang={lang} />
          </div>
        );
      }}
    />
  );
}

const supportedLanguagesQuery = graphql`
  query SupportedLanguagesQuery {
    site {
      siteMetadata {
        langsJson
      }
    }
  }
`;

export default LanguageBar;
