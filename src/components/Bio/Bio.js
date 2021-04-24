/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { rhythm } from 'utils/typography';
import './Bio.css';

import SocialBar from '../SocialBar';

function Bio() {
  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={bioQuery}
      render={(data) => {
        const { author, description } = data.site.siteMetadata;
        return (
          <div
            style={{
              marginBottom: rhythm(2.5),
            }}
          >
            <div className="bio">
              <GatsbyImage
                image={data.avatar.childImageSharp.gatsbyImageData}
                alt={author}
                className="pic"
                style={{
                  marginRight: rhythm(1 / 2),
                }}
                imgStyle={{
                  borderRadius: '50%',
                }}
              />
              <div className="description">
                <p>{description}</p>
                <SocialBar />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 70, height: 70)
      }
    }
    site {
      siteMetadata {
        author
        description
      }
    }
  }
`;

export default Bio;
