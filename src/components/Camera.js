import React from 'react'

var Camera = React.createClass({
  getInitialState: function() {
    return {test: 'Weee'};
  },

  componentDidMount: function() {
    console.log("componentDidMount");

    $(this.refs.placeholder).append($('<camera id="VideoPresentationCamera" data-app-id="a-d90a5c50-c1dc-0133-453d-0a121b885d5b"></camera>'));

    console.log(CameraTag);

    var ctx = this;

    CameraTag.observe("VideoPresentationCamera", "initialized", function(){
      console.log("Camera initialized");
    });

    CameraTag.observe("VideoPresentationCamera", "published", function(){
      console.log("Video published");

      var camera = CameraTag.cameras["VideoPresentationCamera"];
      var video = camera.getVideo();

      console.log(video.uuid);

      ctx.props.onPublish(video.uuid);
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

export default Camera
