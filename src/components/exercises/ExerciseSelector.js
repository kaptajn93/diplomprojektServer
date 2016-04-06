import React from 'react';
import SortableAndEvaluateExercise from './SortAndEvaluateExercise';
import KPExplorerQuestionnaire from './KPExplorerQuestionnaire';
import GoalExercise from './GoalExercise';
import PromiseExercise from './PromiseExercise';

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
        return (<SortableAndEvaluateExercise exercisesStatusChanged={this.props.exercisesStatusChanged} liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} exercise={this.state.exerciseSelection}> </SortableAndEvaluateExercise>);

      else if(this.state.exerciseSelection.className === 'KPExplorerQuestionnaire')
        return (<KPExplorerQuestionnaire exercisesStatusChanged={this.props.exercisesStatusChanged} liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} exercise={this.state.exerciseSelection}> </KPExplorerQuestionnaire>);

      else if (this.state.exerciseSelection.className === 'Goal')
        return (<GoalExercise onExerciseGoalUpdated={this.props.onExerciseGoalUpdated} exercisesStatusChanged={this.props.exercisesStatusChanged} liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} exercise={this.state.exerciseSelection}> </GoalExercise>);

      else if (this.state.exerciseSelection.className === 'Promise')
        return (<PromiseExercise exerciseGoalText={this.props.exerciseGoalText} exercisesStatusChanged={this.props.exercisesStatusChanged} liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} exercise={this.state.exerciseSelection}> </PromiseExercise>);

      else if (this.state.exerciseSelection.className === 'Reflection')
        return (<KPExplorerQuestionnaire exercisesStatusChanged={this.props.exercisesStatusChanged} liveExercise={this.props.liveExercise} exerciseId={this.state.exerciseSelection.exerciseId} exercise={this.state.exerciseSelection}> </KPExplorerQuestionnaire>);
      return null;
  }
});

export default ExerciseSelector;
