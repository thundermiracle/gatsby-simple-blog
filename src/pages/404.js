import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { formatMessage } from '../utils/i18n';

function NotFoundPage({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={formatMessage('t404Title')} />
      <h1>{formatMessage('t404Title')}</h1>
      <p>{formatMessage('t404Content')}</p>
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
