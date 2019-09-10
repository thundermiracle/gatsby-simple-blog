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
import { useText } from '../context/LanguageContext';
import getBaseUrl from '../utils/getBaseUrl';

const styles = {
  tagListDiv: {
    marginLeft: '1.5rem',
    lineHeight: 3,
  },
};

const TagsPage = ({
  pageContext,
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title, lang },
    },
  },
}) => {
  const { langKey } = pageContext;
  const { tTags } = useText();

  const base = getBaseUrl(lang, langKey);

  return (
    <Layout
      base={base}
      lang={langKey}
      location="location"
      title={title}
      breadcrumbs={[{ text: tTags }]}
    >
      <aside>
        <Bio />
      </aside>
      <Helmet title={tTags} />
      <div>
        <h1>{tTags}</h1>
        <div style={styles.tagListDiv}>
          {group.map(tag => (
            <Tag
              key={tag.fieldValue}
              text={tag.fieldValue}
              count={tag.totalCount}
              url={`${base}tags/${kebabCase(tag.fieldValue)}/`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

TagsPage.propTypes = {
  pageContext: PropTypes.object.isRequired,
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
        lang: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsTotalPage($langKey: String) {
    site {
      siteMetadata {
        title
        lang
      }
    }
    allMarkdownRemark(limit: 1000, filter: { fields: { langKey: { eq: $langKey } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
