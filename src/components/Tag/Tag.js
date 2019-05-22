import './Tag.css';

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

function Tag({ url, text }) {
  return (
    <div className="round">
      <Link className="link" to={url}>
        <span className="text">{text}</span>
      </Link>
    </div>
  );
}

Tag.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tag;
