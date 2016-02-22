import React from 'react'

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../theme.js';

import NavBar from './NavBar'
import Footer from './Footer'

const App = React.createClass( {
  /*childContextTypes : {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
    };
  },*/

  render: function() {
    return (
      <div>
        <NavBar />
          {this.props.children}
        <Footer />
      </div>
    );
  }
});


export default App
