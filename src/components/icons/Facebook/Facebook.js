import React from 'react';
import PropTypes from 'prop-types';

import dark from './dark.png';
import light from './light.png';
import withThemeFlag from '../../../utils/withThemeFlag';

function Facebook({ username, size, isLightTheme }) {
  if (!username) return null;

  return (
    <a href={`https://facebook.com/${username}`} target="_blank" rel="noopener noreferrer">
      <img
        src={isLightTheme ? dark : light}
        alt="Facebook-icon"
        width={size}
        height={size}
        role="presentation"
        style={{ pointerEvents: 'none' }}
      />
    </a>
  );
}

Facebook.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number,
  isLightTheme: PropTypes.bool,
};

Facebook.defaultProps = {
  username: null,
  size: 24,
  isLightTheme: true,
};

export default withThemeFlag(Facebook);
