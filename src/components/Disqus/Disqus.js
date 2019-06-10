import React from 'react';
import PropTypes from 'prop-types';

import { graphql, useStaticQuery } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

function Disqus({ identifier, title, show }) {
  const {
    site: {
      siteMetadata: { disqusShortName },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            disqusShortName
          }
        }
      }
    `,
  );

  if (!disqusShortName || !show) {
    return null;
  }

  return <DiscussionEmbed shortname={disqusShortName} config={{ identifier, title }} />;
}

Disqus.propTypes = {
  identifier: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

Disqus.defaultProps = {
  show: false,
};

export default Disqus;
