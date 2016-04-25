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
import { getUserResult } from '../actions/api';
import CircularProgress from 'material-ui/lib/circular-progress';
import RightArrow from 'material-ui/lib/svg-icons/navigation/chevron-right';
import LeftArrow from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/lib/icon-button';
import Check from 'material-ui/lib/svg-icons/navigation/check';
import { getModuleExercises } from '../actions/api';
import ExerciseSelector from '../components/Exercises/ExerciseSelector';
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

var mutedText = {
  color: '#888888'
}

var widgedStyle = {
  margin:'8px',
  backgroundColor: '#f9f9f9',
  padding: '20px 30px'
}

var title = {
  marginBottom:'4px'
}

var sloganStyle = {
  color: '#888888',
  marginTop:'4px'
}

let ModuleExercise = React.createClass({

  render: function(){
    return this.props.ScoreCard.isCompleted ?
      <ExerciseSelector scoreCard={this.props.ScoreCard} exerciseSelection={this.props.ScoreCard.exercise} liveExercise={false}></ExerciseSelector>
      : null;
  }
});

let ExerciseResultPage = React.createClass({
  getInitialState:function(){
    return{
      title: "",
      isLoading: false,
      modules: []
    }
  },
  componentDidMount : function(){
    this.setState({
      isLoading:true
    });

    this.props.dispatch(getUserResult(this.props.params.userId)).then(
      json => {
        this.setState({
          isLoading:false,
          modules: json.results.moduleResults,
          user: json.results.user
        });
    });
  },


  render: function() {


    var modules = this.state.modules.length > 0 ? this.state.modules.map((element, i) =>{
      var isActiveOrComplete = element.moduleResults.some(e => e.isCompleted);

      return (
          <div>
            <h2 style={{color:isActiveOrComplete ? Theme.palette.textColor: Theme.palette.disabledColor  }}>{i + 1}. {element.module.name}</h2>
            {
              isActiveOrComplete ?
              <div>
              {
                element.moduleResults.map((element, index) => {
                  return (
                    <div style={{marginTop: index > 0 ? 16 : 0}}>
                      <ModuleExercise ScoreCard={element} />
                    </div>);
                })
              }
              </div> :
              <p style={{color: Theme.palette.disabledColor, marginLeft:16}}>Dette modul er ikke påbegyndt</p>
            }
          </div>
      )}
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
                    {
                      this.state.user !== undefined ?
                      <h1 style={title}>Resultater for {this.state.user.firstName} {this.state.user.lastName}</h1> :
                      null
                    }
                    <hr/>
                    {this.state.isLoading ? <div style={{textAlign:'center'}}> <CircularProgress size={0.4} style={{marginTop: '6px'}} /> </div>: null}
                    {modules}
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

ExerciseResultPage = connect()(ExerciseResultPage)

export default ExerciseResultPage
