import React from 'react';
import { connect } from 'react-redux';
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
import { Link, browserHistory } from 'react-router';
import { getCurrentUserResult } from '../actions/api';
import CircularProgress from 'material-ui/lib/circular-progress';
import RightArrow from 'material-ui/lib/svg-icons/navigation/chevron-right';
import LeftArrow from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/lib/icon-button';
import Check from 'material-ui/lib/svg-icons/navigation/check';
import Send from 'material-ui/lib/svg-icons/content/send';
import Attach from 'material-ui/lib/svg-icons/editor/attach-file';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

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
  height : '140px',
  marginTop: '32px',
  marginLeft: '16px'
}

var mutedText = {
  color: '#888888'
}

var sloganStyle = {
  color: '#888888',
  marginTop:'4px'
}

var widgedSubheaderStyle = {
  color: '#888888',
  marginTop:'4px',
  marginBottom:'0'
}

var bigSubtitle = {
  marginTop:'4px'
}

var smallTitle = {
  color: '#888888',
  marginBottom:'0',
  marginTop:0
}

var title = {
  marginBottom:'4px'
}

var cardArticleText = {
  marginBottom:0
}

var noMargin = {
  margin:'0'
}

var widgedStyle = {
  margin:'8px',
  backgroundColor: '#f9f9f9',
  padding: '20px 30px'
}

var transparentBackground = {
  backgroundColor: 'transparent'
}

var linkButton = {
  backgroundColor: '#ff4081'
}




let DialogModule = React.createClass({
  getInitialState:function(){
    return{

    }
  },
  render: function() {
    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>

          <Col xs={12} sm={12} md={8} lg={8}>
            <Paper style={courseContainerStyle}>
              <div style={paddingStyle}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <h1 style={title}>Dine samtaler</h1>
                    <h3 style={sloganStyle}>Vælg en person og skriv</h3>
                    <hr/>
                  </Col>
                </Row>
                <Row style={noMargin}>
                  <Col xs={12} sm={12} md={12} lg={4}>
                    <List subheader="Seneste samtaler" style={{marginTop: 16}}>
                      <ListItem
                        primaryText="Dr. Phil"
                        secondaryText={
                          <p>
                            <span style={{color: Colors.darkBlack}}>Din coach</span> --
                            Hej Jørgen Jeg er din coach og er til rådighed her på chatten. Jeg glæder mig til at høre fra dig.
                          </p>
                        }
                        secondaryTextLines={2}
                        leftAvatar={<Avatar src="assets/drphil.jpg" />}
                      />
                      <ListItem
                        primaryText="Jens Jørgen"
                        secondaryText={
                          <p>
                            <span style={{color: Colors.darkBlack}}>Din ven</span> --
                            Det var en fin præsentation, den kunne jeg godt lide.
                          </p>
                        }
                        secondaryTextLines={2}
                        leftAvatar={<Avatar src="assets/jens.jpg" />}
                      />
                    </List>

                  </Col>
                  <Col xs={12} sm={12} md={12} lg={8}>
                    <div style={widgedStyle}>
                      <div style={{height: 500}}>
                      <Card>
                        <CardHeader
                          title="Dr. Phil"
                          subtitle="Jan 28, 2016"
                          actAsExpander={false}
                          showExpandableButton={false}

                          avatar="assets/drphil.jpg"
                        />
                        <CardText>
                          Hej Jørgen<br/>Jeg er din coach og er til rådighed her på chatten. Jeg glæder mig til at høre fra dig.
                        </CardText>
                        <CardActions expandable={true}>
                          <FlatButton label="Action1"/>
                          <FlatButton label="Action2"/>
                        </CardActions>
                      </Card>
                      </div>
                      <Divider />
                      <div>
                        <div style={{display:'flex'}}>
                          <TextField
                            style={{width:'100%'}}
                            floatingLabelText="Besked til Dr. Phil"
                            multiLine={true}
                            rows={1}
                            rowsMax={4}
                          />
                          <div style={{width:300, display:'flex'}}>
                            <RaisedButton label="Send" labelPosition="before" icon={<Send />} style={{marginTop: 28, marginLeft: 16, width:100}} primary={true} onClick={this.navigateToActiveModule} />
                            <RaisedButton label="Vedhæft" labelPosition="before" icon={<Attach />} style={{marginTop: 28, marginLeft: 16, width:140}} secondary={true} onClick={this.navigateToActiveModule} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Paper>

          </Col>
          <Col xs={0} sm={0} md={2} lg={2}/>

        </Row>
      </div>);
  }
});

DialogModule = connect()(DialogModule)

export default DialogModule
