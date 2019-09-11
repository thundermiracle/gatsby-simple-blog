import React from 'react';
import Helmet from 'react-helmet';

import withThemeFlag from 'utils/withThemeFlag';
import Toggle from '../../Toggle';
import sun from './sun.png';
import moon from './moon.png';

// eslint-disable-next-line react/prop-types
function ReadModeToggle({ isLightTheme }) {
  return (
    <>
      <Helmet
        meta={[
          {
            name: 'theme-color',
            content: isLightTheme ? '#ffa8c5' : '#282c35',
          },
        ]}
      />
      {isLightTheme != null ? (
        <Toggle
          icons={{
            checked: (
              <img
                src={moon}
                alt="night"
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                alt="day"
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
          checked={!isLightTheme}
          onChange={e => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
        />
      ) : (
        <div style={{ height: '24px' }} />
      )}
    </>
  );
}

export default withThemeFlag(ReadModeToggle);
