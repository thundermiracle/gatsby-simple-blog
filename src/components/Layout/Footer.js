import React from 'react';

import { rhythm } from '../../utils/typography';

function Footer() {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
      }}
    >
      <a href="https://github.com/thundermiracle" target="_blank" rel="noopener noreferrer">
        github
      </a>{' '}
      &bull;{' '}
      <a href="https://medium.com/thundermiracle" target="_blank" rel="noopener noreferrer">
        medium
      </a>
    </footer>
  );
}

export default Footer;
