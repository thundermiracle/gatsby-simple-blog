import React from 'react';

export default function withThemeFlag(BaseComponent) {
  class injectTheme extends React.Component {
    constructor() {
      super();
      this.state = {
        theme: null,
      };
    }

    componentDidMount() {
      this.setState({ theme: window.__theme });
      window.__subOnThemeChange(BaseComponent.name, () => {
        this.setState({ theme: window.__theme });
      });
    }

    componentWillUnmount() {
      window.__unsubOnThemeChange(BaseComponent.name);
    }

    render() {
      const { theme } = this.state;

      const isLightTheme = theme == null ? null : theme === 'light';

      return <BaseComponent {...this.props} isLightTheme={isLightTheme} />;
    }
  }

  return injectTheme;
}
