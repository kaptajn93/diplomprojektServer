import React from 'react';

import { Link, browserHistory, router } from 'react-router'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import ListItem from 'material-ui/lib/lists/list-item';
import styles from 'material-ui/lib/styles';

const {Grid, Row, Col} = require('react-flexgrid');
const colors = styles.Colors;

var logoStyle = {
  height : '26px',
  marginTop: '12px'
}

var whiteBackgroundStyle = {
  backgroundColor: 'white'
}


const NavBar =React.createClass({
  contextTypes : {
    router: React.PropTypes.func.isRequired
  },
  handleSubmit: function (event) {
    window.location.assign("/#/administration");
  },

    /*<RaisedButton label="Administrator" primary={true}  onClick={this.handleSubmit}/>*/
  render: function(){
    return (
      <Paper  zDepth={1}>
        <Toolbar style={whiteBackgroundStyle}>
          <Row>
            <Col xs={0} sm={0} md={2} lg={2}/>

            <Col xs={12} sm={12} md={8} lg={8}>
            <ToolbarGroup firstChild={false} float="left">
              <img alt="" src="./assets/logo.svg" style={logoStyle}  />
            </ToolbarGroup>
              <ToolbarGroup firstChild={false} float="left">
                <FlatButton label="Better ways" linkButton={true} containerElement={<Link to="/" />} />
              </ToolbarGroup>

              <ToolbarGroup float="right">
              <ListItem
                disabled={false}
                rightAvatar={<Avatar>J</Avatar>}
              >
                <span  style={{marginRight:8}}>Jens Jørgensen</span>
              </ListItem>
              </ToolbarGroup>
            </Col>
            <Col xs={0} sm={0} md={2} lg={2}/>
          </Row>
        </Toolbar>
      </Paper>
    );
  }
});

export default NavBar;
