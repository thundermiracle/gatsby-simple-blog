import React from 'react';
import PropTypes from 'prop-types';

import './BalloonField.css';

function BalloonField({ children, ...restProps }) {
  return (
    <div className="balloon" {...restProps}>
      {children}
    </div>
  );
}

BalloonField.propTypes = {
  children: PropTypes.any.isRequired,
};

export default BalloonField;
