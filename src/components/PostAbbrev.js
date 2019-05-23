import React from 'react';

import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';
import { formatReadingTime } from '../utils/helpers';

import TagList from './TagList';

function PostAbbrev({ slug, title, date, timeToRead, excerpt, tags }) {
  let excerptPart;
  if (excerpt) {
    excerptPart = (
      <p
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    );
  }

  let tagsPart;
  if (tags) {
    tagsPart = (
      <TagList style={{ margin: '0.5rem 0 -0.5rem -0.5rem' }} tags={tags} baseUrl="/tags" />
    );
  }

  return (
    <article>
      <header>
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: rhythm(1),
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: 'none' }} to={slug} rel="bookmark">
            {title}
          </Link>
        </h3>
        {tagsPart}
        <small>{`${date} • ${formatReadingTime(timeToRead)}`}</small>
        {excerptPart}
      </header>
    </article>
  );
}

export default PostAbbrev;
