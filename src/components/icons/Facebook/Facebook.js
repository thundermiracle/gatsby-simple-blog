import React from 'react';
import PropTypes from 'prop-types';

import RotateLinkImg from '../../RotateLinkImg';
import dark from './dark.png';
import light from './light.png';
import withThemeFlag from '../../../utils/withThemeFlag';

function Facebook({ username, size, isLightTheme }) {
  if (!username) return null;

  return (
    <RotateLinkImg
      href={`https://facebook.com/${username}`}
      src={isLightTheme ? dark : light}
      size={size}
    />
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
