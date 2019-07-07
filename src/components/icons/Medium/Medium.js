import React from 'react';
import PropTypes from 'prop-types';

import RotateLinkImg from '../../RotateLinkImg';
import dark from './dark.png';
import light from './light.png';
import withThemeFlag from '../../../utils/withThemeFlag';

function Medium({ username, size, isLightTheme }) {
  if (!username) return null;

  return (
    <RotateLinkImg
      href={`https://medium.com/@${username}`}
      src={isLightTheme ? dark : light}
      size={size}
    />
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
