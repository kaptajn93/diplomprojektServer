import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

import Dialog from 'material-ui/lib/dialog';

const items = [
  <MenuItem key={0} value={'none'} primaryText="Ingen"/>,
  <MenuItem key={1} value={'sortExercise'} primaryText="Sortér og bedøm"/>,
  <MenuItem key={2} value={'videoExercise'} primaryText="Videoøvelse"/>
];

var ConfigureExerciseDialog = React.createClass({
  resultingExercise : {

  },

  getInitialState: function() {
    return {
      open: this.props.open,
      selectedExercise : this.props.selected,
      sortCategories : this.props.selected !== undefined ?
        this.props.selected.sortCategories : ''
    };
  },

  componentDidMount: function() {
    this.resultingExercise = this.props.selected;
  },

  componentWillUnmount: function() {
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({open: nextProps.open});
  },

  handleCancel : function(){
    this.props.onCancel();
  },

  handleSubmit : function(){
    this.props.onSubmit(
      {
        sortCategories: this.state.sortCategories,
        className : this.state.selectedExercise
      });
  },

  exerciseSelected: function(event, index, value){
    this.setState({selectedExercise:value});
  },

  sortCategoriesChanged: function(event){
    this.setState({sortCategories:event.target.value});
  },

  render: function() {

    const actions = [

      <RaisedButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
      <FlatButton
        style={{marginLeft:'8px'}}
        label="Fortryd"
        secondary={true}
        onTouchTap={this.handleCancel}
      />
    ];
    return <Dialog
      title="Vælg opgavetype"
      actions={actions}
      modal={false}
      open={this.state.open}
      onRequestClose={this.handleCancel} >
        <SelectField
          value={this.state.selectedExercise}
          onChange={this.exerciseSelected}
          floatingLabelText="Vælg en øvelse">
          {items}
        </SelectField>
        <div>
          {{
              'sortExercise':
                <div>
                  <h4>Indtast kategorier</h4>
                  <TextField
                    hintText="Indtast kategorier adskildt med komma ','"
                    multiLine={true}
                    fullWidth={true}
                    value={this.state.sortCategories}
                    onChange={this.sortCategoriesChanged}
                  />
                </div>,
              'videoExercise':
                <h1>Videoøvelse</h1>,
              'none':
                null
          }[this.state.selectedExercise]}
        </div>
    </Dialog>
  }
});

export default ConfigureExerciseDialog
