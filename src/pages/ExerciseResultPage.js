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
import { getModuleExercises } from '../actions/api';
import ExerciseSelector from '../components/Exercises/ExerciseSelector';


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

let ExerciseResultPage = React.createClass({
  getInitialState:function(){
    return{
      title: "",
      isLoading: false,
      exercises: []
    }
  },
  componentDidMount : function(){
    this.setState({
      isLoading:true
    });

    this.props.dispatch(getModuleExercises(this.props.params.moduleId)).then(
      json => {
        this.setState({
          isLoading:false,
          title: json.exercises.title,
          exercises: json.exercises.exercises
        });
    });
  },


  render: function() {

    var exercises = this.state.exercises.length > 0 ? this.state.exercises.map((element, i) => element.elements).reduce(function(a,b){
        var foo =3;
        return a.concat(b);
      }).filter(function(element){
        return element.className !== null;
      }).map((element, index) => (
        <ExerciseSelector exerciseSelection={element}></ExerciseSelector>
      )) : null;
    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Paper style={courseContainerStyle}>
              <div style={paddingStyle}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <h1 style={title}>{this.state.title}</h1>
                    <hr/>
                    {this.state.isLoading ? <div style={{textAlign:'center'}}> <CircularProgress size={0.4} style={{marginTop: '6px'}} /> </div>: null}
                    {exercises}
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
