import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import './LanguageBar.css';

import { rhythm } from '../../utils/typography';
import LangButton from '../LangButton';
import BalloonField from '../BalloonField';
import LangList from '../LangList/LangList';

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

  const [displayLang, toggleDisplayLang] = useState(false);

  function handleToggleLanguage() {
    toggleDisplayLang(!displayLang);
  }

  let toggleStyle = {
    maxHeight: null,
  };
  if (displayLang) {
    toggleStyle = {
      maxHeight: 200,
      overflow: 'initial',
    };
  }

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
            style={{
              maxWidth: rhythm(24),
              margin: 'auto',
            }}
          >
            <div className="bar">
              <LangButton lang={language} focused={displayLang} onClick={handleToggleLanguage} />
            </div>
            <div className="toggle-content" style={toggleStyle}>
              <BalloonField style={{ padding: 20 }}>
                <LangList languages={supportedLanguages} langKey={lang} />
              </BalloonField>
            </div>
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
