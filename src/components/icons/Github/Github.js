import React from 'react';
import PropTypes from 'prop-types';

import dark from './dark.png';
import light from './light.png';
import withTheme from '../../../utils/withTheme';

function Github({ username, size, isLightTheme }) {
  if (!username) return null;

  return (
    <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
      <img
        src={isLightTheme ? dark : light}
        alt="Github-icon"
        width={size}
        height={size}
        role="presentation"
        style={{ pointerEvents: 'none' }}
      />
    </a>
  );
}

Github.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number,
  isLightTheme: PropTypes.bool,
};

Github.defaultProps = {
  username: null,
  size: 24,
  isLightTheme: true,
};

export default withTheme(Github);
