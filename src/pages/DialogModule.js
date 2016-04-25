import React from 'react';
import { connect } from 'react-redux';
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import OpenInNew from 'material-ui/lib/svg-icons/action/open-in-new';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import Comment from 'material-ui/lib/svg-icons/communication/comment';
import { Link, browserHistory } from 'react-router';
import {  getUserDialogs, postDialogMessage } from '../actions/api';
import CircularProgress from 'material-ui/lib/circular-progress';
import RightArrow from 'material-ui/lib/svg-icons/navigation/chevron-right';
import LeftArrow from 'material-ui/lib/svg-icons/navigation/chevron-left';
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

import Theme from '../components/Theme';

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
  backgroundColor: Theme.palette.backgroundColor,
  padding: '20px 30px',
  height:500,
  overflowY: 'auto',
}

var transparentBackground = {
  backgroundColor: 'transparent'
}

var linkButton = {
  backgroundColor: '#ff4081'
}

let DialogModule = React.createClass({
  that: this,
  getInitialState:function(){
    return{
      isLoadingDialog: true,
      newMessageValue: "",
    }
  },
  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = this.refs['dialogEntriesContainer'];
      node.scrollTop = node.scrollHeight;
    }
  },
  componentDidMount : function(){
    this.setState({
      isLoadingDialog: true
    });

    //Load dialogs
    this.props.dispatch(getUserDialogs()).then(
      json => {
        //Format dates and username
        for (var i = 0; i < json.dialogs.userDialogs.length; i++) {
          var dialog = json.dialogs.userDialogs[i];
          for (var j = 0; j < dialog.entries.length; j++) {
            dialog.entries[j].timeStamp = new Date(dialog.entries[j].timeStamp);
            dialog.entries[j].displayName =  dialog.entries[j].senderId === sessionStorage.sessionUser ?
              'Dig' : dialog.entries[j].senderName;
          }
        }

        var that = this;

        this.setState({
          isLoadingDialog: false,
          userDialogs: json.dialogs.userDialogs,
          currentDialog: json.dialogs.userDialogs[0]
        }, function(){

            var node = this.refs['dialogEntriesContainer'];
            node.scrollTop = node.scrollHeight;
        });

      });
    },

    handleNewMessageChange: function(event){
      this.setState({
        newMessageValue: event.target.value,
      });
    },

    selectDialog:function(index){
      this.setState({
        currentDialog: this.state.userDialogs[index]
      });
      this.shouldScrollBottom = true;
    },

    openUserResults:function(user){
      window.location.assign("/#/exerciseResult/" + user);
    },

    handleSend: function(event){

      this.state.currentDialog.entries.push({
        senderName: sessionStorage.sessionFirstName,
        displayName: 'Dig',
        senderImageUrl: null,
        text: this.state.newMessageValue,
        timeStamp: new Date(),
        senderId: sessionStorage.sessionUser,
        senderImageUrl: sessionStorage.sessionImageUrl
      });
      this.setState({
        newMessageValue: ""
      });

      //Post to server
      this.props.dispatch(postDialogMessage(
        this.state.newMessageValue,
        this.state.currentDialog.sender,
        sessionStorage.sessionUser
      )).then(j => {
        var foo = 3;
      });

      this.shouldScrollBottom = true;
    },

  render: function() {
    var that = this;

    var entries = this.state.currentDialog !== undefined ?
     this.state.currentDialog.entries.map((e, index) => {
      return (
        <Card style={{
            marginBottom:16,
            marginLeft: e.senderId === sessionStorage.sessionUser ? 32 : 0,
            marginRight: e.senderId === sessionStorage.sessionUser ? 0 : 32}}>
          <CardHeader
            title={e.displayName}
            subtitle={<span>{e.timeStamp.toLocaleDateString()} - {e.timeStamp.toLocaleTimeString().substring(0, 5)}</span>}
            actAsExpander={false}
            showExpandableButton={false}
            avatar={<Avatar src={e.senderImageUrl} >{ e.senderImageUrl === null ? e.senderName[0] : null}</Avatar>}
          />
          <CardText style={{paddingTop:4}}>
            {
              e.text.split("\n").map((i, index) => (
                <span>{i} { index < e.text.split("\n").length - 1 ?  <br/> : null}</span>))
            }
          </CardText>
        </Card>) }
    ): null;

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
                    <hr/>
                  </Col>
                </Row>
                <Row style={noMargin}>
                  <Col xs={12} sm={12} md={12} lg={4}>
                    <List subheader="Seneste samtaler" style={{marginTop: 16}}>

                      {
                        this.state.isLoadingDialog ?
                          <CircularProgress size={0.6} style={{marginTop:16, width:'100%', textAlign:'center'}} />:

                          this.state.userDialogs.map((d, index) => {
                            return <ListItem
                                primaryText={d.senderFullName}
                                onClick={this.selectDialog.bind(this,index)}
                                style={{backgroundColor: that.state.currentDialog !== undefined && d.sender === that.state.currentDialog.sender ? Theme.palette.backgroundColor : Theme.palette.alternateTextColor}}
                                secondaryText={
                                  <p>
                                    {d.senderDescripton === '' ? null : <span style={{color: Colors.darkBlack}}>{d.senderDescripton} -- </span> }
                                    {d.latestEntry !== null ? d.latestEntry.text : null}
                                  </p>
                                }
                                secondaryTextLines={2}
                                rightIconButton={
                                  this.props.route.isCoachDialog ?
                                    <IconButton onClick={this.openUserResults.bind(this, d.sender)} iconStyle={{width: 20, height: 20}} tooltip="Se brugers resultater">
                                      <OpenInNew hoverColor={Colors.grey800}  color={Colors.grey500} />
                                    </IconButton> : null
                                }
                                leftAvatar={
                                  <Avatar src={d.senderImageUrl} >{ d.senderImageUrl === null ? d.senderFirstName[0] : null}</Avatar>
                                }
                              />
                          })

                      }
                    </List>

                  </Col>
                  <Col xs={12} sm={12} md={12} lg={8}>
                    <div >
                      <hr style={{margin: 0, display: 'block', border: 0, borderTop:'1px solid #D0D0D0'}}/>
                        <div style={widgedStyle} ref='dialogEntriesContainer' >
                        {
                          this.state.isLoadingDialog ?
                            <CircularProgress size={0.6} style={{marginTop:16, width:'100%', textAlign:'center'}} />
                            :
                            this.state.currentDialog === undefined || this.state.currentDialog === null ?
                              <p style={{color: Theme.palette.disabledColor}}>Vælg en samtale</p> :
                              <div>
                                {entries}
                              </div>
                        }
                        </div>
                      <hr style={{margin: 0, display: 'block', border: 0, borderTop:'1px solid #D0D0D0'}}/>
                      {
                        this.state.currentDialog === undefined ?
                        null :
                        <div>
                          <div style={{display:'flex'}}>
                            <TextField
                              style={{width:'100%'}}
                              floatingLabelText="Skriv en ny besked"
                              multiLine={true}
                              rows={1}
                              rowsMax={4}
                              value={this.state.newMessageValue}
                              onChange={this.handleNewMessageChange}
                            />
                            <div style={{width:300, display:'flex'}}>
                              <RaisedButton label="Send" labelPosition="before" onClick={this.handleSend} icon={<Send />} style={{marginTop: 28, marginLeft: 16, width:100}} primary={true}  />
                              <RaisedButton label="Vedhæft" labelPosition="before" icon={<Attach />} style={{marginTop: 28, marginLeft: 16, width:140}} secondary={true} />
                            </div>
                          </div>

                        </div>
                      }
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
