import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import Comment from 'material-ui/lib/svg-icons/communication/comment';
import Forward from 'material-ui/lib/svg-icons/av/play-arrow';
import Search from 'material-ui/lib/svg-icons/action/search';
import { Link, browserHistory } from 'react-router';
import { getCurrentUserResult } from '../actions/api';
import CircularProgress from 'material-ui/lib/circular-progress';
import RightArrow from 'material-ui/lib/svg-icons/navigation/chevron-right';
import LeftArrow from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/lib/icon-button';
import Check from 'material-ui/lib/svg-icons/navigation/check';
import Place from 'material-ui/lib/svg-icons/maps/place';
import Person from 'material-ui/lib/svg-icons/social/person-outline';
import Theme from '../components/Theme';

import ProgressWheel from '../components/ProgressWheel'

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'16px 20px'
};

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};

var paddingStyle = {
  padding: '32px'
}

var primaryText = {
  color:Theme.palette.primary1Color
}

var logoStyle = {
  height : '140px',
  marginTop: '32px',
  marginLeft: '16px'
}

var mutedText = {
  color: '#888888'
}

var sloganStyle = {
  color: '#888888',
  marginTop:'4px'
}

var widgedSubheaderStyle = {
  color: '#888888',
  marginTop:'4px',
  marginBottom:'0'
}

var bigSubtitle = {
  marginTop:'4px'
}

var smallTitle = {
  color: '#888888',
  marginBottom:'0',
  marginTop:0
}

var title = {
  marginBottom:'4px',
  marginTop:0
}

var cardArticleText = {
  marginBottom:0
}

var noMargin = {
  margin:'0'
}

var widgedStyle = {
  padding: '20px 30px'
}

var transparentBackground = {
  backgroundColor: 'transparent'
}

var colStyle = {
  padding: '4 16'
}

