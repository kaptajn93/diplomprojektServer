import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import Comment from 'material-ui/lib/svg-icons/communication/comment';

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
  height : '180px',
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
  margin:'8px',
  backgroundColor: '#fafafa',
  padding: '24px'
}

var transparentBackground = {
  backgroundColor: 'transparent'
}

const Dashboard = () => (
  <div style={pageContainerStyle}>
    <Row>
      <Col xs={0} sm={0} md={2} lg={2}/>
      <Col xs={12} sm={12} md={8} lg={8}>
        <Paper style={courseContainerStyle}>
          <div style={paddingStyle}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h1 style={title}>Better <span style={primaryText}>ways</span></h1>
                <h3 style={slogalStyle}>Din vej til en ny fremtid</h3>
                <hr/>
              </Col>
            </Row>
            <Row style={noMargin}>
              <Col xs={12} sm={12} md={7} lg={7}>
                <Row style={widgedStyle}>
                  <Col xs={7} sm={7} md={7} lg={7}>
                    <h2 style={smallTitle}>Uge 1/12</h2>
                    <h3 style={bigSubtitle}>Fyret. Hvad nu?</h3>
                    <p style={cardArticleText}>In eu dui felis. Vestibulum interdum magna sed justo dignissim, eget interdum orci condimentum. Donec in lobortis erat, id volutpat arcu. Sed commodo varius risus, nec venenatis felis elementum nec.</p>

                    <RaisedButton label="Fortsæt" primary={true} />
                  </Col>
                  <Col xs={5} sm={5} md={5} lg={5}>
                    <img alt="" src="./assets/week1.svg" style={logoStyle}  />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={12} md={5} lg={5}>
                <Row style={widgedStyle}>

                  <Col xs={12} sm={12} md={12} lg={12}>
                    <h2 style={title}><Comment color={Colors.grey500} /> Samtaler</h2>
                    <h5 style={slogalStyle}>Dine seneste samtaler</h5>
                    <hr/>
                    <List style={transparentBackground}>
                      <ListItem
                        leftAvatar={<Avatar src="assets/drphil.jpg" />}
                        primaryText="Dine styrker skal frem i lyset. Jeg vil anbefale..."
                        secondaryText="Fra Dr. Phil, Jan 28, 2016"
                      />
                      <ListItem
                        leftAvatar={<Avatar src="assets/jens.jpg"   />}
                        primaryText="Etiam quis odio id neque blandit venenatis. Mauris..."
                        secondaryText="Fra Jens, Jan 22, 2016"
                      />
                    </List>

                        <FlatButton label="Se flere"  secondary={true}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Paper>

      </Col>
      <Col xs={0} sm={0} md={2} lg={2}/>
    </Row>
  </div>
)

export default Dashboard
