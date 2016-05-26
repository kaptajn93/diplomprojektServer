import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Camera from '../components/Camera'

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import Divider from 'material-ui/lib/divider';

import { shareVideo } from '../actions/shareVideo';
import Back from 'material-ui/lib/svg-icons/navigation/arrow-back';
import FontIcon from 'material-ui/lib/font-icon';

import Theme from '../components/Theme';

import { getExerciseResult } from '../actions/api';
import CircularProgress from 'material-ui/lib/circular-progress';

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
}

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};

var iconFont = {
  fontSize: 20,
    verticalAlign: 'bottom',
    color: Theme.palette.textColorMuted
};

let VideoRecord = React.createClass({
  getInitialState: function(){
    return {
      firstName: 'din ven'
    }
  },

  componentDidMount : function(){
    this.setState({isLoading: true});
    this.props.dispatch(getExerciseResult(this.props.params.exerciseId)).then(
      json => {
        this.setState({
          isLoading: false,
          firstName:json.result.reviewerFirstName,
          lastName:json.result.reviewerLastName,
          phase: json.result.phase
        });

      }
    );
  },

  returnToModule: function(){
    browserHistory.goBack();
  },

  render : function() {
    var that = this;
    return (

      this.state.isLoading ?
      <div style={{textAlign:'center'}}>
        <CircularProgress size={0.4} style={{marginTop: '6px'}} />
      </div> :

      this.state.phase === 2 ?
        <div style={pageContainerStyle}>
          <Row>
            <Col xs={0} sm={0} md={2} lg={2}/>

            <Col xs={12} sm={12} md={8} lg={8}>
              <Row>
                <Col  xs={12} sm={12} md={12} lg={12}>
                  <div style={{padding:'16 48', background:Theme.palette.primary1Color, color:Theme.palette.alternateTextColor}}>

                    <h1>Optag en video</h1>
                    <p>For at optage en video kræver det at du har et webcam eller en smartphone med kamera. Din video bliver sendt til din ven, {this.state.firstName} {this.state.lastName}. Inden du accepterer videoen kan du gense den og optage en ny hvis du ikke er tilfreds.</p>
                  </div>
                </Col>
              </Row>
              <Row style={{marginTop:8}}>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Paper style={courseContainerStyle}>
                    <div>
                      <div style={{padding:32, textAlign:'center', background:'#060606'}}>
                        <Camera onPublish={videoUuid => {
                            console.log("onPublish invoked");
                            console.log(videoUuid);
                            if (that.state.phase === 2)
                              that.props.dispatch(shareVideo(videoUuid, that.props.params.exerciseId)).then(j => {
                                that.returnToModule();
                              });
                            that.setState({phase:3});
                        }}>
                        </Camera>
                      </div>

                    </div>
                  </Paper>
                </Col>
              </Row>

              <Row style={{marginTop:8}}>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Paper style={courseContainerStyle}>
                    <div style={{padding:'48 48'}}>


                        <h2 style={{marginTop:0}}>Sådan gør du</h2>
                        <h4 style={{marginBottom:4}}>A: Du har et webcam i din computer/tablet</h4>
                        <p>Vælg <strong>'record from webcam'</strong> <FontIcon className="material-icons" style={iconFont} >videocam</FontIcon> og begynd at optage. Tryk på videoen når du er færdig. Tryk <strong>'Accept'</strong>, og videoen vil blive sendt til {this.state.firstName}.</p>
                        <h4 style={{marginBottom:4}}>B: Du har en smartphone med kamera</h4>
                        <p>Vælg <strong>'record from phone'</strong> <FontIcon className="material-icons" style={iconFont} >phone_iphone</FontIcon> og begynd at optage. Du vil modtage en sms hvor du skal trykke på linket. Efterfølgende kan du optage en video med dit kamera. Når du er færdig vil videoen blive sendt til {this.state.firstName}.</p>


                      <div style={{marginTop: 32}}>
                        <RaisedButton label="Tilbage til modulet" onClick={this.returnToModule} secondary={true} />
                      </div>
                    </div>
                  </Paper>
                </Col>
              </Row>
            </Col>

            <Col xs={0} sm={0} md={2} lg={2}/>
          </Row>
        </div> :

        <div style={pageContainerStyle}>
          <Row>
            <Col xs={0} sm={0} md={2} lg={2}/>

            <Col xs={12} sm={12} md={8} lg={8}>
              <Row>
                <Col  xs={12} sm={12} md={12} lg={12}>
                  <div style={{padding:'16 48', background:Theme.palette.primary1Color, color:Theme.palette.alternateTextColor}}>

                    <h1>Din video er sendt til {this.state.firstName}</h1>
                    <p>Vi venter på et svar</p>
                  </div>
                </Col>
              </Row>

              <Row style={{marginTop:8}}>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Paper style={courseContainerStyle}>
                    <div style={{padding:'48 48'}}>
                      <RaisedButton label="Tilbage til modulet" onClick={this.returnToModule} secondary={true} />
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
