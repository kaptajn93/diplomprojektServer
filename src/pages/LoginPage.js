import React from 'react'
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

const {Grid, Row, Col} = require('react-flexgrid');

import { loginUser } from '../actions/authentication'
import Theme from '../components/Theme';

var pageContainerStyle = {
  margin:'32px 20px'
};

var landingPageContainerStyle = {
  background: 'white',
  marginTop: '32px',
  width: 380,
  marginLeft:'auto',
  marginRight:'auto'
};

var paddingStyle = {
  padding: '32px'
}

var primaryText = {
  color:Theme.palette.primary1Color
}

var sloganStyle = {
  color: '#888888',
  marginTop:'4px'
}

var title = {
  marginBottom:'4px',
  textAlign: 'center'
}

var noMargin = {
  margin:'0'
}

let LoginPage = React.createClass({

  getInitialState: function() {
    return {
        userId: '',
        password: ''
    };
  },

  componentDidMount: function(){
    if (sessionStorage.getItem('isLoggedIn') === "true"){
      //We are logged in
      if (sessionStorage.sessionUserRoles.split(",").indexOf("Admin") >= 0)
        window.location.assign("/#/administration");
      else if (sessionStorage.sessionUserRoles.split(",").indexOf("Coach") >= 0)
        window.location.assign("/#/coachDialogOverview");
      else
        window.location.assign("/#/dashboard");
    }
  },

  handleSubmit: function (event) {
    var that = this;
    this.props.dispatch(loginUser({userId:this.state.userId, password:this.state.password})).then(
      json => {
        //We are logged in
        if (json.user.hasRole("Admin"))
          window.location.assign("/#/administration");
        else if (json.user.hasRole("Coach"))
          window.location.assign("/#/coachDialogOverview");
        else
          window.location.assign("/#/dashboard");

        if (that.props.route.loginState.isLoggedIn !== undefined)
          that.props.route.loginState.isLoggedIn(true);
      }
    ).catch(err => {
        var foo = 3;
      }
    );

    //window.location.assign("/#/dashboard");
  },

  handleUserIdChange: function(event) {
    this.setState({
      userId: event.target.value,
    });
  },

  handlePasswordChange: function(event){
    this.setState({
      password: event.target.value,
    });
  },

  render: function() {
    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>

          <Col xs={12} sm={12} md={8} lg={8}>
            <h1 style={title}>Better <span style={primaryText}>W</span>ays</h1>
            <div style={{textAlign:'center'}}>
              <Paper style={landingPageContainerStyle}>
                <div style={paddingStyle}>

                  <Row style={noMargin}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <h3>Velkommen</h3>
                      <TextField
                        floatingLabelText="Brugernavn"
                        type="text"

                        value={this.state.userId}
                        onChange={this.handleUserIdChange}
                      />
                      <br/>
                      <TextField
                        floatingLabelText="Password"
                        type="password"

                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                      <br/>
                      <RaisedButton onClick={this.handleSubmit} primary={true} style={{marginTop:32}} label="Log ind" />
                    </Col>
                  </Row>
                </div>
              </Paper>
            </div>
          </Col>

          <Col xs={0} sm={0} md={2} lg={2}/>
        </Row>
      </div>);
  }
});

LoginPage = connect()(LoginPage);

export default LoginPage
