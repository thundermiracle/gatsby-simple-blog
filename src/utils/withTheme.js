import React from 'react';

export default function withTheme(BaseComponent) {
  class injectTheme extends React.Component {
    state = {
      theme: null,
    };

    componentDidMount() {
      console.log('BaseComponent.name:', BaseComponent.name);
      this.setState({ theme: window.__theme });
      window.__onThemeChangeFuncObj[BaseComponent.name] = () => {
        this.setState({ theme: window.__theme });
      };
    }

    componentWillUnmount() {
      Reflect.deleteProperty(window.__onThemeChangeFuncObj, BaseComponent.name);
    }

    render() {
      const { theme } = this.state;

      const isLightTheme = theme == null ? null : theme === 'light';

      return <BaseComponent {...this.props} isLightTheme={isLightTheme} />;
    }
  }

  return injectTheme;
}
