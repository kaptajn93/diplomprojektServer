import React from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';

import CourseModuleInfo from '../components/CourseModuleInfo';
import CourseModuleExperiment from '../components/CourseModuleExperiment';
import CourseModuleReflection from '../components/CourseModuleReflection';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

import IntroductionContentAdministration from '../components/AdministrationComponents/IntroductionContentAdministration';
import ExerciseContentAdministration from '../components/AdministrationComponents/ExerciseContentAdministration';

import { getAllCourses, getAllCourseModules } from '../actions/api'

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

const resourceItems = [
  <MenuItem key={1} value={1} primaryText="Introduktion"/>,
  <MenuItem key={2} value={2} primaryText="Eksperiment"/>,
  <MenuItem key={3} value={3} primaryText="Reflektion"/>
];

let AdministrationModule = React.createClass({

  getInitialState: function(){
    return {
      courses : [],
      selectedCourse: null,
      modules : [],
      selectedModule:null,
      selectedResource:null,
      isLoadingCourses:false,
      isLoadingModules:false,
      currentResourceId : null,
      currentModuleId : null,
    };
  },

  resourceRevisionUpdated: function(parentresourceId, updatedResouceId){
    //See if resource is an list of resources, and update the reference
    if (this.state.modules[this.state.selectedModule].introduction === parentresourceId)
      this.state.modules[this.state.selectedModule].introduction = updatedResouceId;
  },

  exerciseRevisionUpdate: function(parentresourceId, updatedResouceId){
    //See if resource is an list of resources, and update the reference
    if (this.state.modules[this.state.selectedModule].exercise === parentresourceId)
      this.state.modules[this.state.selectedModule].exercise = updatedResouceId;

    if (this.state.modules[this.state.selectedModule].reflection === parentresourceId)
      this.state.modules[this.state.selectedModule].reflection = updatedResouceId;
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

  onCourseSelected : function(event, index, value) {
    this.setState({selectedCourse:value, selectedModule:null, selectedResource:null, htmlText:null, resultHtmlText:null, isTextDirty:false});
    this.getCourseModules(this.state.courses[index].id);
  },

  onModuleSelected : function(event, index, value) {
    this.setState({
      selectedModule:value,
      selectedResource:null,
      currentModuleId : this.state.modules[value].id});
  },

  onResourceSelected : function(event, index, value){
    var resourceId = null
    if (value === 1)
      resourceId = this.state.modules[this.state.selectedModule].introduction;
    else if (value ===2)
      resourceId = this.state.modules[this.state.selectedModule].exercise;
    else if (value === 3)
      resourceId = this.state.modules[this.state.selectedModule].reflection;

    this.setState({
      selectedResource: value,
      selectedResourceId : resourceId,
      htmlText:null,
      resultHtmlText:null,
      isTextDirty:false});
  },

  render: function() {

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
              {
                this.state.selectedResource === 1 ?
                <IntroductionContentAdministration
                  selectedModule={this.state.currentModuleId}
                  selectedResource={this.state.selectedResourceId}
                  resourceRevisionUpdated={this.resourceRevisionUpdated}/> :
                this.state.selectedResource === 2 || this.state.selectedResource === 3 ?
                <ExerciseContentAdministration
                  selectedModule={this.state.currentModuleId}
                  selectedResource={this.state.selectedResourceId}
                  resourceRevisionUpdated={this.exerciseRevisionUpdate}/>
                : null
              }
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
