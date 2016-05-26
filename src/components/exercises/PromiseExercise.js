import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import RadioButton from 'material-ui/lib/radio-button';

import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Done from 'material-ui/lib/svg-icons/action/done';

import TextField from 'material-ui/lib/text-field';

import CircularProgress from 'material-ui/lib/circular-progress';

import { putModulePromiseResultById, getExerciseResult } from '../../actions/api'
import Theme from '../Theme';

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

let PromiseExercise = React.createClass({
  getInitialState: function() {
    var items = this.props.exercise.configuration.split(';');
    return {
        isLoading: false,
        items:  items,
        phase: 0,
        resultItems: this.mapItems(items),
        instrunctionContent: this.props.exercise.instrunctionContent,
        exerciseGoalText: this.props.exerciseGoalText
    };
  },

  mapItems: function(items){
    var that = this;
    return items.map(function(i, index){
      var existingItem =
        that.state !== null &&
        that.state.resultItems !== undefined &&
        that.state.resultItems !== null ?
          that.state.resultItems[index]: null;

      if (existingItem === null || existingItem === undefined){
        return {
          question: i,
          score: -1,
        };
      }
      else {
        return {
          question: i,
          score: existingItem.score
        };
      }
    })
  },

  componentDidMount: function(){
    //Update from server
    if (this.props.liveExercise && this.props.scoreCard === undefined){
      this.setState({isLoading: true});
      this.props.dispatch(getExerciseResult(this.props.exerciseId)).then(
        json => {
          this.setScoreCard(json.result);

          this.props.exercisesStatusChanged(json.result.isCompleted, this.props.exercise);
        }
      );
    }
    else if (this.props.scoreCard !== undefined)
      this.setScoreCard(this.props.scoreCard);

  },

  setScoreCard: function(scoreCard){
    var resultItems = scoreCard.responses !== null ? this.state.resultItems.map(function(i,index){
      i.score = scoreCard.responses[index].score;
      return i;
    }) : this.state.resultItems;

    this.setState({
      isLoading: false,
      phase: scoreCard.isCompleted ? 1 : this.state.phase,
      promiseText: scoreCard.promiseText,
      exerciseGoalText:scoreCard.exerciseGoalText !== '' ? scoreCard.exerciseGoalText : this.state.exerciseGoalText,
      resultItems: resultItems
    });
  },

  componentWillReceiveProps: function(nextProps){
    var items = nextProps.exercise.configuration.split(';')
      this.setState({
        items: items,
        resultItems: this.mapItems(items),
        instrunctionContent: nextProps.exercise.instrunctionContent,
        exerciseGoalText: nextProps.exerciseGoalText !== '' ? nextProps.exerciseGoalText : this.state.exerciseGoalText
      });
  },

  onPromiseTextChanged: function(evt){
    this.setState({
      promiseText: evt.target.value
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
      this.props.dispatch(putModulePromiseResultById(this.props.exerciseId, {responses:this.state.resultItems, promiseText:this.state.promiseText, exerciseId:this.props.exerciseId, isCompleted:true}));
    }

  },

  onScoreChanged: function(score, item){
    item.score = score;
    this.setState({resultItems:this.state.resultItems});
  },

  getHtmlText: function(textIndex){
    var text = this.state.instrunctionContent.length > textIndex ?
      this.state.instrunctionContent[textIndex] : "";

    return {__html:text };
  },

  render: function(){
    var that = this;
    var questions = this.state.resultItems.map(function(i, index){
      return (

        <div style={{display:'table'}}>
          <div style={{display:'table-row'}}>
            <div style={{display:'table-cell'}}>

              { that.state.phase === 0 ?
                <div style={{background:'#FAFAFA', padding:24, marginTop:16}}>
                  <h4 style={{marginTop:0}}>{
                    i.question
                  }</h4>
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
                          checked={i.score === 1}
                          onCheck={that.onScoreChanged.bind(that, 1, i)}
                        />
                      </div>
                      <div style={{display:'table-cell'}}>
                        <RadioButton
                          value="2"
                          style={styles.radioButton}
                          checked={i.score === 2}
                          onCheck={that.onScoreChanged.bind(that, 2, i)}
                        />
                      </div>
                      <div style={{display:'table-cell'}}>
                        <RadioButton
                          value="3"
                          style={styles.radioButton}
                          checked={i.score === 3}
                          onCheck={that.onScoreChanged.bind(that, 3, i)}
                        />
                      </div>
                      <div style={{display:'table-cell'}}>
                        <RadioButton
                          value="4"
                          style={styles.radioButton}
                          checked={i.score === 4}
                          onCheck={that.onScoreChanged.bind(that, 4, i)}
                        />
                      </div>
                      <div style={{display:'table-cell'}}>
                        <RadioButton
                          value="5"
                          style={styles.radioButton}
                          labelStyle={{display:'none'}}
                          checked={i.score === 5}
                          onCheck={that.onScoreChanged.bind(that, 5, i)}
                          />
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div style={{background:'#FAFAFA', padding:'4 20', marginTop:16}}>
                  <p><span style={{color:'#777777', marginBottom:8, fontSize:'small'}}>{i.question} </span><br/>
                  {{
                    '1' : <span>Fuldstændig forkert</span>,
                    '2' : <span>Delvis forkert</span>,
                    '3' : <span>Hverken rigtigt eller forkert</span>,
                    '4' : <span>Delvis rigtigt</span>,
                    '5' : <span>Fuldstændig rigtigt</span>
                  }[i.score]}</p>
                </div>
            }
            </div>
          </div>
        </div>
      )
    });

    var mainContent;
    if (this.state.phase === 0) {
      mainContent =
      <div style={{marginTop:40}}>
        <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
        <TextField style={{width: 400}}
          hintText="Det vil jeg gøre..." value={this.state.promiseText} onChange={this.onPromiseTextChanged}
        />
        <RaisedButton primary={true} style={{marginLeft:16}}
          label="Ok" icon={<Done />} onClick={this.onFinished}></RaisedButton>
      </div>
    }
    else if (this.state.phase === 1){
      mainContent =
        <div style={{marginTop:40}}>
          <div >
            <div style={{color:Theme.palette.disabledColor, marginBottom:8}} dangerouslySetInnerHTML={this.getHtmlText(0)}></div>
            <p style={{marginTop:-10}}>{this.state.promiseText}</p>
          </div>
        </div>
    }

    if (this.state.isLoading )
      return <CircularProgress size={0.4} style={{marginTop: '6px'}} />;
    else
      return (
        <div style={{background:Theme.palette.backgroundColor, padding:'32px'}}>
          <div style={{marginTop:4}}>
            <div style={{color:Theme.palette.disabledColor, marginBottom:8}} dangerouslySetInnerHTML={this.getHtmlText(1)}></div>
            <p style={{marginTop:-10}}>{this.state.exerciseGoalText}</p>
          </div>

          {questions}
          {mainContent}
        </div> );
  }
});

PromiseExercise = connect()(PromiseExercise);

export default PromiseExercise;
