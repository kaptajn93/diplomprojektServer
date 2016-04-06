import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import RadioButton from 'material-ui/lib/radio-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';
import Timer from 'material-ui/lib/svg-icons/image/timer';


import CircularProgress from 'material-ui/lib/circular-progress';

import { putKpExplorerResultById, getExerciseResult } from '../../actions/api'

const styles = {
  radioButton: {
    marginTop: 8,
    width:24,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  scoreIndicator:{
    paddingRight: 24,
    display:'table-cell'
  }
};

let KPExplorerQuestionnaire = React.createClass({
  getInitialState: function() {
    var items = this.props.exercise.configuration.split(';');
    return {
        items:  items,
        resultItems: this.mapItems(items),
        instrunctionContent: this.props.exercise.instrunctionContent,
        phase: 0,
        isLoading: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var items = nextProps.exercise.configuration.split(';')
    this.setState({
      items: items,
      resultItems: this.mapItems(items),
      instrunctionContent: nextProps.exercise.instrunctionContent
    })
  },
  componentDidMount: function(){
    //Update server
    if (this.props.liveExercise){
      var that = this;
      this.setState({isLoading: true});
      this.props.dispatch(getExerciseResult(this.props.exerciseId)).then(
        json => {
          that.setState({
            isLoading: false,
            phase: json.result.isCompleted ? 2 : that.state.phase
          });

          that.props.exercisesStatusChanged(json.result.isCompleted, that.props.exercise);
        }
      );
    }

  },
  componentWillUnmount: function(){

      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:

      clearInterval(this.timer);
  },

  onStart: function(event){
    this.setState({
      phase: 1,
      questionIndex:0,
      elapsed:0,
      start: new Date()
    });

    this.timer = setInterval(this.tick, 1000);
  },

  tick: function(){
    this.setState({elapsed: new Date() - this.state.start});
  },

  mapItems: function(items){
    return items.map(function(i){
        return {
          question: i,
          score: -1,
        };
    })
  },

  onScoreChanged: function(event){
    this.state.resultItems[this.state.questionIndex].score = parseInt(event.target.value);
    this.setState({resultItems: this.state.resultItems});
  },

  onContinue: function(){
    if (this.state.questionIndex < this.state.resultItems.length -1){
      if (this.state.resultItems[this.state.questionIndex].score !== -1)
        this.setState({questionIndex: this.state.questionIndex + 1});
    }
    else
      this.onFinished();
  },

  onFinished: function(){
    this.setState({
      phase: 2
    });

    if (this.props.onFinished !== undefined)
      this.props.onFinished(items);

      //Update server
    if (this.props.liveExercise){
      var elapsed = Math.floor(this.state.elapsed / 1000);
      this.props.dispatch(putKpExplorerResultById(this.props.exerciseId, {responses:this.state.resultItems, exerciseId:this.props.exerciseId, isCompleted:true, elapsedTimeSeconds:elapsed}));

      //Signal that exercise has ended
      this.props.exercisesStatusChanged(true, this.props.exercise, this.props.exercise );
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
        <RaisedButton
          labelPosition="before" primary={true}
          label={'Start øvelse'} onClick={this.onStart}
          style={{marginTop:'16px'}}
          icon={<Play />}></RaisedButton>
      </div>
    }
    else if (this.state.phase === 1) {
      var elapsed = Math.floor(this.state.elapsed / 1000);

      // This will give a number with one digit after the decimal dot (xx.x):
      var seconds = (elapsed % 60).toFixed(0);
      var minuttes = (elapsed / 60).toFixed(0);
    mainContent = (
      <div style={{display:'table'}}>
        <div style={{display:'table-row'}}>
          <div style={{display:'table-cell'}}>
            <span>Udsagn: <strong>{this.state.questionIndex + 1}</strong> af {this.state.resultItems.length}</span> <Timer style={{fill:'#999999', marginLeft:32, marginBottom:-4, width:20, height:20}}/> <span>{minuttes} : {seconds}</span>
            <h3 style={{marginTop:40}}>{
              this.state.resultItems[this.state.questionIndex].question
            }</h3>
            <div style={{display:'table'}}>
              <div style={{display:'table-row'}}>

                <div style={styles.scoreIndicator}><span>Fuldstændig forkert</span></div>
                <div style={styles.scoreIndicator}><span>Delvis forkert</span></div>
                <div style={styles.scoreIndicator}><span>Hverken rigtigt eller forkert</span></div>
                <div style={styles.scoreIndicator}><span>Delvis rigtigt</span></div>
                <div style={styles.scoreIndicator}><span>Fuldstændig rigtigt</span></div>
              </div>
              <div style={{display:'table-row'}}>

                <div style={{display:'table-cell'}}>
                  <RadioButton
                    value="1"
                    style={styles.radioButton}
                    checked={this.state.resultItems[this.state.questionIndex].score === 1}
                    onCheck={this.onScoreChanged}
                  />
                </div>
                <div style={{display:'table-cell'}}>
                  <RadioButton
                    value="2"
                    style={styles.radioButton}
                    checked={this.state.resultItems[this.state.questionIndex].score === 2}
                    onCheck={this.onScoreChanged}
                  />
                </div>
                <div style={{display:'table-cell'}}>
                  <RadioButton
                    value="3"
                    style={styles.radioButton}
                    checked={this.state.resultItems[this.state.questionIndex].score === 3}
                    onCheck={this.onScoreChanged}
                  />
                </div>
                <div style={{display:'table-cell'}}>
                  <RadioButton
                    value="4"
                    style={styles.radioButton}
                    checked={this.state.resultItems[this.state.questionIndex].score === 4}
                    onCheck={this.onScoreChanged}
                  />
                </div>
                <div style={{display:'table-cell'}}>
                  <RadioButton
                    value="5"
                    style={styles.radioButton}
                    labelStyle={{display:'none'}}
                    checked={this.state.resultItems[this.state.questionIndex].score === 5}
                    onCheck={this.onScoreChanged}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{display:'table-row'}}>

        { this.state.questionIndex < this.state.resultItems.length - 1 ?
          <RaisedButton labelPosition="before" style={{marginTop: 32}} primary={true} disabled={this.state.resultItems[this.state.questionIndex].score === -1}
            label="Næste spørgsmål" icon={<Forward />}  onClick={this.onContinue}></RaisedButton> :
          <RaisedButton labelPosition="before" style={{marginTop: 32}} primary={true} disabled={this.state.resultItems[this.state.questionIndex].score === -1}
            label="Afslut test" icon={<Done />}  onClick={this.onContinue}></RaisedButton>
        }
        </div>
      </div>);
    }
    else if (this.state.phase === 2){
      mainContent =
        <div>
          <div dangerouslySetInnerHTML={this.getHtmlText(1)}/>
        </div>
    }



    return (
      <div style={{background:'#fafafa', padding:'16px'}}>
        {mainContent}
      </div>);
  }
});

KPExplorerQuestionnaire = connect()(KPExplorerQuestionnaire);

export default KPExplorerQuestionnaire;
