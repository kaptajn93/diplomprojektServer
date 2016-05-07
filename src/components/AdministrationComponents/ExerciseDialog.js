import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';

import CKEditor from './CKEditor';

import Dialog from 'material-ui/lib/dialog';

const items = [
  <MenuItem key={0} value={'None'} primaryText="Ingen"/>,
  <MenuItem key={1} value={'SortAndEvaluate'} primaryText="Sortér og bedøm"/>,
  <MenuItem key={2} value={'VideoExercise'} primaryText="Videoøvelse"/>,
  <MenuItem key={3} value={'KPExplorerQuestionnaire'} primaryText="KP explorer"/>,
  <MenuItem key={4} value={'Promise'} primaryText="Reflektion" />,
  <MenuItem key={5} value={'Goal'} primaryText="Mål for øvelse" />,
  <MenuItem key={6} value={'QuestionAnswer'} primaryText="Spærgsmål og fritekstsvar" />
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
       this.props.selected.description : '',
      instrunctionContent: this.props.selected !== undefined ?
        this.props.selected.instrunctionContent: []
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
        instrunctionContent: this.state.instrunctionContent,
        className: this.state.selectedExercise,
        description: this.state.description,
        isTekstEditorOpen: false
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
  openEditText:function(textItem){
    this.setState({
      isTekstEditorOpen: true,
      currentLyEditedTextItem:textItem,
      htmlText: this.state.instrunctionContent[textItem],
      resultText: this.state.instrunctionContent[textItem]
    });
  },
  handleCloseEditor:function(){
    this.setState({isTekstEditorOpen: false});
  },
  handleSubmitTekst:function(){
    this.state.instrunctionContent[this.state.currentLyEditedTextItem] =
      this.state.resultText;
    this.setState({isTekstEditorOpen: false});
  },

  onTextChaged: function(newHtml){
    this.setState({resultText: newHtml});
  },

  getHtmlText: function(textIndex){
    var text = this.state.instrunctionContent.length > textIndex ?
      this.state.instrunctionContent[textIndex] : "";

    return {__html:text };
  },

  render: function() {
    const editorAction = [
      <RaisedButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleSubmitTekst}
      />,
      <FlatButton
        style={{marginLeft:'8px'}}
        label="Fortryd"
        secondary={true}
        onTouchTap={this.handleCloseEditor}
      />
    ];
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
      bodyStyle={{overflow: 'overlay'}}
      style={{overflow: 'overlay'}}
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
            rowsMax={4}
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
                    rowsMax={4}
                    value={this.state.configuration}
                    onChange={this.configurationChanged}
                  />

                  <h4 style={{marginBottom:0}}>Opgavetekser:</h4>
                  <h5 style={{marginBottom:0}}>Indledende opgavetekst</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 0)}
                    />
                  <Divider />
                  <h5 style={{marginBottom:0}}>Tekst ved sortering</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(1)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 1)}
                    />
                  <Divider />
                  <h5 style={{marginBottom:0}}>Instruktion til evaluering</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(2)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 2)}
                    />
                  <Divider />
                  <h5 style={{marginBottom:0}}>Tekst ved evaluering</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(3)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 3)}
                    />
                  <Divider />
                  <h5 style={{marginBottom:0}}>Afslut tekst</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(4)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 4)}
                    />
                </div>,
              'VideoExercise':
                <div>

                  <h4 style={{marginBottom:0}}>Opgavetekser:</h4>
                  <h5 style={{marginBottom:0}}>Indledende tekst</h5>
                  <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 0)}
                    />

                  <Divider />
                  <h5 style={{marginBottom:0}}>Tekst til personlig data</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(1)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 1)}
                    />

                  <Divider />
                  <h5 style={{marginBottom:0}}>Disclaimer</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(2)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 2)}
                    />

                  <Divider />
                  <h5 style={{marginBottom:0}}>Afsluttende tekst</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(3)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 3)}
                    />

                    <Divider />
                    <h5 style={{marginBottom:0}}>Venter på svar</h5>

                    <div dangerouslySetInnerHTML={this.getHtmlText(4)}/>
                    <FlatButton
                      label="Redigér"
                      secondary={true}
                      style={{marginBottom:21}}
                      onClick={this.openEditText.bind(this, 4)}
                      />

                      <Divider />
                      <h5 style={{marginBottom:0}}>Afslut</h5>

                      <div dangerouslySetInnerHTML={this.getHtmlText(5)}/>
                      <FlatButton
                        label="Redigér"
                        secondary={true}
                        style={{marginBottom:21}}
                        onClick={this.openEditText.bind(this, 5)}
                        />
                </div>,
              'KPExplorerQuestionnaire':
                <div>

                  <h5 style={{marginBottom:0}}>Indledende opgavetekst</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 0)}
                    />
                  <Divider />
                  <h5 style={{marginBottom:0}}>Afslut tekst</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(1)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 1)}
                    />
                </div>,
              'Goal':
                <div>
                <h5 style={{marginBottom:0}}>Informationstekst</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 0)}
                    />
                </div>,
              'QuestionAnswer':
                <div>
                <h5 style={{marginBottom:0}}>Spørgsmål</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 0)}
                    />

                <Divider />
                <h5 style={{marginBottom:0}}>Hjælpetekst</h5>

                <div dangerouslySetInnerHTML={this.getHtmlText(1)}/>
                <FlatButton
                  label="Redigér"
                  secondary={true}
                  style={{marginBottom:21}}
                  onClick={this.openEditText.bind(this, 1)}
                  />
                </div>,
              'Promise':
              <div>
                <h4 style={{marginBottom:0}}>Indtast kategorier</h4>
                <TextField
                  hintText="Indtast reflektionsspørgsmål adskildt med semikolon ';'"
                  multiLine={true}
                  fullWidth={true}
                  rowsMax={4}
                  value={this.state.configuration}
                  onChange={this.configurationChanged}
                />


                <h5 style={{marginBottom:0}}>Informationstekst til løfte</h5>

                  <div dangerouslySetInnerHTML={this.getHtmlText(0)}/>
                  <FlatButton
                    label="Redigér"
                    secondary={true}
                    style={{marginBottom:21}}
                    onClick={this.openEditText.bind(this, 0)}
                    />
              </div>,
              'none':
                null
          }[this.state.selectedExercise]}

          <Dialog
            title="Redigér opgavetekst"
            actions={editorAction}
            modal={false}
            open={this.state.isTekstEditorOpen}
            onRequestClose={this.handleCloseEditor} >

            <CKEditor text={this.state.htmlText} onTextChangedCallback={this.onTextChaged}></CKEditor>
          </Dialog>

        </div>

    </Dialog>
  }
});

export default ConfigureExerciseDialog
