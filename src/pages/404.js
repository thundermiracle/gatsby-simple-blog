import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useText } from '../context/LanguageContext';

function NotFoundPage({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;

  const { t404Title, t404Content } = useText();

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={t404Title} />
      <h1>{t404Title}</h1>
      <p>{t404Content}</p>
    </Layout>
  );
}

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
