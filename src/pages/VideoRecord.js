import React from 'react';
import { connect } from 'react-redux'


import { fetchApiValue } from '../actions/api'

import Camera from '../components/Camera'

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import { shareVideo } from '../actions/shareVideo'

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
}

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};

let VideoRecord = React.createClass({



  render : function() {
    var that = this;
    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>

          <Col xs={12} sm={12} md={8} lg={8}>
            <Row>

              <Col xs={12} sm={12} md={12} lg={12}>
                <Paper>
                  <div style={{padding:'16 48'}}>
                  <h1>Optag en video, og del den med en ven</h1>

                  <Camera onPublish={videoUuid => {
                      console.log("onPublish invoked");
                      console.log(videoUuid);

                      that.props.dispatch(shareVideo(videoUuid));
                  }}>
                  </Camera>

                  <div style={{textAlign: 'center', marginTop: 50}}>
                    <RaisedButton label="Færdig" primary={true} />
                  </div>
                  </div>
                </Paper>
              </Col>
            </Row>
          </Col>

          <Col xs={0} sm={0} md={2} lg={2}/>
        </Row>
      </div>
    );
  }
});
VideoRecord = connect()(VideoRecord)

export default VideoRecord;


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
