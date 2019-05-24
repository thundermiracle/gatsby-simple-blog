import './Breadcrumbs.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function Breadcrumbs({ data, showTop, ...restProps }) {
  if (data == null) {
    return null;
  }

  let topBCli;
  if (showTop) {
    topBCli = (
      <li className="breadcrumbs-item">
        <Link to="/" className="breadcrumbs-element">
          Home
        </Link>
      </li>
    );
  }

  return (
    <ul className="breadcrumbs breadcrumbs-ul" {...restProps}>
      {topBCli}
      {data.map(({ text, url }) => {
        if (url != null) {
          return (
            <li className="breadcrumbs-item">
              <Link to={url} className="breadcrumbs-element">
                {text}
              </Link>
            </li>
          );
        } else {
          return (
            <li className="breadcrumbs-item_active">
              <span className="breadcrumbs-element">{text}</span>
            </li>
          );
        }
      })}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string,
    }),
  ),
  showTop: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  data: null,
  showTop: false,
};

export default Breadcrumbs;
