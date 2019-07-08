import React from 'react';
import PropTypes from 'prop-types';

import IconLanguage from './IconLanguage';
import './LangButton.css';

function LangButton({ lang, onClick, focused, ...restProps }) {
  const focusedClass = focused ? 'language-focused' : '';
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div className={`language ${focusedClass}`} onClick={onClick} role="button" {...restProps}>
      <IconLanguage className="icon" />
      <span>{lang}</span>
    </div>
  );
}

LangButton.propTypes = {
  lang: PropTypes.string,
  onClick: PropTypes.func,
  focused: PropTypes.bool,
};

LangButton.defaultProps = {
  lang: 'English',
  onClick: null,
  focused: false,
};

LangButton.defaultProps = {};

export default LangButton;
