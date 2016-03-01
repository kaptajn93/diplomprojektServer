import React from 'react'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';
import Divider from 'material-ui/lib/divider';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import Paper from 'material-ui/lib/paper';

import CourseModuleInfo from '../components/CourseModuleInfo';
import CourseModuleExperiment from '../components/CourseModuleExperiment';
import CourseModuleReflection from '../components/CourseModuleReflection';

const {Grid, Row, Col} = require('react-flexgrid');

var pageContainerStyle = {
  margin:'32px 20px'
};

var courseContainerStyle = {
  background: 'white',
  marginTop: '32px'
};


var paddingStyle = {
  padding: '32px'
}

var textareaStyle = {
  minHeight:'800px'
}

var htmlStyle={
  padding: '0px 32px 32px 32px',
  color: '#888888'
}

const CKEditor = React.createClass({
  isComponentInitialized : false,
  shouldComponentUpdate: function(){
    return false;
  },

  componentDidMount : function(){
    var internalText = this.props.text;
    var textChanged = this.props.onTextChangedCallback;
    var ckEditor = CKEDITOR.replace(this.refs.editor, {
      height: 500,
      contentsCss: [
        CKEDITOR.getUrl( 'https://fonts.googleapis.com/css?family=Roboto:400,300,500' ),
        // Add CSS for widget styles.
        'https://fonts.googleapis.com/css?family=Roboto:400,300,500',
        'ckEditor.css'
        ]
      });

    ckEditor.on('instanceReady', function() {
      ckEditor.setData(internalText);
      this.isComponentInitialized = true;
    });

    function updateModel() {
      if (this.isComponentInitialized){
        internalText = ckEditor.getData();
        if (textChanged !== undefined)
          textChanged(internalText);
      }
    };

    ckEditor.on('change', updateModel);
    ckEditor.on('key', updateModel);
    ckEditor.on('dataReady', updateModel);
  },

  render: function(){
    return (
      <textarea style={textareaStyle} ref="editor" ></textarea>
    )
  }
});

const AdministrationModule = React.createClass({

  getInitialState: function(){
    return {
      isHTMLViewOpen : false,
      htmlText : "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>"
    };
  },

  toggleHtml : function() {
    this.setState({isHTMLViewOpen: !this.state.isHTMLViewOpen});
  },
  onTextChaged : function(newHtml){

      this.setState({htmlText: newHtml});
  },

  render: function() {
    var HtmlDisplayArea = this.state.isHTMLViewOpen ? (
      <div style={htmlStyle}>
        <pre style={{whiteSpace:'pre-line'}}>{this.state.htmlText}</pre>
      </div>) : null;

    var HtmlButton = this.state.isHTMLViewOpen ? 'Skjul html' : 'Vis html';

    return (
      <div style={pageContainerStyle}>
        <Row>
          <Col xs={0} sm={0} md={2} lg={2}/>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Paper style={courseContainerStyle}>
              <div style={paddingStyle}>
                <h1 >Administration</h1>
                <CKEditor text={this.state.htmlText} onTextChangedCallback={this.onTextChaged}></CKEditor>
              </div>

              <Divider />

              <FlatButton label={HtmlButton} secondary={true} onClick={this.toggleHtml}/>
              {HtmlDisplayArea}
            </Paper>

          </Col>
          <Col xs={0} sm={0} md={2} lg={2}/>
        </Row>
      </div>
    )
  }
});

export default AdministrationModule
