import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getCurrentLangKey } from 'ptz-i18n';

import { site, supportedLanguages } from 'config';

import makeLoadMessage from './makeLoadMessage';

const loadMessage = makeLoadMessage(site.lang);

const initValues = {
  lang: site.lang,
  homeLink: '/',
  messages: loadMessage(site.lang),
  refresh: () => {},
};
const LanguageContext = React.createContext(initValues);

function LanguageProvider({ children }) {
  const { lang: defaultLang } = site;
  const [lang, setLang] = React.useState(initValues.lang);
  const [homeLink, setHomeLink] = React.useState(initValues.homeLink);
  const [messages, setMessages] = React.useState(initValues.messages);

  const refresh = React.useCallback(
    (location = window.location) => {
      if (supportedLanguages != null && Object.keys(supportedLanguages).length > 1) {
        // const url = location.pathname;
        const url = location.pathname == null ? window.location.pathname : location.pathname;

        const currentLang = getCurrentLangKey(Object.keys(supportedLanguages), defaultLang, url);
        const currentHomeLink = `/${currentLang}/`.replace(`/${defaultLang}/`, '/');
        const currentMessages = loadMessage(currentLang);

        setLang(currentLang);
        setHomeLink(currentHomeLink);
        setMessages(currentMessages);
      }
    },
    [defaultLang],
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        homeLink,
        messages,
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
