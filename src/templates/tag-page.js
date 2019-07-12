/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostAbbrev from '../components/PostAbbrev';
import Bio from '../components/Bio';
import { useText } from '../context/TextContext';
import getBaseUrl from '../utils/getBaseUrl';

const TagPageTemplate = ({ pageContext, data }) => {
  const { tag, langKey } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const defaultLang = data.site.siteMetadata.lang;

  const { tTags, tfTagHeader } = useText(langKey);

  const tagHeader = tfTagHeader(totalCount, tag);

  const base = getBaseUrl(defaultLang, langKey);

  return (
    <Layout
      base={base}
      lang={langKey}
      location="location"
      title={siteTitle}
      breadcrumbs={[{ text: tTags, url: `${base}tags` }, { text: tag }]}
    >
      <SEO title={tagHeader} description={tagHeader} />
      <h1>{tagHeader}</h1>
      <main>
        {edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <PostAbbrev
              key={node.fields.slug}
              base={base}
              lang={langKey}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              timeToRead={node.timeToRead}
              title={title}
            />
          );
        })}
      </main>
      <div style={{ marginTop: 50 }} />
      <aside>
        <Bio />
      </aside>
    </Layout>
  );
};

TagPageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              langKey: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }).isRequired,
};

export default TagPageTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String, $langKey: String) {
    site {
      siteMetadata {
        title
        lang
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } }, fields: { langKey: { eq: $langKey } } }
    ) {
      totalCount
      edges {
        node {
          timeToRead
          fields {
            slug
            langKey
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
