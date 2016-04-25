import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';

import TextField from 'material-ui/lib/text-field';

import CircularProgress from 'material-ui/lib/circular-progress';
import Camera from '../Camera';
import { shareVideo } from '../../actions/shareVideo';

import { putExerciseVideoResultById, getExerciseResult } from '../../actions/api'
import Theme from '../Theme';

let VideoExercise = React.createClass({
  hasChangedUserMaessage: false,
  getInitialState: function() {
    return {
        isLoading: false,
        instrunctionContent: this.props.exercise.instrunctionContent,
        phase: 0,
        firstName:"",
        lastName:"",
        email:"",
        userMessage:"",
        messageHeading:"Besked til din ven"
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
    });
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      instrunctionContent: nextProps.exercise.instrunctionContent
    });
  },

  onStart: function(){
    this.setState({
      phase: 1
    }, function(){
      this.refs.firstNameInput.focus()
    });

    if (this.props.onFinished !== undefined)
      this.props.onFinished(items);

      //Update server
    if (this.props.liveExercise){
      this.props.dispatch(putExerciseVideoResultById(this.props.exerciseId, {exerciseId:this.props.exerciseId, isCompleted:true}));
      this.props.exercisesStatusChanged(true, this.props.exercise);
    }

  },

  getHtmlText: function(textIndex){
    var text = this.state.instrunctionContent.length > textIndex ?
      this.state.instrunctionContent[textIndex] : "";

    return {__html:text };
  },

  firstNameChange:function(event){
    this.setState({
      firstName: event.target.value,
      messageHeading: "Besked til " + event.target.value,
      userMessage: this.hasChangedUserMaessage ? this.state.userMessage :
        "Hej " + event.target.value + ", jeg håber at du vil hjælpe mig ved at anmelde min profilvideo, hvis du har tid. Det vil jeg sætte stor pris på!"
    });
  },

  lastNameChange:function(event){
    this.setState({
      lastName: event.target.value
    });
  },

  emailChange:function(event){
    this.setState({
      email: event.target.value
    });
  },

  userMessageChanged:function(event){
    this.hasChangedUserMaessage = true;
    this.setState({
      userMessage: event.target.value,
    });
  },

  render: function(){

    var mainContent;
    if (this.state.isLoading)
      mainContent = <CircularProgress size={0.4} style={{marginTop: '6px'}} />;
    else if (this.state.phase === 0) {
      mainContent =
      <div>
        <div dangerouslySetInnerHTML={this.getHtmlText(0)}></div>
        <RaisedButton primary={true}
          label="Start øvelse" icon={<Play />} onClick={this.onStart}></RaisedButton>
      </div>
    }
    else if (this.state.phase === 1) {
      mainContent =
      <div>
        <div dangerouslySetInnerHTML={this.getHtmlText(1)}></div>
        <TextField floatingLabelText="Fornavn" ref="firstNameInput"
          value={this.state.firstName}
          onChange={this.firstNameChange}/><br/>
        <TextField floatingLabelText="Efternavn"
          value={this.state.lastName}
          onChange={this.lastNameChange}/><br/>
        <TextField floatingLabelText="Email"
          value={this.state.email}
          onChange={this.emailChange}/><br/>
        <TextField floatingLabelText={this.state.messageHeading} style={{width:500}}
          value={this.state.userMessage}
          onChange={this.userMessageChanged}
          multiLine={true}
      rows={1}
      rowsMax={4}/><br/>
        <RaisedButton primary={true} style={{marginTop:32}}
          label="Fortsæt" icon={<Play />} onClick={this.onFinished}></RaisedButton>
      </div>
    }

    else if (this.state.phase === 2){
      mainContent =
        <div>
          <div dangerouslySetInnerHTML={this.getHtmlText(2)}></div>


        </div>
    }

    return (
      <div style={{background:Theme.palette.backgroundColor, padding:'32px'}}>
        {mainContent}
      </div>);
  }
});

VideoExercise = connect()(VideoExercise);

export default VideoExercise;
