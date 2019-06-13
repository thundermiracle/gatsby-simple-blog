import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { rhythm } from '../../utils/typography';
import { Github, Twitter, Facebook } from '../icons';

function Footer() {
  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={socialQuery}
      render={data => {
        const { twitter, github, medium, facebook } = data.site.siteMetadata.social;
        return (
          <div
            style={{
              paddingTop: rhythm(1),
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: 'auto',
            }}
          >
            {facebook && <Facebook username={facebook} />}
            {twitter && <Twitter username={twitter} />}
            {github && <Github username={github} />}
          </div>
        );
      }}
    />
  );
}

const socialQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
          medium
          facebook
        }
      }
    }
  }
`;
export default Footer;
