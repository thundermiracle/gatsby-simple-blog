import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getCurrentLangKey } from 'ptz-i18n';

import { site, supportedLanguages } from '../../config';

const LanguageContext = React.createContext({
  lang: site.lang,
  homeLink: '/',
  refresh: () => {},
});

function LanguageProvider({ children }) {
  const { lang: defaultLang } = site;
  const [lang, setLang] = React.useState(defaultLang);
  const [homeLink, setHomeLink] = React.useState('/');

  function refresh(location = window.location) {
    if (supportedLanguages != null && Object.keys(supportedLanguages).length > 1) {
      // const url = location.pathname;
      const url = location.pathname == null ? window.location.pathname : location.pathname;

      const currentLang = getCurrentLangKey(Object.keys(supportedLanguages), defaultLang, url);
      const currentHomeLink = `/${currentLang}/`.replace(`/${defaultLang}/`, '/');

      setLang(currentLang);
      setHomeLink(currentHomeLink);
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        homeLink,
        refresh,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

const useLang = () => {
  const langContext = useContext(LanguageContext);

  return langContext;
};

export { LanguageContext as default, LanguageProvider, useLang };
