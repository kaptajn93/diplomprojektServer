import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';

import TextField from 'material-ui/lib/text-field';

import CircularProgress from 'material-ui/lib/circular-progress';

import { putQuestionAnswerResultById, getExerciseResult } from '../../actions/api'
import Theme from '../Theme';

let QuestionAnswerExercise = React.createClass({
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
      answerText: scoreCard.answer
    });
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      instrunctionContent: nextProps.exercise.instrunctionContent
    });
  },

  onAnswerTextChanged: function(evt){
    this.setState({
      answerText: evt.target.value
    });

  },

  onFinished: function(){
    this.setState({
      phase: 1
    });

    if (this.props.onFinished !== undefined)
      this.props.onFinished(items);

      //Update server
    if (this.props.liveExercise){
      this.props.dispatch(putQuestionAnswerResultById(this.props.exerciseId, {answer:this.state.answerText, exerciseId:this.props.exerciseId, isCompleted:true}));
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
          hintText="Skriv.." value={this.state.answerText} onChange={this.onAnswerTextChanged} multiLine={true}
        />
        <RaisedButton primary={true} style={{marginLeft:16}}
          label="Ok" icon={<Done />} onClick={this.onFinished}></RaisedButton>
      </div>
    }
    else if (this.state.phase === 1){
      mainContent =
      <div style={{marginTop:4}}>
        <div style={{color:'#777777', marginBottom:8, fontSize:'small'}} dangerouslySetInnerHTML={this.getHtmlText(0)}></div>
        <p style={{marginTop:-10}}>{this.state.answerText}</p>
      </div>
    }

    return (
      <div style={{background:Theme.palette.backgroundColor, padding:'32px'}}>
        {mainContent}
      </div>);
  }
});

QuestionAnswerExercise = connect()(QuestionAnswerExercise);

export default QuestionAnswerExercise;
