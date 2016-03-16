import React from 'react';
import SortableMixin from 'sortablejs/react-sortable-mixin';
import Paper from 'material-ui/lib/paper';

let SortaAndEvaluateExercise = React.createClass({
    mixins: [SortableMixin],

    getInitialState: function() {
      console.log("Get Initial State");
      console.log(SortableMixin);

      return {
          items:  this.props.sortableItems.split(',')
      };
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        items: nextProps.sortableItems.split(',')
      })
    },

    handleSort: function (/** Event */evt) { /*..*/ },

    render: function() {
        const itemsContainerStyle = {
          'listStyleType': 'none'
        };

        const itemContainerStyle = {
          maxWidth: 300,
          textAlign: 'center',
          display: 'block',
          marginTop: '8px'
        };

        const itemStyle = {
          paddingTop: 14,
          paddingBottom: 14
        };

        return <ul style={itemsContainerStyle}>{
          this.state.items.map(function (text) {
            return <li key={text} style={itemContainerStyle}><Paper zDepth={1}><div style={itemStyle}>{text}</div></Paper></li>
          })
        }</ul>
    }
});

export default SortaAndEvaluateExercise;
