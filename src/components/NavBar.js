import React from 'react';
import { connect } from 'react-redux'

import { Link, browserHistory, router } from 'react-router'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import Paper from 'material-ui/lib/paper';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import Dialog from 'material-ui/lib/dialog';
import ListItem from 'material-ui/lib/lists/list-item';
import styles from 'material-ui/lib/styles';
import { resetCourseAdmissionToModule } from '../actions/api';
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
      isLoggedIn: sessionStorage.isLoggedIn,
      moduleIndexPromtOpen: false,
      selectedModule:0
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
      that.setState({
        isLoggedIn: isLoggedIn
      });
    }

  },

  handleLogOut: function(){
    logOut();
    this.setState({
      isLoggedIn: false
    });
    window.location.assign("/#/");
  },

  hamdlePromtResetCourse: function(){
    this.setState({
      moduleIndexPromtOpen:true
    })
  },

  handleCloseModulePrompt: function(){
    this.setState({
      moduleIndexPromtOpen:false
    })
  },

  handleResetCourse: function(){
    this.setState({
      isResetting:true
    });
    this.props.dispatch(resetCourseAdmissionToModule(this.state.selectedModule)).then(
      json => {
        window.location.assign("/#/");
        this.setState({
          isResetting:false,
          moduleIndexPromtOpen: false
        });
      }
    )
  },

  navigateHome: function(){

  },

  handleModuleChange: function(event, index, value) {
    this.setState({selectedModule:value})
  },

    /*<RaisedButton label="Administrator" primary={true}  onClick={this.handleSubmit}/>*/
  render: function(){
    var userAvatar = sessionStorage.isLoggedIn === "true" ?

      <ToolbarGroup style={{display:'flex'}} float="right">
        <ListItem
          disabled={false}
          rightAvatar={<Avatar src={sessionStorage.sessionImageUrl}>{sessionStorage.sessionImageUrl === null ? sessionStorage.sessionFirstName[0] : null}</Avatar>}>
          <span  style={{marginRight:12}}>{sessionStorage.sessionFirstName} {sessionStorage.sessionLastName}</span>


        </ListItem>

        <IconMenu style={{paddingTop:4}}
          iconButtonElement={<IconButton><NavigationExpandMoreIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        { sessionStorage.sessionUserRole !== 'Admin' ?
          <MenuItem primaryText="Genstart kursus" onClick={this.hamdlePromtResetCourse}/> : null }
          <MenuItem primaryText="Log ud" onClick={this.handleLogOut}/>
        </IconMenu>

        <Dialog
          title="Genstart kursus"
          actions={[
            <FlatButton
              label="Fortryd"
              disabled={this.state.isResetting}
              secondary={true}
              onTouchTap={this.handleCloseModulePrompt}
            />,
            <FlatButton
              label="Ok"
              disabled={this.state.isResetting}
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleResetCourse}
            />,
          ]}
          modal={true}
          open={this.state.moduleIndexPromtOpen}
          onRequestClose={this.handleCloseModulePrompt}
        >
          <div style={{display:'flex'}}>
            <p>Vælg hvilket modul du vil starte i:</p>
            <SelectField style={{marginLeft:16, marginTop:2}}
              disabled={this.state.isResetting}
              value={this.state.selectedModule} onChange={this.handleModuleChange}>
              <MenuItem value={0} primaryText="1"/>
              <MenuItem value={1} primaryText="2"/>
              <MenuItem value={2} primaryText="3"/>
              <MenuItem value={3} primaryText="4"/>
              <MenuItem value={4} primaryText="5"/>
              <MenuItem value={5} primaryText="6"/>
              <MenuItem value={6} primaryText="7"/>
              <MenuItem value={7} primaryText="8"/>
              <MenuItem value={8} primaryText="9"/>
              <MenuItem value={9} primaryText="10"/>
              <MenuItem value={10} primaryText="11"/>
              <MenuItem value={11} primaryText="12"/>
            </SelectField>
          </div>
        </Dialog>
      </ToolbarGroup> : null;

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
              {
                sessionStorage.isLoggedIn === "true" && sessionStorage.sessionUserRole !== 'Admin' ?
                <FlatButton label={<span>Better <strong>ways</strong></span>} linkButton={true} containerElement={<Link to="/" />} /> :
                <FlatButton label={<span>Better <strong>ways</strong></span>} linkButton={true} />
              }
              </ToolbarGroup>
              {userAvatar}
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
