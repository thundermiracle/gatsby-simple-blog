import React from 'react';
import PropTypes from 'prop-types';

import IconLanguage from './IconLanguage';
import './LangButton.css';

function LangButton({ lang, ...restProps }) {
  return (
    <div className="language" {...restProps}>
      <IconLanguage className="icon" />
      <span>{lang}</span>
    </div>
  );
}

LangButton.propTypes = {
  lang: PropTypes.string,
};

LangButton.defaultProps = {
  lang: 'English',
};

LangButton.defaultProps = {};

export default LangButton;
