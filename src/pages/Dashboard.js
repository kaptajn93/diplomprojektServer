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




let Dashboard = React.createClass({
  getInitialState:function(){
    return{

    }
  },

  navigateToCurrentModule: function (event) {
    window.location.assign("/#/module/" + this.state.currentModule.id);
  },

  navigateToDialog: function(event){
    window.location.assign("/#/dialog/");
  },

  componentDidMount : function(){
    this.setState({
      isLoading:true
    })
    this.props.dispatch(getCurrentUserResult()).then(
      json => {
      this.setState({
        results: json.results,
        modules: json.results.moduleResults,
        currentModule: json.results.activeModule,
        currentModuleResults: json.results.moduleResults[json.results.activeModuleIndex].moduleResults,
        currentModuleIndex: json.results.activeModuleIndex,
        activeModuleIndex: json.results.activeModuleIndex,
      });
    });
  },

  goToModule: function(index){
    this.setState({
      currentModule: this.state.modules[index].module,
      currentModuleResults: this.state.modules[index].moduleResults,
      currentModuleIndex: index,
    });
  },

  nextModule: function(){
    if (this.state.currentModuleIndex < this.state.modules.length - 1)
      this.goToModule(this.state.currentModuleIndex + 1);

  },

  previousModule: function(){
    if (this.state.currentModuleIndex > 0)
      this.goToModule(this.state.currentModuleIndex - 1);
  },

  render: function() {
    var actionButton = this.state.activeModuleIndex === this.state.currentModuleIndex ?
      <RaisedButton label="Fortsæt dit forløb" primary={true} onClick={this.navigateToCurrentModule} /> :
      this.state.activeModuleIndex > this.state.currentModuleIndex ?
        <RaisedButton label="Se resultat" secondary={true} onClick={this.navigateToCurrentModule} /> :
        null;

/*
            <List style={{background:'transparent', marginTop:0}}>
              {ExerciseResuts}
            </List>*/
    var ExerciseResuts = this.state.currentModuleResults !== undefined ? this.state.currentModuleResults.map((i, index) => (
      i.exerciseDescription === "" ? null :
      i.isCompleted ?
        <div style={{display:'flex'}}><Check style={{margin:'4px', width:20, height:20}} color={Colors.green400}  /> <span style={{marginTop:5, marginLeft:4}}>{i.exerciseDescription}</span></div> :
        <div style={{display:'flex'}}><Check style={{margin:'4px', width:20, height:20}} color={Colors.grey300}  /> <span style={{marginTop:5, marginLeft:4}}>{i.exerciseDescription}</span></div>

    )) : null;

    var courseOverview = this.state.currentModule !== undefined ? (
      <div style={{display:'table'}}>
        <div style={{display:'table-row'}}>


          <div style={{display:'table-cell', width:'100%', verticalAlign:'top'}}>
            <div style={{display:'flex'}}>
              {this.state.currentModuleIndex > 0 ?
                <FlatButton style={{width:24, height:24, minWidth:24, marginRight:8}} disabled={this.state.currentModuleIndex === 0}  onClick={this.previousModule}>
                  <LeftArrow  style={{width:24, height:24}}/>
                </FlatButton> : null}
              <h3 style={smallTitle}>Uge {this.state.currentModuleIndex + 1}/{this.state.modules.length}</h3>

              <FlatButton style={{width:24, height:24, minWidth:24, marginLeft:8}} onClick={this.nextModule}>
                <RightArrow style={{width:24, height:24}} />
              </FlatButton>
            </div>
            <h2 style={bigSubtitle}>{this.state.currentModule.name}</h2>
            <p style={cardArticleText}>{this.state.currentModule.description}</p>


            <div style={{marginTop:16}}>
              {ExerciseResuts}
            </div>

            <div style={{display: 'flex', marginTop:16}}>
              {actionButton}
            </div>
            <div style={{display: 'table', width:'100%'}}>
              <div style={{display: 'table-row', width:'100%'}}>
                <div style={{display: 'table-cell', width:'50%'}}></div>
                <div style={{display: 'table-cell'}}>

                </div>
                <div style={{display: 'table-cell', width:'50%'}}></div>
              </div>
            </div>
          </div>
          <div style={{display: 'table-cell', verticalAlign:'middle'}}>
          </div>
          <div style={{display:'table-cell', width:140}}>
            <img alt="" src="./assets/week1.svg" style={logoStyle}  />
          </div>
        </div>

      </div>
    ) : <div style={{textAlign:'center'}}> <CircularProgress size={0.6} style={{marginTop:60, marginBottom:60}} /> </div>;


    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Paper style={courseContainerStyle}>
              <div style={paddingStyle}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <h1 style={title}>Velkommen til Better <span style={primaryText}>Ways</span></h1>
                    <h3 style={sloganStyle}>Din vej til en ny fremtid</h3>
                    <hr/>
                  </Col>
                </Row>
                <Row style={noMargin}>
                  <Col xs={12} sm={12} md={12} lg={7}>
                    <div style={widgedStyle}>
                      {courseOverview}
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={5}>
                    <div style={widgedStyle}>

                      <h3 style={title}><Comment style={{height:'20px'}} color={Colors.grey500} /> Samtaler</h3>
                      <h5 style={widgedSubheaderStyle}>Fra Dr. Phil, Jan 28, 2016</h5>
                      <hr/>
                      <List style={transparentBackground}>
                        <ListItem onClick={this.navigateToDialog}
                          leftAvatar={<Avatar src="assets/drphil.jpg" />}
                          primaryText = {
                            <div>
                              <span>Hej Jørgen</span>
                              <p style={{marginBottom:'0'}}>Jeg er din coach og er til rådighed her på chatten. Jeg glæder mig til at høre fra dig.</p>
                            </div>
                          }
                        />
                      </List>
                      <div >
                        <FlatButton label="Skriv til Dr. phil" secondary={true} onMouseUp={this.navigateToDialog} />
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

Dashboard = connect()(Dashboard)

export default Dashboard
