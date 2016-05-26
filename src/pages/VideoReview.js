import React from 'react'
import { connect } from 'react-redux'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';

import Paper from 'material-ui/lib/paper';

import CourseModuleInfo from '../components/CourseModuleInfo';
import CourseModuleExperiment from '../components/CourseModuleExperiment';
import CourseModuleReflection from '../components/Video';
import Video from '../components/Video';

import Theme from '../components/Theme';

import { getVideoExercise, postVideoReply } from '../actions/shareVideo';

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
}

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};

var moduleNumStyle = {
  color: '#888888',
  marginTop: '0px',
  marginBottom: '10px'
}

var moduleNameStyle = {
  marginTop: '0px',
  marginBottom: '0px'

}

var paddingStyle = {
  padding: '32px'
}

var marginStyle = {
  margin: '32px'
}

var iconStyle = {
  color : 'black'
}

let VideoReview = React.createClass({
  getInitialState: function(){
    let { query } = this.props.location;
    let uuid = query && query.uuid ? query.uuid : '';
    let userid = query && query.userid ? query.userid : '';

    return {
        userFirstName: 'din ven',
        hasLoadedUser: false,
        uuid,
        userid
      }
  },

  shouldComponentUpdate: function() {
    // Let's just never update this component again.
    return true;
  },

  postReply:function(){
    this.setState({isLoading: true});
    this.props.dispatch(postVideoReply(this.state.userid, this.state.uuid,
      this.refs.replyField.getValue())).then(
      json => {
        this.setState({
          isLoading: false,
          phase: 4
        });

      })
  },

  componentDidMount : function(){
    this.setState({isLoading: true});
    this.props.dispatch(getVideoExercise(this.state.userid, this.state.uuid)).then(
      json => {
        this.setState({
          isLoading: false,
          reviewerFirstName:json.result.scoreCard.reviewerFirstName,
          reviewerLastName:json.result.scoreCard.reviewerLastName,
          userFirstName:json.result.userFirstName,
          userLastName:json.result.userLastName,
          phase: json.result.scoreCard.phase,
          hasLoadedUser: true
        });

      }
    );
  },

  render: function() {
    let { query } = this.props.location;
    let videoUuid = query && query.uuid ? query.uuid : '';

    console.log("Video UUID:", videoUuid);

    return (
      this.state.isLoading ?
      <div style={{textAlign:'center'}}>
        <CircularProgress size={0.4} style={{marginTop: '6px'}} />
      </div>:
      this.state.phase > 3 ?
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Row>
              <Col  xs={12} sm={12} md={12} lg={12}>
                <div style={{padding:'16 48', background:Theme.palette.primary1Color, color:Theme.palette.alternateTextColor}}>

                  <h1>Tak for hjælpen!</h1>
                  <p>{this.state.userFirstName} har modtaget din feedback.</p>
                </div>
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

                  <h1>{this.state.userFirstName} har brug for din hjælp.</h1>
                  <p>I videoen vil {this.state.userFirstName} forklare dig hvorfor han/hun mistede sit job. Forklaringen skal være i neutrale vendinger, og uden negativitet. Din opgave er, at lægge mærke til om opgaven er løst, og om historien er uden negativitet.</p>
                  <p>Se videoen og skriv en kommentar hvor du forklarer hvad der var godt, og hvad der kan forbedres.</p>
                </div>
              </Col>
            </Row>

            <Row style={{marginTop:8}}>

              <Col xs={12} sm={12} md={12} lg={12}>
                <Paper style={courseContainerStyle}>
                  <div>
                    <div style={{padding:32, textAlign:'center', background:'#060606'}}>
                      {this.state.hasLoadedUser ? <Video uuid={videoUuid}></Video> : null}
                    </div>

                  </div>
                  <div style={{padding:'48 48'}}>


                      <h3 style={{marginTop:0, marginBottom:0}}>Skriv en kommentar</h3>

                      <div style={{display:'flex'}}>
                        <TextField
                          ref='replyField'
                          style={{width:'100%'}}
                          multiLine={true}
                          floatingLabelText={"Din kommentar til " + this.state.userFirstName }
                        />
                        <RaisedButton primary={true} label='Færdig'
                          onClick={this.postReply}
                          icon={<FontIcon className="material-icons">done</FontIcon>}
                          style={{
                            marginBottom: 8,
                            marginTop: 'auto',
                            marginLeft: 16, width:150}}>
                        </RaisedButton>
                      </div>
                  </div>
                </Paper>
              </Col>
            </Row>


          </Col>
          <Col xs={0} sm={0} md={2} lg={2}/>
        </Row>
      </div>
    )
  }
});

VideoReview = connect()(VideoReview)
export default VideoReview
