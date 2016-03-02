import React from 'react'

var Camera = React.createClass({
  getInitialState: function() {
    return {test: 'Weee'};
  },

  componentDidMount: function() {
    console.log("componentDidMount");

    $(this.refs.placeholder).append($('<camera id="MyFirstCamera" data-app-id="a-d90a5c50-c1dc-0133-453d-0a121b885d5b"></camera>'));

    console.log(CameraTag);

    CameraTag.observe("MyFirstCamera", "initialized", function(){
      console.log("Camera initialized");
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
