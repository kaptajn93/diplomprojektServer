import React from 'react';
import SortableAndEvaluateExercise from '../Exercises/SortAndEvaluateExercise';

var ExerciseSelector = React.createClass({
  getInitialState : function(){
    return {
      exerciseSelection : this.props.exerciseSelection
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({open: nextProps.exerciseSelection});
  },

  render: function() {
      if (this.state.exerciseSelection === undefined || this.state.exerciseSelection === null)
          return null;

      else if(this.state.exerciseSelection.className === 'SortAndEvaluate' )
        return (<SortableAndEvaluateExercise sortableItems={this.state.exerciseSelection.configuration}> </SortableAndEvaluateExercise>);

      return null;
  }
});

export default ExerciseSelector;
