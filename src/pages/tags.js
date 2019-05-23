import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import kebabCase from 'lodash/kebabCase';

// Components
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Tag from '../components/Tag';
import Bio from '../components/Bio';

const styles = {
  tagListDiv: {
    marginLeft: '1.5rem',
    lineHeight: 3,
  },
};

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location="location" title={title}>
    <aside>
      <Bio />
    </aside>
    <Helmet title="Tags" />
    <div>
      <h1>Tags</h1>
      <div style={styles.tagListDiv}>
        {group.map(tag => (
          <Tag
            key={tag.fieldValue}
            text={tag.fieldValue}
            count={tag.totalCount}
            url={`/tags/${kebabCase(tag.fieldValue)}/`}
          />
        ))}
      </div>
    </div>
  </Layout>
);

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
