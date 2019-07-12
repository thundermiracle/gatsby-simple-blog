const site = {
  pathPrefix: '/gatsby-simple-blog',
  title: 'Gatsby Starter Blog',
  author: 'Kyle Mathews',
  description: 'A starter blog demonstrating what Gatsby can do.',
  siteUrl: 'https://gatsby-starter-blog-demo.netlify.com/',
  twitter: 'kylemathews',
  github: 'thundermiracle',
  medium: 'thundermiracle',
  facebook: 'thundermiracle',
  disqusShortName: 'gatsby-simple-blog',
  googleTrackingId: '',
  lang: 'en',
};

const text = {
  tHome: 'Home',
  tRelativePosts: 'Relative Posts',
  tFollowTwitterDescription: 'You should follow him on Twitter',
  tTags: 'Tags',
  tIndTitle: 'All posts',
  taIndKeywords: [`blog`, `gatsby`, `javascript`, `react`],
  tfIndCountPosts: count => `${count} Posts`,
  tfTagHeader: (totalCount, tag) =>
    `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`,
  t404Title: 'Not Found',
  t404Content: 'You just hit a route that doesn&#39;t exist... the sadness.',
  'zh-hans': {
    tHome: '主页',
    tRelativePosts: '相关文章',
    tTags: '所有标签',
    tIndTitle: '所有文章',
    taIndKeywords: [`博客`, `gatsby`, `javascript`, `react`],
    tfIndCountPosts: count => `共 ${count} 篇文章`,
    tfTagHeader: (totalCount, tag) => `在 "${tag}" 里共有 ${totalCount} 篇文章`,
  },
};

const supportedLanguages = {
  en: 'English',
  'zh-hans': '简体中文',
};

module.exports = {
  site,
  text,
  supportedLanguages,
};
