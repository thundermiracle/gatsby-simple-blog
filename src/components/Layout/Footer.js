import React from 'react';

import { rhythm } from 'utils/typography';

function Footer() {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
        textAlign: 'center',
      }}
    >
      <p>
        Made of{' '}
        <a
          href="https://github.com/thundermiracle/gatsby-simple-blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          gatsby-simple-blog
        </a>
      </p>
    </footer>
  );
}

export default Footer;
