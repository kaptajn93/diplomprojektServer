import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

import Dialog from 'material-ui/lib/dialog';

const items = [
  <MenuItem key={0} value={'None'} primaryText="Ingen"/>,
  <MenuItem key={1} value={'SortAndEvaluate'} primaryText="Sortér og bedøm"/>,
  <MenuItem key={2} value={'VideoExercise'} primaryText="Videoøvelse"/>,
  <MenuItem key={3} value={'KPExplorerQuestionnaire'} primaryText="KP explorer"/>
];

var ConfigureExerciseDialog = React.createClass({
  resultingExercise : {

  },

  getInitialState: function() {
    return {
      open: this.props.open,
      selectedExercise : this.props.selected.className,
      configuration : this.props.selected !== undefined ?
        this.props.selected.configuration : '',
      description: this.props.selected !== undefined ?
       this.props.selected.description : ''
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
        configuration: this.state.configuration,
        className: this.state.selectedExercise,
        description: this.state.description
      });
  },

  exerciseSelected: function(event, index, value){
    this.setState({selectedExercise:value});
  },

  configurationChanged: function(event){
    this.setState({configuration:event.target.value});
  },

  descrptionChanged: function(event){
    this.setState({description:event.target.value});
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
          <h4 style={{marginBottom:0}}>Beskrivelse (vist på dahboard)</h4>
          <TextField
            hintText="Kan undlades"
            multiLine={true}
            fullWidth={true}
            value={this.state.description}
            onChange={this.descrptionChanged}
          />
        </div>

        <div>
          {{
              'SortAndEvaluate':
                <div>
                  <h4 style={{marginBottom:0}}>Indtast kategorier</h4>
                  <TextField
                    hintText="Indtast kategorier adskildt med semikolon ';'"
                    multiLine={true}
                    fullWidth={true}
                    value={this.state.configuration}
                    onChange={this.configurationChanged}
                  />
                </div>,
              'VideoExercise':
                <h1>Videoøvelse</h1>,
              'KPExplorerQuestionnaire':
                <div>
                  <h4 style={{marginBottom:0}}>Indtast kategorier</h4>
                  <TextField
                    hintText="Indtast spørgsmål adskildt med semikolon ';'"
                    multiLine={true}
                    fullWidth={true}
                    value={this.state.configuration}
                    onChange={this.configurationChanged}
                  />
                </div>,
              'none':
                null
          }[this.state.selectedExercise]}
        </div>
    </Dialog>
  }
});

export default ConfigureExerciseDialog
