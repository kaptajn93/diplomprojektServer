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
    };
  },

  getResource : function(resourceId){
    if (resourceId === undefined ||resourceId === null)
      return;

    this.setState({isLoadingResource:true, exerciseElements:[]});
    this.props.dispatch(getExerciseResourceById(resourceId)).then(
      json => {
      this.setState({
        exerciseElements : json.resource.elements,
        isLoadingResource:false
      });

      //Set all elements not completed
      for (var i = 0; i < json.resource.elements.length; i++) {
        json.resource.elements[i].isComplete = false;
      }

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
    if (nextProps.resourceId !== undefined)
      this.getResource(nextProps.resourceId);

    if (nextProps.isActive){
      this.setState({isActive:nextProps.isActive});
    }
  },

  exerciseStatusChanged: function(isComplete, exercise){
    exercise.isComplete = isComplete;
    var numComplete = this.state.exerciseElements.filter(e => e.isComplete).length;

    this.props.exercisesStatusChanged(numComplete === this.state.exerciseElements.length);
    this.setState({numComplete: numComplete})
  },

  render : function() {
    var firstIncomplete = this.state.exerciseElements.filter(e => !e.isComplete)[0];
    var complete = this.state.exerciseElements.filter(e => e.isComplete);

    if (firstIncomplete !== undefined)
      complete.push(firstIncomplete);

    var Elements = this.state.isActive ? complete.map((i, index) => (
      <div key={index}>
        <div dangerouslySetInnerHTML={{__html:i.content}} />
        <ExerciseSelector onExerciseGoalUpdated={this.props.onExerciseGoalUpdated} exerciseGoalText={this.props.exerciseGoalText} exercisesStatusChanged={this.exerciseStatusChanged} exerciseSelection={i} liveExercise={true}></ExerciseSelector>
      </div>
    )) :
    <div><h2 style={{textAlign:'center'}}>Du mangler at færdiggøre eksperimentet</h2></div>;


    return (
      <div>
        {Elements}
      </div>
    );
  }
});
CourseModuleExperiment = connect()(CourseModuleExperiment)

export default CourseModuleExperiment;


/*<h1>Opgave 1</h1>
<h3>Hvad var godt ved dit gamle job?</h3>
<p>Prøv at sortér begreberne herunder ift. hvad du bedst kunne lide ved dit gamle job</p>

<SortableList/>

<h1>Opgave 2</h1>
<h3>Hvordan præsenterer du dig selv?</h3>
<p>Film en præsentation af dig selv og del den med en ven</p>

<Camera onPublish={videoUuid => {
    console.log("onPublish invoked");
    console.log(videoUuid);

    dispatch(shareVideo(videoUuid));
}}>
</Camera>

<div style={{textAlign: 'center', marginTop: 50}}>
  <RaisedButton label="Færdig" primary={true} />
</div>*/
