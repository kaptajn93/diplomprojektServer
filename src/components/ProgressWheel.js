import React from 'react';
import { connect } from 'react-redux'

import Colors from 'material-ui/lib/styles/colors';

let ProgressWheel = React.createClass({

  getInitialState: function(){
    return {
      isLoading:true
    };
  },

  componentDidMount : function(){
    this.setState({
      currentModule: this.props.currentModule,
      maxModules: this.props.maxModules
    });
    var context = this.getDOMNode().getContext('2d');
    this.paint(context);
  },

  componentDidUpdate: function() {
    var context = this.getDOMNode().getContext('2d');
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.paint(context);
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      currentModule: nextProps.currentModule,
      maxModules: nextProps.maxModules
    });
  },

  paint: function(context) {
    var progress = this.state.currentModule * 2 * Math.PI / this.state.maxModules;
    var segment = 2 * Math.PI / this.state.maxModules;

    var width = 12;
    context.save();
    context.beginPath();
    context.lineWidth=width;
    context.strokeStyle=Colors.green200;
    context.arc(this.props.width/2.0, this.props.height/2.0, (this.props.width - width) / 2.2,0,2*Math.PI);
    context.stroke();

    context.beginPath();
    context.lineWidth=width;
    context.strokeStyle=Colors.green700;
    context.arc(this.props.width/2.0, this.props.height/2.0, (this.props.width - width) / 2.2,-0.5 * Math.PI,progress -0.5 * Math.PI);
    context.stroke();

    context.beginPath();
    context.lineWidth=width*1.7;
    context.strokeStyle='#f9f9f9';
    context.arc(this.props.width/2.0, this.props.height/2.0, (this.props.width - width) / 2.2, progress -0.515 * Math.PI, progress + segment - 0.485 * Math.PI);
    context.stroke();

    context.beginPath();
    context.lineWidth=width*1.5;
    context.strokeStyle=Colors.green400;
    context.arc(this.props.width/2.0, this.props.height/2.0, (this.props.width - width) / 2.2, progress -0.5 * Math.PI, progress + segment - 0.5 * Math.PI);
    context.stroke();

    context.textAlign="center";
    context.font = '16px Roboto';
      context.fillStyle = '#666666';
    context.fillText('MODUL', this.props.width/2.0, this.props.height/2.36);

    context.textAlign="center";
    context.font = 'bold 34px Roboto';
      context.fillStyle = '#000000';
    context.fillText(this.state.currentModule + 1, (this.props.width)/2.0, this.props.height/1.5)

    context.restore();
  },

  render : function(){
    return <canvas width={this.props.width} height={this.props.height} style={{margin:32}} />;
  }
});

export default ProgressWheel;
