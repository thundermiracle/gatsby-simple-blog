import React from 'react';
import Helmet from 'react-helmet';

import Toggle from '../../Toggle';
import sun from './sun.png';
import moon from './moon.png';

class ReadModeToggle extends React.Component {
  state = {
    theme: null,
  };
  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  render() {
    return (
      <>
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: this.state.theme === 'light' ? '#ffa8c5' : '#282c35',
            },
          ]}
        />
        {this.state.theme !== null ? (
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
            checked={this.state.theme === 'dark'}
            onChange={e => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
          />
        ) : (
          <div style={{ height: '24px' }} />
        )}
      </>
    );
  }
}

export default ReadModeToggle;
