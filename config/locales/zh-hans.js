module.exports = {
  tHome: '主页',
  tRelativePosts: '相关文章',
  tTags: '所有标签',
  tIndTitle: '所有文章',
  taIndKeywords: [`博客`, `gatsby`, `javascript`, `react`],
  tfIndCountPosts: ({ count, from, to }) => `共 ${count} 篇文章 (第${from} 到 ${to}篇)`,
  tfTagHeader: (totalCount, tag) => `在 "${tag}" 里共有 ${totalCount} 篇文章`,
};
