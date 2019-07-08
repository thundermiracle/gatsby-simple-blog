import React from 'react';
import PropTypes from 'prop-types';

import './BalloonField.css';

function BalloonField({ children, className, ...restProps }) {
  return (
    <div className={`balloon ${className}`} {...restProps}>
      {children}
    </div>
  );
}

BalloonField.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

BalloonField.defaultProps = {
  className: '',
};

export default BalloonField;
