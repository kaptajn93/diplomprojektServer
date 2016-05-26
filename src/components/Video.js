import React from 'react'

var Video = React.createClass({

  componentDidMount: function() {
    console.log("componentDidMount");

    CameraTag.setup();

    console.log(CameraTag);

    CameraTag.observe("VideoToReviewPlayer", "ready", function(){
      console.log("Video initialized");
    });
  },

  componentWillUnmount: function() {
    // Clean up work here.
  },

  shouldComponentUpdate: function() {
    // Let's just never update this component again.
    return false;
  },

  render: function() {
    console.log("render");

    return (
      <div style={{marginLeft:'auto', marginRight:'auto', width:480}}>
        <video  id="VideoToReviewPlayer" data-uuid={this.props.uuid}></video>
      </div>);
  }
});

export default Video
