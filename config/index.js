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
};

module.exports = {
  site,
  text,
};
