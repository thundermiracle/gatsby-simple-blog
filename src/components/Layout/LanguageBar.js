import React, { useEffect, useState } from 'react';

import './LanguageBar.css';

import { supportedLanguages } from '../../../config';
import { rhythm } from '../../utils/typography';
import LangButton from '../LangButton';

/**
 * base MUST include slash (eg: en/)
 *
 * @param {*object} { location, title, base}
 */
function LanguageBar() {
  if (supportedLanguages == null || Object.keys(supportedLanguages).length < 2) {
    return null;
  }

  const [lang, setLang] = useState('');
  useEffect(() => {
    const savedLang = window.__getPreferredLang();
    setLang(savedLang);
  });

  if (!lang) {
    return null;
  }

  return (
    <div
      className="bar"
      style={{
        maxWidth: rhythm(24),
      }}
    >
      <LangButton lang={lang} />
    </div>
  );
}

export default LanguageBar;