let Dashboard = React.createClass({
  getInitialState:function(){
    return{

    }
  },

  navigateToCurrentModule: function (event) {
    window.location.assign("/#/module/" + this.state.currentModule.id);
  },

  navigateToModule: function(i){
    if (i <= this.state.activeModuleIndex)
      window.location.assign("/#/module/" + this.state.modules[i].module.id);
  },

  navigateToDialog: function(event){
    window.location.assign("/#/dialog/");
  },

  componentDidMount : function(){
    this.setState({
      isLoading:true
    })
    this.props.dispatch(getCurrentUserResult()).then(
      json => {

        for (var i = 0; i < json.results.moduleResults.length; i++) {

          json.results.moduleResults[i].isCompleted = !json.results.moduleResults[i].moduleResults.some((r, index) =>
            !r.isCompleted
          );
          json.results.moduleResults[i].isActive = json.results.activeModuleIndex === i;
        }

        //Separate into groups
        var groups = json.results.groups.map((g, index) => {
          var modules = json.results.moduleResults.filter((m, index) => m.module.groupId === g.groupId);
          var isCompleted = !modules.some((m, index) => !m.isCompleted);
          var isActive = modules.some((m, index) => m.isActive);

          return {
            name: g.groupName,
            description: g.groupDescription,
            modules,
            isCompleted: isCompleted,
            isActive:isActive,
            groupNumber: index + 1,
            isOpen:isActive
          };
        });

        this.setState({
          results: json.results,
          modules: json.results.moduleResults,
          groups: groups,
          currentModule: json.results.activeModule,
          currentModuleResults: json.results.moduleResults[json.results.activeModuleIndex].moduleResults,
          currentModuleIndex: json.results.activeModuleIndex,
          activeModuleIndex: json.results.activeModuleIndex,
        });
    });
  },

  goToModule: function(index){
    this.setState({
      currentModule: this.state.modules[index].module,
      currentModuleResults: this.state.modules[index].moduleResults,
      currentModuleIndex: index,
    });
  },

  nextModule: function(){
    if (this.state.currentModuleIndex < this.state.modules.length - 1)
      this.goToModule(this.state.currentModuleIndex + 1);
  },

  previousModule: function(){
    if (this.state.currentModuleIndex > 0)
      this.goToModule(this.state.currentModuleIndex - 1);
  },

  render: function() {
    var actionButton = this.state.activeModuleIndex === this.state.currentModuleIndex ?
      <RaisedButton label="Fortsæt" labelPosition="before" icon={<Forward />} primary={true} onClick={this.navigateToCurrentModule} /> :
      this.state.activeModuleIndex > this.state.currentModuleIndex ?
        <RaisedButton label="Se resultat" labelPosition="before" icon={<Search />} secondary={true} onClick={this.navigateToCurrentModule} /> :
        null;

    var ExerciseResuts = this.state.currentModuleResults !== undefined ? this.state.currentModuleResults.map((i, index) => (
      i.exerciseDescription === "" ? null :
      i.isCompleted ?
        <div style={{display:'flex'}}><Check style={{margin:'4px', width:20, height:20}} color={Colors.green400}  /> <span style={{marginTop:5, marginLeft:4}}>{i.exerciseDescription}</span></div> :
        <div style={{display:'flex'}}><Check style={{margin:'4px', width:20, height:20}} color={Colors.grey300}  /> <span style={{marginTop:5, marginLeft:4}}>{i.exerciseDescription}</span></div>

    )) : null;

    var groups = this.state.groups !== undefined ? this.state.groups.map((g, index) => {
      return (
        <div>
          <div style={{
            backgroundColor: Theme.palette.backgroundColor,
            display:'flex', padding:'8 16',
            position:'relative'}}>
            <h2 style={{margin:0}}>{g.groupNumber}</h2>
            <h4 style={{
              fontWeight: g.isActive ? 'bold' : 'normal',
              margin:0,
              marginLeft: 20,
              marginTop: 5
            }}>{g.name}</h4>
            <div style={{
              position: 'absolute',
              left: 0,
              bottom: -22,
            	width: 0,
            	height: 0,
            	borderLeft: '22px solid transparent',
            	borderRight: '22px solid transparent',

            	borderTop: '22px solid ' + Theme.palette.backgroundColor
            }}></div>
          </div>

          <div style={{padding:40}}>
            <p style={{margin:0}}>{g.description}</p>
            { g.isOpen ? <div style={{marginTop:32}}>
              <p>Du skal gennem {g.modules.length} moduler i denne fase</p>
              <div>
                {
                  g.modules.map((m, index) =>
                    <RaisedButton onClick={this.navigateToModule.bind(this, m.module.moduleIndex)} secondary={true} style={{margin:'4 0', width:'100%', padding:0}}>
                      <div style={{height:'100%', width:'100%', textAlign:'left'}}>
                        <div style={{display:'flex', padding: '8 16', color: Theme.palette.alternateTextColor }}>
                          <div  style={{width:'100%'}}>
                            <strong >
                              {m.module.moduleIndex + 1}.</strong>
                            <span style={{marginLeft:8}}>{m.module.name}</span>
                          </div>
                          <div style={{width:'50%', textAlign:'right', marginTop:-2}}>
                            {
                              m.isCompleted ? <Check style={{ width:24, height:24}} color={Colors.white}  /> :
                              m.isActive ? <div> <span style={{marginLeft:8, color: Theme.palette.alternateTextColorMuted}}>(Du er her)</span> <Place style={{ width:24, height:24, marginBottom: -6}} color={Colors.white}  /> </div>:
                              null
                            }
                          </div>
                        </div>
                      </div>
                    </RaisedButton>
                  )
                }
              </div>
              <div style={{marginTop: 16, textAlign:'right'}}>
                <RaisedButton style={{width:220, minHeight:44}} labelStyle={{ minHeight:44}} label={this.state.activeModuleIndex === 0 ? 'Kom i gang' : 'Fortsæt modul ' + (this.state.activeModuleIndex + 1)} labelPosition="before" icon={<Forward />} primary={true} onClick={this.navigateToCurrentModule} />
              </div>
            </div> : null}
          </div>
        </div>);
    }) : null;

    var courseOverview = this.state.currentModule !== undefined ? (
      <div>
        {groups}
      </div>
    ) : <div style={{textAlign:'center'}}> <CircularProgress size={0.6} style={{marginTop:60, marginBottom:60}} /> </div>;


    return (
      <div style={pageContainerStyle}>

        <Row>
          <Col xs={0} sm={0} md={1} lg={2} />
          <Col xs={12} sm={12} md={10} lg={8}>
            <Row>
              <Col style={colStyle} xs={12} sm={12} md={12} lg={12}>
                <div style={{padding:'16 48', background:Theme.palette.primary1Color, color:Theme.palette.alternateTextColorMuted}}>

                  <h3 style={{color:Theme.palette.alternateTextColor}}>Hej {sessionStorage.sessionFirstName}</h3>
                  <p>Velkommen til Better Ways - vi hjælper dig med at finde vejen til dit nye job.<br/>Du er jo allerede godt på vej. Held og lykke.</p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop:32}}>
              <Col style={colStyle} xs={12} sm={12} md={12} lg={7}>
                <Paper >
                  {courseOverview}
                </Paper>
              </Col>
              <Col style={colStyle} xs={12} sm={12} md={12} lg={5}>
                <Paper >
                  <div style={{
                    backgroundColor: Theme.palette.backgroundColor,
                    display:'flex', padding:'8 16'}}>
                    <Comment style={{height: '29px', width: '29px'}} color={Colors.grey500} />
                    <h4 style={{
                      fontWeight: 'normal',
                      margin:0,
                      marginLeft: 20,
                      marginTop: 5
                    }}>Samtaler</h4>

                  </div>
                  <div style={{padding:'16 24'}}>
                    <List style={transparentBackground}>
                    <ListItem onClick={this.navigateToDialog}
                        leftAvatar={<Avatar src="assets/tine.jpg" />}
                        primaryText="Fra Tine"
                        secondaryText={
                          <p>
                            <span>Din coach</span>  --
                            <span style={{color: Colors.darkBlack}}>Jeg er din coach og er til rådighed her på chatten. Jeg glæder mig til at høre fra dig.</span>
                          </p>
                        }
                        secondaryTextLines={2}
                      />
                    </List>
                    <div >
                      <FlatButton label="Skriv til Tine" secondary={true} onMouseUp={this.navigateToDialog} />
                    </div>
                  </div>
                </Paper>
                <Paper style={{marginTop:16}}>
                  <div style={{
                    backgroundColor: Theme.palette.backgroundColor,
                    display:'flex', padding:'8 16'}}>
                    <Person style={{height: '29px', width: '29px'}} color={Colors.grey500} />
                    <h4 style={{
                      fontWeight: 'normal',
                      margin:0,
                      marginLeft: 20,
                      marginTop: 5
                    }}>Dit better ways</h4>

                  </div>
                  <div style={{padding:'16 16'}}>
                    <div dangerouslySetInnerHTML={{__html:'<div data-oembed-url="https://youtu.be/G2k6kjRvUOY"> <div> <div style="left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;"><iframe allowfullscreen="true" frameborder="0" mozallowfullscreen="true" src="https://www.youtube.com/embed/G2k6kjRvUOY?wmode=transparent&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;enablejsapi=1" style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;" webkitallowfullscreen="true"></iframe></div> </div> </div>' }}></div>

                  </div>
                </Paper>
              </Col>
            </Row>

          </Col>
          <Col xs={0} sm={0} md={1} lg={2}/>
        </Row>
      </div>);
  }
});

Dashboard = connect()(Dashboard)

export default Dashboard
