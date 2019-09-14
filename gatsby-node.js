/* eslint-disable no-console */
const path = require(`path`);
const R = require('ramda');
const { haveSameItem, getPreviousNextNode, kebabCase } = require('./src/utils/helpers');
const getBaseUrl = require('./src/utils/getBaseUrl');
const {
  site: { lang: defaultLang = 'en', displayTranslations },
  supportedLanguages,
} = require('./config');

// group by language
const byLangKey = R.groupBy(R.path(['node', 'fields', 'langKey']));
// group by directoryName
const byDirectoryName = R.groupBy(R.path(['node', 'fields', 'directoryName']));

const translationsByDirectory = posts => {
  const gpDirPosts = byDirectoryName(posts);

  const dirNames = R.keys(gpDirPosts);

  const otherLangs = R.compose(
    R.map(R.map(R.path(['node', 'fields', 'langKey']))),
    R.values,
  )(gpDirPosts);

  return R.zipObj(dirNames, otherLangs);
};

/**
 * @param {*func} createPage
 */
function PageMaker(createPage) {
  const blogIndex = path.resolve('./src/templates/blog-index.js');
  const blogPost = path.resolve('./src/templates/blog-post.js');
  const tagsTotal = path.resolve('./src/templates/tags.js');
  const tagPage = path.resolve('./src/templates/tag-page.js');

  return {
    createBlogIndex() {
      // Create index pages for all supported languages
      Object.keys(supportedLanguages).forEach(langKey => {
        createPage({
          path: getBaseUrl(defaultLang, langKey),
          component: blogIndex,
          context: {
            langKey,
          },
        });
      });
    },

    createBlogPost(posts) {
      const translationsInfo = displayTranslations ? translationsByDirectory(posts) : [];

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

        // translations
        let translationsLink = [];
        if (displayTranslations && R.path(['node', 'fields', 'directoryName'], post)) {
          const dirName = post.node.fields.directoryName;
          const translations = R.without([postLangKey], translationsInfo[dirName]);

          translationsLink = translations.map(trans => ({
            name: supportedLanguages[trans],
            url: `/${trans}/${dirName}/`.replace(`/${defaultLang}`, ''),
          }));
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
            translationsLink,
          },
        });
      });
    },

    createTagIndex(postsGroupByLang) {
      Object.keys(postsGroupByLang).forEach(langKey => {
        // Make tags-total
        createPage({
          path: `${getBaseUrl(defaultLang, langKey)}tags/`,
          component: tagsTotal,
          context: {
            langKey,
          },
        });
      });
    },

    createTagPage(postsGroupByLang) {
      Object.keys(postsGroupByLang).forEach(langKey => {
        // Tag pages:
        let tags = [];
        postsGroupByLang[langKey].forEach(post => {
          if (R.path(['node', 'frontmatter', 'tags'], post)) {
            tags = tags.concat(post.node.frontmatter.tags);
          }
        });
        // Eliminate duplicate tags
        tags = R.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `${getBaseUrl(defaultLang, langKey)}tags/${kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag,
              langKey,
            },
          });
        });
      });
    },
  };
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const pageMaker = PageMaker(createPage);

  return new Promise((resolve, reject) => {
    pageMaker.createBlogIndex();

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
                    directoryName
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

        const posts = result.data.allMarkdownRemark.edges;
        const gpLangPosts = byLangKey(posts);

        pageMaker.createBlogPost(posts);
        pageMaker.createTagIndex(gpLangPosts);
        pageMaker.createTagPage(gpLangPosts);

        return null;
      }),
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (R.path(['internal', 'type'], node) === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    });
  }
};
