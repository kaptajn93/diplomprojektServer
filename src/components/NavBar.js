import React from 'react';
import { connect } from 'react-redux'

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
import { getCurrentUser } from '../actions/api';

const {Grid, Row, Col} = require('react-flexgrid');
const colors = styles.Colors;

var logoStyle = {
  height : '26px',
  marginTop: '12px'
}

var whiteBackgroundStyle = {
  backgroundColor: 'white'
}


let NavBar =React.createClass({
  getInitialState:function(){
    return{

    }
  },

  contextTypes : {
    router: React.PropTypes.func.isRequired
  },
  handleSubmit: function (event) {
    window.location.assign("/#/administration");
  },

  componentDidMount : function(){
    this.props.dispatch(getCurrentUser()).then(
      json => {
      this.setState({
        currentUser: json.user
      });
    });
  },
    /*<RaisedButton label="Administrator" primary={true}  onClick={this.handleSubmit}/>*/
  render: function(){
    var userAvatar = this.state.currentUser !== null && this.state.currentUser !== undefined ?
      <ListItem
        disabled={false}
        rightAvatar={<Avatar>{this.state.currentUser.firstName[0]}</Avatar>}>
        <span  style={{marginRight:12}}>{this.state.currentUser.firstName} {this.state.currentUser.lastName}</span>
      </ListItem> : null;

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
                {userAvatar}
              </ToolbarGroup>
            </Col>
            <Col xs={0} sm={0} md={2} lg={2}/>
          </Row>
        </Toolbar>
      </Paper>
    );
  }
});

NavBar = connect()(NavBar)

export default NavBar;
