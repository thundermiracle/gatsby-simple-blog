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

const useText = () => useContext(TextContext);

export { TextContext as default, TextProvider, useText };
