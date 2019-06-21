/* eslint-disable no-console */
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require('lodash');
const haveSameTags = require('./src/utils/helpers').haveSameItem;
const { supportedLanguages } = require('./i18n');
const { lang = 'en' } = require('./config').site;

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

        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          // posts in same tags
          const postTags = post.node.frontmatter.tags;
          const postsInSameTag = posts.filter(({ node }) =>
            haveSameTags(postTags, node.frontmatter.tags),
          );
          const indexInSameTag = postsInSameTag.findIndex(
            p => p.node.fields.slug === post.node.fields.slug,
          );
          let previousInSameTag;
          let nextInSameTag;
          if (postsInSameTag.length > 0 && indexInSameTag > -1) {
            previousInSameTag =
              indexInSameTag === postsInSameTag.length - 1
                ? null
                : postsInSameTag[indexInSameTag + 1].node;
            nextInSameTag = indexInSameTag <= 0 ? null : postsInSameTag[indexInSameTag - 1].node;
          }

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
