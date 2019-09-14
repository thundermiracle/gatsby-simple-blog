import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TagList from 'components/TagList';
import RelativePosts from 'components/RelativePosts';
import Disqus from 'components/Disqus';
import TranslationsLink from 'components/TranslationsLink';

import { formatReadingTime } from 'utils/helpers';
import { formatDate } from 'utils/i18n';
import { rhythm, scale } from 'utils/typography';
import { useLang } from 'context/LanguageContext';

function BlogPostTemplate({ data, pageContext, location }) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next, previousInSameTag, nextInSameTag, translationsLink } = pageContext;

  const { lang, homeLink } = useLang();

  let tags;
  if (post.frontmatter.tags) {
    tags = <TagList tags={post.frontmatter.tags} baseUrl={`${homeLink}tags`} />;
  }

  return (
    <Layout location={location} title={siteTitle} breadcrumbs={[{ text: post.frontmatter.title }]}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {formatDate(post.frontmatter.date)}
        {` • ${formatReadingTime(post.timeToRead)}`}
      </p>

      {tags}
      <TranslationsLink
        translationsLink={translationsLink}
        langKey={lang}
        style={{ margin: '-0.5rem 0 1.5rem' }}
      />

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <RelativePosts postNodes={[previousInSameTag, nextInSameTag]} lang={lang} />

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
          marginLeft: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>

      <Disqus identifier={post.id} show={post.frontmatter.disqus} title={post.frontmatter.title} />
    </Layout>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        lang
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        disqus
      }
      fields {
        langKey
      }
    }
  }
`;
