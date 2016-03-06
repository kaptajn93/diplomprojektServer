import React from 'react'

var Video = React.createClass({
  getInitialState: function() {
    return {test: 'Weee'};
  },

  componentDidMount: function() {
    console.log("componentDidMount");

    $(this.refs.placeholder).append($('<video id="VideoToReviewPlayer" data-uuid="v-3a021256-a558-469c-8c4a-75743533e003"></video>'));

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
    return true;
  },

  render: function() {
    console.log("render");

    return <div ref="placeholder"/>;
  }
});

export default Video
