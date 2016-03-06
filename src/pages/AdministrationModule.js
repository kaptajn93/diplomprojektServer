import React from 'react'
import { connect } from 'react-redux'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';
import Divider from 'material-ui/lib/divider';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';

import CourseModuleInfo from '../components/CourseModuleInfo';
import CourseModuleExperiment from '../components/CourseModuleExperiment';
import CourseModuleReflection from '../components/CourseModuleReflection';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

import { getAllCourses, getAllCourseModules, getResourceById, putResourceById } from '../actions/api'

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
};

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};


var paddingStyle = {
  padding: '32px'
}

var textareaStyle = {
  minHeight:'800px'
}

var htmlStyle={
  padding: '0px 32px 32px 32px',
  color: '#888888'
}

const CKEditor = React.createClass({
  isComponentInitialized : false,
  ckEditor : null,
  shouldComponentUpdate: function(){
    return true;
  },

  componentDidMount : function(){
    var initialText = this.props.text;
    var textChanged = this.props.onTextChangedCallback;

    this.ckEditor = CKEDITOR.replace(this.refs.editor, {
      height: 600,
      contentsCss: [
        CKEDITOR.getUrl( 'https://fonts.googleapis.com/css?family=Roboto:400,300,500' ),
        // Add CSS for widget styles.
        'https://fonts.googleapis.com/css?family=Roboto:400,300,500',
        'ckEditor.css'
        ]
      });
    var ckEditor = this.ckEditor;

    this.ckEditor.on('instanceReady', function() {
      ckEditor.setData(initialText);
      this.isComponentInitialized = true;
    });

    function updateModel() {
      if (this.isComponentInitialized){
        var newText = ckEditor.getData();
        if (textChanged !== undefined)
          textChanged(newText);
      }
    };

    this.ckEditor.on('change', updateModel);
    this.ckEditor.on('key', updateModel);
    this.ckEditor.on('dataReady', updateModel);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.text === null){
      this.ckEditor.setData("");
    }
    else if (nextProps.text !== this.props.text){
      this.ckEditor.setData(nextProps.text);
    }
  },

  render: function(){
    return (
      <textarea style={textareaStyle} ref="editor" ></textarea>
    )
  }
});

const resourceItems = [
  <MenuItem key={1} value={1} primaryText="Introduktion"/>,
  <MenuItem key={2} value={2} primaryText="Eksperiment"/>,
  <MenuItem key={3} value={3} primaryText="Reflektion"/>
];

