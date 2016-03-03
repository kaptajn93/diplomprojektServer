import React from 'react';
import { connect } from 'react-redux'
import SortableMixin from 'sortablejs/react-sortable-mixin'

import { fetchApiValue } from '../actions/api'

import Camera from './Camera'

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import { shareVideo } from '../actions/shareVideo'

var SortableList = React.createClass({
    mixins: [SortableMixin],

    getInitialState: function() {
      console.log("Get Initial State");
      console.log(SortableMixin);

      return {
          items: ['Chefen', 'Opgaverne', 'Kollegerne', 'Det sociale', 'Lønnen', 'Fleksibiliteten']
      };
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

let CourseModuleExperiment = ({ dispatch }) => {
  return (
    <div>
      <h1>Opgave 1</h1>
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
      </div>
    </div>
  )
};
CourseModuleExperiment = connect()(CourseModuleExperiment)

export default CourseModuleExperiment;
