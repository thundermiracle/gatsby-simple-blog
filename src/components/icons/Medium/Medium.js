import React from 'react';
import PropTypes from 'prop-types';

import dark from './dark.png';
import light from './light.png';
import withThemeFlag from '../../../utils/withThemeFlag';

function Medium({ username, size, isLightTheme }) {
  if (!username) return null;

  return (
    <a href={`https://medium.com/@${username}`} target="_blank" rel="noopener noreferrer">
      <img
        src={isLightTheme ? dark : light}
        alt="Medium-icon"
        width={size}
        height={size}
        role="presentation"
        style={{ pointerEvents: 'none' }}
      />
    </a>
  );
}

Medium.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number,
  isLightTheme: PropTypes.bool,
};

Medium.defaultProps = {
  username: null,
  size: 24,
  isLightTheme: true,
};

export default withThemeFlag(Medium);
