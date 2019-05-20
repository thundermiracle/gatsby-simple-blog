import React from 'react';
import Helmet from 'react-helmet';

import { StaticQuery, graphql } from 'gatsby';

import Image from 'gatsby-image';
import Toggle from '../Toggle';

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
      <StaticQuery
        query={readModeQuery}
        render={({ day, night }) => {
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
                      <Image
                        fixed={night.childImageSharp.fixed}
                        width="16"
                        height="16"
                        alt="night"
                        role="presentation"
                        style={{
                          pointerEvents: 'none',
                        }}
                      />
                    ),
                    unchecked: (
                      <Image
                        fixed={day.childImageSharp.fixed}
                        width="16"
                        height="16"
                        alt="day"
                        role="presentation"
                        style={{
                          pointerEvents: 'none',
                        }}
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
        }}
      />
    );
  }
}

const readModeQuery = graphql`
  query ReadModeQuery {
    night: file(absolutePath: { regex: "/moon.png/" }) {
      childImageSharp {
        fixed(width: 16, height: 16) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    day: file(absolutePath: { regex: "/sun.png/" }) {
      childImageSharp {
        fixed(width: 16, height: 16) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default ReadModeToggle;
