import React from 'react';
import { connect } from 'react-redux'
import { sendSms } from '../actions/sendSms'

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import TextSmsIcon from 'material-ui/lib/svg-icons/communication/textsms';

let CourseModuleReflection = ({ dispatch }) => {
  return (
    <div>
      <h1>Reflektion</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices commodo commodo. Suspendisse egestas, erat vel rutrum porta, sapien eros posuere nulla, id blandit metus odio a nibh.</p>

      <div style={{textAlign: 'center'}}>
        <RaisedButton
          label="Send SMS"
          labelPosition="after"
          primary={true}
          icon={<TextSmsIcon />}
          onClick={e => {
            e.preventDefault();
            dispatch(sendSms(3));
          }}
        />
      </div>
    </div>
  )
};
CourseModuleReflection = connect()(CourseModuleReflection)

export default CourseModuleReflection;
