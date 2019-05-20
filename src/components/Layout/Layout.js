import React from 'react';

import Header from './Header';
import ReadModeToggle from './ReadModeToggle';
import { rhythm } from '../../utils/typography';

function Layout({ children, location, title }) {
  return (
    <div
      style={{
        color: 'var(--textNormal)',
        background: 'var(--bg)',
        transition: 'color 0.2s ease-out, background 0.2s ease-out',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `2.625rem ${rhythm(3 / 4)}`,
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.625rem',
          }}
        >
          <Header location={location} title={title} />
          <ReadModeToggle />
        </header>
        {children}
      </div>
    </div>
  );
}

export default Layout;
