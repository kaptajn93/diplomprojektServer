import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import RaisedButton from 'material-ui/lib/raised-button';

import Paper from 'material-ui/lib/paper';

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
};

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};

var paddingStyle = {
  padding: '32px'
}

var primaryText = {
  color:'#ff4081'
}

var logoStyle = {
  height : '200px',
    marginTop: '32px',
    marginLeft: '16px'
}

var mutedText = {
  color: '#888888'
}

var slogalStyle = {
  color: '#888888',
  marginTop:'4px'

}

var bigSubtitle = {
  marginTop:'4px'
}

var smallTitle = {
  color: '#888888',
  marginBottom:'0'
}

var title = {
  marginBottom:'4px'
}

var cardArticleText = {
  maxWidth:'350px'
}

var noMargin = {
  margin:'0'
}

var widgedStyle = {
  margin:'0',
  backgroundColor: '#fafafa',
  padding: '16px'
}

const Dashboard = () => (
  <div style={pageContainerStyle}>
    <Row>
      <Col xs={0} sm={0} md={2} lg={2}/>
      <Col xs={12} sm={12} md={8} lg={8}>
        <Paper style={courseContainerStyle}>
          <div style={paddingStyle}>
            <h1 style={title}>Better <span style={primaryText}>ways</span></h1>
            <h3 style={slogalStyle}>Din vej til en ny fremtid</h3>
            <hr/>
            <Row style={noMargin}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Row style={widgedStyle}>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <h2 style={smallTitle}>Uge 1/12</h2>
                    <h3 style={bigSubtitle}>Fyret. Hvad nu?</h3>
                    <p style={cardArticleText}>In eu dui felis. Vestibulum interdum magna sed justo dignissim, eget interdum orci condimentum. Donec in lobortis erat, id volutpat arcu. Sed commodo varius risus, nec venenatis felis elementum nec.</p>

                    <RaisedButton label="Fortsæt" primary={true} />
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <img alt="" src="./assets/week1.svg" style={logoStyle}  />
                  </Col>
                </Row>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}></Col>
            </Row>
          </div>
        </Paper>

      </Col>
      <Col xs={0} sm={0} md={2} lg={2}/>
    </Row>
  </div>
)

export default Dashboard
