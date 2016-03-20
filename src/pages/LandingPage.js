import React from 'react'
import FacebookButton from '../components/FacebookButton'

import Paper from 'material-ui/lib/paper';
import { Link, browserHistory } from 'react-router'

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
};

var landingPageContainerStyle = {
  background: 'white',
  marginTop: '32px'
};

var paddingStyle = {
  padding: '32px'
}

var primaryText = {
  color:'#ff4081'
}

var sloganStyle = {
  color: '#888888',
  marginTop:'4px'
}

var title = {
  marginBottom:'4px'
}

var noMargin = {
  margin:'0'
}

var handleSubmit = function (event) {
  window.location.assign("/#/module");
}

const LandingPage = () => (
  <div style={pageContainerStyle}>
    <Row>
      <Col xs={0} sm={0} md={2} lg={2}/>

      <Col xs={12} sm={12} md={8} lg={8}>
        <Paper style={landingPageContainerStyle}>
          <div style={paddingStyle}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h1 style={title}>Velkommen til Better <span style={primaryText}>Ways</span></h1>
                <h3 style={sloganStyle}>Din vej til en ny fremtid</h3>
                <hr/>
              </Col>
            </Row>
            <Row style={noMargin}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h3>Opret bruger</h3>
                <FacebookButton fb={FB} />

                <h3>Log ind</h3>
                <FacebookButton fb={FB} />
              </Col>
            </Row>
          </div>
        </Paper>
      </Col>

      <Col xs={0} sm={0} md={2} lg={2}/>
    </Row>
  </div>
)

export default LandingPage
