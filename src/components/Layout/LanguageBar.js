import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import './LanguageBar.css';

import { rhythm } from '../../utils/typography';
import LangButton from '../LangButton';
import BalloonField from '../BalloonField';

/**
 * base MUST include slash (eg: en/)
 *
 * @param {*object} { lang }
 */
function LanguageBar({ lang }) {
  let getLangFunc = () => 'en';
  let setLangFunc = null;

  useEffect(() => {
    getLangFunc = window.__getPreferredLang;
    setLangFunc = window.__setPreferredLang;
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

        const langKey = lang || getLangFunc();
        if (lang && setLangFunc != null) {
          setLangFunc(lang);
        }

        const language = supportedLanguages[langKey];

        if (!language) {
          return null;
        }

        return (
          <div
            className="bar"
            style={{
              maxWidth: rhythm(24),
            }}
          >
            <LangButton lang={language} />
            <BalloonField>Test</BalloonField>
          </div>
        );
      }}
    />
  );
}

LanguageBar.propTypes = {
  lang: PropTypes.string,
};

LanguageBar.defaultProps = {
  lang: null,
};

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
