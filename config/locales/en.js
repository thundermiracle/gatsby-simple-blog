module.exports = {
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
