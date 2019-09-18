import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { fromPairs } from 'ramda';

import { rhythm } from 'utils/typography';

import LangButton from '../LangButton';
import BalloonField from '../BalloonField';
import LangList from '../LangList/LangList';
import './LanguageBar.css';

/**
 * base MUST include slash (eg: en/)
 *
 * @param {*object} { lang }
 */
function LanguageBar({ lang: langKey }) {
  const [displayLang, toggleDisplayLang] = useState(false);

  const handleToggleLanguage = React.useCallback(() => {
    toggleDisplayLang(!displayLang);
  }, [displayLang]);

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
        const { langsEntries, lang: defaultLang } = data.site.siteMetadata;

        if (langsEntries.length < 2) {
          return null;
        }

        const supportedLanguages = fromPairs(langsEntries);
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
                <LangList languages={supportedLanguages} langKey={defaultLang} />
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
  lang: 'en',
};

const supportedLanguagesQuery = graphql`
  query SupportedLanguagesQuery {
    site {
      siteMetadata {
        lang
        langsEntries
      }
    }
  }
`;

export default LanguageBar;
