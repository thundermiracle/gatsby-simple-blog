import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostAbbrev from '../components/PostAbbrev';
import { useText } from '../context/TextContext';
import getBaseUrl from '../utils/getBaseUrl';

function BlogIndex({ data, location, pageContext }) {
  const siteTitle = data.site.siteMetadata.title;
  const defaultLang = data.site.siteMetadata.lang;
  const langKey = pageContext.langKey;
  const posts = data.allMarkdownRemark.edges;

  const base = getBaseUrl(defaultLang, langKey);

  const { tIndTitle, taIndKeywords, tfIndCountPosts } = useText();

  return (
    <Layout lang={langKey} base={base} location={location} title={siteTitle}>
      <SEO lang={langKey} title={tIndTitle} keywords={taIndKeywords} />
      <aside>
        <Bio />
      </aside>
      <h4>{tfIndCountPosts(data.allMarkdownRemark.totalCount)}</h4>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <PostAbbrev
            lang={langKey}
            key={node.fields.slug}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            timeToRead={node.timeToRead}
            title={title}
            excerpt={node.frontmatter.description || node.excerpt}
            tags={node.frontmatter.tags}
          />
        );
      })}
    </Layout>
  );
}

BlogIndex.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};

BlogIndex.defaultProps = {
  pageContext: {},
};

export default BlogIndex;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        lang
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
            langKey
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
