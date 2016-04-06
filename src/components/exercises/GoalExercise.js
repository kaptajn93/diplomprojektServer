import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';

import TextField from 'material-ui/lib/text-field';

import CircularProgress from 'material-ui/lib/circular-progress';

import { putExerciseGoalResultById, getExerciseResult } from '../../actions/api'

let GoalExercise = React.createClass({
  getInitialState: function() {
    return {
        isLoading: false,
        phase: 0
    };
  },

  componentDidMount: function(){
    //Update server
    if (this.props.liveExercise){
      this.setState({isLoading: true});
      this.props.dispatch(getExerciseResult(this.props.exerciseId)).then(
        json => {
          this.setState({
            isLoading: false,
            phase: json.result.isCompleted ? 1 : this.state.phase,
            goalText: json.result.goalText,
            previousModulePromiseText: json.result.previousModulePromiseText
          });

          this.props.exercisesStatusChanged(json.result.isCompleted, this.props.exercise);
        }
      );
    }

  },

  onGoalTextChanged: function(evt){
    this.setState({
      goalText: evt.target.value
    });

  },

  onFinished: function(){
    this.setState({
      phase: 1
    });

    if (this.props.onFinished !== undefined)
      this.props.onFinished(items);

    if (this.props.onGoalUpdated !== null)
      this.props.onExerciseGoalUpdated(this.state.goalText);

      //Update server
    if (this.props.liveExercise){
      this.props.dispatch(putExerciseGoalResultById(this.props.exerciseId, {goalText:this.state.goalText, exerciseId:this.props.exerciseId, isCompleted:true}));
      this.props.exercisesStatusChanged(true, this.props.exercise);
    }

  },

  render: function(){

    var mainContent;
    if (this.state.isLoading)
      mainContent = <CircularProgress size={0.4} style={{marginTop: '6px'}} />;
    else if (this.state.phase === 0) {
      mainContent =
      <div>
        <h4>Før vi går i gang skal du give dig selv et mål for øvelsen:</h4>
        <TextField style={{width: 400}}
          hintText="Mit mål er..." value={this.state.goalText} onChange={this.onGoalTextChanged}
        />
        <RaisedButton primary={true} style={{marginLeft:16}}
          label="Ok" icon={<Done />} onClick={this.onFinished}></RaisedButton>
      </div>
    }
    else if (this.state.phase === 1){
      mainContent =
        <div>
          <p><span style={{color:'#777777', marginBottom:8, fontSize:'small'}}>Dit mål for øvelsen:</span><br/>{this.state.goalText}</p>
        </div>
    }

    return (
      <div>
        {
          this.state.previousModulePromiseText !== undefined && this.state.previousModulePromiseText !== "" ?
          <p><span style={{color:'#777777', marginBottom:8, fontSize:'small'}}>I sidste modul, lovede du dig selv:</span><br/><span>{this.state.previousModulePromiseText}</span></p>
          :null
        }
        {mainContent}
      </div>);
  }
});

GoalExercise = connect()(GoalExercise);

export default GoalExercise;
