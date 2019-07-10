import React from 'react';
import PropTypes from 'prop-types';

import LanguageBar from './LanguageBar';
import Header from './Header';
import Footer from './Footer';
import ReadModeToggle from './ReadModeToggle';
import Breadcrumbs from '../Breadcrumbs';

import { rhythm } from '../../utils/typography';

function Layout({ children, location, title, breadcrumbs, base, lang }) {
  return (
    <div
      style={{
        color: 'var(--textNormal)',
        background: 'var(--bg)',
        transition: 'color 0.2s ease-out, background 0.2s ease-out',
        minHeight: '100vh',
        fontFamily: 'var(--systemFont)',
      }}
    >
      <LanguageBar lang={lang} />
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
          <Header base={base} location={location} title={title} />
          <ReadModeToggle />
        </header>
        <Breadcrumbs
          base={base}
          langKey={lang}
          data={breadcrumbs}
          showTop={true}
          style={{ marginTop: '-1.5rem' }}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array,
  base: PropTypes.string,
  lang: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  title: null,
  breadcrumbs: null,
  base: '',
  lang: null,
};

export default Layout;
