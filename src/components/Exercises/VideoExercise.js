import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Replay from 'material-ui/lib/svg-icons/av/replay';
import Record from 'material-ui/lib/svg-icons/av/fiber-manual-record'
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';

import TextField from 'material-ui/lib/text-field';

import CircularProgress from 'material-ui/lib/circular-progress';
import Video from '../Video';

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
      phase: scoreCard.phase,
      firstName:scoreCard.firstName,
      lastName:scoreCard.lastName,
      email:scoreCard.email,
      userMessage:scoreCard.userMessage,
      messageHeading:"Besked til din ven",
      videoUuid: scoreCard.videoUuid,
      videoReply: scoreCard.videoReply,
      reviewerFirstName: scoreCard.reviewerFirstName,
      reviewerLastName: scoreCard.reviewerLastName,
      reviewerEmail: scoreCard.reviewerEmail
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

    /*if (this.props.onFinished !== undefined)
      this.props.onFinished(items);*/

      //Update server
    if (this.props.liveExercise){
      this.props.dispatch(putExerciseVideoResultById(this.props.exerciseId, {exerciseId:this.props.exerciseId, isCompleted:false, phase:1}));
      this.props.exercisesStatusChanged(true, this.props.exercise);
    }

  },

  onSubmitReviewUser: function(){
    this.setState({
      isSubmittingReviewUser:true
    });

      //Update server
    if (this.props.liveExercise){
      this.props.dispatch(putExerciseVideoResultById(this.props.exerciseId, {
        exerciseId:this.props.exerciseId, isCompleted:false,
        phase:2,
        reviewerFirstName:this.state.firstName,
        reviewerLastName:this.state.lastName,
        reviewerEmail:this.state.email,
        mesageToReviewer:this.state.userMessage,
      })).then(json => {

        this.setState({
          phase: 2
        });
        window.location.assign('/#/videorecord/' + this.props.exerciseId);
      });
      this.props.exercisesStatusChanged(true, this.props.exercise);
    }
  },

  navigateToRecord: function(){
    window.location.assign('/#/videorecord/' + this.props.exerciseId);
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
        "Hej " + event.target.value + ", jeg håber at du vil hjælpe mig feedback. Fortæl mig hvad du synes, og hvad jeg kan ændre."
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
        <div dangerouslySetInnerHTML={this.getHtmlText(2)} style={{ marginTop:32}}></div>
        <RaisedButton primary={true}
          label="Fortsæt" icon={<Play />} onClick={this.onSubmitReviewUser}></RaisedButton>
      </div>
    }

    else if (this.state.phase === 2){
      mainContent =
        <div>
          <div dangerouslySetInnerHTML={this.getHtmlText(3)}></div>
          <p>Modtager: {this.state.reviewerFirstName} {this.state.reviewerLastName} ({this.state.reviewerEmail})</p>
          <RaisedButton secondary={true}
            label='Vælg en ande modtager' icon={<Replay />} onClick={this.onStart}></RaisedButton>
          <RaisedButton primary={true}
            label='Begynd at optage' icon={<Record />} style={{marginLeft:16}} onClick={this.navigateToRecord}></RaisedButton>

        </div>
    }

    else if (this.state.phase === 3){
      mainContent =
        <div>
          <div dangerouslySetInnerHTML={this.getHtmlText(4)}></div>
          <div style={{padding:8, textAlign:'center', background:'#060606', marginTop:32}}>
            <Video uuid={this.state.videoUuid}></Video>
          </div>
        </div>
    }

    else if (this.state.phase === 4){
      mainContent =
        <div>
          <h3>Du har fået svar fra {this.state.reviewerFirstName}:</h3>
          <div style={{background:Theme.palette.primary2Color, color:Theme.palette.alternateTextColor, padding:'8 24'}}>
            <p><i>
              {
                this.state.videoReply.split("\n").map((i, index) => (
                  <span>{i} { index < this.state.videoReply.split("\n").length - 1 ?  <br/> : null}</span>))
              }
            </i></p>
          </div>

          <div style={{padding:8, textAlign:'center', background:'#060606', marginTop:16}}>
            <Video uuid={this.state.videoUuid}></Video>
          </div>
          <div style={{marginTop:32}} dangerouslySetInnerHTML={this.getHtmlText(5)}></div>
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
