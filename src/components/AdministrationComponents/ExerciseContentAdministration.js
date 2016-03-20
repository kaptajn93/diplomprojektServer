import React from 'react'
import { connect } from 'react-redux'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import { getExerciseResourceById, putExerciseResourceById } from '../../actions/api'
import CKEditor from './CKEditor';
import CircularProgress from 'material-ui/lib/circular-progress';
import ExerciseDialog from './ExerciseDialog';

import ExerciseSelector from '../Exercises/ExerciseSelector';

var paddingStyle = {
  padding: '32px'
}

var htmlStyle={
  padding: '0px 32px 32px 32px',
  color: '#888888'
}

const ExerciseElement = React.createClass({
  getInitialState: function(){
    return {
      isEditing : false,
      isTextDirty : false,
      editedText : this.props.model.content,
      originalText: this.props.model.content,
      isExerciseDialogOpen: false,
      exerciseSelection: {
        className: this.props.model.className,
        configuration: this.props.model.configuration
      }
    };
  },

  toggleEditing : function(){
    var isCurrentlyEditign = !this.state.isEditing
    this.setState({
      isEditing: isCurrentlyEditign,
      isTextDirty : false
    });

    if (!isCurrentlyEditign) {
      if (this.state.isTextDirty) //We are discarding changes
        this.state.editedText = this.state.originalText;
      else
        this.state.originalText = this.state.editedText;
    };
  },

  saveResource : function(){
    this.setState({isTextDirty:false});
    this.props.model.content = this.state.editedText;
    if (this.state.exerciseSelection !== null && this.state.exerciseSelection !== undefined){
      this.props.model.className = this.state.exerciseSelection.className;
      this.props.model.configuration = this.state.exerciseSelection.configuration;
    }
    else {
      this.props.model.className = '';
      this.props.model.configuration = '';
    }
    this.state.originalText = this.state.editedText;
    this.props.initiateSave();
  },

  onTextChaged : function(newHtml){
      if (this.state.editedText !== newHtml){
        this.setState({editedText: newHtml, isTextDirty:true});
        this.props.onDirtyFlagRaised();
      }
  },

  removeItem: function(){
    this.props.removeItem(this.props.model);
  },

  openExerciseDialog: function(){
    this.setState({isExerciseDialogOpen: true});
  },

  submitExerciseDialog: function(exerciseSelection){
    this.setState({
      isExerciseDialogOpen: false,
      exerciseSelection: exerciseSelection
    }, function(){
      this.saveResource();
    });

  },

  cancelExerciseDialog: function(exerciseSelection){
    this.setState({
      isExerciseDialogOpen: false,
    });
  },

  render: function(){
    var editText = this.state.isEditing ? (this.state.isTextDirty ? "Afslut uden at gemme" : "Afslut redigering") : "Redigér indhold";
    return (
      <div>
        { !this.props.firstElement && this.props.isEditEnabled  ? <Divider style={{marginTop:'12px'}} /> : null}

        {this.state.isEditing && this.props.isEditEnabled ?
          <div>
            <RaisedButton secondary={true} style={{marginRight:'0', marginTop: '12px', marginBottom: '12px'}} label={editText} onClick={this.toggleEditing}></RaisedButton>
            {
              this.state.isTextDirty && this.state.isEditing ?
              <RaisedButton primary={true} style={ {textAlign:'right', marginRight:'0', marginTop: '12px', marginBottom: '12px', marginLeft:'8px'}} label="Gem ændringer" onClick={this.saveResource}></RaisedButton>
              : null
            }
            <CKEditor text={this.state.originalText} onTextChangedCallback={this.onTextChaged}></CKEditor>
          </div> :
          <div >
            <div dangerouslySetInnerHTML={{__html:this.state.originalText}} />
            <ExerciseSelector exerciseSelection={this.state.exerciseSelection}></ExerciseSelector>

            {this.props.isEditEnabled ?
            <div>
              <div>
                <span style={{color:'#666666'}}>Foretag ændringer: </span>
                <FlatButton onClick={this.toggleEditing} style={{padding:'0'}} secondary={true} label="Redigér opgavetekst"></FlatButton>
                <FlatButton onClick={this.openExerciseDialog} secondary={true} style={{marginLeft:'8px', padding:'0'}} label="Vælg opgavetype"></FlatButton>
                <ExerciseDialog selected={this.state.exerciseSelection} open={this.state.isExerciseDialogOpen} onCancel={this.cancelExerciseDialog} onSubmit={this.submitExerciseDialog} />
                {!this.props.firstElement ? <FlatButton onClick={this.removeItem} secondary={true} style={{marginLeft:'8px', padding:'0'}} label="Fjern"></FlatButton> : null}
              </div>
            </div> : null}
          </div>}
      </div>
  );}
});

