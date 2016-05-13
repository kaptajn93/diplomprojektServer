import React from 'react';
import { connect } from 'react-redux'

import SortableMixin from 'sortablejs/react-sortable-mixin';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Done from 'material-ui/lib/svg-icons/action/done';
import Forward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Backward from 'material-ui/lib/svg-icons/navigation/arrow-back';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';
import Theme from '../Theme';

import { putSortAndEvalResultById, getExerciseResult } from '../../actions/api'

let EvalPhase = React.createClass({
  getInitialState: function(){
    return {
      items: this.props.items,
      currentIndex:0,
      currentItem : this.props.items[0],
      currentDescription: this.props.items[0].description,
      currentMeaning: this.props.items[0].meaning,
      currentEffect: this.props.items[0].effect
    };
  },

  onContinue: function(){
    var isLast = false;

    if (this.state.currentIndex == this.props.items.length - 1){
      this.props.onFinished(this.state.items);
    }

    if (this.state.currentIndex + 1 == this.props.items.length - 1)
      isLast = true;

    var nextIndex = Math.min(this.state.currentIndex + 1, this.props.items.length- 1);
    this.setState({
      currentIndex:nextIndex,
      currentItem : this.props.items[nextIndex],
      isLast: isLast,
      currentDescription: this.props.items[nextIndex].description,
      currentMeaning: this.props.items[nextIndex].meaning,
      currentEffect: this.props.items[nextIndex].effect
    });
  },

  onReturn: function(){
    if (this.state.currentIndex === 0){
      this.props.onReturn();
      return;
    }

    var prevIndex = Math.max(this.state.currentIndex - 1, 0);
    this.setState({
      currentIndex:prevIndex,
      currentItem : this.props.items[prevIndex],
      isLast: false,
      currentDescription: this.props.items[prevIndex].description,
      currentMeaning: this.props.items[prevIndex].meaning,
      currentEffect: this.props.items[prevIndex].effect
    });
  },

  onDescriptionsChanged: function(evt) {
    this.setState({
      currentDescription: evt.target.value
    });
    this.state.currentItem.description = evt.target.value;
  },

  onMeaningChanged: function(evt){
    this.setState({
      currentMeaning: evt.target.value
    });
    this.state.currentItem.meaning = evt.target.value;
  },

  onEffectChanged: function(evt){
    this.setState({
      currentEffect: evt.target.value
    });
    this.state.currentItem.effect = evt.target.value;
  },

  render: function() {
    var newxtButton = this.state.isLast ?
      <RaisedButton labelPosition="before" primary={true}
        label="Færdig" icon={<Done />} style={{marginLeft:8}} onClick={this.onContinue}></RaisedButton> :
      <RaisedButton labelPosition="before" primary={true}
        label="Videre" icon={<Forward />} style={{marginLeft:8}} onClick={this.onContinue}></RaisedButton>

    return (
      <div>
        <div style={{marginTop:16, marginBottom:16}}>
          <h3>{this.state.currentItem.title}</h3>
          <div style={{display:'flex'}}>
            <div dangerouslySetInnerHTML={this.props.instructionText}></div>
            <div><p>&nbsp;<i>{this.state.currentItem.title.toLowerCase()}</i></p></div>
          </div>

          <h5 style={{marginBottom:0}}>Fortæl historien</h5>
          <TextField
            style={{width:500}}
            hintText="Fortæl historien"
            multiLine={true}
            rows={1}
            value={this.state.currentDescription}
            onChange={this.onDescriptionsChanged}
          />

          <br/>
          <h5 style={{marginBottom:0}}>Hvad har oplevelsen betydet for dig?</h5>
          <TextField
            style={{width:500}}
            hintText="Skriv her"
            multiLine={true}
            rows={1}
            value={this.state.currentMeaning}
            onChange={this.onMeaningChanged}
          />

          <br/>
          <h5 style={{marginBottom:0}}>Hvilken positiv virkning har den haft på dig?</h5>
          <TextField
            style={{width:500}}
            hintText="Skriv her"
            multiLine={true}
            rows={1}
            value={this.state.currentEffect}
            onChange={this.onEffectChanged}
          />

        </div>
        <RaisedButton secondary={true}
          label="Tilbage" icon={<Backward />} onClick={this.onReturn}></RaisedButton>
        {newxtButton}
      </div>
    )
  }
});

let SortPhase = React.createClass({
    mixins: [SortableMixin],

    getInitialState: function() {
      return {
          items:  this.props.items
      };
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        items: nextProps.items
      })
    },

    handleSort: function (/** Event */evt)
    {
      this.props.onSort(this.state.items);
    },

    render: function() {
        const itemsContainerStyle = {
          'listStyleType': 'none',
          'cursor':'ns-resize',
          padding:0,
          marginTop: '0',
          marginBottom: '0'
        };

        const sortIndexIndicator = {
          textAlign: 'center',
          background: '#FAFAFA',
          display: 'block',
          padding: 14
        };

        const itemContainerStyle = {
          maxWidth: '100%',
          display: 'block',
          marginTop: '8px',
        };

        const itemStyle = {
          padding: 14,
          width:'100%'
        };

        const dragDropIconStyle = {
          width: 20,
          height: 20
        }

        return (
          <ul style={itemsContainerStyle}>{
          this.state.items.map(function (text, index) {
            return (
                <li key={index} value={index} style={itemContainerStyle}>
                  <Paper zDepth={1}>
                    <div style={{display:'flex'}}>
                      <div style={sortIndexIndicator}><strong>{index + 1}.</strong></div>
                      <div style={itemStyle}>{text}</div>
                      <div style={{padding:13}}><img style={dragDropIconStyle} alt="" src="./assets/ic_updown_gray_24px.svg"   /></div>
                    </div>
                  </Paper>
                </li>)
          })
        }</ul>)
    }
});

