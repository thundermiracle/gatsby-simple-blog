import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import { rhythm } from '../../utils/typography';
import { formatPostDate } from '../../utils/helpers';

function RelativePost({ postNode, lang }) {
  const {
    fields: { slug },
    frontmatter: { title, date },
  } = postNode;
  return (
    <Link style={{ boxShadow: 'none' }} to={slug} rel="bookmark">
      <article
        style={{
          marginBottom: rhythm(1 / 2),
        }}
      >
        <header>
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: rhythm(1),
              margin: `${rhythm(1 / 2)} ${rhythm(1 / 4)} 0`,
            }}
          >
            {title}
          </h3>
          <small
            style={{
              marginLeft: rhythm(1 / 4),
            }}
          >
            {formatPostDate(date, lang)}
          </small>
        </header>
      </article>
    </Link>
  );
}

RelativePost.propTypes = {
  postNode: PropTypes.object.isRequired,
  lang: PropTypes.string,
};

RelativePost.defaultProps = {
  lang: '',
};

export default RelativePost;
