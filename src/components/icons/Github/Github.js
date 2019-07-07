import React from 'react';
import PropTypes from 'prop-types';

import RotateLinkImg from '../../RotateLinkImg';
import dark from './dark.png';
import light from './light.png';
import withThemeFlag from '../../../utils/withThemeFlag';

function Github({ username, size, isLightTheme }) {
  if (!username) return null;

  return (
    <RotateLinkImg
      href={`https://github.com/${username}`}
      size={size}
      src={isLightTheme ? dark : light}
    />
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

export default withThemeFlag(Github);
