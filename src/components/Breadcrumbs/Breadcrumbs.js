import './Breadcrumbs.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useText } from '../../context/TextContext';

function Breadcrumbs({ data, showTop, ...restProps }) {
  if (data == null) {
    return null;
  }

  const { tHome } = useText();

  let topBCli;
  if (showTop) {
    topBCli = (
      <li className="breadcrumbs-item">
        <Link to="/" className="breadcrumbs-element">
          {tHome}
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
            <li className="breadcrumbs-item" key={text}>
              <Link to={url} className="breadcrumbs-element">
                {text}
              </Link>
            </li>
          );
        }
        return (
          <li className="breadcrumbs-item_active" key={text}>
            <span className="breadcrumbs-element">{text}</span>
          </li>
        );
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
