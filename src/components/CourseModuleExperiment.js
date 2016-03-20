import React from 'react';
import { connect } from 'react-redux'

import ExerciseSelector from './Exercises/ExerciseSelector';

import { fetchApiValue } from '../actions/api'

import Camera from './Camera'

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import { shareVideo } from '../actions/shareVideo'

import { getExerciseResourceById } from '../actions/api'

let CourseModuleExperiment = React.createClass({
  getInitialState: function(){
    return {
      exerciseElements : [],
      isLoadingResource:false,
    };
  },

  getResource : function(resourceId){
    if (resourceId === undefined ||resourceId === null)
      return;

    this.setState({isLoadingResource:true, exerciseElements:[]});
    this.props.dispatch(getExerciseResourceById(resourceId)).then(
      json => {
      this.setState({
        exerciseElements : json.resource.elements,
        isLoadingResource:false
      });
      this.currentResourceId = json.resource.id
    });
  },

  componentDidMount : function(){
    this.setState({
      isLoading:true
    })

    if (this.props.resourceId !== undefined)
      this.getResource(this.props.resourceId);
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.resourceId !== undefined)
      this.getResource(nextProps.resourceId);
  },

  render : function() {

    var Elements = this.state.exerciseElements.map((i, index) => (
      <div key={index}>
        <div dangerouslySetInnerHTML={{__html:i.content}} />
        <ExerciseSelector exerciseSelection={i}></ExerciseSelector>
      </div>
    ));

    return (
      <div>
        {Elements}
      </div>
    );
  }
});
CourseModuleExperiment = connect()(CourseModuleExperiment)

export default CourseModuleExperiment;


/*<h1>Opgave 1</h1>
<h3>Hvad var godt ved dit gamle job?</h3>
<p>Prøv at sortér begreberne herunder ift. hvad du bedst kunne lide ved dit gamle job</p>

<SortableList/>

<h1>Opgave 2</h1>
<h3>Hvordan præsenterer du dig selv?</h3>
<p>Film en præsentation af dig selv og del den med en ven</p>

<Camera onPublish={videoUuid => {
    console.log("onPublish invoked");
    console.log(videoUuid);

    dispatch(shareVideo(videoUuid));
}}>
</Camera>

<div style={{textAlign: 'center', marginTop: 50}}>
  <RaisedButton label="Færdig" primary={true} />
</div>*/
