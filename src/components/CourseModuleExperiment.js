import React from 'react';
import { connect } from 'react-redux'

import ExerciseSelector from './Exercises/ExerciseSelector';

import { fetchApiValue } from '../actions/api'

import Camera from './Camera'

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import { shareVideo } from '../actions/shareVideo'

import { getExerciseResourceById } from '../actions/api'

let CourseModuleExperiment = React.createClass({
  getInitialState: function(){
    return {
      exerciseElements : [],
      isLoadingResource:false,
      currentIndex: -1
    };
  },

  getResource : function(resourceId){
    if (resourceId === undefined ||resourceId === null)
      return;

    this.setState({isLoadingResource:true, exerciseElements:[]});

    this.props.dispatch(getExerciseResourceById(resourceId)).then(
      json => {


      //Set all elements not completed
      /*for (var i = 0; i < json.resource.elements.length; i++) {
        json.resource.elements[i].isComplete = false;
      }*/

      for (var i = 0; i < json.resource.elements.length; i++) {
        json.resource.elements[i].scoreCard = this.props.results.filter(r => r.exerciseId === json.resource.elements[i].exerciseId)[0];
      }

      //Set all elements status based their scoreCard
      for (var i = 0; i < json.resource.elements.length; i++) {
        json.resource.elements[i].isCompleted = json.resource.elements[i].scoreCard !== undefined ?
          json.resource.elements[i].scoreCard.isCompleted: true;
      }

      var currentIndex = 0;
      var incompleted = json.resource.elements.filter(e => !e.isCompleted );

      if (incompleted.length > 0)
      {
        currentIndex = json.resource.elements.indexOf(incompleted[0]);
      }
      else if (this.props.isModuleActive)
        currentIndex = json.resource.elements.length - 1;

      if (incompleted.length === 0)
        this.props.exercisesStatusChanged(true);

      this.setState({
        exerciseElements : json.resource.elements,
        isLoadingResource:false,
        currentIndex:currentIndex
      });
      //this.props.exercisesStatusChanged(json.)

      this.currentResourceId = json.resource.id
    });
  },

  componentDidMount : function(){
    this.setState({
      isLoading:true,
      isActive: this.props.isActive === undefined ? true : this.props.isActive
    });

    if (this.props.resourceId !== undefined)
      this.getResource(this.props.resourceId);
  },

  componentWillReceiveProps: function(nextProps){
    /*if (nextProps.resourceId !== undefined)
      this.getResource(nextProps.resourceId);*/

    if (nextProps.isActive){
      this.setState({isActive:nextProps.isActive});
    }
  },

  exerciseStatusChanged: function(isCompleted, exercise){
    exercise.isCompleted = isCompleted;
    var numComplete = this.state.exerciseElements.filter(e => e.isCompleted).length;

    this.setState({
      currentIndex: Math.min(numComplete, this.state.exerciseElements.length - 1)
    });

    this.props.exercisesStatusChanged(numComplete === this.state.exerciseElements.length);
  },

  render : function() {
    //var firstIncomplete = this.state.exerciseElements.filter(e => !e.isComplete)[0];
    //var complete = this.state.exerciseElements.filter(e => e.isComplete);

    /*if (firstIncomplete !== undefined)
      complete.push(firstIncomplete);
      */

    var current = [this.state.exerciseElements[this.state.currentIndex]];
    var Elements = this.state.isActive ? current.map((i, index) => (
      <div key={index}>
        <div dangerouslySetInnerHTML={{__html:i.content}} />
        <ExerciseSelector
          onExerciseGoalUpdated={this.props.onExerciseGoalUpdated}
          exerciseGoalText={this.props.exerciseGoalText}
          exercisesStatusChanged={this.exerciseStatusChanged}
          exerciseSelection={i} liveExercise={true}
          scoreCard={i.scoreCard}></ExerciseSelector>
      </div>
    )) :
    <div><h2 style={{textAlign:'center'}}>Du mangler at færdiggøre eksperimentet</h2></div>;


    return (
      <div>
        <div></div>
        {Elements}
      </div>
    );
  }
});
CourseModuleExperiment = connect()(CourseModuleExperiment)

export default CourseModuleExperiment;