const iconStyles = {
  marginRight: 24,
};
const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

let SortaAndEvaluateExercise = React.createClass({

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

    componentDidMount: function(){
      //Update server
      if (this.props.liveExercise && this.props.scoreCard === undefined){
        var that = this;
        this.setState({isLoading: true});
        this.props.dispatch(getExerciseResult(this.props.exerciseId)).then(
          json => {
            that.setScoreCard(json.result, that);

            that.props.exercisesStatusChanged(json.result.isCompleted, that.props.exercise);
          }
        );
      }

      else if (this.props.scoreCard !== undefined)
        this.setScoreCard(this.props.scoreCard, this);
    },

    setScoreCard: function(scoreCard, that){
      that.setState({
        isLoading: false,
        phase: scoreCard.isCompleted ? 4 : that.state.phase,
        resultItems: scoreCard.evaluations !== null && scoreCard.evaluations.length === that.state.items.length ?
          scoreCard.evaluations : that.state.resultItems
      });
    },

    componentWillReceiveProps: function(nextProps) {
      var items = nextProps.exercise.configuration.split(';')
      this.setState({
        items: items,
        resultItems: this.mapItems(items),
        instrunctionContent: nextProps.exercise.instrunctionContent
      })
    },

    onStart: function(){
      this.setState({phase:1});
    },

    onFinishSort: function(){
      this.setState({phase:2});
    },

    onFinishInfoPhase: function(){
      this.setState({phase:3});
    },

    returnFromEvaluate: function(){
      this.setState({phase:1});
    },

    evalFinished: function(items){
      this.setState({
        phase:4,
        resultItems:items
      });

      if (this.props.onFinished !== undefined)
        this.props.onFinished(items);

      //Update server
      if (this.props.liveExercise){
        this.props.dispatch(putSortAndEvalResultById(this.props.exerciseId, {evaluations:items, exerciseId:this.props.exerciseId, isCompleted:true}));
      }
    },

    onContinueToNextExercise: function(){
      if (this.props.liveExercise){
        this.props.exercisesStatusChanged(true, this.props.exercise);
      }
    },

    restart: function(){
      this.setState({phase:1});
    },

    handleSort: function(sortedItems){
      this.setState({
        items:sortedItems,
        resultItems: this.mapItems(sortedItems)
      })
    },

    mapItems: function(items){
      var that = this;
      return items.map(function(i){
        var existingItem =
          that.state !== null &&
          that.state.resultItems !== undefined &&
          that.state.resultItems !== null ?
            that.state.resultItems.filter(function(exI){
              return exI.title === i;
            }): [];

        if (existingItem.length === 0){
          return {
            title: i,
            description:"",
            meaning:"",
            effect:""
          };
        }
        else {
          return {
            title: i,
            description: existingItem[0].description,
            meaning: existingItem[0].meaning,
            effect: existingItem[0].effect
          };
        }
      })
    },

    getHtmlText: function(textIndex){
      var text = this.state.instrunctionContent.length > textIndex ?
        this.state.instrunctionContent[textIndex] : "";

      return {__html:text };
    },
    render: function() {
      var mainContent;
      if (this.state.isLoading)
        mainContent = <CircularProgress size={0.4} style={{marginTop: '6px'}} />;
      else if (this.state.phase === 0) {
        mainContent =
        <div>
          <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
          <RaisedButton
            labelPosition="before" primary={true}
            label={'Start'} onClick={this.onStart}
            style={{marginTop:'16px'}}
            icon={<Play />}></RaisedButton>
        </div>
      }
      else if (this.state.phase === 1) {
      mainContent = (
        <div>
          <div dangerouslySetInnerHTML={this.getHtmlText(1)}/>
          <div style={{margin:'32 0', padding:16, paddingTop:8, background:'#FAFAFA', width:400}}>
            <SortPhase items={this.state.items} onSort={this.handleSort} />
          </div>
          <RaisedButton labelPosition="before" primary={true}
            label="Færdig" icon={<Done />} onClick={this.onFinishSort}></RaisedButton>
        </div>);
      }
      else if (this.state.phase === 2){
        mainContent =
          <div>
            <div dangerouslySetInnerHTML={this.getHtmlText(2)}/>
            <RaisedButton labelPosition="before" primary={true}
              label="Ok" icon={<Done />} onClick={this.onFinishInfoPhase}></RaisedButton>
          </div>
      }

      else if (this.state.phase === 3){
        mainContent =
          <div>
            <EvalPhase instructionText={this.getHtmlText(3)} onReturn={this.returnFromEvaluate} onFinished={this.evalFinished} items={this.state.resultItems} />
          </div>
      }

      else if (this.state.phase === 4){
        mainContent =
          <div>
            <div dangerouslySetInnerHTML={this.getHtmlText(4)}/>
            {
              this.state.resultItems.map(function(i, index){
                return (
                  <div>
                    <h4>{index + 1}. {i.title}</h4>

                    <p>{i.description}</p>

                    <p>{i.meaning}</p>

                    <p>{i.effect}</p>
                    <br/>
                  </div>
                )
              })
            }
            <RaisedButton labelPosition="before" primary={true}
              label="Videre" icon={<Done />} onClick={this.onContinueToNextExercise}></RaisedButton>

          </div>
      }

      return (
        <div style={{background:Theme.palette.backgroundColor, padding:'32px'}}>
          { mainContent }
        </div>)
    }
});

SortaAndEvaluateExercise = connect()(SortaAndEvaluateExercise);

export default SortaAndEvaluateExercise;
