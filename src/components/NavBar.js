import React from 'react';
import { connect } from 'react-redux'

import { Link, browserHistory, router } from 'react-router'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import Paper from 'material-ui/lib/paper';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import ListItem from 'material-ui/lib/lists/list-item';
import styles from 'material-ui/lib/styles';
import { getCurrentUser, resetCourseAdmission } from '../actions/api';
import { logOut } from '../actions/authentication';

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
    var that =this;
    this.props.loginState.isLoggedIn = function(isLoggedIn){
      if (isLoggedIn){
        that.props.dispatch(getCurrentUser()).then(
          json => {
          that.setState({
            currentUser: json.user
          });
        });
      }
      else
        that.setState({
          currentUser: null
        });
    }
    this.props.dispatch(getCurrentUser()).then(
      json => {
      this.setState({
        currentUser: json.user
      });
    });
  },

  handleLogOut: function(){
    logOut();
    this.setState({
      currentUser: null
    });
    window.location.assign("/#/");
  },

  handleResetCourse: function(){
    this.props.dispatch(resetCourseAdmission()).then(
      json => {
        window.location.assign("/#/");
      }
    )
  },

  navigateHome: function(){

  },

    /*<RaisedButton label="Administrator" primary={true}  onClick={this.handleSubmit}/>*/
  render: function(){
    var userAvatar = this.state.currentUser !== null && this.state.currentUser !== undefined ?

      <ToolbarGroup style={{display:'flex'}} float="right">
        <ListItem
          disabled={false}
          rightAvatar={<Avatar>{this.state.currentUser.firstName[0]}</Avatar>}>
          <span  style={{marginRight:12}}>{this.state.currentUser.firstName} {this.state.currentUser.lastName}</span>


        </ListItem>

        <IconMenu style={{paddingTop:4}}
          iconButtonElement={<IconButton><NavigationExpandMoreIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        { sessionStorage.sessionUserRole !== 'Admin' ?
          <MenuItem primaryText="Genstart kursus" onClick={this.handleResetCourse}/> : null }
          <MenuItem primaryText="Log ud" onClick={this.handleLogOut}/>
        </IconMenu>
      </ToolbarGroup> : null;

    return (
      this.state.currentUser !== null && this.state.currentUser !== undefined ?
      <Paper  zDepth={1}>
        <Toolbar style={whiteBackgroundStyle}>
          <Row>
            <Col xs={0} sm={0} md={2} lg={2}/>

            <Col xs={12} sm={12} md={8} lg={8}>
            <ToolbarGroup firstChild={false} float="left">
              <img alt="" src="./assets/logo.svg" style={logoStyle}  />
            </ToolbarGroup>
              <ToolbarGroup firstChild={false} float="left">
                {
                  sessionStorage.sessionUserRole !== 'Admin' ?
                  <FlatButton label="Better ways" linkButton={true} containerElement={<Link to="/" />} />
                  : null
                }
              </ToolbarGroup>
              {userAvatar}
            </Col>
            <Col xs={0} sm={0} md={2} lg={2}/>
          </Row>
        </Toolbar>
      </Paper> : null
    );
  }
});

NavBar = connect()(NavBar)

export default NavBar;
