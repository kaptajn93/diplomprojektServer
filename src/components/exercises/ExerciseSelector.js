import React from 'react';
import SortableAndEvaluateExercise from './SortAndEvaluateExercise';
import KPExplorerQuestionnaire from './KPExplorerQuestionnaire'

var ExerciseSelector = React.createClass({
  getInitialState : function(){
    return {
      exerciseSelection : this.props.exerciseSelection
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({exerciseSelection: nextProps.exerciseSelection});
  },

  render: function() {
      if (this.state.exerciseSelection === undefined || this.state.exerciseSelection === null)
          return null;

      else if(this.state.exerciseSelection.className === 'SortAndEvaluate' )
        return (<SortableAndEvaluateExercise liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} sortableItems={this.state.exerciseSelection.configuration}> </SortableAndEvaluateExercise>);

      else if(this.state.exerciseSelection.className === 'KPExplorerQuestionnaire')
        return (<KPExplorerQuestionnaire liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} sortableItems={this.state.exerciseSelection.configuration}> </KPExplorerQuestionnaire>);

      return null;
  }
});

export default ExerciseSelector;
