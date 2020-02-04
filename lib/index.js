// Entry point for your plugin
// This should expose your plugin's modules
/* START IMPORTS */
import DecoratedHomepage from './components/Homepage';

let _DecoratedHomepage = DecoratedHomepage

/* END IMPORTS */

/* START EXPORTS */

export const metadata = {
  name: 'bpanel-homepage',
  pathName: 'home',
  displayName: 'Home',
  author: 'Sky Young <skyoung@mediciland.com>',
  description: 'A bPanel plugin for displaying blockchain information on a Homepage of the application',
  version: require('../package.json').version,
  sidebar: true,
  icon: 'home',
  order: 0
};

// special plugin decorator to allow other plugins to decorate this plugin
// the component is cached so that it is available for the main decorator below
// (`decoratePanel`) and cached component passed to pluginDecorator
export const decorator = (pluginDecorator, { React, PropTypes }) => {
  _DecoratedHomepage = pluginDecorator(_DecoratedHomepage, {
    React,
    PropTypes
  });
};

// a decorator for the Panel container component in our app
// here we're extending the Panel's children by adding
// our plugin's component (`MyComponent` below)
// You'll want to make sure to import an actual component
// This is what you need if you're making a new view/route
export const decoratePanel = (Panel, { React, PropTypes }) => {
  return class extends React.PureComponent {
    static displayName() {
      return 'bPanel Dashboard';
    }

    static get propTypes() {
      return {
        customChildren: PropTypes.array
      };
    }

    render() {
      const { customChildren = [] } = this.props;
      const routeData = {
        metadata,
        Component: _DecoratedHomepage
      };
      return (
        <Panel
          {...this.props}
          customChildren={customChildren.concat(routeData)}
        />
      );
    }
  };
};