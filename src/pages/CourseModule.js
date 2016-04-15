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

import Paper from 'material-ui/lib/paper';

import CourseModuleInfo from '../components/CourseModuleInfo';
import CourseModuleExperiment from '../components/CourseModuleExperiment';
import CourseModuleReflection from '../components/CourseModuleReflection';

import Theme from '../components/Theme';

import { getModule } from '../actions/api';

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

let CourseModule = React.createClass({
  getInitialState:function(){
    return{
      moduleName: '',
      moduleIndex: -1,
      isExerciseCompleted: false,
      exerciseGoalText: '',
    };
  },

  exercisesStatusChanged: function(isExerciseCompleted){
    this.setState({isExerciseCompleted: isExerciseCompleted});
  },

  componentDidMount : function(){
    this.setState({
      isLoading:true
    })
    this.props.dispatch(getModule(this.props.params.moduleId)).then(
      json => {
      this.setState({
        module: json.module,
        introduction: json.module.introduction,
        exercise: json.module.exercise,
        reflection: json.module.reflection,
        moduleName: json.module.name,
        moduleIndex: json.module.moduleIndex
      });
    });
  },

  onExerciseGoalUpdated:function(exerciseGoalText){
    this.setState({exerciseGoalText: exerciseGoalText})
  },

  render: function() {

    var styles = {
      default_tab:{
        color: 'black',
        backgroundColor:  Theme.palette.backgroundColor,
        fontWeight: 400,
      },
      active_tab:{
        color: 'blue',
      }
    }

    styles.tab = []
    styles.tab[0] = styles.default_tab;
    styles.tab[1] = styles.default_tab;
    styles.tab[2] = styles.default_tab;
    //styles.tab[this.state.slideIndex] = objectAssign({},   styles.tab[this.state.slideIndex], styles.active_tab);

    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Row>
              <Col  xs={12} sm={12} md={12} lg={12}>
                <div style={{padding:'16 48', background:Theme.palette.primary1Color, color:Theme.palette.alternateTextColor}}>

                  <h3 style={{color:Theme.palette.alternateTextColor}}>Velkommen til {this.state.moduleIndex + 1}. modul</h3>
                  <p>{this.state.module !== undefined ? this.state.module.description : ''}</p>
                  <p>Vi starter med at give dig ny viden, efterfulgt af et eksperiment. Når du har gennemført eksperimentet slutter vi af med en reflektionssøvelse.</p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop:8}}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Paper style={courseContainerStyle}>
                  <div style={paddingStyle}>
                    <h1 style={moduleNameStyle}>{this.state.moduleName}</h1>
                  </div>
                  <Tabs >
                    <Tab style={styles.tab[0]}
                      icon={<FontIcon color={Theme.palette.disabledColor} className="material-icons">wb_incandescent</FontIcon>}
                      label="VIDEN">
                      <div style={paddingStyle} >
                        <CourseModuleInfo resourceId={this.state.introduction}/>
                      </div>
                    </Tab>
                    <Tab style={styles.tab[1]}
                      icon={<FontIcon color={Theme.palette.disabledColor} className="material-icons">pan_tool</FontIcon>}
                      label="EKSPERIMENT">
                      <div style={paddingStyle} >
                        <CourseModuleExperiment onExerciseGoalUpdated={this.onExerciseGoalUpdated} exerciseGoalText={this.state.exerciseGoalText} exercisesStatusChanged={this.exercisesStatusChanged} resourceId={this.state.exercise}/>
                      </div>
                    </Tab>
                    <Tab style={styles.tab[2]}
                      icon={<FontIcon color={Theme.palette.disabledColor} className="material-icons">cloud</FontIcon>}
                      label="REFLEKTION">
                      <div style={paddingStyle} >
                        <CourseModuleExperiment exerciseGoalText={this.state.exerciseGoalText} exercisesStatusChanged={this.exercisesStatusChanged} isActive={this.state.isExerciseCompleted} resourceId={this.state.reflection} />
                      </div>
                    </Tab>
                  </Tabs>
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

CourseModule = connect()(CourseModule)

export default CourseModule
