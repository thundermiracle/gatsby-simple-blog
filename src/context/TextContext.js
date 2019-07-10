import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { text } from '../../config';

const TextContext = React.createContext(text);

function TextProvider({ children }) {
  return <TextContext.Provider value={text}>{children}</TextContext.Provider>;
}

TextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

const useText = lang => {
  const siteText = useContext(TextContext);

  // return context by lang-key, if not exists, return default context
  const langKey = lang || window.__getPreferredLang() || 'en';
  return siteText[langKey] != null ? siteText[langKey] : siteText;
};

export { TextContext as default, TextProvider, useText };
