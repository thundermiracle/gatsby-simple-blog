---
title: How to add copy button
date: "2022-03-21T23:46:37.121Z"
---

## How to add copy button to your code block?

### Install packages

```shell
npm install --save gatsby-transformer-remark gatsby-remark-prismjs gatsby-remark-prismjs-copy-button
```

### Modify your gatsby-config.js

**NOTE:** You MUST put `gatsby-remark-prismjs-copy-button` before `gatsby-remark-prismjs` in `plugins` array.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs-copy-button`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
  ],
};
```
