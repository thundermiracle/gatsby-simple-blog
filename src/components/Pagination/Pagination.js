import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { useLang } from 'context/LanguageContext';

import './Pagination.css';

const Pagination = ({ currentPage, totalPageNumber }) => {
  const { homeLink } = useLang();

  const befMark =
    currentPage === 1 ? (
      <span className="disabled">&laquo;</span>
    ) : (
      <Link to={`${homeLink}${currentPage - 1}`}>&laquo;</Link>
    );
  const nextMark =
    currentPage === totalPageNumber ? (
      <span className="disabled">&raquo;</span>
    ) : (
      <Link to={`${homeLink}${currentPage + 1}`}>&raquo;</Link>
    );

  return (
    <div className="pagination">
      {befMark}
      {Array.from({ length: totalPageNumber })
        .map((_, ind) => ind + 1)
        .map((pageNum) => {
          return pageNum === currentPage ? (
            <span key={`pageNum-${pageNum}`} className="active">
              {pageNum}
            </span>
          ) : (
            <Link key={`pageNum-${pageNum}`} to={`${homeLink}${pageNum}`}>
              {pageNum}
            </Link>
          );
        })}
      {nextMark}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPageNumber: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  totalPageNumber: 1,
};

export default Pagination;
