/* eslint-disable no-console */
const path = require(`path`);
const _ = require('lodash');
const { haveSameItem, getPreviousNextNode } = require('./src/utils/helpers');
const {
  site: { lang = 'en' },
  supportedLanguages,
} = require('./config');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogIndex = path.resolve('./src/templates/blog-index.js');
  const blogPost = path.resolve('./src/templates/blog-post.js');
  const tagPage = path.resolve('./src/templates/tag-page.js');

  return new Promise((resolve, reject) => {
    // Create index pages for all supported languages
    Object.keys(supportedLanguages).forEach(langKey => {
      createPage({
        path: langKey === lang ? '/' : `/${langKey}/`,
        component: blogIndex,
        context: {
          langKey,
        },
      });
    });

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                  }
                  frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    tags
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(post => {
          // posts in same language
          const postLangKey = post.node.fields.langKey;
          const postsInSameLang = posts.filter(({ node }) => postLangKey === node.fields.langKey);
          const indexInSameLang = postsInSameLang.findIndex(
            p => p.node.fields.slug === post.node.fields.slug,
          );
          const { previous, next } = getPreviousNextNode(postsInSameLang, indexInSameLang);

          // posts in same tags
          const postTags = post.node.frontmatter.tags;
          const postsInSameTag = posts.filter(({ node }) =>
            haveSameItem(postTags, node.frontmatter.tags),
          );
          const indexInSameTag = postsInSameTag.findIndex(
            p => p.node.fields.slug === post.node.fields.slug,
          );
          const { previous: previousInSameTag, next: nextInSameTag } = getPreviousNextNode(
            postsInSameTag,
            indexInSameTag,
          );

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              previousInSameTag,
              nextInSameTag,
            },
          });
        });

        // Tag pages:
        let tags = [];
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags);
          }
        });
        // Eliminate duplicate tags
        tags = _.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag,
            },
          });
        });

        return null;
      }),
    );
  });
};
