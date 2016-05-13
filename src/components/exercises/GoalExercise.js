import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';

import TextField from 'material-ui/lib/text-field';

import CircularProgress from 'material-ui/lib/circular-progress';

import { putExerciseGoalResultById, getExerciseResult } from '../../actions/api'
import Theme from '../Theme';

let GoalExercise = React.createClass({
  getInitialState: function() {
    return {
        isLoading: false,
        instrunctionContent: this.props.exercise.instrunctionContent,
        phase: 0
    };
  },

  componentDidMount: function(){
    //Update server
    if (this.props.liveExercise && this.props.scoreCard === undefined){
      this.setState({isLoading: true});
      this.props.dispatch(getExerciseResult(this.props.exerciseId)).then(
        json => {
          this.setScoreCard(json.result)

          this.props.exercisesStatusChanged(json.result.isCompleted, this.props.exercise);
        }
      );
    }
    else if (this.props.scoreCard !== undefined)
      this.setScoreCard(this.props.scoreCard);

  },

  setScoreCard: function(scoreCard){
    this.setState({
      isLoading: false,
      phase: scoreCard.isCompleted ? 1 : this.state.phase,
      goalText: scoreCard.goalText,
      previousModulePromiseText: scoreCard.previousModulePromiseText
    });
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      instrunctionContent: nextProps.exercise.instrunctionContent
    });
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

  getHtmlText: function(textIndex){
    var text = this.state.instrunctionContent.length > textIndex ?
      this.state.instrunctionContent[textIndex] : "";

    return {__html:text };
  },

  render: function(){

    var mainContent;
    if (this.state.isLoading)
      mainContent = <CircularProgress size={0.4} style={{marginTop: '6px'}} />;
    else if (this.state.phase === 0) {
      mainContent =
      <div>
        <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
        <TextField style={{width: 400}}
          hintText="Mit mål er..." value={this.state.goalText} onChange={this.onGoalTextChanged}
        />
        <RaisedButton primary={true} style={{marginLeft:16}}
          label="Ok" icon={<Done />} onClick={this.onFinished}></RaisedButton>
      </div>
    }
    else if (this.state.phase === 1){
      mainContent =
      <div style={{marginTop:4}}>
        <div style={{color:Theme.palette.disabledColor, marginBottom:8}} dangerouslySetInnerHTML={this.getHtmlText(0)}></div>
        <p style={{marginTop:-10}}>{this.state.goalText}</p>
      </div>
    }

    return (
      <div style={{background:Theme.palette.backgroundColor, padding:'32px'}}>
        {
          this.state.previousModulePromiseText !== undefined && this.state.previousModulePromiseText !== "" ?
          <div style={{marginTop:4, marginBottom:32}}>
            <div style={{color:Theme.palette.disabledColor, marginBottom:8}} dangerouslySetInnerHTML={this.getHtmlText(1)}></div>
            <p style={{marginTop:-10}}>{this.state.previousModulePromiseText}</p>
          </div>

          :null
        }
        {mainContent}
      </div>);
  }
});

GoalExercise = connect()(GoalExercise);

export default GoalExercise;