let ExerciseContentAdministration = React.createClass({
  currentResourceId : null,

  getInitialState: function(){
    return {
      exerciseElements : [],
      isHTMLViewOpen : false,
      htmlText : null,
      resultHtmlText : null,
      selectedCourse: null,
      selectedResource:null,
      isDirty : false,
      resourceVersion : null,
      isSavingResource:false,
      isLoadingResource:false,
      isEditing:false
    };
  },

  componentDidMount : function(){
    this.setState({selectedResource: this.props.selectedResource});
    this.getResource(this.props.selectedResource);
  },

  componentWillReceiveProps : function(nextProps){
    if (nextProps.selectedResource !== this.props.selectedResource){
      this.setState({selectedResource: nextProps.selectedResource});
      this.getResource(nextProps.selectedResource);
    }
  },

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      window.scrollTo(0,document.body.scrollHeight);
      this.shouldScrollBottom = false;
    }
  },

  getResource : function(resourceId){
    if (resourceId === undefined ||resourceId === null)
      return;

    this.setState({isLoadingResource:true, exerciseElements:[]});
    this.props.dispatch(getExerciseResourceById(resourceId)).then(
      json => {
      this.setState({
        exerciseElements : json.resource.elements,
        resourceVersion : json.resource.version,
        isLoadingResource:false
      });
      this.currentResourceId = json.resource.id
    });
  },

  saveResource : function(){
    this.setState({isDirty:false, isSavingResource:true});
    var that = this;
    this.props.dispatch(putExerciseResourceById(
      this.currentResourceId,
      this.props.selectedModule,
      this.state.exerciseElements)).then(
      json => {
        that.setState({
          resourceVersion : json.response.updatedResouceVersion,
          isSavingResource : false
        });
        that.currentResourceId = json.response.updatedResouceId;
        this.props.resourceRevisionUpdated(json.response.parentResourceId, json.response.updatedResouceId);
    });

  },

  toggleHtml : function() {
    this.setState({isHTMLViewOpen: !this.state.isHTMLViewOpen});
  },

  onDirtyFlagRaised : function(){
    this.setState({isDirty: true});
  },

  addExerciseElement : function(){
    if (!this.state.isEditing)
      this.toggleEditing();

    this.setState({
      exerciseElements : this.state.exerciseElements.concat([{
        content: this.state.exerciseElements.length > 0 ?
          '<h3>&lt;Underoverskrift her&gt;</h3> <p>&lt;Kort tekst her, evt. efterfulgt af opgave: &gt;</p>' :
          '<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her, evt. efterfulgt af opgave: &gt;</p>'
      }])
    }, function(){
      //State change has taken effect
      this.saveResource();

      var node = this.getDOMNode();
      this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    });
  },

  removeExerciseElement : function(element){
    var index = this.state.exerciseElements.indexOf(element);
    if (index > -1) {
      this.state.exerciseElements.splice(index, 1);
    }

    this.setState({
      exerciseElements : this.state.exerciseElements
    }, function(){
      //The state change has taken effect
      this.saveResource();
    });

  },

  toggleEditing : function(){
    this.setState({isEditing: !this.state.isEditing})
  },

  render: function() {
    var VersionText = "Version: " + this.state.resourceVersion;
    var editText = this.state.isEditing ? (this.state.isDirty ? "Afslut uden at gemme" : "Afslut redigering") : "Redigér indhold";

    var Elements = this.state.exerciseElements.map((i, index) => (
      <ExerciseElement key={index} firstElement={index === 0} isEditEnabled={this.state.isEditing} removeItem={this.removeExerciseElement} model={i} initiateSave={this.saveResource} onDirtyFlagRaised={this.onDirtyFlagRaised} />
    ));

    var Editor = this.state.exerciseElements.length > 0 ?
      <div>
        <Divider/>
        <div style={paddingStyle}>
          <Toolbar style={{background: 'transparent', padding:'0', marginBottom: '8px'}}>
            <ToolbarGroup firstChild={true} float="left">

              <DropDownMenu value={1} style={{marginRight:'0px'}}>
                <MenuItem value={1} primaryText={VersionText} />
                <MenuItem value={2} primaryText="Vælg en anden version" />
              </DropDownMenu>

              { this.state.isSavingResource ?
                <CircularProgress size={0.4} style={{marginTop: '6px'}} />: null }
            </ToolbarGroup>

            <ToolbarGroup >
              <RaisedButton  secondary={true} style={ {marginRight:'0'}} label={editText} onClick={this.toggleEditing}></RaisedButton>
              <RaisedButton secondary={true} style={{marginLeft:'8px'}} label="Tilføj ny opgave" onClick={this.addExerciseElement}/>
            </ToolbarGroup>
          </Toolbar>
          <Divider/>
          {Elements}
        </div>
      </div> : null;

    return (
        <div>
          {this.state.isLoadingResource ? <div style={{textAlign:'center'}}>
            <Divider/>
            <CircularProgress size={0.4} style={{marginTop: '20px', marginBottom: '20px'}} />
          </div> : null}
          {Editor}
          <Divider />
          {this.state.htmlText !== null ?
            <FlatButton label={HtmlButtonLabel} secondary={true} onClick={this.toggleHtml}/> : null
          }

        </div>
    )
  }
});

ExerciseContentAdministration = connect()(ExerciseContentAdministration);

export default ExerciseContentAdministration
