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

import { getResourceById, putResourceById } from '../../actions/api'
import CKEditor from './CKEditor';
import CircularProgress from 'material-ui/lib/circular-progress';

var htmlStyle={
  padding: '32px 32px 32px 32px',
  color: '#888888'
}

let IntroductionContentAdministration = React.createClass({
  currentResourceId : null,

  getInitialState: function(){
    return {
      isHTMLViewOpen : false,
      htmlText : null,
      resultHtmlText : null,
      selectedCourse: null,
      selectedResource:null,
      isTextDirty : false,
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

  getResource : function(resourceId){
    if (resourceId === undefined ||resourceId === null)
      return;

    this.setState({isLoadingResource:true});
    this.props.dispatch(getResourceById(resourceId)).then(
      json => {
      this.setState({
        htmlText : json.resource.content,
        resultHtmlText : json.resource.content,
        resourceVersion : json.resource.version,
        isLoadingResource:false
      });
      this.currentResourceId = json.resource.id
    });
  },

  saveResource : function(){
      this.setState({isTextDirty:false, isSavingResource:true});
      var that = this;
      this.props.dispatch(putResourceById(
        this.currentResourceId,
        this.props.selectedModule,
        this.state.resultHtmlText)).then(
        json => {
          that.setState({
            resourceVersion : json.response.updatedResouceVersion,
            isSavingResource : false
          });
          that.currentResourceId = json.response.updatedResouceId;
          this.props.resourceRevisionUpdated(json.response.parentResourceId, json.response.updatedResouceId);
      });

  },

  onTextChaged : function(newHtml){
      if (this.state.resultHtmlText !== newHtml)
        this.setState({resultHtmlText: newHtml, isTextDirty:true});
  },

  toggleHtml : function() {
    this.setState({isHTMLViewOpen: !this.state.isHTMLViewOpen});
  },

  toggleEditing: function() {
    var isCurrentlyEditign = !this.state.isEditing
    this.setState({
      isEditing: isCurrentlyEditign,
      isTextDirty : false
    });

    if (!isCurrentlyEditign) {
      if (this.state.isTextDirty) //We are discarding changes
        this.state.resultHtmlText = this.state.htmlText;
      else
        this.state.htmlText = this.state.resultHtmlText;
    }

  },

  render: function() {
    var HtmlDisplayArea = this.state.isHTMLViewOpen ? (
      <div style={htmlStyle}>
        <pre style={{whiteSpace:'pre-line'}}>{this.state.resultHtmlText}</pre>
      </div>) : null
    var HtmlButtonLabel = this.state.isHTMLViewOpen ? 'Skjul html' : 'Vis html';
    var VersionText = "Version: " + this.state.resourceVersion;
    var editText = this.state.isEditing ? (this.state.isTextDirty ? "Afslut uden at gemme" : "Afslut redigering") : "Redigér indhold";

    var Editor = this.state.htmlText !== null ?
      <div>
        <div>
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
              {
                this.state.isTextDirty && this.state.isEditing ?
                <RaisedButton primary={true} style={ {marginLeft:'8px', marginRight:'0'}} label="Gem ændringer" onClick={this.saveResource}></RaisedButton>
                : null
              }

            </ToolbarGroup>
          </Toolbar>
          {
            this.state.isEditing ?
            <CKEditor text={this.state.htmlText} onTextChangedCallback={this.onTextChaged}></CKEditor> :
            <div>
              <Divider style={{marginBottom:54}} />
              <div dangerouslySetInnerHTML={{__html:this.state.resultHtmlText}} />
            </div>
          }
        </div>
      </div> : null;

    return (
        <div>
          {this.state.isLoadingResource ? <div style={{textAlign:'center'}}>
            <Divider style={{marginBottom:54}}/>
            <CircularProgress size={0.4} style={{marginTop: '20px', marginBottom: '20px'}} />
          </div> : null}
          {Editor}
          <Divider />

          {this.state.htmlText !== null ? <FlatButton label={HtmlButtonLabel} secondary={true} onClick={this.toggleHtml}/> : null}
          {HtmlDisplayArea}
        </div>
    )
  }
});

IntroductionContentAdministration = connect()(IntroductionContentAdministration);

export default IntroductionContentAdministration
