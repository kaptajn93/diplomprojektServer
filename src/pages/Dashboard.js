import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import TextField from 'material-ui/lib/text-field';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import Comment from 'material-ui/lib/svg-icons/communication/comment';
import Forward from 'material-ui/lib/svg-icons/av/play-arrow';

import Search from 'material-ui/lib/svg-icons/action/search';
import { Link, browserHistory } from 'react-router';
import { getUserResult, getUserDialogs } from '../actions/api';
import CircularProgress from 'material-ui/lib/circular-progress';
import RightArrow from 'material-ui/lib/svg-icons/navigation/chevron-right';
import LeftArrow from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/lib/icon-button';
import Check from 'material-ui/lib/svg-icons/navigation/check';
import DoneAll from 'material-ui/lib/svg-icons/action/done-all';
import Place from 'material-ui/lib/svg-icons/maps/place';
import Person from 'material-ui/lib/svg-icons/social/person-outline';
import Expand from 'material-ui/lib/svg-icons/navigation/expand-more';
import Event from 'material-ui/lib/svg-icons/action/event';
import School from 'material-ui/lib/svg-icons/social/school';
import ExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less';
import Theme from '../components/Theme';

import Badge from 'material-ui/lib/badge';
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
      isLoading:true,
      isLoadingDialog: true
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
      isLoading:true,
      isLoadingDialog: true
    });

    //Load course state
    this.props.dispatch(getUserResult()).then(
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
          activeModule:json.results.activeModule,
          currentModuleResults: json.results.moduleResults[json.results.activeModuleIndex].moduleResults,
          currentModuleIndex: json.results.activeModuleIndex,
          activeModuleIndex: json.results.activeModuleIndex,
        });
    });

    //Load unread
    this.props.dispatch(getUserDialogs()).then(
      json => {
        this.setState({
          isLoadingDialog: false,
          latestUnread: json.dialogs.latestUnread
        })
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

  openGroup: function(group){
    group.isOpen = !group.isOpen;
    this.setState({});
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
        <div style={{color: !g.isActive ? Theme.palette.textColorMuted : Theme.palette.textColor }}>
          <div style={{
            backgroundColor: g.isActive ? Theme.palette.primary1Color : Theme.palette.backgroundColor,
            color: g.isActive ? Theme.palette.alternateTextColor : Theme.palette.textColor,
            display:'flex', padding:'8 16', cursor: 'pointer',
            position:'relative', boxShadow: index > 0 ? 'inset 0 5px 8px -6px rgba(0,0,0, 0.55)': ''}}
            onClick={this.openGroup.bind(this, g)} >

            <h2 style={{margin:0}}>{g.groupNumber}</h2>
            <h4 style={{
              fontWeight:  'normal',
              margin:0,
              marginLeft: 20,
              marginTop: 5
            }}>
            {g.name}</h4>
            <span style={{marginRight: 0, marginLeft: 'auto', marginTop:3}}>
              {
                g.isCompleted ? <DoneAll style={{ width:24, height:24}} color={Theme.palette.widgetGreen}  /> :
                g.isActive ?  <Place style={{ width:24, height:24}}  color={Colors.white} /> :
                null
              }
            </span>
            <div style={{
              position: 'absolute',
              left: 0,
              bottom: -22,
            	width: 0,
            	height: 0,
            	borderLeft: '22px solid transparent',
            	borderRight: '22px solid transparent',
            	borderTop: '22px solid ' + (g.isActive ? Theme.palette.primary1Color : Theme.palette.backgroundColor)
            }}></div>
          </div>

          <div style={{padding:'20 50', background:'white', display:'flex'}} >

            { g.isOpen ? <div>

              <p style={{margin:0}}>{g.description}</p>
              <div style={{marginTop:32, marginBottom:12}}>
                {
                  g.modules.map((m, index) =>
                    <RaisedButton disabled={!m.isCompleted && !m.isActive} onClick={this.navigateToModule.bind(this, m.module.moduleIndex)} secondary={m.isCompleted} primary={m.isActive} style={{margin:'4 0', width:'100%', padding:0}}>
                      <div style={{height:'100%', width:'100%', textAlign:'left'}}>
                        <div style={{display:'flex', padding: '8 16', color: m.isCompleted || m.isActive ? Theme.palette.alternateTextColor : Theme.palette.textColor }}>
                          <Badge
                          style={{padding: '0px 20px 0px 0px', marginTop: -2}}
                          badgeStyle={{fontWeight:'bold',
                            color:m.isActive ? Theme.palette.accent1Color : m.isCompleted ? Theme.palette.primary1Color : Theme.palette.alternateTextColor,
                            background: !m.isActive && !m.isCompleted ? Theme.palette.primary2Color : Theme.palette.alternateTextColor
                          }}
                            badgeContent={m.module.moduleIndex + 1}
                            secondary={!m.isCompleted && !m.isActive ? true : false}
                          >
                          </Badge>
                          <div  style={{width:'100%', marginTop:1, marginLeft:6}}>
                            <span style={{marginLeft:8}}>{m.module.name}</span>
                          </div>
                          <div style={{width:'50%', textAlign:'right', marginTop:-2}}>
                            {
                              m.isCompleted ? <Check style={{ width:24, height:24}} color={Colors.white}  /> :
                              m.isActive ? <div> <span style={{marginLeft:8, color: Theme.palette.alternateTextColorMuted}}>
                                {
                                  m.module.moduleIndex === 0 ? <span>Start her</span> : <span>Fortsæt her</span>

                                }
                              </span> <Forward style={{ width:24, height:24, marginBottom: -6}} color={Colors.white}  /> </div>:
                              null
                            }
                          </div>
                        </div>
                      </div>
                    </RaisedButton>
                  )
                }

              </div>
            </div> :
            <div style={{width:'100%'}}>
              {
                g.modules.map((m, index) =>
                  <Badge
                  onClick={this.navigateToModule.bind(this, m.module.moduleIndex)}
                  className="tooltip"
                  style={{padding: '0px 20px 0px 0px', marginTop: -2, marginLeft:8,
                    cursor: m.isActive || m.isCompleted ? 'pointer' : 'default'}}
                  badgeStyle={{fontWeight:'bold',
                  background: m.isActive ? Theme.palette.accent1Color : m.isCompleted ? Theme.palette.primary1Color : Theme.palette.primary2Color}}
                    badgeContent={m.module.moduleIndex + 1}
                    secondary={true}>

                    <span className="tooltiptext">{m.module.name}</span>
                  </Badge>
                )
              }
              </div>
            }

            <div style={{marginRight:  -24}}>
              {
                g.isOpen ?
                <ExpandLess style={{position: 'relative', right: -10, cursor: 'pointer'}} onClick={this.openGroup.bind(this, g)} /> :
                <Expand style={{position: 'relative', right: -10, cursor: 'pointer'}} onClick={this.openGroup.bind(this, g)} />
              }
            </div>
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
                <div style={{padding:'16 48', background:Theme.palette.primary1Color, color:Theme.palette.alternateTextColor}}>

                  <h3 style={{color:Theme.palette.alternateTextColor}}>Hej {sessionStorage.sessionFirstName}</h3>
                  <div dangerouslySetInnerHTML={{__html:this.state.activeModule !== undefined ? this.state.activeModule.peptalk : ''}}></div>
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
                  {
                    this.state.isLoadingDialog ?
                    <CircularProgress size={0.6} style={{marginTop:60, marginBottom:60, width:'100%', textAlign:'center'}} /> :
                    this.state.latestUnread === undefined || this.state.latestUnread === null ?
                    <div  style={{padding:'16 24'}}><p style={{color:Theme.palette.disabledColor}}>Du har ingen samtaler</p></div> :
                    <div style={{padding:'16 24'}}>
                      <List style={transparentBackground}>
                      <ListItem onClick={this.navigateToDialog}
                          leftAvatar={<Avatar src={this.state.latestUnread.senderImageUrl} >{ this.state.latestUnread.senderImageUrl === null ? this.state.latestUnread.senderName[0] : null}</Avatar>}
                          primaryText= {"Fra " + this.state.latestUnread.senderName}
                          secondaryText={
                            <p>
                              <span>{this.state.latestUnread.senderDescription}</span>  --
                              <span style={{color: Colors.darkBlack}}>{this.state.latestUnread.text}</span>
                            </p>
                          }
                          secondaryTextLines={2}
                        />
                      </List>
                      <div >
                        <FlatButton label="Skriv til Tine" secondary={true} onMouseUp={this.navigateToDialog} />
                      </div>
                    </div>
                  }
                </Paper>

                <Paper style={{marginTop:32}}>
                  <div style={{
                    backgroundColor: Theme.palette.backgroundColor,
                    display:'flex', padding:'8 16'}}>
                    <Event style={{height: '29px', width: '29px'}} color={Colors.grey500} />
                    <h4 style={{
                      fontWeight: 'normal',
                      margin:0,
                      marginLeft: 20,
                      marginTop: 5
                    }}>Dine aftaler</h4>

                  </div>
                  <div style={{display:'flex'}}>
                    <div style={{width:64, height:64, background: Theme.palette.primary2Color}}>
                      <div style={{marginTop: 0, marginBottom: 0, textAlign: 'center', padding: 8}}>
                        <h2 style={{marginTop:'auto', marginBottom:'auto', padding:0, color:Theme.palette.alternateTextColor}}>27</h2>
                        <p style={{marginTop:'auto', marginBottom:'auto', padding:0, color:Theme.palette.alternateTextColor}}>maj</p>
                      </div>
                    </div>

                    <div style={{padding:12}}>
                      <h5 style={{margin:0}}>Samtale med din coach</h5>
                      <p style={{margin:0, marginTop:4, color:Theme.palette.disabledColor}}>Via skype</p>
                    </div>
                  </div>
                </Paper>

                <Paper style={{marginTop:32}}>
                  <div style={{
                    backgroundColor: Theme.palette.backgroundColor,
                    display:'flex', padding:'8 16'}}>
                    <Person style={{height: '29px', width: '29px'}} color={Colors.grey500} />
                    <h4 style={{
                      fontWeight: 'normal',
                      margin:0,
                      marginLeft: 20,
                      marginTop: 5
                    }}>Intro til betterways</h4>

                  </div>
                  <div style={{padding:'16 16'}}>
                    <div dangerouslySetInnerHTML={{__html:'<div data-oembed-url="https://vimeo.com/164063014"> <div> <div style="left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;"><iframe allowfullscreen="true" frameborder="0" mozallowfullscreen="true" src="//player.vimeo.com/video/164063014?byline=0&amp;badge=0&amp;portrait=0&amp;title=0" style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;" webkitallowfullscreen="true"></iframe></div> </div> </div>' }}></div>

                  </div>
                </Paper>

                <Paper style={{marginTop:32}}>
                  <div style={{
                    backgroundColor: Theme.palette.backgroundColor,
                    display:'flex', padding:'8 16'}}>
                    <School style={{height: '29px', width: '29px'}} color={Colors.grey500} />
                    <h4 style={{
                      fontWeight: 'normal',
                      margin:0,
                      marginLeft: 20,
                      marginTop: 5
                    }}>Viden</h4>

                  </div>
                  <div style={{padding:16}}>
                    <div style={{display:'flex'}}>
                      <Search style={{marginTop:12, marginRight:8}} />
                      <TextField style={{width:'100%'}}
                        hintText="Søg efter indslag, artikler"
                      />
                    </div>
                    <List subheader="Udvalgte indslag" style={{marginTop:16}}>
                      <ListItem
                        leftAvatar={<Avatar src="assets/amycuddy.jpg" />}
                        primaryText="Dit Kropssprog former hvem du er"
                        secondaryText={
                          <p>
                            <span style={{color: Colors.darkBlack}}>Amy Cuddy</span> --
                            Kropssproget har en betynding for hvordan andre opfatter os, men det kan også ændre hvordan vi opfatter os selv. Social psykolog Amy Cuddy viser #power position# – at stå med selvtillid, selv når du ikke føler det. Det påvirker dine hormoner og hjerneaktivitet og – har en indvirken på dine chancer for succes.
                          </p>
                        }
                        secondaryTextLines={2}
                      />
                      <Divider inset={true} />
                      <ListItem
                        leftAvatar={<Avatar src="assets/juliantreasure.jpg" />}
                        primaryText="Sådan får du andre til at lytte når du taler"
                        secondaryText={
                          <p>
                            <span style={{color: Colors.darkBlack}}>Julian Treasure</span> --
                            Har du oplevet at ingen lytter når du taler? Her er Julians Treasures hjælp til dig. Lydeksperten viser dig hvordan man taler med empathi. En lyd der får verden til at lyde smukkere.
                          </p>
                        }
                        secondaryTextLines={2}
                      />
                      <Divider inset={true} />
                      <ListItem
                        leftAvatar={<Avatar src="assets/shawnachor.jpg" />}
                        primaryText="Den bedste nyhed til et bedre arbejde"
                        secondaryText={
                          <p>
                            <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                            Mange tror at vi skal arbejde hårdere for at blive lykkelige, men hvad vil der ske hvis vi tænker det lige omvendt? I denne hurtige og morsomme talk, argumenterer Shawn Achor for at lige netop at lykke gør os mere produktive.

                          </p>
                        }
                        secondaryTextLines={2}
                      />
                      <Divider inset={true} />
                      <ListItem
                        leftAvatar={<Avatar src="assets/elizabethgilbert.jpg" />}
                        primaryText="Sæt dit talent fri"
                        secondaryText={
                          <p>
                            <span style={{color: Colors.darkBlack}}>Elisabeth Gilbert</span> --
                            Elisabeth Gilbert runder de umulige ting vi forventer af artister og genier – og foreslår en radikal idé: at i stedet for at være  et talent  – kan man tale med om at have talent. Det er en morsom, tankevækkende og overraskende bevægende talk.
                          </p>
                        }
                        secondaryTextLines={2}
                      />

                    </List>
                    <FlatButton secondary={true} label='Find flere artikler'></FlatButton>
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