let AdministrationModule = React.createClass({
  currentResourceId : null,
  currentModuleId : null,
  getInitialState: function(){
    return {
      isHTMLViewOpen : false,
      isEditoropen : false,
      htmlText : null,//"<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>",
      resultHtmlText : null,
      courses : [],
      selectedCourse: null,
      modules : [],
      selectedModule:null,
      selectedResource:null,
      isTextDirty : false,
      resourceVersion : null,
      isSavingResource:false,
      isLoadingCourses:false,
      isLoadingModules:false,
      isLoadingResource:false
    };
  },

  saveResource : function(){
      this.setState({isTextDirty:false, isSavingResource:true});
      var that = this;
      this.props.dispatch(putResourceById(
        this.currentResourceId,
        this.currentModuleId,
        this.state.resultHtmlText)).then(
        json => {
          that.setState({
            resourceVersion : json.response.updatedResouceVersion,
            isSavingResource : false
          });
          that.currentResourceId = json.response.updatedResouceId;

          //See if resource is an list of resources, and update it
          if (that.state.modules[that.state.selectedModule].introduction === json.response.parentResourceId)
            that.state.modules[that.state.selectedModule].introduction = json.response.updatedResouceId;

          if (that.state.modules[that.state.selectedModule].exercise === json.response.parentResourceId)
            that.state.modules[that.state.selectedModule].exercise = json.response.updatedResouceId;

          if (that.state.modules[that.state.selectedModule].reflection === json.response.parentResourceId)
            that.state.modules[that.state.selectedModule].reflection = json.response.updatedResouceId;
      });
  },

  componentDidMount : function(){
    this.setState({isLoadingCourses:true})
    this.props.dispatch(getAllCourses()).then(
      json => {
      this.setState({
        courses: json.courses,
        isLoadingCourses: false
      });
    });
  },

  getCourseModules : function(courseId){
    this.setState({
      isLoadingModules:true
    })
    this.props.dispatch(getAllCourseModules(courseId)).then(
      json => {
      this.setState({
        modules: json.modules,
        isLoadingModules:false
      });
    });
  },

  getResource : function(resourceId){
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

  toggleHtml : function() {
    this.setState({isHTMLViewOpen: !this.state.isHTMLViewOpen});
  },

  onTextChaged : function(newHtml){
      if (this.state.resultHtmlText !== newHtml)
        this.setState({resultHtmlText: newHtml, isTextDirty:true});
  },

  onCourseSelected : function(event, index, value) {
    this.setState({selectedCourse:value, selectedModule:null, selectedResource:null, htmlText:null, resultHtmlText:null, isTextDirty:false});
    this.getCourseModules(this.state.courses[index].id);
  },

  onModuleSelected : function(event, index, value) {
    this.currentModuleId = this.state.modules[value].id;
    this.setState({selectedModule:value, selectedResource:null, htmlText:null, resultHtmlText:null, isTextDirty:false});
  },

  onResourceSelected : function(event, index, value){
    this.setState({selectedResource: value, htmlText:null, resultHtmlText:null, isTextDirty:false});

    if (value === 1)
      this.getResource(this.state.modules[this.state.selectedModule].introduction);
    else if (value ===2)
      this.getResource(this.state.modules[this.state.selectedModule].exercise);
    else if (value === 3)
      this.getResource(this.state.modules[this.state.selectedModule].reflection);
  },

  render: function() {
    var HtmlDisplayArea = this.state.isHTMLViewOpen ? (
      <div style={htmlStyle}>
        <pre style={{whiteSpace:'pre-line'}}>{this.state.resultHtmlText}</pre>
      </div>) : null;

    var HtmlButtonLabel = this.state.isHTMLViewOpen ? 'Skjul html' : 'Vis html';
    var VersionText = "Version: " + this.state.resourceVersion;

    var Editor = this.state.htmlText !== null ?
      <div>
        <Divider/>
        <div style={paddingStyle}>
          <Toolbar style={{background: 'transparent', padding:'0'}}>
            <ToolbarGroup firstChild={true} float="left">

              <DropDownMenu value={1} style={{marginRight:'0px'}}>
                <MenuItem value={1} primaryText={VersionText} />
                <MenuItem value={2} primaryText="Vælg en anden version" />
              </DropDownMenu>

              { this.state.isSavingResource ?
                <CircularProgress size={0.4} style={{marginTop: '6px'}} />: null }
            </ToolbarGroup>

            <ToolbarGroup float="right">
                { this.state.isTextDirty ?
                  <RaisedButton primary={true} style={ {textAlign:'right', marginRight:'0'}} label="Gem ændringer" onClick={this.saveResource}></RaisedButton>
                  : null}

            </ToolbarGroup>
          </Toolbar>
          <CKEditor text={this.state.htmlText} onTextChangedCallback={this.onTextChaged}></CKEditor>
        </div>
      </div> : null;

    var CoursItems = this.state.courses.map((i, index) => (<MenuItem key={index} value={index} primaryText={i.name}/>));

    var SelectCourses =
      <SelectField
        style={{width: '360px'}}
        value={this.state.selectedCourse}
        onChange={this.onCourseSelected}
        floatingLabelText={ this.state.isLoadingCourses ? "Henter..." : "Vælg kursus" } >
        {CoursItems}
      </SelectField>

      var ModuleItems = this.state.modules.map((i, index) => (<MenuItem key={index} value={index} primaryText={i.name}/>));

      var SelectModule = this.state.selectedCourse !== null ?
        <SelectField
          style={{width: '360px', marginLeft:'20px'}}
          value={this.state.selectedModule}
          onChange={this.onModuleSelected}
          floatingLabelText={ this.state.isLoadingModules ? "Henter..." : "Vælg modul" } >
          {ModuleItems}
        </SelectField> : null;

      var SelectResource = this.state.selectedModule !== null ?
        <SelectField
          style={{width: '300px', marginLeft:'20px'}}
          value={this.state.selectedResource}
          onChange={this.onResourceSelected}
          floatingLabelText="Vælg resource">
          {resourceItems}
        </SelectField> : null;

    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Paper style={courseContainerStyle}>
              <div style={paddingStyle}>
                <h1>Administration</h1>
                <div style={{display:'flex'}}>
                  {SelectCourses}
                  {SelectModule}
                  {SelectResource}
                  { this.state.isLoadingModules || this.state.isLoadingCourses ?
                    <CircularProgress size={0.4} style={{marginTop: '20px'}} />: null }
                </div>
              </div>
              {this.state.isLoadingResource ? <div style={{textAlign:'center'}}>
                <Divider/>
                <CircularProgress size={0.4} style={{marginTop: '20px', marginBottom: '20px'}} />
              </div> : null}
              {Editor}

              <Divider />

              {this.state.htmlText !== null ? <FlatButton label={HtmlButtonLabel} secondary={true} onClick={this.toggleHtml}/> : null}
              {HtmlDisplayArea}
            </Paper>

          </Col>
          <Col xs={0} sm={0} md={2} lg={2}/>
        </Row>
      </div>
    )
  }
});

AdministrationModule = connect()(AdministrationModule)

export default AdministrationModule
