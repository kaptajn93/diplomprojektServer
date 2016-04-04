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
          <p>Fortæl om en positiv oplevelse vedrørende din(e)<span><i>{this.state.currentItem.title.toLowerCase()}</i></span></p>

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
          marginTop: '24px',
          marginBottom: '24px'
        };

        const sortIndexIndicator = {
          display: 'block',
          textAlign: 'center',
          background: '#FAFAFA',
          display: 'block',
          padding: 14
        };

        const itemContainerStyle = {
          maxWidth: 300,
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
      var items = this.props.sortableItems.split(';');
      return {
          items:  items,
          resultItems: this.mapItems(items),
          phase: 0,
          isLoading: false
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
              phase: json.result.isCompleted ? 4 : this.state.phase,
              resultItems: json.result.evaluations !== null && json.result.evaluations.length === this.state.items.length ?
                json.result.evaluations : this.state.resultItems
            });

          }
        );
      }

    },

    componentWillReceiveProps: function(nextProps) {
      var items = nextProps.sortableItems.split(';')
      this.setState({
        items: items,
        resultItems: this.mapItems(items)
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
      if (this.props.liveExercise)
        this.props.dispatch(putSortAndEvalResultById(this.props.exerciseId, {evaluations:items, exerciseId:this.props.exerciseId, isCompleted:true}));
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

    render: function() {
      var mainContent;
      if (this.state.isLoading)
        mainContent = <CircularProgress size={0.4} style={{marginTop: '6px'}} />;
      else if (this.state.phase === 0) {
        mainContent =
        <div>
          <span s>Når du er klar skal du trykke, 'Start øvelse':</span>
          <br/>
          <RaisedButton
            labelPosition="before" primary={true}
            label={'Start øvelse'} onClick={this.onStart}
            style={{marginTop:'16px'}}
            icon={<Play />}></RaisedButton>
        </div>
      }
      else if (this.state.phase === 1) {
      mainContent = (
        <div>
          <p>Jeg vil bede dig om at se tilbage på dit seneste arbejde og arbejdsplads: <strong>Hvad der betød mest for dig?</strong> Det mest betydningsfulde skal du placere øverst, og det mindst betydningsfulde nederst. Tryk &quot;færdig&quot; når du er klar.</p>
          <SortPhase items={this.state.items} onSort={this.handleSort} />
          <RaisedButton labelPosition="before" primary={true}
            label="Færdig" icon={<Done />} onClick={this.onFinishSort}></RaisedButton>
        </div>);
      }
      else if (this.state.phase === 2){
        mainContent =
          <div>
            <p>Der har været en hel række af begivenheder, situationer og hændelser som du husker tilbage på med forskellige følelser.</p>
            <p>Jeg vil bede dig om at kigge tilbage på de oplevelser du har haft med [dine prioiteringer] – OG særlige oplevelser der har fyldt dig med glæde. Vær opmærksom på at her skal du kun gå i detaljer med det der har en positiv indvirken på dig.</p>
            <p>Det andet vil jeg bede dig om at lade ligge som blot en konstatering – at der var situationer som ikke gik din vej. Dyrk det der fungerer for dig og lær hvordan du kan øge lige præcist det der styrker dig.</p>

            <RaisedButton labelPosition="before" primary={true}
              label="Ok" icon={<Done />} onClick={this.onFinishInfoPhase}></RaisedButton>
          </div>
      }

      else if (this.state.phase === 3){
        mainContent =
          <div>
            <EvalPhase onReturn={this.returnFromEvaluate} onFinished={this.evalFinished} items={this.state.resultItems} />
          </div>
      }

      else if (this.state.phase === 4){
        mainContent =
          <div>
            <h2>Øvelsen er færdig</h2>
            <p>Her er din besvarelse, sorteret med det mest betydningsfulde, først:</p>
            {
              this.state.resultItems.map(function(i, index){
                return (
                  <div>
                    <h4>{index + 1}. {i.title}</h4>

                    <h5 style={{marginBottom:0}}>Fortæl historien</h5>
                    <p>{i.description}</p>

                    <h5 style={{marginBottom:0}}>Hvad har oplevelsen betydet for dig?</h5>
                    <p>{i.meaning}</p>

                    <h5 style={{marginBottom:0}}>Hvilken positiv virkning har den haft på dig?</h5>
                    <p>{i.effect}</p>
                    <br/>
                  </div>
                )
              })
            }

          </div>
      }

      return (
        <div style={{background:'#fafafa', padding:'16px'}}>
          { mainContent }
        </div>)
    }
});

SortaAndEvaluateExercise = connect()(SortaAndEvaluateExercise);

export default SortaAndEvaluateExercise;
