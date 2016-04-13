import React from 'react'

import NavBar from './NavBar'
import Footer from './Footer'
import Theme from './Theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager';

const App = React.createClass( {

  //the key passed through context must be called "muiTheme"
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    };
  },

  render: function() {
    return (
      <div>
        <NavBar loginState={this.props.route.loginState} />
          {this.props.children}
        <Footer />
      </div>
    );
  }
});


export default App
